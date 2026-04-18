import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, BookOpen, ShoppingCart, DollarSign, Star, TrendingUp } from 'lucide-react';
import { type DashboardStats } from '../../types/dashboard.types';
import { formatCurrency } from '../../lib/utils';

interface StatsCardsProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-7 w-24 animate-pulse bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, description: `${stats.totalStudents} students, ${stats.totalInstructors} instructors` },
    { title: 'Courses', value: stats.totalCourses, icon: BookOpen, description: `${stats.publishedCourses} published` },
    { title: 'Enrollments', value: stats.totalEnrollments, icon: ShoppingCart, description: `${stats.activeEnrollments} active, ${stats.completedEnrollments} completed` },
    { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, description: `${formatCurrency(stats.monthlyRevenue)} last 30 days` },
    { title: 'Reviews', value: stats.totalReviews, icon: Star, description: `Avg rating: ${stats.averageRating.toFixed(1)} ★` },
    { title: 'Pending Payouts', value: formatCurrency(stats.pendingPayouts), icon: TrendingUp, description: 'Awaiting payment to instructors' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}