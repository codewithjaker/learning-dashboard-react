export interface User {
  id: number;
  email: string;
  fullName: string;
  bio: string | null;
  avatar: string | null;
  role: 'student' | 'instructor' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  role?: 'student' | 'instructor' | 'admin';
  isActive?: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  bio?: string;
  avatar?: string;
  role?: 'student' | 'instructor' | 'admin';
  isActive?: boolean;
}

export interface UserListResponse {
  data: User[];
  total: number;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}