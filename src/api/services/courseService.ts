import apiClient from '../client';
import type{
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseListResponse,
  CourseQueryParams,
  SyllabusSection,
  CreateSectionRequest,
  UpdateSectionRequest,
  SyllabusItem,
  CreateItemRequest,
  UpdateItemRequest,
} from '../../types/course.types';

export const courseService = {
  // Course CRUD
  getCourses: (params: CourseQueryParams) =>
    apiClient.get<CourseListResponse>('/courses', { params }).then((res) => res.data),

  getCourseById: (id: number) =>
    apiClient.get<Course>(`/courses/${id}`).then((res) => res.data),

  getCourseBySlug: (slug: string) =>
    apiClient.get<Course>(`/courses/slug/${slug}`).then((res) => res.data),

  createCourse: (data: CreateCourseRequest) =>
    apiClient.post<Course>('/courses', data).then((res) => res.data),

  updateCourse: (id: number, data: UpdateCourseRequest) =>
    apiClient.patch<Course>(`/courses/${id}`, data).then((res) => res.data),

  deleteCourse: (id: number) =>
    apiClient.delete(`/courses/${id}`),

  publishCourse: (id: number) =>
    apiClient.patch<Course>(`/courses/${id}/publish`).then((res) => res.data),

  // Syllabus Sections
  getSectionsByCourse: (courseId: number, params?: { page?: number; limit?: number }) =>
    apiClient.get<{ data: SyllabusSection[]; total: number }>('/syllabus-sections', {
      params: { courseId, ...params },
    }).then((res) => res.data),

  createSection: (data: CreateSectionRequest) =>
    apiClient.post<SyllabusSection>('/syllabus-sections', data).then((res) => res.data),

  updateSection: (id: number, data: UpdateSectionRequest) =>
    apiClient.patch<SyllabusSection>(`/syllabus-sections/${id}`, data).then((res) => res.data),

  deleteSection: (id: number) =>
    apiClient.delete(`/syllabus-sections/${id}`),

  // Syllabus Items
  getItemsBySection: (sectionId: number, params?: { page?: number; limit?: number }) =>
    apiClient.get<{ data: SyllabusItem[]; total: number }>('/syllabus-items', {
      params: { sectionId, ...params },
    }).then((res) => res.data),

  createItem: (data: CreateItemRequest) =>
    apiClient.post<SyllabusItem>('/syllabus-items', data).then((res) => res.data),

  updateItem: (id: number, data: UpdateItemRequest) =>
    apiClient.patch<SyllabusItem>(`/syllabus-items/${id}`, data).then((res) => res.data),

  deleteItem: (id: number) =>
    apiClient.delete(`/syllabus-items/${id}`),
};