export interface ProfileSettings {
  fullName: string;
  bio: string | null;
  avatar: string | null;
}

export interface SystemSettings {
  siteName: string;
  siteLogo: string | null;
  siteDescription: string;
  contactEmail: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  enableRegistration: boolean;
  enableEmailVerification: boolean;
  maintenanceMode: boolean;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  fromName: string;
}

export interface Session {
  id: number;
  userAgent: string | null;
  ipAddress: string | null;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}