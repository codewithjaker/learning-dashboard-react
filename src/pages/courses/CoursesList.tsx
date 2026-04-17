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