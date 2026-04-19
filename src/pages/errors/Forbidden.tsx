import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { ShieldX, Home } from 'lucide-react';

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <ShieldX className="h-20 w-20 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Forbidden</CardTitle>
          <CardDescription>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please contact your administrator if you believe this is a mistake.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate('/dashboard')}>
            <Home className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}