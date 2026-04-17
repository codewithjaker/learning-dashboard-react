import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, CreditCard } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    description: "+12% from last month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Courses",
    value: "24",
    description: "+2 new courses",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    title: "Instructors",
    value: "18",
    description: "All active",
    icon: GraduationCap,
    color: "text-purple-600",
  },
  {
    title: "Revenue",
    value: "৳2.4M",
    description: "+18% from last month",
    icon: CreditCard,
    color: "text-orange-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
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
