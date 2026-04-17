"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface ProgressChartProps {
  studentId: string;
  timeframe?: "week" | "month" | "year";
}

const weeklyProgressData = [
  { day: "Mon", hours: 3, completed: 2 },
  { day: "Tue", hours: 4, completed: 3 },
  { day: "Wed", hours: 2, completed: 1 },
  { day: "Thu", hours: 5, completed: 4 },
  { day: "Fri", hours: 3, completed: 2 },
  { day: "Sat", hours: 6, completed: 5 },
  { day: "Sun", hours: 2, completed: 1 },
];

const courseProgressData = [
  { name: "Web Development", progress: 85, color: "#3b82f6" },
  { name: "React Native", progress: 65, color: "#8b5cf6" },
  { name: "UI/UX Design", progress: 100, color: "#10b981" },
  { name: "Digital Marketing", progress: 45, color: "#f59e0b" },
];

const skillDistributionData = [
  { name: "Frontend", value: 40, color: "#3b82f6" },
  { name: "Backend", value: 30, color: "#8b5cf6" },
  { name: "Mobile", value: 20, color: "#10b981" },
  { name: "Design", value: 10, color: "#f59e0b" },
];

const monthlyTrendData = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 35 },
  { month: "Mar", progress: 50 },
  { month: "Apr", progress: 65 },
  { month: "May", progress: 75 },
  { month: "Jun", progress: 80 },
  { month: "Jul", progress: 85 },
  { month: "Aug", progress: 88 },
  { month: "Sep", progress: 90 },
  { month: "Oct", progress: 92 },
];

export function ProgressChart({
  studentId,
  timeframe = "week",
}: ProgressChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm text-blue-600">Hours: {payload[0].value}</p>
          <p className="text-sm text-green-600">
            Completed: {payload[1]?.value || 0} tasks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Study Activity</CardTitle>
            <CardDescription>
              Hours spent studying and tasks completed this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#6b7280" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#6b7280" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="hours"
                  name="Study Hours"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="completed"
                  name="Tasks Completed"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>
              Progress across all enrolled courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="opacity-30"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "#6b7280" }}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Progress"]}
                  labelFormatter={(label) => `Course: ${label}`}
                />
                <Bar dataKey="progress" name="Progress" radius={[0, 4, 4, 0]}>
                  {courseProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
            <CardDescription>
              Distribution of skills across different domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Progress Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Trend</CardTitle>
            <CardDescription>
              Overall learning progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#6b7280" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#6b7280" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Progress"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="progress"
                  name="Overall Progress"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#7c3aed" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Avg. Completion</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">25h</div>
            <div className="text-sm text-gray-600">Weekly Study</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-gray-600">Assignment Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-600">Projects Done</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
