import { z } from 'zod';

export const payoutSchema = z.object({
  instructorId: z.number().positive('Instructor is required'),
  amount: z.number().positive('Amount must be positive'),
  periodStart: z.string().min(1, 'Period start is required'),
  periodEnd: z.string().min(1, 'Period end is required'),
  paymentMethod: z.string().optional(),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(['pending', 'paid', 'failed']).default('pending'),
  paidAt: z.string().optional(),
}).refine(data => new Date(data.periodStart) < new Date(data.periodEnd), {
  message: 'Period start must be before period end',
  path: ['periodStart'],
});

export const updatePayoutSchema = z.object({
  amount: z.number().positive().optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(['pending', 'paid', 'failed']).optional(),
  paidAt: z.string().nullable().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type PayoutFormValues = z.infer<typeof payoutSchema>;
export type UpdatePayoutFormValues = z.infer<typeof updatePayoutSchema>;