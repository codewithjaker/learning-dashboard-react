import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { invoiceService } from '../../api/services/invoiceService';
import type {
  Invoice,
  InvoiceQueryParams,
  InvoiceListResponse,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
} from '../../types/invoice.types';

interface InvoiceState {
  invoices: Invoice[];
  total: number;
  currentInvoice: Invoice | null;
  isLoading: boolean;
  error: string | null;
  queryParams: InvoiceQueryParams;
}

const initialState: InvoiceState = {
  invoices: [],
  total: 0,
  currentInvoice: null,
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (params: InvoiceQueryParams, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getInvoices(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch invoices');
    }
  }
);

export const fetchInvoiceById = createAsyncThunk(
  'invoices/fetchInvoiceById',
  async (id: number, { rejectWithValue }) => {
    try {
      const invoice = await invoiceService.getInvoiceById(id);
      return invoice;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch invoice');
    }
  }
);

export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (data: CreateInvoiceRequest, { rejectWithValue, dispatch }) => {
    try {
      const invoice = await invoiceService.createInvoice(data);
      await dispatch(fetchInvoices(initialState.queryParams));
      return invoice;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create invoice');
    }
  }
);

export const updateInvoice = createAsyncThunk(
  'invoices/updateInvoice',
  async ({ id, data }: { id: number; data: UpdateInvoiceRequest }, { rejectWithValue, dispatch }) => {
    try {
      const invoice = await invoiceService.updateInvoice(id, data);
      await dispatch(fetchInvoices(initialState.queryParams));
      return invoice;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update invoice');
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await invoiceService.deleteInvoice(id);
      await dispatch(fetchInvoices(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete invoice');
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<InvoiceQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchInvoiceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentInvoice = action.payload;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;