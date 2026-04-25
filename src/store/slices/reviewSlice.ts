// import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
// import { reviewService } from '../../api/services/reviewService';
// import type{
//   Review,
//   ReviewQueryParams,
//   ReviewListResponse,
// } from '../../types/review.types';

// interface ReviewState {
//   reviews: Review[];
//   total: number;
//   currentReview: Review | null;
//   isLoading: boolean;
//   error: string | null;
//   queryParams: ReviewQueryParams;
// }

// const initialState: ReviewState = {
//   reviews: [],
//   total: 0,
//   currentReview: null,
//   isLoading: false,
//   error: null,
//   queryParams: {
//     page: 1,
//     limit: 10,
//     sortBy: 'createdAt',
//     sortOrder: 'desc',
//   },
// };

// export const fetchReviews = createAsyncThunk(
//   'reviews/fetchReviews',
//   async (params: ReviewQueryParams, { rejectWithValue }) => {
//     try {
//       const response = await reviewService.getReviews(params);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
//     }
//   }
// );

// export const fetchReviewById = createAsyncThunk(
//   'reviews/fetchReviewById',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const review = await reviewService.getReviewById(id);
//       return review;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch review');
//     }
//   }
// );

// export const deleteReview = createAsyncThunk(
//   'reviews/deleteReview',
//   async (id: number, { rejectWithValue, dispatch }) => {
//     try {
//       await reviewService.deleteReview(id);
//       await dispatch(fetchReviews(initialState.queryParams));
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
//     }
//   }
// );

// const reviewSlice = createSlice({
//   name: 'reviews',
//   initialState,
//   reducers: {
//     setQueryParams: (state, action: PayloadAction<Partial<ReviewQueryParams>>) => {
//       state.queryParams = { ...state.queryParams, ...action.payload };
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearCurrentReview: (state) => {
//       state.currentReview = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchReviews.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchReviews.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.reviews = action.payload.data;
//         state.total = action.payload.total;
//       })
//       .addCase(fetchReviews.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchReviewById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchReviewById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentReview = action.payload;
//       })
//       .addCase(fetchReviewById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(deleteReview.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteReview.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(deleteReview.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setQueryParams, clearError, clearCurrentReview } = reviewSlice.actions;
// export default reviewSlice.reducer;

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { reviewService } from '../../api/services/reviewService';
import type {
  Review,
  ReviewQueryParams,
  ReviewListResponse,
  CreateReviewRequest,
  UpdateReviewRequest,
} from '../../types/review.types';

interface ReviewState {
  reviews: Review[];
  total: number;
  currentReview: Review | null;
  isLoading: boolean;
  error: string | null;
  queryParams: ReviewQueryParams;
}

const initialState: ReviewState = {
  reviews: [],
  total: 0,
  currentReview: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

// Async Thunks
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (params: ReviewQueryParams, { rejectWithValue }) => {
    try {
      const response = await reviewService.getReviews(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id: number, { rejectWithValue }) => {
    try {
      const review = await reviewService.getReviewById(id);
      return review;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch review');
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (data: CreateReviewRequest, { rejectWithValue, dispatch }) => {
    try {
      const review = await reviewService.createReview(data);
      // Refresh list after creation
      await dispatch(fetchReviews(initialState.queryParams));
      return review;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create review');
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ id, data }: { id: number; data: UpdateReviewRequest }, { rejectWithValue, dispatch }) => {
    try {
      const review = await reviewService.updateReview(id, data);
      await dispatch(fetchReviews(initialState.queryParams));
      return review;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update review');
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await reviewService.deleteReview(id);
      await dispatch(fetchReviews(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<ReviewQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentReview: (state) => {
      state.currentReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchReviewById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentReview = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update review
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentReview } = reviewSlice.actions;
export default reviewSlice.reducer;