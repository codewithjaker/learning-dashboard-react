import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  fullDescription: z.string().optional(),
  image: z.string().url('Must be a valid URL'),
  previewVideoUrl: z.string().url().optional().or(z.literal('')),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all-levels']),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive().optional(),
  certification: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  language: z.string().optional(),
  courseProjects: z.array(z.string()).default([]),
  courseSoftware: z.array(z.string()).default([]),
  courseFeatures: z.array(z.string()).default([]),
  instructorId: z.number().positive('Instructor is required'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const createCourseSchema = courseSchema;
export const updateCourseSchema = courseSchema.partial().refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type CourseFormValues = z.infer<typeof courseSchema>;