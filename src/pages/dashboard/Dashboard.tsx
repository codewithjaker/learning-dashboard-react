import { StatsCards } from "@/components/dashboard/overview/stats-cards";
import { RevenueChart } from "@/components/dashboard/overview/revenue-chart";
import { RecentEnrollments } from "@/components/dashboard/overview/recent-enrollments";
import { QuickActions } from "@/components/dashboard/overview/quick-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your institute today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart />

          {/* Course Performance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">Course Performance</CardTitle>
                <CardDescription>
                  Top performing courses by enrollment
                </CardDescription>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Full-Stack Development",
                    value: 45,
                    color: "bg-blue-500",
                  },
                  { name: "Data Science", value: 30, color: "bg-green-500" },
                  {
                    name: "Digital Marketing",
                    value: 15,
                    color: "bg-yellow-500",
                  },
                  { name: "UI/UX Design", value: 10, color: "bg-purple-500" },
                ].map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {course.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${course.color}`}
                        style={{ width: `${course.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <QuickActions />
          <RecentEnrollments />
        </div>
      </div>
    </div>
  );
}
