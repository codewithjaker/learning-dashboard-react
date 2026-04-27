import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { RatingStars } from '../../components/ui/rating-stars';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const reviewSchema = z.object({
  userId: z.number().optional(),
  courseId: z.number().optional(),
  rating: z.number().min(0.5).max(5).multipleOf(0.5),
  comment: z.string().max(1000, 'Comment must be less than 1000 characters').optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { userId?: number; courseId?: number; rating: number; comment: string | null };
  onSubmit: (data: ReviewFormValues) => Promise<void>;
  isLoading?: boolean;
  title?: string;
  users?: Array<{ id: number; fullName: string; email: string }>;
  courses?: Array<{ id: number; title: string }>;
  requireUserCourse?: boolean; // if true, user and course selects are shown (admin mode)
}

export function ReviewFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isLoading = false,
  title = 'Write a Review',
  users = [],
  courses = [],
  requireUserCourse = false,
}: ReviewFormDialogProps) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      userId: initialData?.userId || undefined,
      courseId: initialData?.courseId || undefined,
      rating: initialData?.rating || 5,
      comment: initialData?.comment || '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        userId: initialData?.userId || undefined,
        courseId: initialData?.courseId || undefined,
        rating: initialData?.rating || 5,
        comment: initialData?.comment || '',
      });
    }
  }, [open, initialData, form]);

  const handleSubmit = async (data: ReviewFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {requireUserCourse && (
              <>
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >User</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                              {user.fullName} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RatingStars value={field.value} onChange={field.onChange} allowHalf />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts about this course..."
                      rows={4}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Review'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}