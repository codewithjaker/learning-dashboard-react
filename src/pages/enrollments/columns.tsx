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
import type{ Enrollment } from '../../types/enrollment.types';
import { formatDate } from '../../lib/utils';

export const columns = (
  onView: (enrollment: Enrollment) => void,
  onEdit: (enrollment: Enrollment) => void,
  onDelete: (enrollment: Enrollment) => void,
  onComplete?: (enrollment: Enrollment) => void
): ColumnDef<Enrollment>[] => [
  {
    accessorKey: 'user',
    header: 'Student',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.user?.fullName || '-'}</div>
        <div className="text-sm text-muted-foreground">{row.original.user?.email || '-'}</div>
      </div>
    ),
  },
  {
    accessorKey: 'course',
    header: 'Course',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.course?.title || '-'}</div>
        <div className="text-sm text-muted-foreground">{row.original.course?.slug || '-'}</div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variants = {
        active: 'success',
        completed: 'default',
        refunded: 'destructive',
      };
      return <Badge variant={variants[status] as any}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'enrolledAt',
    header: 'Enrolled',
    cell: ({ row }) => formatDate(row.original.enrolledAt),
  },
  {
    accessorKey: 'completedAt',
    header: 'Completed',
    cell: ({ row }) => row.original.completedAt ? formatDate(row.original.completedAt) : '-',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const enrollment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(enrollment)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(enrollment)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            {enrollment.status === 'active' && onComplete && (
              <DropdownMenuItem onClick={() => onComplete(enrollment)}>
                <CheckCircle className="mr-2 h-4 w-4" /> Mark Completed
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(enrollment)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];