import { z } from 'zod';

export const invoiceItemSchema = z.object({
  courseName: z.string().min(1, 'Course name is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  unitPrice: z.number().positive('Unit price must be positive'),
  total: z.number().positive('Total must be positive'),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  userId: z.number().positive('User is required'),
  enrollmentId: z.number().nullable().optional(),
  couponId: z.number().nullable().optional(),
  subtotal: z.number().min(0, 'Subtotal must be non-negative'),
  discount: z.number().min(0, 'Discount must be non-negative').default(0),
  total: z.number().positive('Total must be positive'),
  status: z.enum(['pending', 'paid', 'refunded', 'cancelled']).default('pending'),
  issuedAt: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
});

export const updateInvoiceSchema = z.object({
  status: z.enum(['pending', 'paid', 'refunded', 'cancelled']).optional(),
  paidAt: z.string().nullable().optional(),
  items: z.array(invoiceItemSchema).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
export type UpdateInvoiceFormValues = z.infer<typeof updateInvoiceSchema>;