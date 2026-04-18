import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {type RootState } from '../../store';
import { fetchCouponById, clearCurrentCoupon } from '../../store/slices/couponSlice';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function CouponDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCoupon, isLoading } = useSelector((state: RootState) => state.coupons);

  useEffect(() => {
    if (id) {
      dispatch(fetchCouponById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentCoupon());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentCoupon) {
    return <div className="text-center p-8">Coupon not found</div>;
  }

  const now = new Date();
  const validFrom = new Date(currentCoupon.validFrom);
  const validUntil = new Date(currentCoupon.validUntil);
  const isExpired = now > validUntil;
  const isNotYetValid = now < validFrom;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/coupons')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Coupons
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/coupons/edit/${currentCoupon.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Coupon Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Code</p>
              <p className="font-mono text-2xl font-bold">{currentCoupon.code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Discount</p>
              <p className="text-xl font-bold">
                {currentCoupon.type === 'percentage' 
                  ? `${currentCoupon.value}%` 
                  : formatCurrency(currentCoupon.value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex gap-2 mt-1">
                <Badge variant={currentCoupon.isActive ? 'success' : 'secondary'}>
                  {currentCoupon.isActive ? 'Active' : 'Inactive'}
                </Badge>
                {isExpired && <Badge variant="destructive">Expired</Badge>}
                {isNotYetValid && <Badge variant="warning">Not Yet Valid</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applicability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Course</p>
              <p className="font-medium">{currentCoupon.course?.title || 'All Courses'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valid Period</p>
              <p>{formatDate(currentCoupon.validFrom)} - {formatDate(currentCoupon.validUntil)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Times Used</p>
              <p className="text-2xl font-bold">{currentCoupon.usedCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Uses</p>
              <p>{currentCoupon.maxUses ? currentCoupon.maxUses : 'Unlimited'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining Uses</p>
              <p>{currentCoupon.maxUses ? currentCoupon.maxUses - currentCoupon.usedCount : 'Unlimited'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Coupon ID</p>
              <p>{currentCoupon.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p>{formatDate(currentCoupon.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p>{formatDate(currentCoupon.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}