// import { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// import { Button } from '../../components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
// import { Badge } from '../../components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
// import { type RootState } from '../../store';
// import { fetchInvoiceById, clearCurrentInvoice } from '../../store/slices/invoiceSlice';
// import { formatDate, formatCurrency } from '../../lib/utils';

// export default function InvoiceDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentInvoice, isLoading } = useSelector((state: RootState) => state.invoices);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchInvoiceById(parseInt(id)));
//     }
//     return () => {
//       dispatch(clearCurrentInvoice());
//     };
//   }, [dispatch, id]);

//   if (isLoading) {
//     return <div className="flex justify-center p-8">Loading...</div>;
//   }

//   if (!currentInvoice) {
//     return <div className="text-center p-8">Invoice not found</div>;
//   }

//   const statusVariants = {
//     pending: 'warning',
//     paid: 'success',
//     refunded: 'secondary',
//     cancelled: 'destructive',
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <Button variant="ghost" onClick={() => navigate('/invoices')}>
//           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invoices
//         </Button>
//         <div className="space-x-2">
//           <Button variant="outline" onClick={() => navigate(`/invoices/edit/${currentInvoice.id}`)}>
//             <Edit className="mr-2 h-4 w-4" /> Edit
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Invoice Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div>
//               <p className="text-sm text-muted-foreground">Invoice Number</p>
//               <p className="font-medium">{currentInvoice.invoiceNumber}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Status</p>
//               <Badge variant={statusVariants[currentInvoice.status] as any}>
//                 {currentInvoice.status}
//               </Badge>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Issued At</p>
//               <p>{formatDate(currentInvoice.issuedAt)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Paid At</p>
//               <p>{currentInvoice.paidAt ? formatDate(currentInvoice.paidAt) : 'Not paid'}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Customer Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div>
//               <p className="text-sm text-muted-foreground">Name</p>
//               <p className="font-medium">{currentInvoice.user?.fullName || '-'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Email</p>
//               <p>{currentInvoice.user?.email || '-'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">User ID</p>
//               <p>{currentInvoice.userId}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="col-span-2">
//           <CardHeader>
//             <CardTitle>Invoice Items</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Course Name</TableHead>
//                   <TableHead className="text-right">Quantity</TableHead>
//                   <TableHead className="text-right">Unit Price</TableHead>
//                   <TableHead className="text-right">Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentInvoice.items?.map((item, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{item.courseName}</TableCell>
//                     <TableCell className="text-right">{item.quantity}</TableCell>
//                     <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
//                     <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <div className="mt-4 space-y-1 text-right">
//               <div className="flex justify-end gap-4">
//                 <span className="font-medium">Subtotal:</span>
//                 <span>{formatCurrency(currentInvoice.subtotal)}</span>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <span className="font-medium">Discount:</span>
//                 <span>{formatCurrency(currentInvoice.discount)}</span>
//               </div>
//               <div className="flex justify-end gap-4 text-lg font-bold">
//                 <span>Total:</span>
//                 <span>{formatCurrency(currentInvoice.total)}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// src/pages/invoices/InvoiceDetails.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { type RootState } from '../../store';
import { fetchInvoiceById, clearCurrentInvoice } from '../../store/slices/invoiceSlice';
import { fetchPayments } from '../../store/slices/paymentSlice';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function InvoiceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentInvoice, isLoading } = useSelector((state: RootState) => state.invoices);
  const { payments } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    if (id) {
      dispatch(fetchInvoiceById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentInvoice());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentInvoice?.id) {
      dispatch(fetchPayments({ invoiceId: currentInvoice.id, limit: 50 }));
    }
  }, [dispatch, currentInvoice]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentInvoice) {
    return <div className="text-center p-8">Invoice not found</div>;
  }

  const statusVariants = {
    pending: 'warning',
    paid: 'success',
    refunded: 'secondary',
    cancelled: 'destructive',
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/invoices')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invoices
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/invoices/edit/${currentInvoice.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Invoice Number</p>
              <p className="font-medium">{currentInvoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[currentInvoice.status] as any}>
                {currentInvoice.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issued At</p>
              <p>{formatDate(currentInvoice.issuedAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid At</p>
              <p>{currentInvoice.paidAt ? formatDate(currentInvoice.paidAt) : 'Not paid'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{currentInvoice.user?.fullName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{currentInvoice.user?.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p>{currentInvoice.userId}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentInvoice.items?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.courseName}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-1 text-right">
              <div className="flex justify-end gap-4">
                <span className="font-medium">Subtotal:</span>
                <span>{formatCurrency(currentInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-end gap-4">
                <span className="font-medium">Discount:</span>
                <span>{formatCurrency(currentInvoice.discount)}</span>
              </div>
              <div className="flex justify-end gap-4 text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(currentInvoice.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History Card */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt #</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.paidAt || payment.createdAt)}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === 'completed' ? 'success' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.receiptNumber || '-'}</TableCell>
                  </TableRow>
                ))}
                {payments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No payments recorded
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <Button
                variant="outline"
                onClick={() => navigate(`/payments/new?invoiceId=${currentInvoice.id}`)}
              >
                <Plus className="mr-2 h-4 w-4" /> Record Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}