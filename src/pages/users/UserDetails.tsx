import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import type{ RootState } from '../../store';
import { fetchUserById, clearCurrentUser } from '../../store/slices/userSlice';
import { formatDate } from '../../lib/utils';

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentUser) {
    return <div className="text-center p-8">User not found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/users')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/users/edit/${currentUser.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser.avatar || undefined} />
              <AvatarFallback>{currentUser.fullName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.fullName}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
              <div className="flex space-x-2 mt-2">
                <Badge variant={currentUser.role === 'admin' ? 'destructive' : 'default'}>
                  {currentUser.role}
                </Badge>
                <Badge variant={currentUser.isActive ? 'success' : 'secondary'}>
                  {currentUser.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium">{currentUser.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-medium">{formatDate(currentUser.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">{formatDate(currentUser.updatedAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="font-medium">{currentUser.bio || 'No bio provided'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}