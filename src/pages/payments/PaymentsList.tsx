import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { PaymentFormDialog } from './PaymentFormDialog';
import {type  RootState } from '../../store';
import {
  fetchPayments,
  setQueryParams,
  createPayment,
  updatePayment,
  deletePayment,
  completePayment,
} from '../../store/slices/paymentSlice';
import { fetchInvoices } from '../../store/slices/invoiceSlice';
import type { CreatePaymentRequest, UpdatePaymentRequest } from '../../types/payment.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function PaymentsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { payments, total, isLoading, queryParams } = useSelector((state: RootState) => state.payments);
  const { invoices } = useSelector((state: RootState) => state.invoices);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<any>(null);

  const loadPayments = useCallback(() => {
    dispatch(fetchPayments(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadPayments();
    dispatch(fetchInvoices({ page: 1, limit: 100 }));
  }, [dispatch, loadPayments]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setQueryParams({ status: status || undefined, page: 1 }));
  };

  const handleMethodFilter = (method: string) => {
    dispatch(setQueryParams({ paymentMethod: method || undefined, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleCreate = async (data: CreatePaymentRequest) => {
    try {
      await dispatch(createPayment(data)).unwrap();
    //   toast({ title: 'Success', description: 'Payment recorded successfully' });
      setFormOpen(false);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: UpdatePaymentRequest) => {
    if (!selectedPayment) return;
    try {
      await dispatch(updatePayment({ id: selectedPayment.id, data })).unwrap();
    //   toast({ title: 'Success', description: 'Payment updated successfully' });
      setFormOpen(false);
      setSelectedPayment(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!paymentToDelete) return;
    try {
      await dispatch(deletePayment(paymentToDelete.id)).unwrap();
    //   toast({ title: 'Success', description: 'Payment deleted successfully' });
      setDeleteDialogOpen(false);
      setPaymentToDelete(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleComplete = async (payment: any) => {
    try {
      await dispatch(completePayment({ id: payment.id })).unwrap();
    //   toast({ title: 'Success', description: 'Payment marked as completed' });
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openCreateDialog = () => {
    setSelectedPayment(null);
    setFormOpen(true);
  };

  const openEditDialog = (payment: any) => {
    setSelectedPayment(payment);
    setFormOpen(true);
  };

  const openDeleteDialog = (payment: any) => {
    setPaymentToDelete(payment);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (payment: any) => {
    navigate(`/payments/${payment.id}`);
  };

  const invoiceOptions = invoices.map(inv => ({
    id: inv.id,
    invoiceNumber: inv.invoiceNumber,
    total: inv.total,
    user: inv.user,
  }));

  const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog, handleComplete);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </div>

      <DataTable
        columns={tableColumns}
        data={payments}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSort={handleSort}
        filters={[
          {
            id: 'status',
            label: 'Status',
            options: [
              { label: 'All', value: '' },
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
              { label: 'Failed', value: 'failed' },
              { label: 'Refunded', value: 'refunded' },
            ],
            value: queryParams.status || '',
            onChange: handleStatusFilter,
          },
          {
            id: 'paymentMethod',
            label: 'Method',
            options: [
              { label: 'All', value: '' },
              { label: 'SSLCommerz', value: 'sslcommerz' },
              { label: 'Stripe', value: 'stripe' },
              { label: 'PayPal', value: 'paypal' },
              { label: 'Cash', value: 'cash' },
              { label: 'Bank Transfer', value: 'bank_transfer' },
            ],
            value: queryParams.paymentMethod || '',
            onChange: handleMethodFilter,
          },
        ]}
        isLoading={isLoading}
      />

      <PaymentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        payment={selectedPayment}
        onSubmit={selectedPayment ? handleUpdate : handleCreate}
        isLoading={isLoading}
        invoices={invoiceOptions}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Payment"
        description={`Are you sure you want to delete this payment record? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}