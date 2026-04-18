import { z } from 'zod';

export const couponSchema = z.object({
  code: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(50, 'Code must be at most 50 characters')
    .regex(/^[A-Z0-9_-]+$/, 'Code can only contain uppercase letters, numbers, underscores, and hyphens'),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().positive('Value must be positive'),
  courseId: z.number().nullable().optional(),
  maxUses: z.number().int().positive().nullable().optional(),
  validFrom: z.string().min(1, 'Valid from date is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  isActive: z.boolean().default(true),
}).refine(data => new Date(data.validFrom) < new Date(data.validUntil), {
  message: 'Valid from must be before valid until',
  path: ['validFrom'],
}).refine(data => {
  if (data.type === 'percentage' && data.value > 100) {
    return false;
  }
  return true;
}, {
  message: 'Percentage value cannot exceed 100',
  path: ['value'],
});

export const updateCouponSchema = z.object({
  code: z.string().min(3).max(50).regex(/^[A-Z0-9_-]+$/).optional(),
  type: z.enum(['percentage', 'fixed']).optional(),
  value: z.number().positive().optional(),
  courseId: z.number().nullable().optional(),
  maxUses: z.number().int().positive().nullable().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  isActive: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type CouponFormValues = z.infer<typeof couponSchema>;
export type UpdateCouponFormValues = z.infer<typeof updateCouponSchema>;