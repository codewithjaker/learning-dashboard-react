import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface InternalErrorProps {
  error?: Error;
  resetError?: () => void;
}

export default function InternalError({ error, resetError }: InternalErrorProps) {
  const navigate = useNavigate();

  const handleReset = () => {
    if (resetError) resetError();
    else navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <AlertTriangle className="h-20 w-20 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Something Went Wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred. Our team has been notified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="rounded-md bg-muted p-4 text-left">
              <p className="text-sm font-mono text-destructive">{error.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reload Page
          </Button>
          <Button onClick={handleReset}>
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}