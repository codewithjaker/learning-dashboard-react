// import {type ColumnDef } from '@tanstack/react-table';
// import { MoreHorizontal, Edit, Trash2, Eye, Copy, Upload } from 'lucide-react';
// import { Button } from '../../components/ui/button';
// import { Badge } from '../../components/ui/badge';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../../components/ui/dropdown-menu';
// import {type Course } from '../../types/course.types';
// import { formatDate } from '../../lib/utils';

// export const columns = (
//   onView: (course: Course) => void,
//   onEdit: (course: Course) => void,
//   onDelete: (course: Course) => void,
//   onPublish?: (course: Course) => void
// ): ColumnDef<Course>[] => [
//   {
//     accessorKey: 'title',
//     header: 'Title',
//     cell: ({ row }) => (
//       <div>
//         <div className="font-medium">{row.original.title}</div>
//         <div className="text-sm text-muted-foreground">{row.original.slug}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: 'category',
//     header: 'Category',
//   },
//   {
//     accessorKey: 'level',
//     header: 'Level',
//     cell: ({ row }) => {
//       const level = row.original.level;
//       const labels = {
//         beginner: 'Beginner',
//         intermediate: 'Intermediate',
//         advanced: 'Advanced',
//         'all-levels': 'All Levels',
//       };
//       return <span className="capitalize">{labels[level]}</span>;
//     },
//   },
//   {
//     accessorKey: 'price',
//     header: 'Price',
//     cell: ({ row }) => {
//       const price = row.original.price;
//       const original = row.original.originalPrice;
//       return (
//         <div>
//           <span className="font-medium">${price}</span>
//           {original && original > price && (
//             <span className="ml-2 text-sm text-muted-foreground line-through">
//               ${original}
//             </span>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => {
//       const status = row.original.status;
//       const variants = {
//         draft: 'secondary',
//         published: 'success',
//         archived: 'outline',
//       };
//       return (
//         <Badge variant={variants[status] as any}>
//           {status}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: 'createdAt',
//     header: 'Created',
//     cell: ({ row }) => formatDate(row.original.createdAt),
//   },
//   {
//     id: 'actions',
//     cell: ({ row }) => {
//       const course = row.original;
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem onClick={() => onView(course)}>
//               <Eye className="mr-2 h-4 w-4" /> View
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onEdit(course)}>
//               <Edit className="mr-2 h-4 w-4" /> Edit
//             </DropdownMenuItem>
//             {course.status === 'draft' && onPublish && (
//               <DropdownMenuItem onClick={() => onPublish(course)}>
//                 <Upload className="mr-2 h-4 w-4" /> Publish
//               </DropdownMenuItem>
//             )}
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={() => onDelete(course)} className="text-red-600">
//               <Trash2 className="mr-2 h-4 w-4" /> Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye, Upload } from 'lucide-react';
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
import { type Course } from '../../types/course.types';
import { formatDate } from '../../lib/utils';

export const columns = (
  onView: (course: Course) => void,
  onEdit: (course: Course) => void,
  onDelete: (course: Course) => void,
  onPublish?: (course: Course) => void
): ColumnDef<Course>[] => [
  // ✅ Title
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.original.title ?? 'Untitled';
      const slug = row.original.slug ?? '';

      return (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">{slug}</div>
        </div>
      );
    },
  },

  // ✅ Category
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category || 'N/A',
  },

  // ✅ Level
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => {
      const level = row.original.level || 'beginner';

      const labels: Record<string, string> = {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        'all-levels': 'All Levels',
      };

      return <span>{labels[level] || 'N/A'}</span>;
    },
  },

  // ✅ Price
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = row.original.price ?? 0;
      const original = row.original.originalPrice;

      return (
        <div>
          <span className="font-medium">${price}</span>
          {original && original > price && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              ${original}
            </span>
          )}
        </div>
      );
    },
  },

  // ✅ Status
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status || 'draft';

      const variants: Record<string, any> = {
        draft: 'secondary',
        published: 'success',
        archived: 'outline',
      };

      return (
        <Badge variant={variants[status] || 'secondary'}>
          {status}
        </Badge>
      );
    },
  },

  // ✅ Created Date
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) =>
      row.original.createdAt
        ? formatDate(row.original.createdAt)
        : 'N/A',
  },

  // ✅ Actions
  {
    id: 'actions',
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onView(course)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit(course)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>

            {course.status === 'draft' && onPublish && (
              <DropdownMenuItem onClick={() => onPublish(course)}>
                <Upload className="mr-2 h-4 w-4" /> Publish
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => onDelete(course)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];