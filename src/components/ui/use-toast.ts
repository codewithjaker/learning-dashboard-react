// src/components/ui/use-toast.ts
import { toast } from 'sonner';

// Re-export toast functions with custom types
export const useToast = () => {
  return {
    toast: {
      success: (message: string, options?: any) => toast.success(message, options),
      error: (message: string, options?: any) => toast.error(message, options),
      info: (message: string, options?: any) => toast.info(message, options),
      warning: (message: string, options?: any) => toast.warning(message, options),
      loading: (message: string, options?: any) => toast.loading(message, options),
      promise: <T>(promise: Promise<T>, options?: any) => toast.promise(promise, options),
      dismiss: (id?: string | number) => toast.dismiss(id),
      custom: (jsx: React.ReactNode, options?: any) => toast.custom(jsx, options),
    },
  };
};

// Direct export for convenience
export { toast };