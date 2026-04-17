import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { categoryService } from '../../api/services/categoryService';
import type { Category, CategoryQueryParams, CategoryListResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../../types/category.types';

interface CategoryState {
  categories: Category[];
  total: number;
  currentCategory: Category | null;
  tree: Category[];
  isLoading: boolean;
  error: string | null;
  queryParams: CategoryQueryParams;
}

const initialState: CategoryState = {
  categories: [],
  total: 0,
  currentCategory: null,
  tree: [],
  isLoading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 10,
    search: '',
    parentId: null,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params: CategoryQueryParams, { rejectWithValue }) => {
    try {
      const response = await categoryService.getCategories(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id: number, { rejectWithValue }) => {
    try {
      const category = await categoryService.getCategoryById(id);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (data: CreateCategoryRequest, { rejectWithValue, dispatch }) => {
    try {
      const category = await categoryService.createCategory(data);
      await dispatch(fetchCategories(initialState.queryParams));
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }: { id: number; data: UpdateCategoryRequest }, { rejectWithValue, dispatch }) => {
    try {
      const category = await categoryService.updateCategory(id, data);
      await dispatch(fetchCategories(initialState.queryParams));
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await categoryService.deleteCategory(id);
      await dispatch(fetchCategories(initialState.queryParams));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<Partial<CategoryQueryParams>>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
    setTree: (state, action: PayloadAction<Category[]>) => {
      state.tree = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQueryParams, clearError, clearCurrentCategory, setTree } = categorySlice.actions;
export default categorySlice.reducer;