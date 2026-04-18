import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { paymentService } from '../../api/services/paymentService';
import type {
  Payment,
  PaymentQueryParams,
  PaymentListResponse,
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from '../../types/payment.types';

interface PaymentState {
  payments: Payment[];
  total: number;
  currentPayment: Payment | null;
  isLoading: boolean;
  error: string | null;
  queryParams: PaymentQueryParams;
}

const initialState: PaymentState = {
  payments: [],
  total: 0,
  currentPayment: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (params: PaymentQueryParams, { rejectWithValue }) => {
    try {
      const response = await paymentService.getPayments(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payments');
    }
  }
);

export const fetchPaymentById = createAsyncThunk(
  'payments/fetchPaymentById',
  async (id: number, { rejectWithValue }) => {
    try {
      const payment = await paymentService.getPaymentById(id);
      return payment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment');
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (data: CreatePaymentRequest, { rejectWithValue, dispatch }) => {
    try {
      const payment = await paymentService.createPayment(data);
      await dispatch(fetchPayments(initialState.queryParams));
      return payment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payment');
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, data }: { id: number; data: UpdatePaymentRequest }, { rejectWithValue, dispatch }) => {
    try {
      const payment = await paymentService.updatePayment(id, data);
      await dispatch(fetchPayments(initialState.queryParams));
      return payment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update payment');
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await paymentService.deletePayment(id);
      await dispatch(fetchPayments(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete payment');
    }
  }
);

export const completePayment = createAsyncThunk(
  'payments/completePayment',
  async ({ id, data }: { id: number; data?: { transactionId?: string; receiptNumber?: string } }, { rejectWithValue, dispatch }) => {
    try {
      const payment = await paymentService.completePayment(id, data);
      await dispatch(fetchPayments(initialState.queryParams));
      return payment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete payment');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<PaymentQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPaymentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPayment = action.payload;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(completePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completePayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(completePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentPayment } = paymentSlice.actions;
export default paymentSlice.reducer;