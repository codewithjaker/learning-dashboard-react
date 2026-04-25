
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { type RootState } from '../../store';
import {
  fetchReviews,
  setQueryParams,
  deleteReview,
} from '../../store/slices/reviewSlice';
import { fetchCourses } from '../../store/slices/courseSlice';
import { type Review } from '../../types/review.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function ReviewsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { reviews, total, isLoading, queryParams } = useSelector((state: RootState) => state.reviews);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  console.log('ReviewsList render - reviews:', reviews);

  const loadReviews = useCallback(() => {
    dispatch(fetchReviews(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadReviews();
    dispatch(fetchCourses({ page: 1, limit: 100 }));
  }, [dispatch, loadReviews]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleCourseFilter = (courseId: string) => {
    dispatch(setQueryParams({ courseId: courseId ? parseInt(courseId) : undefined, page: 1 }));
  };

  const handleRatingFilter = (rating: string) => {
    dispatch(setQueryParams({ rating: rating ? parseInt(rating) : undefined, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      await dispatch(deleteReview(reviewToDelete.id)).unwrap();
      toast({ title: 'Success', description: 'Review deleted successfully' });
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openDeleteDialog = (review: Review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (review: Review) => {
    navigate(`/reviews/${review.id}`);
  };

  const courseOptions = [
    { label: 'All Courses', value: '' },
    ...courses.map(c => ({ label: c.title, value: c.id.toString() })),
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: '' },
    { label: '5 Stars', value: '5' },
    { label: '4 Stars', value: '4' },
    { label: '3 Stars', value: '3' },
    { label: '2 Stars', value: '2' },
    { label: '1 Star', value: '1' },
  ];

  const tableColumns = columns(openViewPage, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Reviews</h1>
      </div>

      <DataTable
        columns={tableColumns}
        data={reviews}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSort={handleSort}
        filters={[
          {
            id: 'courseId',
            label: 'Course',
            options: courseOptions,
            value: queryParams.courseId?.toString() || '',
            onChange: handleCourseFilter,
          },
          {
            id: 'rating',
            label: 'Rating',
            options: ratingOptions,
            value: queryParams.rating?.toString() || '',
            onChange: handleRatingFilter,
          },
        ]}
        isLoading={isLoading}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Review"
        description={`Are you sure you want to delete the review from "${reviewToDelete?.user?.fullName}" for course "${reviewToDelete?.course?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}



 

// import { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../../components/ui/table';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../../components/ui/select';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../../components/ui/dropdown-menu';
// import { Badge } from '../../components/ui/badge';
// import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '../../components/ui/pagination';
// import { MoreHorizontal, Eye, Trash2, Star, Search } from 'lucide-react';
// import { type RootState } from '../../store';
// import { fetchReviews, setQueryParams, deleteReview } from '../../store/slices/reviewSlice';
// import { fetchCourses } from '../../store/slices/courseSlice';
// import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
// import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
// import { useToast } from '../../components/ui/use-toast';
// import { formatDate } from '../../lib/utils';

// export default function ReviewsList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { reviews, total, isLoading, queryParams } = useSelector((state: RootState) => state.reviews);
//   const { courses } = useSelector((state: RootState) => state.courses);

//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [reviewToDelete, setReviewToDelete] = useState<any>(null);
//   const [searchInput, setSearchInput] = useState(queryParams.search || '');

//   const loadReviews = useCallback(() => {
//     dispatch(fetchReviews(queryParams));
//   }, [dispatch, queryParams]);

//   useEffect(() => {
//     loadReviews();
//     dispatch(fetchCourses({ page: 1, limit: 100 }));
//   }, [dispatch, loadReviews]);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchInput !== queryParams.search) {
//         dispatch(setQueryParams({ search: searchInput, page: 1 }));
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchInput, dispatch, queryParams.search]);

//   const handlePageChange = (page: number) => {
//     dispatch(setQueryParams({ page }));
//   };

//   const handleLimitChange = (limit: number) => {
//     dispatch(setQueryParams({ limit, page: 1 }));
//   };

//   const handleCourseFilter = (courseId: string) => {
//     dispatch(setQueryParams({ courseId: courseId === 'all' ? undefined : parseInt(courseId), page: 1 }));
//   };

//   const handleRatingFilter = (rating: string) => {
//     dispatch(setQueryParams({ rating: rating === 'all' ? undefined : parseInt(rating), page: 1 }));
//   };

//   const handleSort = (field: string) => {
//     const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
//     dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
//   };

//   const openDeleteDialog = (review: any) => {
//     setReviewToDelete(review);
//     setDeleteDialogOpen(true);
//   };

//   const handleDelete = async () => {
//     if (!reviewToDelete) return;
//     try {
//       await dispatch(deleteReview(reviewToDelete.id)).unwrap();
//       // toast({ title: 'Success', description: 'Review deleted successfully' });
//       setDeleteDialogOpen(false);
//       setReviewToDelete(null);
//     } catch (error: any) {
//       // toast({ title: 'Error', description: error, variant: 'destructive' });
//     }
//   };

//   const totalPages = Math.ceil(total / (queryParams.limit || 10));
//   const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
//   const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

//   // Rating stars component
//   const RatingStars = ({ rating }: { rating: number }) => {
//     return (
//       <div className="flex items-center gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`h-3 w-3 ${
//               star <= rating
//                 ? 'fill-yellow-500 text-yellow-500'
//                 : star - 0.5 <= rating
//                 ? 'fill-yellow-500 text-yellow-500 opacity-50'
//                 : 'text-muted-foreground'
//             }`}
//           />
//         ))}
//         <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Course Reviews</h1>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Reviews</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Filters */}
// <div className="flex flex-wrap gap-4 mb-6">
//   <div className="relative flex-1 min-w-[200px]">
//     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//     <Input
//       placeholder="Search by user or course..."
//       value={searchInput}
//       onChange={(e) => setSearchInput(e.target.value)}
//       className="pl-9"
//     />
//   </div>
//   <Select
//     value={queryParams.courseId?.toString() || 'all'}
//     onValueChange={handleCourseFilter}
//   >
//     <SelectTrigger className="w-[180px]">
//       <SelectValue placeholder="Course" />
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="all">All Courses</SelectItem>
//       {courses.map((course) => (
//         <SelectItem key={course.id} value={course.id.toString()}>
//           {course.title}
//         </SelectItem>
//       ))}
//     </SelectContent>
//   </Select>
//   <Select
//     value={queryParams.rating?.toString() || 'all'}
//     onValueChange={handleRatingFilter}
//   >
//     <SelectTrigger className="w-[130px]">
//       <SelectValue placeholder="Rating" />
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="all">All Ratings</SelectItem>
//       <SelectItem value="5">5 Stars</SelectItem>
//       <SelectItem value="4">4+ Stars</SelectItem>
//       <SelectItem value="3">3+ Stars</SelectItem>
//       <SelectItem value="2">2+ Stars</SelectItem>
//       <SelectItem value="1">1+ Stars</SelectItem>
//     </SelectContent>
//   </Select>
//   <Select
//     value={String(queryParams.limit || 10)}
//     onValueChange={(v) => handleLimitChange(Number(v))}
//   >
//     <SelectTrigger className="w-[100px]">
//       <SelectValue />
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="10">10 / page</SelectItem>
//       <SelectItem value="20">20 / page</SelectItem>
//       <SelectItem value="50">50 / page</SelectItem>
//       <SelectItem value="100">100 / page</SelectItem>
//     </SelectContent>
//   </Select>
// </div>

// {/* Table */ }
// <div className="rounded-md border">
//   <Table>
//     <TableHeader>
//       <TableRow>
//         <TableHead>User</TableHead>
//         <TableHead>Course</TableHead>
//         <TableHead className="cursor-pointer" onClick={() => handleSort('rating')}>
//           Rating {queryParams.sortBy === 'rating' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
//         </TableHead>
//         <TableHead>Comment</TableHead>
//         <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
//           Date {queryParams.sortBy === 'createdAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
//         </TableHead>
//         <TableHead className="w-[80px]">Actions</TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       {isLoading ? (
//         <TableRow>
//           <TableCell colSpan={6} className="text-center py-8">
//             Loading...
//           </TableCell>
//         </TableRow>
//       ) : reviews.length === 0 ? (
//         <TableRow>
//           <TableCell colSpan={6} className="text-center py-8">
//             No reviews found
//           </TableCell>
//         </TableRow>
//       ) : (
//         reviews.map((review) => (
//           <TableRow key={review.id}>
//             <TableCell>
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={review.user?.avatar || undefined} />
//                   <AvatarFallback>
//                     {review.user?.fullName?.charAt(0) || 'U'}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <div className="font-medium">{review.user?.fullName || `User ${review.userId}`}</div>
//                   <div className="text-sm text-muted-foreground">{review.user?.email}</div>
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell>
//               <div>
//                 <div>{review.course?.title || `Course ${review.courseId}`}</div>
//                 <div className="text-sm text-muted-foreground">{review.course?.slug}</div>
//               </div>
//             </TableCell>
//             <TableCell>
//               <RatingStars rating={review.rating} />
//             </TableCell>
//             <TableCell>
//               <div className="max-w-md truncate">
//                 {review.comment || <span className="text-muted-foreground italic">No comment</span>}
//               </div>
//             </TableCell>
//             <TableCell>{formatDate(review.createdAt)}</TableCell>
//             <TableCell>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="h-8 w-8 p-0">
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                   <DropdownMenuItem onClick={() => navigate(`/reviews/${review.id}`)}>
//                     <Eye className="mr-2 h-4 w-4" /> View
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={() => openDeleteDialog(review)} className="text-red-600">
//                     <Trash2 className="mr-2 h-4 w-4" /> Delete
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </TableCell>
//           </TableRow>
//         ))
//       )}
//     </TableBody>
//   </Table>
// </div>

// {/* Pagination */ }
// {
//   totalPages > 1 && (
//     <div className="flex items-center justify-between mt-4">
//       <div className="text-sm text-muted-foreground">
//         Showing {startItem} to {endItem} of {total} results
//       </div>
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious
//               onClick={() => handlePageChange((queryParams.page || 1) - 1)}
//               className={queryParams.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
//             />
//           </PaginationItem>
//           {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//             let pageNum: number;
//             const currentPage = queryParams.page || 1;
//             if (totalPages <= 5) {
//               pageNum = i + 1;
//             } else if (currentPage <= 3) {
//               pageNum = i + 1;
//             } else if (currentPage >= totalPages - 2) {
//               pageNum = totalPages - 4 + i;
//             } else {
//               pageNum = currentPage - 2 + i;
//             }
//             return (
//               <PaginationItem key={pageNum}>
//                 <PaginationLink
//                   isActive={pageNum === currentPage}
//                   onClick={() => handlePageChange(pageNum)}
//                 >
//                   {pageNum}
//                 </PaginationLink>
//               </PaginationItem>
//             );
//           })}
//           <PaginationItem>
//             <PaginationNext
//               onClick={() => handlePageChange((queryParams.page || 1) + 1)}
//               className={queryParams.page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   )
// }
//         </CardContent >
//       </Card >

//   <ConfirmationDialog
//     open={deleteDialogOpen}
//     onOpenChange={setDeleteDialogOpen}
//     title="Delete Review"
//     description={`Are you sure you want to delete the review from "${reviewToDelete?.user?.fullName}" for course "${reviewToDelete?.course?.title}"? This action cannot be undone.`}
//     onConfirm={handleDelete}
//     confirmText="Delete"
//     cancelText="Cancel"
//     variant="destructive"
//   />
//     </div >
//   );
// }

