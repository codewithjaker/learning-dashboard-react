import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { X, Plus } from 'lucide-react';
import { invoiceSchema, type InvoiceFormValues } from '../../lib/validations/invoice.schema';
import {type Invoice } from '../../types/invoice.types';

interface InvoiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: Invoice | null;
  onSubmit: (data: InvoiceFormValues) => Promise<void>;
  isLoading: boolean;
  users: Array<{ id: number; fullName: string; email: string }>;
  enrollments?: Array<{ id: number; course?: { title: string } }>;
}

export function InvoiceFormDialog({
  open,
  onOpenChange,
  invoice,
  onSubmit,
  isLoading,
  users,
  enrollments = [],
}: InvoiceFormDialogProps) {
  const isEditing = !!invoice;
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: isEditing && invoice.items
      ? {
          invoiceNumber: invoice.invoiceNumber,
          userId: invoice.userId,
          enrollmentId: invoice.enrollmentId,
          couponId: invoice.couponId,
          subtotal: invoice.subtotal,
          discount: invoice.discount,
          total: invoice.total,
          status: invoice.status,
          issuedAt: invoice.issuedAt.split('T')[0],
          items: invoice.items.map(item => ({
            courseName: item.courseName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          })),
        }
      : {
          invoiceNumber: `INV-${Date.now()}`,
          userId: users[0]?.id || 0,
          enrollmentId: null,
          couponId: null,
          subtotal: 0,
          discount: 0,
          total: 0,
          status: 'pending',
          issuedAt: new Date().toISOString().split('T')[0],
          items: [{ courseName: '', quantity: 1, unitPrice: 0, total: 0 }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  // Auto-calculate subtotal and total when items change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith('items')) {
        const items = value.items || [];
        const subtotal = items.reduce((sum, item) => sum + (item.unitPrice || 0) * (item.quantity || 1), 0);
        const discount = value.discount || 0;
        const total = subtotal - discount;
        form.setValue('subtotal', subtotal);
        form.setValue('total', total);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (open) {
      if (isEditing && invoice) {
        form.reset({
          invoiceNumber: invoice.invoiceNumber,
          userId: invoice.userId,
          enrollmentId: invoice.enrollmentId,
          couponId: invoice.couponId,
          subtotal: invoice.subtotal,
          discount: invoice.discount,
          total: invoice.total,
          status: invoice.status,
          issuedAt: invoice.issuedAt.split('T')[0],
          items: invoice.items?.map(item => ({
            courseName: item.courseName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          })) || [{ courseName: '', quantity: 1, unitPrice: 0, total: 0 }],
        });
      } else {
        form.reset({
          invoiceNumber: `INV-${Date.now()}`,
          userId: users[0]?.id || 0,
          enrollmentId: null,
          couponId: null,
          subtotal: 0,
          discount: 0,
          total: 0,
          status: 'pending',
          issuedAt: new Date().toISOString().split('T')[0],
          items: [{ courseName: '', quantity: 1, unitPrice: 0, total: 0 }],
        });
      }
    }
  }, [open, invoice, form, isEditing, users]);

  const handleSubmit = async (data: InvoiceFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer *</FormLabel>
                    <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer" />
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Invoice Items</FormLabel>
              <div className="space-y-2">
                {fields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name={`items.${idx}.courseName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Course name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${idx}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Qty"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${idx}.unitPrice`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="Unit price"
                                {...field}
                                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${idx}.total`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="Total"
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ courseName: '', quantity: 1, unitPrice: 0, total: 0 })}>
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total (auto-calculated)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Invoice'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}