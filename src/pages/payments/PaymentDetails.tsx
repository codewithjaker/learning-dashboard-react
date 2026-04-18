import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {type RootState } from '../../store';
import { fetchPaymentById, clearCurrentPayment } from '../../store/slices/paymentSlice';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function PaymentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPayment, isLoading } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    if (id) {
      dispatch(fetchPaymentById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentPayment());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentPayment) {
    return <div className="text-center p-8">Payment not found</div>;
  }

  const statusVariants = {
    pending: 'warning',
    completed: 'success',
    failed: 'destructive',
    refunded: 'secondary',
  };

  const methodLabels: Record<string, string> = {
    sslcommerz: 'SSLCommerz',
    stripe: 'Stripe',
    paypal: 'PayPal',
    cash: 'Cash',
    bank_transfer: 'Bank Transfer',
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/payments')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payments
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/payments/edit/${currentPayment.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Payment ID</p>
              <p className="font-medium">{currentPayment.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(currentPayment.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Method</p>
              <p>{methodLabels[currentPayment.paymentMethod]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[currentPayment.status] as any}>
                {currentPayment.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice & Transaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Invoice</p>
              <p className="font-medium">
                {currentPayment.invoice?.invoiceNumber} - {currentPayment.invoice?.user?.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Invoice Total</p>
              <p>{formatCurrency(currentPayment.invoice?.total || 0)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-sm">{currentPayment.transactionId || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Receipt Number</p>
              <p>{currentPayment.receiptNumber || '-'}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Paid At</p>
                <p>{currentPayment.paidAt ? formatDate(currentPayment.paidAt) : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Installment Number</p>
                <p>{currentPayment.installmentNumber || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Gateway Response</p>
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  {currentPayment.gatewayResponse || '-'}
                </pre>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Note</p>
                <p>{currentPayment.note || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p>{formatDate(currentPayment.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Updated At</p>
                <p>{formatDate(currentPayment.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}