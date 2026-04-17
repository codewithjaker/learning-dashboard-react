import apiClient from '../client';
import type{
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '../types';

export const authService = {
  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', data).then((res) => res.data),

  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', data).then((res) => res.data),

  refreshToken: (refreshToken: string) =>
    apiClient.post<{ accessToken: string }>('/auth/refresh-token', { refreshToken }).then((res) => res.data),

  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refreshToken }),

  logoutAll: () =>
    apiClient.post('/auth/logout-all'),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post('/auth/forgot-password', data).then((res) => res.data),

  verifyOtp: (data: VerifyOtpRequest) =>
    apiClient.post('/auth/verify-otp', data).then((res) => res.data),

  resendOtp: (data: ForgotPasswordRequest) =>
    apiClient.post('/auth/resend-otp', data).then((res) => res.data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post('/auth/reset-password', data).then((res) => res.data),

  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post('/auth/change-password', data).then((res) => res.data),

  verifyEmail: (token: string) =>
    apiClient.get(`/auth/verify-email?token=${token}`).then((res) => res.data),

  resendVerification: (email: string) =>
    apiClient.post('/auth/resend-verification', { email }).then((res) => res.data),

  getSessions: () =>
    apiClient.get('/auth/sessions').then((res) => res.data),

  revokeSession: (sessionId: number) =>
    apiClient.delete(`/auth/sessions/${sessionId}`),
};