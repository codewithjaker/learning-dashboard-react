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
import {type Coupon } from '../../types/coupon.types';
import { formatDate, formatCurrency } from '../../lib/utils';

export const columns = (
  onView: (coupon: Coupon) => void,
  onEdit: (coupon: Coupon) => void,
  onDelete: (coupon: Coupon) => void
): ColumnDef<Coupon>[] => [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => (
      <div className="font-mono font-medium">{row.original.code}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return type === 'percentage' ? 'Percentage' : 'Fixed Amount';
    },
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      const coupon = row.original;
      return coupon.type === 'percentage' 
        ? `${coupon.value}%` 
        : formatCurrency(coupon.value);
    },
  },
  {
    accessorKey: 'course',
    header: 'Course',
    cell: ({ row }) => row.original.course?.title || 'All Courses',
  },
  {
    accessorKey: 'usage',
    header: 'Usage',
    cell: ({ row }) => {
      const coupon = row.original;
      const max = coupon.maxUses ? ` / ${coupon.maxUses}` : '';
      return `${coupon.usedCount}${max}`;
    },
  },
  {
    accessorKey: 'validity',
    header: 'Validity',
    cell: ({ row }) => {
      const coupon = row.original;
      const now = new Date();
      const validFrom = new Date(coupon.validFrom);
      const validUntil = new Date(coupon.validUntil);
      const isExpired = now > validUntil;
      const isNotYetValid = now < validFrom;
      return (
        <div className="text-sm">
          <div>{formatDate(coupon.validFrom)} - {formatDate(coupon.validUntil)}</div>
          {isExpired && <Badge variant="destructive" className="mt-1">Expired</Badge>}
          {isNotYetValid && <Badge variant="warning" className="mt-1">Not Yet Valid</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(coupon)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(coupon)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(coupon)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];