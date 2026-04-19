import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { type RootState } from '../../store';
import { fetchEmailSettings, updateEmailSettings } from '../../store/slices/settingsSlice';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../components/ui/use-toast';

const emailSchema = z.object({
  smtpHost: z.string().min(1),
  smtpPort: z.number().int().positive(),
  smtpSecure: z.boolean(),
  smtpUser: z.string(),
  smtpPass: z.string(),
  fromEmail: z.string().email(),
  fromName: z.string(),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function EmailSettings() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { email, isLoading } = useSelector((state: RootState) => state.settings);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      smtpHost: '',
      smtpPort: 587,
      smtpSecure: false,
      smtpUser: '',
      smtpPass: '',
      fromEmail: '',
      fromName: '',
    },
  });

  useEffect(() => {
    dispatch(fetchEmailSettings());
  }, [dispatch]);

  useEffect(() => {
    if (email) {
      form.reset(email);
    }
  }, [email, form]);

  const onSubmit = async (data: EmailFormValues) => {
    try {
      await dispatch(updateEmailSettings(data)).unwrap();
    //   toast({ title: 'Success', description: 'Email settings updated' });
    } catch (error) {
    //   toast({ title: 'Error', description: 'Failed to update email settings', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>Configure SMTP for sending emails</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="smtpHost" render={({ field }) => (
                <FormItem><FormLabel>SMTP Host</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="smtpPort" render={({ field }) => (
                <FormItem><FormLabel>SMTP Port</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="smtpSecure" render={({ field }) => (
              <FormItem className="flex items-center justify-between"><FormLabel>Use SSL/TLS</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="smtpUser" render={({ field }) => (
                <FormItem><FormLabel>SMTP Username</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="smtpPass" render={({ field }) => (
                <FormItem><FormLabel>SMTP Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="fromEmail" render={({ field }) => (
                <FormItem><FormLabel>From Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="fromName" render={({ field }) => (
                <FormItem><FormLabel>From Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}