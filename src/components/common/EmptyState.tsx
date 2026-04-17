import { type LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ title, description, icon: Icon, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-12 border rounded-lg bg-muted/20">
            {Icon && <Icon className="h-12 w-12 text-muted-foreground mb-4" />}
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
        </div>
    );
}