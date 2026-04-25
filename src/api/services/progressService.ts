import apiClient from '../client';
import type { UserProgressResponse, UpdateProgressRequest, CourseProgress } from '../../types/progress.types';

export const progressService = {
  getCourseProgress: (courseId: number, userId?: number) =>
    apiClient.get<UserProgressResponse>(`/progress?courseId=${courseId}${userId ? `&userId=${userId}` : ''}`).then((res) => res.data),

  updateProgress: (data: UpdateProgressRequest) =>
    apiClient.post('/progress', data).then((res) => res.data),

  getOverallProgress: () =>
    apiClient.get<CourseProgress[]>('/progress/overview').then((res) => res.data),
};