import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { enrollmentService } from '../../api/services/enrollmentService';
import type {
  Enrollment,
  EnrollmentQueryParams,
  EnrollmentListResponse,
  CreateEnrollmentRequest,
  UpdateEnrollmentRequest,
} from '../../types/enrollment.types';

interface EnrollmentState {
  enrollments: Enrollment[];
  total: number;
  currentEnrollment: Enrollment | null;
  isLoading: boolean;
  error: string | null;
  queryParams: EnrollmentQueryParams;
}

const initialState: EnrollmentState = {
  enrollments: [],
  total: 0,
  currentEnrollment: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'enrolledAt',
    sortOrder: 'desc',
  },
};

export const fetchEnrollments = createAsyncThunk(
  'enrollments/fetchEnrollments',
  async (params: EnrollmentQueryParams, { rejectWithValue }) => {
    try {
      const response = await enrollmentService.getEnrollments(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrollments');
    }
  }
);

export const fetchEnrollmentById = createAsyncThunk(
  'enrollments/fetchEnrollmentById',
  async (id: number, { rejectWithValue }) => {
    try {
      const enrollment = await enrollmentService.getEnrollmentById(id);
      return enrollment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrollment');
    }
  }
);

export const createEnrollment = createAsyncThunk(
  'enrollments/createEnrollment',
  async (data: CreateEnrollmentRequest, { rejectWithValue, dispatch }) => {
    try {
      const enrollment = await enrollmentService.createEnrollment(data);
      await dispatch(fetchEnrollments(initialState.queryParams));
      return enrollment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create enrollment');
    }
  }
);

export const updateEnrollment = createAsyncThunk(
  'enrollments/updateEnrollment',
  async ({ id, data }: { id: number; data: UpdateEnrollmentRequest }, { rejectWithValue, dispatch }) => {
    try {
      const enrollment = await enrollmentService.updateEnrollment(id, data);
      await dispatch(fetchEnrollments(initialState.queryParams));
      return enrollment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update enrollment');
    }
  }
);

export const deleteEnrollment = createAsyncThunk(
  'enrollments/deleteEnrollment',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await enrollmentService.deleteEnrollment(id);
      await dispatch(fetchEnrollments(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete enrollment');
    }
  }
);

export const completeEnrollment = createAsyncThunk(
  'enrollments/completeEnrollment',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const enrollment = await enrollmentService.completeEnrollment(id);
      await dispatch(fetchEnrollments(initialState.queryParams));
      return enrollment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete enrollment');
    }
  }
);

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<EnrollmentQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentEnrollment: (state) => {
      state.currentEnrollment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollments = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEnrollmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEnrollment = action.payload;
      })
      .addCase(fetchEnrollmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createEnrollment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEnrollment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEnrollment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEnrollment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEnrollment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEnrollment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(completeEnrollment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeEnrollment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(completeEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;