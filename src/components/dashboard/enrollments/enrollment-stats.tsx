import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Clock, CheckCircle } from "lucide-react";

export function EnrollmentStats() {
  const stats = [
    {
      title: "Total Enrollments",
      value: "1,248",
      description: "+12% from last month",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Students",
      value: "892",
      description: "+8% from last month",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Pending Approvals",
      value: "24",
      description: "Waiting for confirmation",
      icon: Clock,
      trend: "neutral",
    },
    {
      title: "Completion Rate",
      value: "78%",
      description: "Course completion rate",
      icon: CheckCircle,
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}