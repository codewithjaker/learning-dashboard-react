import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { couponService } from '../../api/services/couponService';
import type{
  Coupon,
  CouponQueryParams,
  CouponListResponse,
  CreateCouponRequest,
  UpdateCouponRequest,
} from '../../types/coupon.types';

interface CouponState {
  coupons: Coupon[];
  total: number;
  currentCoupon: Coupon | null;
  isLoading: boolean;
  error: string | null;
  queryParams: CouponQueryParams;
}

const initialState: CouponState = {
  coupons: [],
  total: 0,
  currentCoupon: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (params: CouponQueryParams, { rejectWithValue }) => {
    try {
      const response = await couponService.getCoupons(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

export const fetchCouponById = createAsyncThunk(
  'coupons/fetchCouponById',
  async (id: number, { rejectWithValue }) => {
    try {
      const coupon = await couponService.getCouponById(id);
      return coupon;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupon');
    }
  }
);

export const createCoupon = createAsyncThunk(
  'coupons/createCoupon',
  async (data: CreateCouponRequest, { rejectWithValue, dispatch }) => {
    try {
      const coupon = await couponService.createCoupon(data);
      await dispatch(fetchCoupons(initialState.queryParams));
      return coupon;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create coupon');
    }
  }
);

export const updateCoupon = createAsyncThunk(
  'coupons/updateCoupon',
  async ({ id, data }: { id: number; data: UpdateCouponRequest }, { rejectWithValue, dispatch }) => {
    try {
      const coupon = await couponService.updateCoupon(id, data);
      await dispatch(fetchCoupons(initialState.queryParams));
      return coupon;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update coupon');
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await couponService.deleteCoupon(id);
      await dispatch(fetchCoupons(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete coupon');
    }
  }
);

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<CouponQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCoupon: (state) => {
      state.currentCoupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCouponById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCouponById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCoupon = action.payload;
      })
      .addCase(fetchCouponById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentCoupon } = couponSlice.actions;
export default couponSlice.reducer;