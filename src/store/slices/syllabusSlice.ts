import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import { courseService } from '../../api/services/courseService';
import type{
  SyllabusSection,
  SyllabusItem,
  CreateSectionRequest,
  UpdateSectionRequest,
  CreateItemRequest,
  UpdateItemRequest,
} from '../../types/course.types';

interface SyllabusState {
  sections: SyllabusSection[];
  items: Record<number, SyllabusItem[]>; // key: sectionId
  isLoading: boolean;
  error: string | null;
}

const initialState: SyllabusState = {
  sections: [],
  items: {},
  isLoading: false,
  error: null,
};

export const fetchSections = createAsyncThunk(
  'syllabus/fetchSections',
  async (courseId: number, { rejectWithValue }) => {
    try {
      const response = await courseService.getSectionsByCourse(courseId, { limit: 100 });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sections');
    }
  }
);

export const createSection = createAsyncThunk(
  'syllabus/createSection',
  async (data: CreateSectionRequest, { rejectWithValue, dispatch }) => {
    try {
      const section = await courseService.createSection(data);
      await dispatch(fetchSections(data.courseId));
      return section;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create section');
    }
  }
);

export const updateSection = createAsyncThunk(
  'syllabus/updateSection',
  async ({ id, data, courseId }: { id: number; data: UpdateSectionRequest; courseId: number }, { rejectWithValue, dispatch }) => {
    try {
      const section = await courseService.updateSection(id, data);
      await dispatch(fetchSections(courseId));
      return section;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update section');
    }
  }
);

export const deleteSection = createAsyncThunk(
  'syllabus/deleteSection',
  async ({ id, courseId }: { id: number; courseId: number }, { rejectWithValue, dispatch }) => {
    try {
      await courseService.deleteSection(id);
      await dispatch(fetchSections(courseId));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete section');
    }
  }
);

export const fetchItems = createAsyncThunk(
  'syllabus/fetchItems',
  async (sectionId: number, { rejectWithValue }) => {
    try {
      const response = await courseService.getItemsBySection(sectionId, { limit: 100 });
      return { sectionId, items: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch items');
    }
  }
);

export const createItem = createAsyncThunk(
  'syllabus/createItem',
  async (data: CreateItemRequest, { rejectWithValue, dispatch }) => {
    try {
      const item = await courseService.createItem(data);
      await dispatch(fetchItems(data.sectionId));
      return item;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create item');
    }
  }
);

export const updateItem = createAsyncThunk(
  'syllabus/updateItem',
  async ({ id, data, sectionId }: { id: number; data: UpdateItemRequest; sectionId: number }, { rejectWithValue, dispatch }) => {
    try {
      const item = await courseService.updateItem(id, data);
      await dispatch(fetchItems(sectionId));
      return item;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update item');
    }
  }
);

export const deleteItem = createAsyncThunk(
  'syllabus/deleteItem',
  async ({ id, sectionId }: { id: number; sectionId: number }, { rejectWithValue, dispatch }) => {
    try {
      await courseService.deleteItem(id);
      await dispatch(fetchItems(sectionId));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete item');
    }
  }
);

const syllabusSlice = createSlice({
  name: 'syllabus',
  initialState,
  reducers: {
    clearSyllabus: (state) => {
      state.sections = [];
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Sections
      .addCase(fetchSections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items[action.payload.sectionId] = action.payload.items;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSyllabus } = syllabusSlice.actions;
export default syllabusSlice.reducer;