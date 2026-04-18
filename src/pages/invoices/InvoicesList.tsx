import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { InvoiceFormDialog } from './InvoiceFormDialog';
import { type RootState } from '../../store';
import {
    fetchInvoices,
    setQueryParams,
    createInvoice,
    updateInvoice,
    deleteInvoice,
} from '../../store/slices/invoiceSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import type { CreateInvoiceRequest, UpdateInvoiceRequest } from '../../types/invoice.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function InvoicesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { invoices, total, isLoading, queryParams } = useSelector((state: RootState) => state.invoices);
    const { users } = useSelector((state: RootState) => state.users);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState<any>(null);

    const loadInvoices = useCallback(() => {
        dispatch(fetchInvoices(queryParams));
    }, [dispatch, queryParams]);

    useEffect(() => {
        loadInvoices();
        dispatch(fetchUsers({ page: 1, limit: 100 }));
    }, [dispatch, loadInvoices]);

    const handlePageChange = (page: number) => {
        dispatch(setQueryParams({ page }));
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setQueryParams({ limit, page: 1 }));
    };

    const handleSearch = (search: string) => {
        dispatch(setQueryParams({ search, page: 1 }));
    };

    const handleStatusFilter = (status: string) => {
        dispatch(setQueryParams({ status: status || undefined, page: 1 }));
    };

    const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        dispatch(setQueryParams({ sortBy, sortOrder }));
    };

    const handleCreate = async (data: CreateInvoiceRequest) => {
        try {
            await dispatch(createInvoice(data)).unwrap();
            //   toast({ title: 'Success', description: 'Invoice created successfully' });
            setFormOpen(false);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleUpdate = async (data: UpdateInvoiceRequest) => {
        if (!selectedInvoice) return;
        try {
            await dispatch(updateInvoice({ id: selectedInvoice.id, data })).unwrap();
            //   toast({ title: 'Success', description: 'Invoice updated successfully' });
            setFormOpen(false);
            setSelectedInvoice(null);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!invoiceToDelete) return;
        try {
            await dispatch(deleteInvoice(invoiceToDelete.id)).unwrap();
            //   toast({ title: 'Success', description: 'Invoice deleted successfully' });
            setDeleteDialogOpen(false);
            setInvoiceToDelete(null);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const openCreateDialog = () => {
        setSelectedInvoice(null);
        setFormOpen(true);
    };

    const openEditDialog = (invoice: any) => {
        setSelectedInvoice(invoice);
        setFormOpen(true);
    };

    const openDeleteDialog = (invoice: any) => {
        setInvoiceToDelete(invoice);
        setDeleteDialogOpen(true);
    };

    const openViewPage = (invoice: any) => {
        navigate(`/invoices/${invoice.id}`);
    };

    const userOptions = users.map(u => ({ id: u.id, fullName: u.fullName, email: u.email }));

    const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Invoices Management</h1>
                <Button onClick={openCreateDialog}>
                    <Plus className="mr-2 h-4 w-4" /> Generate Invoice
                </Button>
            </div>

            <DataTable
                columns={tableColumns}
                data={invoices}
                total={total}
                page={queryParams.page || 1}
                limit={queryParams.limit || 10}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSearch={handleSearch}
                onSort={handleSort}
                searchPlaceholder="Search by invoice number or customer..."
                filters={[
                    {
                        id: 'status',
                        label: 'Status',
                        options: [
                            { label: 'All', value: '' },
                            { label: 'Pending', value: 'pending' },
                            { label: 'Paid', value: 'paid' },
                            { label: 'Refunded', value: 'refunded' },
                            { label: 'Cancelled', value: 'cancelled' },
                        ],
                        value: queryParams.status || '',
                        onChange: handleStatusFilter,
                    },
                ]}
                isLoading={isLoading}
            />

            <InvoiceFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                invoice={selectedInvoice}
                onSubmit={selectedInvoice ? handleUpdate : handleCreate}
                isLoading={isLoading}
                users={userOptions}
            />

            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Invoice"
                description={`Are you sure you want to delete this invoice? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}