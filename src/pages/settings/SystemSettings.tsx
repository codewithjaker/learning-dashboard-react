import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { type RootState } from '../../store';
import { fetchSystemSettings, updateSystemSettings } from '../../store/slices/settingsSlice';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../components/ui/use-toast';

const systemSchema = z.object({
  siteName: z.string().min(1),
  siteLogo: z.string().nullable(),
  siteDescription: z.string(),
  contactEmail: z.string().email(),
  timezone: z.string(),
  dateFormat: z.string(),
  currency: z.string(),
  enableRegistration: z.boolean(),
  enableEmailVerification: z.boolean(),
  maintenanceMode: z.boolean(),
});

type SystemFormValues = z.infer<typeof systemSchema>;

const timezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Dhaka', 'Asia/Tokyo'];
const dateFormats = ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY'];
const currencies = ['USD', 'EUR', 'GBP', 'BDT', 'INR','RUB','CNY','JPY'];

export default function SystemSettings() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { system, isLoading } = useSelector((state: RootState) => state.settings);

  const form = useForm<SystemFormValues>({
    resolver: zodResolver(systemSchema),
    defaultValues: {
      siteName: '',
      siteLogo: '',
      siteDescription: '',
      contactEmail: '',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD',
      enableRegistration: true,
      enableEmailVerification: true,
      maintenanceMode: false,
    },
  });

  useEffect(() => {
    dispatch(fetchSystemSettings());
  }, [dispatch]);

  useEffect(() => {
    if (system) {
      form.reset(system);
    }
  }, [system, form]);

  const onSubmit = async (data: SystemFormValues) => {
    try {
      await dispatch(updateSystemSettings(data)).unwrap();
      //   toast({ title: 'Success', description: 'System settings updated' });
    } catch (error) {
      //   toast({ title: 'Error', description: 'Failed to update system settings', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure general platform settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="siteName" render={({ field }) => (
              <FormItem><FormLabel>Site Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="siteLogo" render={({ field }) => (
              <FormItem><FormLabel>Site Logo URL</FormLabel><FormControl><Input {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="siteDescription" render={({ field }) => (
              <FormItem><FormLabel>Site Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="contactEmail" render={({ field }) => (
              <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="timezone" render={({ field }) => (
                <FormItem><FormLabel>Timezone</FormLabel><Select onValueChange={field.onChange} value={field.value} ><FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl><SelectContent>{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="dateFormat" render={({ field }) => (
                <FormItem><FormLabel>Date Format</FormLabel><Select onValueChange={field.onChange} value={field.value} ><FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl><SelectContent>{dateFormats.map(df => <SelectItem key={df} value={df}>{df}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="currency" render={({ field }) => (
              <FormItem><FormLabel>Currency</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl><SelectContent>{currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
            )} />
            <div className="space-y-4">
              <FormField control={form.control} name="enableRegistration" render={({ field }) => (
                <FormItem className="flex items-center justify-between"><FormLabel>Allow Registration</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="enableEmailVerification" render={({ field }) => (
                <FormItem className="flex items-center justify-between"><FormLabel>Require Email Verification</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="maintenanceMode" render={({ field }) => (
                <FormItem className="flex items-center justify-between"><FormLabel>Maintenance Mode</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}