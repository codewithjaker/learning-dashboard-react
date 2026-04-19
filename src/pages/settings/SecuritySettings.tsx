import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchSessions, revokeSession } from '../../store/slices/settingsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '../../components/ui/use-toast';

export default function SecuritySettings() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { sessions, isLoading } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const handleRevoke = async (sessionId: number) => {
    try {
      await dispatch(revokeSession(sessionId)).unwrap();
    //   toast({ title: 'Success', description: 'Session revoked' });
    } catch (error) {
    //   toast({ title: 'Error', description: 'Failed to revoke session', variant: 'destructive' });
    }
  };

  const currentSession = sessions.find(s => !s.isRevoked && new Date(s.expiresAt) > new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security & Sessions</CardTitle>
        <CardDescription>Manage your active sessions and revoke access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device / User Agent</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-mono text-xs">{session.userAgent || 'Unknown'}</TableCell>
                    <TableCell>{session.ipAddress || '-'}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(session.expiresAt), { addSuffix: true })}</TableCell>
                    <TableCell><Badge variant={session.isRevoked ? 'secondary' : 'success'}>{session.isRevoked ? 'Revoked' : 'Active'}</Badge></TableCell>
                    <TableCell>
                      {!session.isRevoked && (
                        <Button variant="ghost" size="sm" onClick={() => handleRevoke(session.id)}>Revoke</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {sessions.length === 0 && !isLoading && (
                  <TableRow><TableCell colSpan={5} className="text-center">No sessions found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Revoking a session will immediately log out that device. Your current session cannot be revoked here.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}