/* 
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

*/

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { MoreHorizontal, Eye, Edit, Trash2, Plus, Search, CheckCircle } from 'lucide-react';
import { type RootState } from '../../store';
import {
  fetchEnrollments,
  setQueryParams,
  deleteEnrollment,
  updateEnrollment,
  completeEnrollment,
} from '../../store/slices/enrollmentSlice';
import { fetchCourses } from '../../store/slices/courseSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useToast } from '../../components/ui/use-toast';
import { formatDate, formatCurrency } from '../../lib/utils';
import { EnrollmentFormDialog } from './EnrollmentFormDialog';

export default function EnrollmentsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { enrollments, total, isLoading, queryParams } = useSelector((state: RootState) => state.enrollments);
  const { courses } = useSelector((state: RootState) => state.courses);
  const { users } = useSelector((state: RootState) => state.users);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState(queryParams.search || '');
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusEnrollment, setStatusEnrollment] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  const loadEnrollments = useCallback(() => {
    dispatch(fetchEnrollments(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadEnrollments();
    // Load courses and users for filters and form dropdowns
    dispatch(fetchCourses({ page: 1, limit: 100 }));
    dispatch(fetchUsers({ page: 1, limit: 100, role: 'student' }));
  }, [dispatch, loadEnrollments]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== queryParams.search) {
        dispatch(setQueryParams({ search: searchInput, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch, queryParams.search]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setQueryParams({ status: status === 'all' ? '' : status, page: 1 }));
  };

  const handleCourseFilter = (courseId: string) => {
    dispatch(setQueryParams({ courseId: courseId === 'all' ? undefined : parseInt(courseId), page: 1 }));
  };

  const handleSort = (field: string) => {
    const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
  };

  const openCreateDialog = () => {
    setSelectedEnrollment(null);
    setFormOpen(true);
  };

  const openEditDialog = (enrollment: any) => {
    setSelectedEnrollment(enrollment);
    setFormOpen(true);
  };

  const openStatusDialog = (enrollment: any) => {
    setStatusEnrollment(enrollment);
    setNewStatus(enrollment.status);
    setStatusDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!statusEnrollment) return;
    try {
      await dispatch(updateEnrollment({ id: statusEnrollment.id, data: { status: newStatus } })).unwrap();
    //   toast({ title: 'Success', description: 'Enrollment status updated' });
      setStatusDialogOpen(false);
      setStatusEnrollment(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
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

  const openDeleteDialog = (enrollment: any) => {
    setEnrollmentToDelete(enrollment);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!enrollmentToDelete) return;
    try {
      await dispatch(deleteEnrollment(enrollmentToDelete.id)).unwrap();
    //   toast({ title: 'Success', description: 'Enrollment deleted successfully' });
      setDeleteDialogOpen(false);
      setEnrollmentToDelete(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / (queryParams.limit || 10));
  const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
  const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

  // Prepare course options for filter
  const courseOptions = [{ id: 'all', title: 'All Courses' }, ...courses];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Enrollments Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Enrollment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name or course title..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={queryParams.status || 'all'} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={queryParams.courseId?.toString() || 'all'}
              onValueChange={handleCourseFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={String(queryParams.limit || 10)} onValueChange={(v) => handleLimitChange(Number(v))}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('user')}>
                    Student {queryParams.sortBy === 'user' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('course')}>
                    Course {queryParams.sortBy === 'course' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                    Status {queryParams.sortBy === 'status' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('enrolledAt')}>
                    Enrolled Date {queryParams.sortBy === 'enrolledAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Completed Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : enrollments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No enrollments found
                    </TableCell>
                  </TableRow>
                ) : (
                  enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{enrollment.user?.fullName || `User ${enrollment.userId}`}</div>
                          <div className="text-sm text-muted-foreground">{enrollment.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{enrollment.course?.title || `Course ${enrollment.courseId}`}</div>
                          <div className="text-sm text-muted-foreground">{enrollment.course?.slug}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={enrollment.status === 'active' ? 'success' : enrollment.status === 'completed' ? 'default' : 'destructive'}>
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(enrollment.enrolledAt)}</TableCell>
                      <TableCell>{enrollment.completedAt ? formatDate(enrollment.completedAt) : '-'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/enrollments/${enrollment.id}`)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(enrollment)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openStatusDialog(enrollment)}>
                              <Edit className="mr-2 h-4 w-4" /> Change Status
                            </DropdownMenuItem>
                            {enrollment.status === 'active' && (
                              <DropdownMenuItem onClick={() => handleComplete(enrollment)}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Mark Completed
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteDialog(enrollment)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {total} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange((queryParams.page || 1) - 1)}
                      className={queryParams.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    const currentPage = queryParams.page || 1;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange((queryParams.page || 1) + 1)}
                      className={queryParams.page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <EnrollmentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        enrollment={selectedEnrollment}
        onSubmit={selectedEnrollment ? (data) => dispatch(updateEnrollment({ id: selectedEnrollment.id, data })) : (data) => dispatch(createEnrollment(data))}
        isLoading={isLoading}
        users={users || []}
        courses={courses || []}
      />

      {/* Change Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Enrollment Status</DialogTitle>
            <DialogDescription>
              Update the status for {statusEnrollment?.user?.fullName} in {statusEnrollment?.course?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateStatus}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Enrollment"
        description={`Are you sure you want to delete enrollment for "${enrollmentToDelete?.user?.fullName}" in "${enrollmentToDelete?.course?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}