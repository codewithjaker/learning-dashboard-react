export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  status: 'active' | 'completed' | 'refunded';
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
  course?: {
    id: number;
    title: string;
    slug: string;
  };
}

export interface CreateEnrollmentRequest {
  userId: number;
  courseId: number;
  status?: 'active' | 'completed' | 'refunded';
}

export interface UpdateEnrollmentRequest {
  status?: 'active' | 'completed' | 'refunded';
  completedAt?: string | null;
}

export interface EnrollmentListResponse {
  data: Enrollment[];
  total: number;
}

export interface EnrollmentQueryParams {
  page?: number;
  limit?: number;
  userId?: number;
  courseId?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}