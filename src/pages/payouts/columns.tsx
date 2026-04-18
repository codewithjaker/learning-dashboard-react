import {type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
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
import {type Payout } from '../../types/payout.types';
import { formatDate, formatCurrency } from '../../lib/utils';

export const columns = (
  onView: (payout: Payout) => void,
  onEdit: (payout: Payout) => void,
  onDelete: (payout: Payout) => void
): ColumnDef<Payout>[] => [
  {
    accessorKey: 'instructor',
    header: 'Instructor',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.instructor?.fullName || '-'}</div>
        <div className="text-sm text-muted-foreground">{row.original.instructor?.email || '-'}</div>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: 'period',
    header: 'Period',
    cell: ({ row }) => (
      <div className="text-sm">
        {formatDate(row.original.periodStart)} - {formatDate(row.original.periodEnd)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variants = {
        pending: 'warning',
        paid: 'success',
        failed: 'destructive',
      };
      return <Badge variant={variants[status] as any}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Method',
    cell: ({ row }) => row.original.paymentMethod || '-',
  },
  {
    accessorKey: 'paidAt',
    header: 'Paid Date',
    cell: ({ row }) => row.original.paidAt ? formatDate(row.original.paidAt) : '-',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payout = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(payout)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(payout)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(payout)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];