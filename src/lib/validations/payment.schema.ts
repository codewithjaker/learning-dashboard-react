import { z } from 'zod';

export const paymentSchema = z.object({
  invoiceId: z.number().positive('Invoice is required'),
  amount: z.number().positive('Amount must be positive'),
  paymentMethod: z.enum(['sslcommerz', 'stripe', 'paypal', 'cash', 'bank_transfer']),
  transactionId: z.string().optional(),
  gatewayResponse: z.string().optional(),
  receiptNumber: z.string().optional(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).default('completed'),
  paidAt: z.string().optional(),
  installmentNumber: z.number().int().positive().optional(),
  note: z.string().optional(),
});

export const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  paymentMethod: z.enum(['sslcommerz', 'stripe', 'paypal', 'cash', 'bank_transfer']).optional(),
  transactionId: z.string().optional(),
  gatewayResponse: z.string().optional(),
  receiptNumber: z.string().optional(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
  paidAt: z.string().nullable().optional(),
  installmentNumber: z.number().int().positive().nullable().optional(),
  note: z.string().nullable().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type UpdatePaymentFormValues = z.infer<typeof updatePaymentSchema>;