import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const DataTableHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between space-x-2 py-4', className)}
    {...props}
  />
));
DataTableHeader.displayName = 'DataTableHeader';