import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { courseService } from '../../api/services/courseService';
import type{
  Course,
  CourseQueryParams,
  CourseListResponse,
  CreateCourseRequest,
  UpdateCourseRequest,
} from '../../types/course.types';

interface CourseState {
  courses: Course[];
  total: number;
  currentCourse: Course | null;
  isLoading: boolean;
  error: string | null;
  queryParams: CourseQueryParams;
}

const initialState: CourseState = {
  courses: [],
  total: 0,
  currentCourse: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    search: '',
    status: 'published',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params: CourseQueryParams, { rejectWithValue }) => {
    try {
      const response = await courseService.getCourses(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id: number, { rejectWithValue }) => {
    try {
      const course = await courseService.getCourseById(id);
      return course;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course');
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (data: CreateCourseRequest, { rejectWithValue, dispatch }) => {
    try {
      const course = await courseService.createCourse(data);
      await dispatch(fetchCourses(initialState.queryParams));
      return course;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, data }: { id: number; data: UpdateCourseRequest }, { rejectWithValue, dispatch }) => {
    try {
      const course = await courseService.updateCourse(id, data);
      await dispatch(fetchCourses(initialState.queryParams));
      return course;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await courseService.deleteCourse(id);
      await dispatch(fetchCourses(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete course');
    }
  }
);

export const publishCourse = createAsyncThunk(
  'courses/publishCourse',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const course = await courseService.publishCourse(id);
      await dispatch(fetchCourses(initialState.queryParams));
      return course;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to publish course');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<CourseQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Publish
      .addCase(publishCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(publishCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(publishCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;