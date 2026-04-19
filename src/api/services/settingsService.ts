import apiClient from '../client';
import type { ProfileSettings, SystemSettings, EmailSettings, Session, ChangePasswordRequest } from '../../types/settings.types';

export const settingsService = {
  // Profile
  getProfile: () => apiClient.get<ProfileSettings>('/users/me').then((res) => res.data),
  updateProfile: (data: Partial<ProfileSettings>) =>
    apiClient.put<ProfileSettings>('/users/me', data).then((res) => res.data),

  // Password
  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post('/auth/change-password', data).then((res) => res.data),

  // System Settings
  getSystemSettings: () => apiClient.get<SystemSettings>('/settings/system').then((res) => res.data),
  updateSystemSettings: (data: Partial<SystemSettings>) =>
    apiClient.put('/settings/system', data).then((res) => res.data),

  // Email Settings
  getEmailSettings: () => apiClient.get<EmailSettings>('/settings/email').then((res) => res.data),
  updateEmailSettings: (data: Partial<EmailSettings>) =>
    apiClient.put('/settings/email', data).then((res) => res.data),

  // Sessions
  getSessions: () => apiClient.get<Session[]>('/auth/sessions').then((res) => res.data),
  revokeSession: (sessionId: number) => apiClient.delete(`/auth/sessions/${sessionId}`),
};