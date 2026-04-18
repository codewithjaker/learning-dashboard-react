import apiClient from '../client';
import type{
  SalesReportResponse,
  UserReportResponse,
  CourseReportData,
  EnrollmentReportData,
  PaymentReportData,
  PaymentMethodReport,
  InstructorEarningsData,
} from '../../types/report.types';

interface ReportParams {
  startDate?: string;
  endDate?: string;
  groupBy?: 'day' | 'month' | 'year';
}

export const reportService = {
  getSalesReport: (params?: ReportParams) =>
    apiClient.get<SalesReportResponse>('/reports/sales', { params }).then((res) => res.data),

  getUserReport: (params?: ReportParams) =>
    apiClient.get<UserReportResponse>('/reports/users', { params }).then((res) => res.data),

  getCourseReport: () =>
    apiClient.get<CourseReportData[]>('/reports/courses').then((res) => res.data),

  getEnrollmentReport: (params?: ReportParams) =>
    apiClient.get<EnrollmentReportData[]>('/reports/enrollments', { params }).then((res) => res.data),

  getPaymentReport: (params?: ReportParams) =>
    apiClient.get<PaymentReportData[]>('/reports/payments', { params }).then((res) => res.data),

  getPaymentMethodReport: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get<PaymentMethodReport[]>('/reports/payment-methods', { params }).then((res) => res.data),

  getInstructorEarningsReport: () =>
    apiClient.get<InstructorEarningsData[]>('/reports/instructor-earnings').then((res) => res.data),
};