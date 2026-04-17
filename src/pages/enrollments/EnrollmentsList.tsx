import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { EnrollmentFormDialog } from './EnrollmentFormDialog';
import { type RootState } from '../../store';
import {
    fetchEnrollments,
    setQueryParams,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    completeEnrollment,
} from '../../store/slices/enrollmentSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchCourses } from '../../store/slices/courseSlice';
import type { CreateEnrollmentRequest, UpdateEnrollmentRequest } from '../../types/enrollment.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function EnrollmentsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { enrollments, total, isLoading, queryParams } = useSelector((state: RootState) => state.enrollments);
    const { users } = useSelector((state: RootState) => state.users);
    const { courses } = useSelector((state: RootState) => state.courses);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [enrollmentToDelete, setEnrollmentToDelete] = useState<any>(null);

    const loadEnrollments = useCallback(() => {
        dispatch(fetchEnrollments(queryParams));
    }, [dispatch, queryParams]);

    useEffect(() => {
        loadEnrollments();
        dispatch(fetchUsers({ page: 1, limit: 100 }));
        dispatch(fetchCourses({ page: 1, limit: 100, status: 'published' }));
    }, [dispatch, loadEnrollments]);

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

    const handleUserFilter = (userId: number) => {
        dispatch(setQueryParams({ userId: userId || undefined, page: 1 }));
    };

    const handleCourseFilter = (courseId: number) => {
        dispatch(setQueryParams({ courseId: courseId || undefined, page: 1 }));
    };

    const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        dispatch(setQueryParams({ sortBy, sortOrder }));
    };

    const handleCreate = async (data: CreateEnrollmentRequest) => {
        try {
            await dispatch(createEnrollment(data)).unwrap();
            //   toast({ title: 'Success', description: 'Enrollment created successfully' });
            setFormOpen(false);
        } catch (error: any) {
            //    toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleUpdate = async (data: UpdateEnrollmentRequest) => {
        if (!selectedEnrollment) return;
        try {
            await dispatch(updateEnrollment({ id: selectedEnrollment.id, data })).unwrap();
            //    toast({ title: 'Success', description: 'Enrollment updated successfully' });
            setFormOpen(false);
            setSelectedEnrollment(null);
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!enrollmentToDelete) return;
        try {
            await dispatch(deleteEnrollment(enrollmentToDelete.id)).unwrap();
            //     toast({ title: 'Success', description: 'Enrollment deleted successfully' });
            setDeleteDialogOpen(false);
            setEnrollmentToDelete(null);
        } catch (error: any) {
            //    toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const handleComplete = async (enrollment: any) => {
        try {
            await dispatch(completeEnrollment(enrollment.id)).unwrap();
            //   toast({ title: 'Success', description: 'Enrollment marked as completed' });
        } catch (error: any) {
            //   toast({ title: 'Error', description: error, variant: 'destructive' });
        }
    };

    const openCreateDialog = () => {
        setSelectedEnrollment(null);
        setFormOpen(true);
    };

    const openEditDialog = (enrollment: any) => {
        setSelectedEnrollment(enrollment);
        setFormOpen(true);
    };

    const openDeleteDialog = (enrollment: any) => {
        setEnrollmentToDelete(enrollment);
        setDeleteDialogOpen(true);
    };

    const openViewPage = (enrollment: any) => {
        navigate(`/enrollments/${enrollment.id}`);
    };

    const userOptions = users.map(u => ({ id: u.id, fullName: u.fullName, email: u.email }));
    const courseOptions = courses.map(c => ({ id: c.id, title: c.title }));

    const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog, handleComplete);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Enrollments Management</h1>
                <Button onClick={openCreateDialog}>
                    <Plus className="mr-2 h-4 w-4" /> Add Enrollment
                </Button>
            </div>

            <DataTable
                columns={tableColumns}
                data={enrollments}
                total={total}
                page={queryParams.page || 1}
                limit={queryParams.limit || 10}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSearch={handleSearch}
                onSort={handleSort}
                searchPlaceholder="Search by student name or course title..."
                filters={[
                    {
                        id: 'status',
                        label: 'Status',
                        options: [
                            { label: 'All', value: '' },
                            { label: 'Active', value: 'active' },
                            { label: 'Completed', value: 'completed' },
                            { label: 'Refunded', value: 'refunded' },
                        ],
                        value: queryParams.status || '',
                        onChange: handleStatusFilter,
                    },
                ]}
                isLoading={isLoading}
            />

            <EnrollmentFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                enrollment={selectedEnrollment}
                onSubmit={selectedEnrollment ? handleUpdate : handleCreate}
                isLoading={isLoading}
                users={userOptions}
                courses={courseOptions}
            />

            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Enrollment"
                description={`Are you sure you want to delete this enrollment? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}