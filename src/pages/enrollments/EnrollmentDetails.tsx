import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { type RootState } from '../../store';
import { fetchEnrollmentById, clearCurrentEnrollment } from '../../store/slices/enrollmentSlice';
import { formatDate } from '../../lib/utils';

export default function EnrollmentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEnrollment, isLoading } = useSelector((state: RootState) => state.enrollments);

  useEffect(() => {
    if (id) {
      dispatch(fetchEnrollmentById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentEnrollment());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentEnrollment) {
    return <div className="text-center p-8">Enrollment not found</div>;
  }

  const statusVariants = {
    active: 'success',
    completed: 'default',
    refunded: 'destructive',
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/enrollments')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Enrollments
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/enrollments/edit/${currentEnrollment.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          {currentEnrollment.status === 'active' && (
            <Button variant="default">
              <CheckCircle className="mr-2 h-4 w-4" /> Mark Completed
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{currentEnrollment.user?.fullName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{currentEnrollment.user?.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p>{currentEnrollment.userId}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Title</p>
              <p className="font-medium">{currentEnrollment.course?.title || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Slug</p>
              <p>{currentEnrollment.course?.slug || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Course ID</p>
              <p>{currentEnrollment.courseId}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrollment Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[currentEnrollment.status] as any}>
                {currentEnrollment.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrolled At</p>
              <p>{formatDate(currentEnrollment.enrolledAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed At</p>
              <p>{currentEnrollment.completedAt ? formatDate(currentEnrollment.completedAt) : 'Not completed'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Enrollment ID</p>
              <p>{currentEnrollment.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p>{formatDate(currentEnrollment.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p>{formatDate(currentEnrollment.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}