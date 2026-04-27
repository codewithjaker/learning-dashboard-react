import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { ReviewFormDialog } from './ReviewFormDialog';
import {type RootState } from '../../store';
import {
  fetchReviews,
  setQueryParams,
  deleteReview,
  updateReview,
  createReview,
} from '../../store/slices/reviewSlice';
import { fetchCourses } from '../../store/slices/courseSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import {type Review } from '../../types/review.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function ReviewsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { reviews, total, isLoading, queryParams } = useSelector((state: RootState) => state.reviews);
  const { courses } = useSelector((state: RootState) => state.courses);
  const { users } = useSelector((state: RootState) => state.users);
  
  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Load data
  const loadReviews = useCallback(() => {
    dispatch(fetchReviews(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadReviews();
    dispatch(fetchCourses({ page: 1, limit: 100 }));
    dispatch(fetchUsers({ page: 1, limit: 100, role: 'student' }));
  }, [dispatch, loadReviews]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  // Filter handlers
  const handleCourseFilter = (courseId: string) => {
    dispatch(setQueryParams({ courseId: courseId ? parseInt(courseId) : undefined, page: 1 }));
  };

  const handleRatingFilter = (rating: string) => {
    dispatch(setQueryParams({ rating: rating ? parseInt(rating) : undefined, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  // Delete handlers
  const openDeleteDialog = (review: Review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      await dispatch(deleteReview(reviewToDelete.id)).unwrap();
      // toast({ title: 'Success', description: 'Review deleted successfully' });
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  // Edit handlers
  const openEditDialog = (review: Review) => {
    setReviewToEdit(review);
    setEditDialogOpen(true);
  };

  const handleUpdateReview = async (data: { rating: number; comment?: string }) => {
    if (!reviewToEdit) return;
    try {
      await dispatch(updateReview({ id: reviewToEdit.id, data })).unwrap();
      // toast({ title: 'Success', description: 'Review updated successfully' });
      setEditDialogOpen(false);
      setReviewToEdit(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  // Create handlers
  const handleCreateReview = async (data: { userId: number; courseId: number; rating: number; comment?: string }) => {
    try {
      await dispatch(createReview(data)).unwrap();
      // toast({ title: 'Success', description: 'Review created successfully' });
      setCreateDialogOpen(false);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  // View details handler
  const openViewPage = (review: Review) => {
    navigate(`/reviews/${review.id}`);
  };

  // Build filter options
  const courseOptions = [
    { label: 'All Courses', value: '' },
    ...courses.map(c => ({ label: c.title, value: c.id.toString() })),
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: '' },
    { label: '5 Stars', value: '5' },
    { label: '4 Stars', value: '4' },
    { label: '3 Stars', value: '3' },
    { label: '2 Stars', value: '2' },
    { label: '1 Star', value: '1' },
  ];

  const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Reviews</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Review
        </Button>
      </div>

      <DataTable
        columns={tableColumns}
        data={reviews}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSort={handleSort}
        filters={[
          {
            id: 'courseId',
            label: 'Course',
            options: courseOptions,
            value: queryParams.courseId?.toString() || '',
            onChange: handleCourseFilter,
          },
          {
            id: 'rating',
            label: 'Rating',
            options: ratingOptions,
            value: queryParams.rating?.toString() || '',
            onChange: handleRatingFilter,
          },
        ]}
        isLoading={isLoading}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Review"
        description={`Are you sure you want to delete the review from "${reviewToDelete?.user?.fullName}" for course "${reviewToDelete?.course?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* Edit Review Dialog */}
      <ReviewFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialData={reviewToEdit ? { rating: reviewToEdit.rating, comment: reviewToEdit.comment } : undefined}
        onSubmit={handleUpdateReview}
        title="Edit Review"
      />

      {/* Create Review Dialog (Admin) */}
      <ReviewFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateReview}
        title="Create New Review"
        users={users.filter(u => u.role === 'student')}
        courses={courses}
        requireUserCourse={true}
      />
    </div>
  );
}

