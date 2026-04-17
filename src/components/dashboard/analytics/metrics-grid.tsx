import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Star,
  Target,
} from "lucide-react";

interface MetricsGridProps {
  data: {
    totalStudents: number;
    activeCourses: number;
    totalRevenue: number;
    completionRate: number;
    avgRating: number;
    activeInstructors: number;
  };
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const metrics = [
    {
      title: "Total Students",
      value: data.totalStudents.toLocaleString(),
      description: "All-time enrolled students",
      icon: Users,
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      title: "Active Courses",
      value: data.activeCourses.toString(),
      description: "Currently running courses",
      icon: BookOpen,
      trend: "+2",
      trendColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `৳${data.totalRevenue.toLocaleString()}`,
      description: "All-time revenue generated",
      icon: DollarSign,
      trend: "+15.2%",
      trendColor: "text-green-600",
    },
    {
      title: "Completion Rate",
      value: `${data.completionRate}%`,
      description: "Course completion rate",
      icon: Target,
      trend: "+3.2%",
      trendColor: "text-green-600",
    },
    {
      title: "Average Rating",
      value: data.avgRating.toString(),
      description: "Student satisfaction score",
      icon: Star,
      trend: "+0.2",
      trendColor: "text-green-600",
    },
    {
      title: "Active Instructors",
      value: data.activeInstructors.toString(),
      description: "Teaching staff",
      icon: Users,
      trend: "+1",
      trendColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <span className={`text-xs font-medium ${metric.trendColor}`}>
                {metric.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
