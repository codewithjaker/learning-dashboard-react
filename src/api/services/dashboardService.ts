import apiClient from '../client';
import type { DashboardStats, RevenueData, EnrollmentData, RecentActivity } from '../../types/dashboard.types';

export const dashboardService = {
  getStats: () =>
    apiClient.get<DashboardStats>('/dashboard/stats').then((res) => res.data),

  getRevenueData: (months = 6) =>
    apiClient.get<RevenueData[]>(`/dashboard/revenue?months=${months}`).then((res) => res.data),

  getEnrollmentData: (months = 6) =>
    apiClient.get<EnrollmentData[]>(`/dashboard/enrollments?months=${months}`).then((res) => res.data),

  getRecentActivity: (limit = 10) =>
    apiClient.get<RecentActivity[]>(`/dashboard/recent-activity?limit=${limit}`).then((res) => res.data),
};