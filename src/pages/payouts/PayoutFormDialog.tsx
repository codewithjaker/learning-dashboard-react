import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { payoutSchema,type PayoutFormValues } from '../../lib/validations/payout.schema';
import { type Payout } from '../../types/payout.types';

interface PayoutFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payout?: Payout | null;
  onSubmit: (data: PayoutFormValues) => Promise<void>;
  isLoading: boolean;
  instructors: Array<{ id: number; fullName: string; email: string }>;
}

export function PayoutFormDialog({
  open,
  onOpenChange,
  payout,
  onSubmit,
  isLoading,
  instructors,
}: PayoutFormDialogProps) {
  const isEditing = !!payout;
  const form = useForm<PayoutFormValues>({
    resolver: zodResolver(payoutSchema),
    defaultValues: isEditing
      ? {
          instructorId: payout.instructorId,
          amount: payout.amount,
          periodStart: payout.periodStart.split('T')[0],
          periodEnd: payout.periodEnd.split('T')[0],
          paymentMethod: payout.paymentMethod || '',
          transactionId: payout.transactionId || '',
          notes: payout.notes || '',
          status: payout.status,
          paidAt: payout.paidAt ? payout.paidAt.split('T')[0] : '',
        }
      : {
          instructorId: instructors[0]?.id || 0,
          amount: 0,
          periodStart: '',
          periodEnd: '',
          paymentMethod: '',
          transactionId: '',
          notes: '',
          status: 'pending',
          paidAt: '',
        },
  });

  useEffect(() => {
    if (open) {
      if (isEditing && payout) {
        form.reset({
          instructorId: payout.instructorId,
          amount: payout.amount,
          periodStart: payout.periodStart.split('T')[0],
          periodEnd: payout.periodEnd.split('T')[0],
          paymentMethod: payout.paymentMethod || '',
          transactionId: payout.transactionId || '',
          notes: payout.notes || '',
          status: payout.status,
          paidAt: payout.paidAt ? payout.paidAt.split('T')[0] : '',
        });
      } else {
        form.reset({
          instructorId: instructors[0]?.id || 0,
          amount: 0,
          periodStart: '',
          periodEnd: '',
          paymentMethod: '',
          transactionId: '',
          notes: '',
          status: 'pending',
          paidAt: '',
        });
      }
    }
  }, [open, payout, form, isEditing, instructors]);

  const handleSubmit = async (data: PayoutFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Payout' : 'Create New Payout'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="instructorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor *</FormLabel>
                  <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {instructors.map((inst) => (
                        <SelectItem key={inst.id} value={inst.id.toString()}>
                          {inst.fullName} ({inst.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="periodStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period Start *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="periodEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period End *</FormLabel>
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
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
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank Transfer, PayPal, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paidAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Date (if status = paid)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Payout'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}