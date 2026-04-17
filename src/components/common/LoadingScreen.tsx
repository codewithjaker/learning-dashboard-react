import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  fullScreen?: boolean;
}

export function LoadingScreen({ fullScreen = true }: LoadingScreenProps) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm' : 'min-h-[400px]'}`}>
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}