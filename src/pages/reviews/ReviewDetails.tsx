import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Trash2, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {type RootState } from '../../store';
import { fetchReviewById, clearCurrentReview } from '../../store/slices/reviewSlice';
import { formatDate } from '../../lib/utils';

export default function ReviewDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentReview, isLoading } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentReview());
    };
  }, [dispatch, id]);

  const handleDelete = () => {
    // Will be implemented in parent or via modal; for simplicity, we can dispatch delete and navigate back
    // But we'll leave it to the list page via props; here we can just show a button that calls a callback.
    // For now, we'll navigate back after deletion (to be handled by parent via location state).
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentReview) {
    return <div className="text-center p-8">Review not found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/reviews')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reviews
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Review Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <div className="flex items-center gap-1 text-2xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(currentReview.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : i < currentReview.rating
                        ? 'fill-yellow-500 text-yellow-500 opacity-50'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xl font-bold">{currentReview.rating.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Comment</p>
              <p className="whitespace-pre-wrap">{currentReview.comment || 'No comment provided'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p>{formatDate(currentReview.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p>{formatDate(currentReview.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User & Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">User</p>
              <div className="flex items-center gap-3 mt-1">
                <Avatar>
                  <AvatarImage src={currentReview.user?.avatar || undefined} />
                  <AvatarFallback>{currentReview.user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentReview.user?.fullName}</p>
                  <p className="text-sm text-muted-foreground">{currentReview.user?.email}</p>
                  <p className="text-xs text-muted-foreground">User ID: {currentReview.userId}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Course</p>
              <div className="mt-1">
                <p className="font-medium">{currentReview.course?.title}</p>
                <p className="text-sm text-muted-foreground">Slug: {currentReview.course?.slug}</p>
                <p className="text-xs text-muted-foreground">Course ID: {currentReview.courseId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}