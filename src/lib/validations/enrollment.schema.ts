import { z } from 'zod';

export const enrollmentSchema = z.object({
  userId: z.number().positive('User is required'),
  courseId: z.number().positive('Course is required'),
  status: z.enum(['active', 'completed', 'refunded']).default('active'),
});

export const updateEnrollmentSchema = z.object({
  status: z.enum(['active', 'completed', 'refunded']).optional(),
  completedAt: z.string().nullable().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;
export type UpdateEnrollmentFormValues = z.infer<typeof updateEnrollmentSchema>;