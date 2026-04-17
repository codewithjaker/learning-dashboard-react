export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  children?: Category[]; // for tree view
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: number | null;
}

export interface UpdateCategoryRequest {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  parentId?: number | null;
}

export interface CategoryListResponse {
  data: Category[];
  total: number;
}

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  parentId?: number | null;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}