"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 400000 },
  { month: "Feb", revenue: 600000 },
  { month: "Mar", revenue: 800000 },
  { month: "Apr", revenue: 1200000 },
  { month: "May", revenue: 1800000 },
  { month: "Jun", revenue: 2400000 },
];

export function RevenueChart() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Revenue Overview
        </CardTitle>
        <CardDescription>
          Monthly revenue growth for the current year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end justify-between h-48">
            {revenueData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 flex-1"
              >
                <div className="text-xs text-muted-foreground">
                  ৳{(data.revenue / 1000000).toFixed(1)}M
                </div>
                <div
                  className="w-8 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all hover:from-primary/80 hover:to-primary/40"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                />
                <div className="text-xs font-medium">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
