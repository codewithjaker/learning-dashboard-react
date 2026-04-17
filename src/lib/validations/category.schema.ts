import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  icon: z.string().optional(),
  parentId: z.number().nullable().optional(),
});

export const createCategorySchema = categorySchema;

export const updateCategorySchema = categorySchema.partial().refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type CategoryFormValues = z.infer<typeof categorySchema>;