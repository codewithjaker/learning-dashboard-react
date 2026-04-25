export interface ProgressItem {
  id: number;
  itemId: number;
  title: string;
  type: string;
  completed: boolean;
  lastPosition?: number;
  completedAt?: string;
}

export interface CourseProgress {
  courseId: number;
  courseTitle: string;
  totalItems: number;
  completedItems: number;
  percentage: number;
  items: ProgressItem[];
}

export interface UserProgressResponse {
  data: ProgressItem[];
  total: number;
  completed: number;
  percentage: number;
}

export interface UpdateProgressRequest {
  userId: number;
  itemId: number;
  completed?: boolean;
  lastPosition?: number;
}