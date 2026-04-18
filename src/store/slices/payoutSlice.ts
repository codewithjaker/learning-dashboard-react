import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { payoutService } from '../../api/services/payoutService';
import type{
  Payout,
  PayoutQueryParams,
  PayoutListResponse,
  CreatePayoutRequest,
  UpdatePayoutRequest,
} from '../../types/payout.types';

interface PayoutState {
  payouts: Payout[];
  total: number;
  currentPayout: Payout | null;
  isLoading: boolean;
  error: string | null;
  queryParams: PayoutQueryParams;
}

const initialState: PayoutState = {
  payouts: [],
  total: 0,
  currentPayout: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchPayouts = createAsyncThunk(
  'payouts/fetchPayouts',
  async (params: PayoutQueryParams, { rejectWithValue }) => {
    try {
      const response = await payoutService.getPayouts(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payouts');
    }
  }
);

export const fetchPayoutById = createAsyncThunk(
  'payouts/fetchPayoutById',
  async (id: number, { rejectWithValue }) => {
    try {
      const payout = await payoutService.getPayoutById(id);
      return payout;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payout');
    }
  }
);

export const createPayout = createAsyncThunk(
  'payouts/createPayout',
  async (data: CreatePayoutRequest, { rejectWithValue, dispatch }) => {
    try {
      const payout = await payoutService.createPayout(data);
      await dispatch(fetchPayouts(initialState.queryParams));
      return payout;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payout');
    }
  }
);

export const updatePayout = createAsyncThunk(
  'payouts/updatePayout',
  async ({ id, data }: { id: number; data: UpdatePayoutRequest }, { rejectWithValue, dispatch }) => {
    try {
      const payout = await payoutService.updatePayout(id, data);
      await dispatch(fetchPayouts(initialState.queryParams));
      return payout;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update payout');
    }
  }
);

export const deletePayout = createAsyncThunk(
  'payouts/deletePayout',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await payoutService.deletePayout(id);
      await dispatch(fetchPayouts(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete payout');
    }
  }
);

const payoutSlice = createSlice({
  name: 'payouts',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<PayoutQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPayout: (state) => {
      state.currentPayout = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayouts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payouts = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchPayouts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPayoutById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayoutById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPayout = action.payload;
      })
      .addCase(fetchPayoutById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createPayout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPayout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePayout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePayout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePayout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePayout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePayout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePayout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentPayout } = payoutSlice.actions;
export default payoutSlice.reducer;