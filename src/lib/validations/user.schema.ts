import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Full name is required'),
  bio: z.string().optional(),
  avatar: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  role: z.enum(['student', 'instructor', 'admin']).default('student'),
  isActive: z.boolean().default(true),
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  fullName: z.string().min(1).optional(),
  bio: z.string().optional(),
  avatar: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  role: z.enum(['student', 'instructor', 'admin']).optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;