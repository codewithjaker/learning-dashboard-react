import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../../api/services/dashboardService';
import type{ DashboardStats, RevenueData, EnrollmentData, RecentActivity } from '../../types/dashboard.types';

interface DashboardState {
  stats: DashboardStats | null;
  revenueData: RevenueData[];
  enrollmentData: EnrollmentData[];
  recentActivity: RecentActivity[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  revenueData: [],
  enrollmentData: [],
  recentActivity: [],
  isLoading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getStats();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
);

export const fetchRevenueData = createAsyncThunk(
  'dashboard/fetchRevenueData',
  async (months: number = 6, { rejectWithValue }) => {
    try {
      return await dashboardService.getRevenueData(months);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch revenue data');
    }
  }
);

export const fetchEnrollmentData = createAsyncThunk(
  'dashboard/fetchEnrollmentData',
  async (months: number = 6, { rejectWithValue }) => {
    try {
      return await dashboardService.getEnrollmentData(months);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrollment data');
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      return await dashboardService.getRecentActivity(limit);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recent activity');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.stats = null;
      state.revenueData = [];
      state.enrollmentData = [];
      state.recentActivity = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Revenue Data
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.revenueData = action.payload;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Enrollment Data
      .addCase(fetchEnrollmentData.fulfilled, (state, action) => {
        state.enrollmentData = action.payload;
      })
      .addCase(fetchEnrollmentData.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Recent Activity
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;