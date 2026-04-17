import apiClient from '../client';
import type{
  Enrollment,
  CreateEnrollmentRequest,
  UpdateEnrollmentRequest,
  EnrollmentListResponse,
  EnrollmentQueryParams,
} from '../../types/enrollment.types';

export const enrollmentService = {
  getEnrollments: (params: EnrollmentQueryParams) =>
    apiClient.get<EnrollmentListResponse>('/enrollments', { params }).then((res) => res.data),

  getEnrollmentById: (id: number) =>
    apiClient.get<Enrollment>(`/enrollments/${id}`).then((res) => res.data),

  createEnrollment: (data: CreateEnrollmentRequest) =>
    apiClient.post<Enrollment>('/enrollments', data).then((res) => res.data),

  updateEnrollment: (id: number, data: UpdateEnrollmentRequest) =>
    apiClient.patch<Enrollment>(`/enrollments/${id}`, data).then((res) => res.data),

  deleteEnrollment: (id: number) =>
    apiClient.delete(`/enrollments/${id}`),

  completeEnrollment: (id: number) =>
    apiClient.patch<Enrollment>(`/enrollments/${id}/complete`).then((res) => res.data),
};