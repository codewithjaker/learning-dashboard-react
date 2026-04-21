/* 
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { CourseFormDialog } from './CourseFormDialog';
import { type RootState } from '../../store';
import {
  fetchCourses,
  setQueryParams,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
} from '../../store/slices/courseSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import type { CreateCourseRequest, UpdateCourseRequest } from '../../types/course.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function CoursesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courses, total, isLoading, queryParams } = useSelector((state: RootState) => state.courses);
  const { users } = useSelector((state: RootState) => state.users);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<any>(null);

  console.log("Courses length:", courses.length);
  console.log("Courses data:", courses);

  const loadCourses = useCallback(() => {
    dispatch(fetchCourses(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadCourses();
    dispatch(fetchUsers({ page: 1, limit: 100, role: 'instructor' }));
  }, [dispatch, loadCourses]);

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

  const handleCategoryFilter = (category: string) => {
    dispatch(setQueryParams({ category: category || undefined, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleCreate = async (data: CreateCourseRequest) => {
    try {
      await dispatch(createCourse(data)).unwrap();
      //   toast({ title: 'Success', description: 'Course created successfully' });
      setFormOpen(false);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: UpdateCourseRequest) => {
    if (!selectedCourse) return;
    try {
      await dispatch(updateCourse({ id: selectedCourse.id, data })).unwrap();
      //   toast({ title: 'Success', description: 'Course updated successfully' });
      setFormOpen(false);
      setSelectedCourse(null);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;
    try {
      await dispatch(deleteCourse(courseToDelete.id)).unwrap();
      //   toast({ title: 'Success', description: 'Course deleted successfully' });
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handlePublish = async (course: any) => {
    try {
      await dispatch(publishCourse(course.id)).unwrap();
      //   toast({ title: 'Success', description: 'Course published successfully' });
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openCreateDialog = () => {
    setSelectedCourse(null);
    setFormOpen(true);
  };

  const openEditDialog = (course: any) => {
    setSelectedCourse(course);
    setFormOpen(true);
  };

  const openDeleteDialog = (course: any) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (course: any) => {
    navigate(`/courses/${course.id}`);
  };

  const instructors = users.map(u => ({ id: u.id, fullName: u.fullName }));
  const categories = [...new Set(courses.map(c => c.category))];

  const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog, handlePublish);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Courses Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <DataTable
        columns={tableColumns}
        data={courses}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSearch={handleSearch}
        onSort={handleSort}
        searchPlaceholder="Search by title..."
        filters={[
          {
            id: 'status',
            label: 'Status',
            options: [
              { label: 'All', value: '' },
              { label: 'Published', value: 'published' },
              { label: 'Draft', value: 'draft' },
              { label: 'Archived', value: 'archived' },
            ],
            value: queryParams.status || '',
            onChange: handleStatusFilter,
          },
          {
            id: 'category',
            label: 'Category',
            options: [
              { label: 'All', value: '' },
              ...categories.map(c => ({ label: c, value: c })),
            ],
            value: queryParams.category || '',
            onChange: handleCategoryFilter,
          },
        ]}
        isLoading={isLoading}
      />

      <CourseFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        course={selectedCourse}
        onSubmit={selectedCourse ? handleUpdate : handleCreate}
        isLoading={isLoading}
        instructors={instructors}
        categories={categories}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Course"
        description={`Are you sure you want to delete course "${courseToDelete?.title}"? This will also delete all sections, items, and enrollments. This action cannot be undone.`}
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
import { MoreHorizontal, Eye, Edit, Trash2, Plus, Search, Upload } from 'lucide-react';
import {type RootState } from '../../store';
import { fetchCourses, setQueryParams, deleteCourse, publishCourse } from '../../store/slices/courseSlice';
import { CourseFormDialog } from './CourseFormDialog';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useToast } from '../../components/ui/use-toast';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function CoursesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courses, total, isLoading, queryParams } = useSelector((state: RootState) => state.courses);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState(queryParams.search || '');

  const loadCourses = useCallback(() => {
    dispatch(fetchCourses(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

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

  const handleCategoryFilter = (category: string) => {
    dispatch(setQueryParams({ category: category === 'all' ? '' : category, page: 1 }));
  };

  const handleSort = (field: string) => {
    const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
  };

  const openCreateDialog = () => {
    setSelectedCourse(null);
    setFormOpen(true);
  };

  const openEditDialog = (course: any) => {
    setSelectedCourse(course);
    setFormOpen(true);
  };

  const openDeleteDialog = (course: any) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;
    try {
      await dispatch(deleteCourse(courseToDelete.id)).unwrap();
      // toast({ title: 'Success', description: 'Course deleted successfully' });
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handlePublish = async (course: any) => {
    try {
      await dispatch(publishCourse(course.id)).unwrap();
      // toast({ title: 'Success', description: 'Course published successfully' });
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / (queryParams.limit || 10));
  const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
  const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

  // Extract unique categories from current courses (or fetch from API)
  const uniqueCategories = [...new Set(courses.map(c => c.category).filter(Boolean))];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Courses Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={queryParams.status || 'all'}
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={queryParams.category || 'all'}
              onValueChange={handleCategoryFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={String(queryParams.limit || 10)}
              onValueChange={(v) => handleLimitChange(Number(v))}
            >
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
                  <TableHead className="cursor-pointer" onClick={() => handleSort('title')}>
                    Title {queryParams.sortBy === 'title' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('price')}>
                    Price {queryParams.sortBy === 'price' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Created {queryParams.sortBy === 'createdAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No courses found
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{course.title}</div>
                          <div className="text-sm text-muted-foreground">{course.slug}</div>
                        </div>
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell className="capitalize">{course.level}</TableCell>
                      <TableCell>
                        {formatCurrency(course.price)}
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            {formatCurrency(course.originalPrice)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.status === 'published' ? 'success' : course.status === 'draft' ? 'secondary' : 'outline'}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(course.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/courses/${course.id}`)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/courses/${course.id}/syllabus`)}>
                              <Eye className="mr-2 h-4 w-4" /> Manage Syllabus
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(course)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            {course.status === 'draft' && (
                              <DropdownMenuItem onClick={() => handlePublish(course)}>
                                <Upload className="mr-2 h-4 w-4" /> Publish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteDialog(course)} className="text-red-600">
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

      <CourseFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        course={selectedCourse}
        onSubmit={selectedCourse ? (data) => dispatch(updateCourse({ id: selectedCourse.id, data })) : (data) => dispatch(createCourse(data))}
        isLoading={isLoading}
        instructors={[]} // You'll need to fetch instructors separately
        categories={uniqueCategories}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Course"
        description={`Are you sure you want to delete course "${courseToDelete?.title}"? This will also delete all sections, items, and enrollments. This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}