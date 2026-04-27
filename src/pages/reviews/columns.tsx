import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, Eye, Edit } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { type Review } from '../../types/review.types';
import { formatDate } from '../../lib/utils';

export const columns = (
  onView: (review: Review) => void,
  onEdit: (review: Review) => void,
  onDelete: (review: Review) => void
): ColumnDef<Review>[] => [
    {
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.user?.avatar || undefined} />
            <AvatarFallback>{row.original.user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.user?.fullName || '-'}</div>
            <div className="text-sm text-muted-foreground">{row.original.user?.email || '-'}</div>
          </div>
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
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => {
        const rating = Number(row.original.rating);
        const validRating = isNaN(rating) ? 0 : rating;
        return (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{validRating.toFixed(1)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'comment',
      header: 'Comment',
      cell: ({ row }) => (
        <div className="max-w-md truncate">
          {row.original.comment || <span className="text-muted-foreground italic">No comment</span>}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const review = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(review)}>
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(review)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(review)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];