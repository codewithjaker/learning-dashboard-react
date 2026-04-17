export interface Course {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  fullDescription: string | null;
  image: string;
  previewVideoUrl: string | null;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  category: string;
  tags: string[];
  price: number;
  originalPrice: number | null;
  rating: number;
  totalReviews: number;
  duration: number | null;
  featured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  certification: string | null;
  requirements: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  language: string | null;
  courseProjects: string[];
  courseSoftware: string[];
  courseFeatures: string[];
  instructorId: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  instructor?: {
    id: number;
    fullName: string;
    email: string;
  };
}

export interface CreateCourseRequest {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  fullDescription?: string;
  image: string;
  previewVideoUrl?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  category: string;
  tags?: string[];
  price: number;
  originalPrice?: number;
  certification?: string;
  requirements?: string[];
  learningOutcomes?: string[];
  targetAudience?: string[];
  language?: string;
  courseProjects?: string[];
  courseSoftware?: string[];
  courseFeatures?: string[];
  instructorId: number;
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdateCourseRequest {
  title?: string;
  slug?: string;
  subtitle?: string;
  description?: string;
  fullDescription?: string;
  image?: string;
  previewVideoUrl?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  category?: string;
  tags?: string[];
  price?: number;
  originalPrice?: number;
  certification?: string;
  requirements?: string[];
  learningOutcomes?: string[];
  targetAudience?: string[];
  language?: string;
  courseProjects?: string[];
  courseSoftware?: string[];
  courseFeatures?: string[];
  instructorId?: number;
  status?: 'draft' | 'published' | 'archived';
}

export interface CourseListResponse {
  data: Course[];
  total: number;
}

export interface CourseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  status?: string;
  featured?: boolean;
  instructorId?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Syllabus Section
export interface SyllabusSection {
  id: number;
  courseId: number;
  title: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionRequest {
  courseId: number;
  title: string;
  orderIndex: number;
}

export interface UpdateSectionRequest {
  title?: string;
  orderIndex?: number;
}

// Syllabus Item
export interface SyllabusItem {
  id: number;
  sectionId: number;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'coding' | 'exercise' | 'resource' | 'assignment';
  content: string | null;
  duration: number | null;
  isFree: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  sectionId: number;
  title: string;
  type: SyllabusItem['type'];
  content?: string;
  duration?: number;
  isFree?: boolean;
  orderIndex: number;
}

export interface UpdateItemRequest {
  title?: string;
  type?: SyllabusItem['type'];
  content?: string;
  duration?: number;
  isFree?: boolean;
  orderIndex?: number;
}