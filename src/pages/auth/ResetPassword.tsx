import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../../lib/validations/auth.schema';
import { authService } from '../../api/services/authService';
import { useToast } from '../../components/ui/use-toast';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      // Get email from location state or from a hidden field? For simplicity, we'll ask email again or store in state.
      // Better: store email in localStorage or state when navigating from forgot password.
      const email = localStorage.getItem('resetEmail');
      if (!email) {
        // toast({ title: 'Error', description: 'Please start the password reset process again.', variant: 'destructive' });
        navigate('/forgot-password');
        return;
      }
      await authService.resetPassword({ email, otp: data.otp, newPassword: data.newPassword });
    //   toast({ title: 'Success', description: 'Password reset successfully. Please login.' });
      localStorage.removeItem('resetEmail');
      navigate('/login');
    } catch (error: any) {
    //   toast({ title: 'Error', description: error.response?.data?.message || 'Reset failed', variant: 'destructive' });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Enter the OTP from your email and your new password.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Reset password</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}