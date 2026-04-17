import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../api/services/userService';
import type { User, UserQueryParams, UserListResponse, CreateUserRequest, UpdateUserRequest } from '../../types/user.types';

interface UserState {
    users: User[];
    total: number;
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
    queryParams: UserQueryParams;
}

const initialState: UserState = {
    users: [],
    total: 0,
    currentUser: null,
    isLoading: false,
    error: null,
    queryParams: {
        page: 1,
        limit: 10,
        search: '',
        role: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    },
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: UserQueryParams, { rejectWithValue }) => {
        try {
            const response = await userService.getUsers(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id: number, { rejectWithValue }) => {
        try {
            const user = await userService.getUserById(id);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
        }
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (data: CreateUserRequest, { rejectWithValue, dispatch }) => {
        try {
            const user = await userService.createUser(data);
            await dispatch(fetchUsers(initialState.queryParams));
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create user');
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, data }: { id: number; data: UpdateUserRequest }, { rejectWithValue, dispatch }) => {
        try {
            const user = await userService.updateUser(id, data);
            await dispatch(fetchUsers(initialState.queryParams));
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            await userService.deleteUser(id);
            await dispatch(fetchUsers(initialState.queryParams));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setQueryParams: (state, action: PayloadAction<Partial<UserQueryParams>>) => {
            state.queryParams = { ...state.queryParams, ...action.payload };
        },
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch user by ID
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create user
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setQueryParams, clearError, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;