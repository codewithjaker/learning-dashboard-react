import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ShoppingCart, DollarSign, Star, BookOpen } from 'lucide-react';
import type { RecentActivity as RecentActivityType } from '../../types/dashboard.types';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityProps {
  activities: RecentActivityType[];
  isLoading: boolean;
}

const iconMap = { enrollment: ShoppingCart, payment: DollarSign, review: Star, course: BookOpen };
const colorMap = {
  enrollment: 'bg-blue-100 text-blue-600',
  payment: 'bg-green-100 text-green-600',
  review: 'bg-yellow-100 text-yellow-600',
  course: 'bg-purple-100 text-purple-600',
};

export function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 animate-pulse bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse bg-muted rounded" />
                  <div className="h-3 w-1/2 animate-pulse bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent><p className="text-center text-muted-foreground py-8">No recent activity</p></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type];
            const colorClass = colorMap[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${colorClass}`}><Icon className="h-4 w-4" /></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm"><span className="font-medium">{activity.user}</span> {activity.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}