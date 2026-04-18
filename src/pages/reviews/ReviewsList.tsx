import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import {type RootState } from '../../store';
import {
  fetchReviews,
  setQueryParams,
  deleteReview,
} from '../../store/slices/reviewSlice';
import { fetchCourses } from '../../store/slices/courseSlice';
import {type Review } from '../../types/review.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function ReviewsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { reviews, total, isLoading, queryParams } = useSelector((state: RootState) => state.reviews);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const loadReviews = useCallback(() => {
    dispatch(fetchReviews(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadReviews();
    dispatch(fetchCourses({ page: 1, limit: 100 }));
  }, [dispatch, loadReviews]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleCourseFilter = (courseId: string) => {
    dispatch(setQueryParams({ courseId: courseId ? parseInt(courseId) : undefined, page: 1 }));
  };

  const handleRatingFilter = (rating: string) => {
    dispatch(setQueryParams({ rating: rating ? parseInt(rating) : undefined, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      await dispatch(deleteReview(reviewToDelete.id)).unwrap();
      toast({ title: 'Success', description: 'Review deleted successfully' });
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openDeleteDialog = (review: Review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (review: Review) => {
    navigate(`/reviews/${review.id}`);
  };

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

  const tableColumns = columns(openViewPage, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Reviews</h1>
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
    </div>
  );
}