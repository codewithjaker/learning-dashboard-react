export interface User {
  id: number;
  fullName: string;
  email: string;
  avatar: string | null;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
}

export interface Review {
  id: number;
  userId: number;
  courseId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  course?: Course;
}

export interface CreateReviewRequest {
  userId: number;
  courseId: number;
  rating: number;
  comment?: string | null;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string | null;
}

export interface ReviewListResponse {
  data: Review[];
  total: number;
}

export interface ReviewQueryParams {
  page?: number;
  limit?: number;
  courseId?: number;
  userId?: number;
  rating?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}