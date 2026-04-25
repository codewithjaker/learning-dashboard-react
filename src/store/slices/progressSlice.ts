import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { progressService } from '../../api/services/progressService';
import type { UserProgressResponse, UpdateProgressRequest, CourseProgress } from '../../types/progress.types';

interface ProgressState {
  currentProgress: UserProgressResponse | null;
  overallProgress: CourseProgress[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  currentProgress: null,
  overallProgress: [],
  isLoading: false,
  error: null,
};

export const fetchCourseProgress = createAsyncThunk(
  'progress/fetchCourseProgress',
  async ({ courseId, userId }: { courseId: number; userId?: number }) => {
    return await progressService.getCourseProgress(courseId, userId);
  }
);

export const fetchOverallProgress = createAsyncThunk('progress/fetchOverallProgress', async () => {
  return await progressService.getOverallProgress();
});

export const updateItemProgress = createAsyncThunk(
  'progress/updateItemProgress',
  async (data: UpdateProgressRequest, { dispatch }) => {
    const result = await progressService.updateProgress(data);
    // Refetch current course progress if we have it
    if (data.courseId) {
      await dispatch(fetchCourseProgress({ courseId: data.courseId, userId: data.userId }));
    }
    return result;
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearProgress: (state) => {
      state.currentProgress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProgress = action.payload;
      })
      .addCase(fetchCourseProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch progress';
      })
      .addCase(fetchOverallProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOverallProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.overallProgress = action.payload;
      })
      .addCase(fetchOverallProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch overall progress';
      })
      .addCase(updateItemProgress.fulfilled, (state) => {
        // Optimistic update handled by refetch; just clear error state
        state.error = null;
      });
  },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;