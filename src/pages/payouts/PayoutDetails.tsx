import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { type RootState } from '../../store';
import { fetchPayoutById, clearCurrentPayout } from '../../store/slices/payoutSlice';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function PayoutDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPayout, isLoading } = useSelector((state: RootState) => state.payouts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPayoutById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentPayout());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentPayout) {
    return <div className="text-center p-8">Payout not found</div>;
  }

  const statusVariants = {
    pending: 'warning',
    paid: 'success',
    failed: 'destructive',
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/payouts')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payouts
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/payouts/edit/${currentPayout.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payout Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Payout ID</p>
              <p className="font-medium">{currentPayout.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(currentPayout.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[currentPayout.status] as any}>
                {currentPayout.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p>{currentPayout.paymentMethod || '-'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructor Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{currentPayout.instructor?.fullName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{currentPayout.instructor?.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Instructor ID</p>
              <p>{currentPayout.instructorId}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Period & Dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Period Start</p>
              <p>{formatDate(currentPayout.periodStart)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Period End</p>
              <p>{formatDate(currentPayout.periodEnd)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid At</p>
              <p>{currentPayout.paidAt ? formatDate(currentPayout.paidAt) : 'Not paid'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-sm">{currentPayout.transactionId || '-'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p>{formatDate(currentPayout.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p>{formatDate(currentPayout.updatedAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p>{currentPayout.notes || '-'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}