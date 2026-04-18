import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { type Payment } from '../../types/payment.types';
import { formatDate, formatCurrency } from '../../lib/utils';

export const columns = (
  onView: (payment: Payment) => void,
  onEdit: (payment: Payment) => void,
  onDelete: (payment: Payment) => void,
  onComplete?: (payment: Payment) => void
): ColumnDef<Payment>[] => [
  {
    accessorKey: 'invoice',
    header: 'Invoice',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.invoice?.invoiceNumber || '-'}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.invoice?.user?.fullName || '-'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Method',
    cell: ({ row }) => {
      const methods: Record<string, string> = {
        sslcommerz: 'SSLCommerz',
        stripe: 'Stripe',
        paypal: 'PayPal',
        cash: 'Cash',
        bank_transfer: 'Bank Transfer',
      };
      return methods[row.original.paymentMethod] || row.original.paymentMethod;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variants = {
        pending: 'warning',
        completed: 'success',
        failed: 'destructive',
        refunded: 'secondary',
      };
      return <Badge variant={variants[status] as any}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'paidAt',
    header: 'Paid Date',
    cell: ({ row }) => row.original.paidAt ? formatDate(row.original.paidAt) : '-',
  },
  {
    accessorKey: 'installmentNumber',
    header: 'Installment',
    cell: ({ row }) => row.original.installmentNumber || '-',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(payment)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(payment)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            {payment.status === 'pending' && onComplete && (
              <DropdownMenuItem onClick={() => onComplete(payment)}>
                <CheckCircle className="mr-2 h-4 w-4" /> Mark Completed
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(payment)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];