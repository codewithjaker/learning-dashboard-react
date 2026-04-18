import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reportService } from '../../api/services/reportService';
import type {
  SalesReportResponse,
  UserReportResponse,
  CourseReportData,
  EnrollmentReportData,
  PaymentReportData,
  PaymentMethodReport,
  InstructorEarningsData,
} from '../../types/report.types';

interface ReportState {
  sales: SalesReportResponse | null;
  users: UserReportResponse | null;
  courses: CourseReportData[];
  enrollments: EnrollmentReportData[];
  payments: PaymentReportData[];
  paymentMethods: PaymentMethodReport[];
  instructorEarnings: InstructorEarningsData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  sales: null,
  users: null,
  courses: [],
  enrollments: [],
  payments: [],
  paymentMethods: [],
  instructorEarnings: [],
  isLoading: false,
  error: null,
};

export const fetchSalesReport = createAsyncThunk(
  'reports/fetchSales',
  async (params?: { startDate?: string; endDate?: string; groupBy?: string }) => {
    return await reportService.getSalesReport(params);
  }
);

export const fetchUserReport = createAsyncThunk(
  'reports/fetchUsers',
  async (params?: { startDate?: string; endDate?: string; groupBy?: string }) => {
    return await reportService.getUserReport(params);
  }
);

export const fetchCourseReport = createAsyncThunk('reports/fetchCourses', async () => {
  return await reportService.getCourseReport();
});

export const fetchEnrollmentReport = createAsyncThunk(
  'reports/fetchEnrollments',
  async (params?: { startDate?: string; endDate?: string; groupBy?: string }) => {
    return await reportService.getEnrollmentReport(params);
  }
);

export const fetchPaymentReport = createAsyncThunk(
  'reports/fetchPayments',
  async (params?: { startDate?: string; endDate?: string; groupBy?: string }) => {
    return await reportService.getPaymentReport(params);
  }
);

export const fetchPaymentMethodReport = createAsyncThunk(
  'reports/fetchPaymentMethods',
  async (params?: { startDate?: string; endDate?: string }) => {
    return await reportService.getPaymentMethodReport(params);
  }
);

export const fetchInstructorEarnings = createAsyncThunk('reports/fetchInstructorEarnings', async () => {
  return await reportService.getInstructorEarningsReport();
});

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearReports: (state) => {
      state.sales = null;
      state.users = null;
      state.courses = [];
      state.enrollments = [];
      state.payments = [];
      state.paymentMethods = [];
      state.instructorEarnings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesReport.pending, (state) => { state.isLoading = true; })
      .addCase(fetchSalesReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales = action.payload;
      })
      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch sales report';
      })
      .addCase(fetchUserReport.pending, (state) => { state.isLoading = true; })
      .addCase(fetchUserReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user report';
      })
      .addCase(fetchCourseReport.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCourseReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourseReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch course report';
      })
      .addCase(fetchEnrollmentReport.pending, (state) => { state.isLoading = true; })
      .addCase(fetchEnrollmentReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollmentReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch enrollment report';
      })
      .addCase(fetchPaymentReport.pending, (state) => { state.isLoading = true; })
      .addCase(fetchPaymentReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch payment report';
      })
      .addCase(fetchPaymentMethodReport.pending, (state) => { state.isLoading = true; })
      .addCase(fetchPaymentMethodReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethodReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch payment method report';
      })
      .addCase(fetchInstructorEarnings.pending, (state) => { state.isLoading = true; })
      .addCase(fetchInstructorEarnings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.instructorEarnings = action.payload;
      })
      .addCase(fetchInstructorEarnings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch instructor earnings';
      });
  },
});

export const { clearReports } = reportSlice.actions;
export default reportSlice.reducer;