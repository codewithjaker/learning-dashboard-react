import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { PayoutFormDialog } from './PayoutFormDialog';
import { type RootState } from '../../store';
import {
    fetchPayouts,
    setQueryParams,
    createPayout,
    updatePayout,
    deletePayout,
} from '../../store/slices/payoutSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import type { CreatePayoutRequest, UpdatePayoutRequest } from '../../types/payout.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function PayoutsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { payouts, total, isLoading, queryParams } = useSelector((state: RootState) => state.payouts);
    const { users } = useSelector((state: RootState) => state.users);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedPayout, setSelectedPayout] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [payoutToDelete, setPayoutToDelete] = useState<any>(null);

    const loadPayouts = useCallback(() => {
        dispatch(fetchPayouts(queryParams));
    }, [dispatch, queryParams]);

    useEffect(() => {
        loadPayouts();
        dispatch(fetchUsers({ page: 1, limit: 100, role: 'instructor' }));
    }, [dispatch, loadPayouts]);

    const handlePageChange = (page: number) => {
        dispatch(setQueryParams({ page }));
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setQueryParams({ limit, page: 1 }));
    };

    const handleStatusFilter = (status: string) => {
        dispatch(setQueryParams({ status: status || undefined, page: 1 }));
    };

    const handleInstructorFilter = (instructorId: number) => {
        dispatch(setQueryParams({ instructorId: instructorId || undefined, page: 1 }));
    };

    const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        dispatch(setQueryParams({ sortBy, sortOrder }));
    };

    const handleCreate = async (data: CreatePayoutRequest) => {
        try {
            await dispatch(createPayout(data)).unwrap();
            //   toast({ title: 'Success', description: 'Payout created successfully' });
            setFormOpen(false);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleUpdate = async (data: UpdatePayoutRequest) => {
        if (!selectedPayout) return;
        try {
            await dispatch(updatePayout({ id: selectedPayout.id, data })).unwrap();
            //   toast({ title: 'Success', description: 'Payout updated successfully' });
            setFormOpen(false);
            setSelectedPayout(null);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!payoutToDelete) return;
        try {
            await dispatch(deletePayout(payoutToDelete.id)).unwrap();
            //   toast({ title: 'Success', description: 'Payout deleted successfully' });
            setDeleteDialogOpen(false);
            setPayoutToDelete(null);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const openCreateDialog = () => {
        setSelectedPayout(null);
        setFormOpen(true);
    };

    const openEditDialog = (payout: any) => {
        setSelectedPayout(payout);
        setFormOpen(true);
    };

    const openDeleteDialog = (payout: any) => {
        setPayoutToDelete(payout);
        setDeleteDialogOpen(true);
    };

    const openViewPage = (payout: any) => {
        navigate(`/payouts/${payout.id}`);
    };

    const instructors = users.map(u => ({ id: u.id, fullName: u.fullName, email: u.email }));

    const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Instructor Payouts</h1>
                <Button onClick={openCreateDialog}>
                    <Plus className="mr-2 h-4 w-4" /> Create Payout
                </Button>
            </div>

            <DataTable
                columns={tableColumns}
                data={payouts}
                total={total}
                page={queryParams.page || 1}
                limit={queryParams.limit || 10}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSort={handleSort}
                filters={[
                    {
                        id: 'status',
                        label: 'Status',
                        options: [
                            { label: 'All', value: '' },
                            { label: 'Pending', value: 'pending' },
                            { label: 'Paid', value: 'paid' },
                            { label: 'Failed', value: 'failed' },
                        ],
                        value: queryParams.status || '',
                        onChange: handleStatusFilter,
                    },
                ]}
                isLoading={isLoading}
            />

            <PayoutFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                payout={selectedPayout}
                onSubmit={selectedPayout ? handleUpdate : handleCreate}
                isLoading={isLoading}
                instructors={instructors}
            />

            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Payout"
                description={`Are you sure you want to delete this payout record? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}