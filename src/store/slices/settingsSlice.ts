import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { settingsService } from '../../api/services/settingsService';
import type{ ProfileSettings, SystemSettings, EmailSettings, Session } from '../../types/settings.types';

interface SettingsState {
  profile: ProfileSettings | null;
  system: SystemSettings | null;
  email: EmailSettings | null;
  sessions: Session[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  profile: null,
  system: null,
  email: null,
  sessions: [],
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('settings/fetchProfile', async () => {
  return await settingsService.getProfile();
});

export const updateProfile = createAsyncThunk(
  'settings/updateProfile',
  async (data: Partial<ProfileSettings>) => {
    return await settingsService.updateProfile(data);
  }
);

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async (data: { currentPassword: string; newPassword: string }) => {
    await settingsService.changePassword(data);
    return data;
  }
);

export const fetchSystemSettings = createAsyncThunk('settings/fetchSystem', async () => {
  return await settingsService.getSystemSettings();
});

export const updateSystemSettings = createAsyncThunk(
  'settings/updateSystem',
  async (data: Partial<SystemSettings>) => {
    await settingsService.updateSystemSettings(data);
    return data;
  }
);

export const fetchEmailSettings = createAsyncThunk('settings/fetchEmail', async () => {
  return await settingsService.getEmailSettings();
});

export const updateEmailSettings = createAsyncThunk(
  'settings/updateEmail',
  async (data: Partial<EmailSettings>) => {
    await settingsService.updateEmailSettings(data);
    return data;
  }
);

export const fetchSessions = createAsyncThunk('settings/fetchSessions', async () => {
  return await settingsService.getSessions();
});

export const revokeSession = createAsyncThunk(
  'settings/revokeSession',
  async (sessionId: number, { dispatch }) => {
    await settingsService.revokeSession(sessionId);
    dispatch(fetchSessions());
    return sessionId;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      // System
      .addCase(fetchSystemSettings.fulfilled, (state, action) => {
        state.system = action.payload;
      })
      .addCase(updateSystemSettings.fulfilled, (state, action) => {
        state.system = { ...state.system, ...action.payload } as SystemSettings;
      })
      // Email
      .addCase(fetchEmailSettings.fulfilled, (state, action) => {
        state.email = action.payload;
      })
      .addCase(updateEmailSettings.fulfilled, (state, action) => {
        state.email = { ...state.email, ...action.payload } as EmailSettings;
      })
      // Sessions
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
      })
      .addCase(revokeSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
      })
      // Loading states
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Something went wrong';
        }
      );
  },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer;