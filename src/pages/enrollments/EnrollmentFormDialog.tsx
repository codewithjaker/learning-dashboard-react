import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { enrollmentSchema,type EnrollmentFormValues } from '../../lib/validations/enrollment.schema';
import {type Enrollment } from '../../types/enrollment.types';

interface EnrollmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollment?: Enrollment | null;
  onSubmit: (data: EnrollmentFormValues) => Promise<void>;
  isLoading: boolean;
  users: Array<{ id: number; fullName: string; email: string }>;
  courses: Array<{ id: number; title: string }>;
}

export function EnrollmentFormDialog({
  open,
  onOpenChange,
  enrollment,
  onSubmit,
  isLoading,
  users,
  courses,
}: EnrollmentFormDialogProps) {
  const isEditing = !!enrollment;
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: isEditing
      ? {
          userId: enrollment.userId,
          courseId: enrollment.courseId,
          status: enrollment.status,
        }
      : {
          userId: users[0]?.id || 0,
          courseId: courses[0]?.id || 0,
          status: 'active',
        },
  });

  useEffect(() => {
    if (open) {
      if (isEditing) {
        form.reset({
          userId: enrollment.userId,
          courseId: enrollment.courseId,
          status: enrollment.status,
        });
      } else {
        form.reset({
          userId: users[0]?.id || 0,
          courseId: courses[0]?.id || 0,
          status: 'active',
        });
      }
    }
  }, [open, enrollment, form, isEditing, users, courses]);

  const handleSubmit = async (data: EnrollmentFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Enrollment' : 'Create New Enrollment'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student *</FormLabel>
                  <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
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
                  <FormLabel>Course *</FormLabel>
                  <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}