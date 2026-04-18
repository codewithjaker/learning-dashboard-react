// import { StatsCards } from "@/components/dashboard/overview/stats-cards";
// import { RevenueChart } from "@/components/dashboard/overview/revenue-chart";
// import { RecentEnrollments } from "@/components/dashboard/overview/recent-enrollments";
// import { QuickActions } from "@/components/dashboard/overview/quick-actions";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, Download, TrendingUp } from "lucide-react";

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Dashboard Overview
//           </h1>
//           <p className="text-muted-foreground">
//             Welcome back! Here's what's happening with your institute today.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button variant="outline" size="sm">
//             <Calendar className="w-4 h-4 mr-2" />
//             This Month
//           </Button>
//           <Button variant="outline" size="sm">
//             <Download className="w-4 h-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <StatsCards />

//       {/* Charts and Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <RevenueChart />

//           {/* Course Performance */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <div>
//                 <CardTitle className="text-xl">Course Performance</CardTitle>
//                 <CardDescription>
//                   Top performing courses by enrollment
//                 </CardDescription>
//               </div>
//               <TrendingUp className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {[
//                   {
//                     name: "Full-Stack Development",
//                     value: 45,
//                     color: "bg-blue-500",
//                   },
//                   { name: "Data Science", value: 30, color: "bg-green-500" },
//                   {
//                     name: "Digital Marketing",
//                     value: 15,
//                     color: "bg-yellow-500",
//                   },
//                   { name: "UI/UX Design", value: 10, color: "bg-purple-500" },
//                 ].map((course, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium">{course.name}</span>
//                       <span className="text-sm text-muted-foreground">
//                         {course.value}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full ${course.color}`}
//                         style={{ width: `${course.value}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <QuickActions />
//           <RecentEnrollments />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatsCards } from './StatsCards';
import { RecentActivity } from './RecentActivity';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { EnrollmentChart } from '../../components/charts/EnrollmentChart';
import { type RootState } from '../../store';
import { fetchDashboardStats, fetchRevenueData, fetchEnrollmentData, fetchRecentActivity } from '../../store/slices/dashboardSlice';
import { PageHeader } from '../../components/common/PageHeader';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, revenueData, enrollmentData, recentActivity, isLoading } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRevenueData(6));
    dispatch(fetchEnrollmentData(6));
    dispatch(fetchRecentActivity(10));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your LMS platform performance" />
      <StatsCards stats={stats} isLoading={isLoading} />
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart data={revenueData} isLoading={isLoading} />
        <EnrollmentChart data={enrollmentData} isLoading={isLoading} />
      </div>
      <RecentActivity activities={recentActivity} isLoading={isLoading} />
    </div>
  );
}