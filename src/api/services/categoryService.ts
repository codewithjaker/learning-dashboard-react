import apiClient from '../client';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest, CategoryListResponse, CategoryQueryParams } from '../../types/category.types';

export const categoryService = {
  getCategories: (params: CategoryQueryParams) =>
    apiClient.get<CategoryListResponse>('/categories', { params }).then((res) => res.data),

  getCategoryById: (id: number) =>
    apiClient.get<Category>(`/categories/${id}`).then((res) => res.data),

  getCategoryBySlug: (slug: string) =>
    apiClient.get<Category>(`/categories/slug/${slug}`).then((res) => res.data),

  createCategory: (data: CreateCategoryRequest) =>
    apiClient.post<Category>('/categories', data).then((res) => res.data),

  updateCategory: (id: number, data: UpdateCategoryRequest) =>
    apiClient.patch<Category>(`/categories/${id}`, data).then((res) => res.data),

  deleteCategory: (id: number) =>
    apiClient.delete(`/categories/${id}`),
};