import apiClient from '../client';
import type { Quiz, QuizAttempt, QuizResult, SubmitQuizData } from '../../types/quiz.types';

export const quizService = {
  // Instructor/Admin
  getQuizById: (id: number) => apiClient.get<Quiz>(`/quizzes/${id}`).then(res => res.data),
  getQuizBySyllabusItem: (syllabusItemId: number) => apiClient.get<Quiz>(`/quizzes/syllabus-item/${syllabusItemId}`).then(res => res.data),
  createQuiz: (data: Partial<Quiz>) => apiClient.post<Quiz>('/quizzes', data).then(res => res.data),
  updateQuiz: (id: number, data: Partial<Quiz>) => apiClient.put<Quiz>(`/quizzes/${id}`, data).then(res => res.data),
  deleteQuiz: (id: number) => apiClient.delete(`/quizzes/${id}`),

  // Student
  startQuiz: (quizId: number) => apiClient.post<QuizAttempt>(`/quizzes/${quizId}/start`).then(res => res.data),
  submitQuiz: (attemptId: number, data: SubmitQuizData) => apiClient.post<{ attemptId: number; score: number; passed: boolean }>(`/quizzes/attempts/${attemptId}/submit`, data).then(res => res.data),
  getQuizResult: (attemptId: number) => apiClient.get<QuizResult>(`/quizzes/attempts/${attemptId}/result`).then(res => res.data),
  getAttemptHistory: (quizId: number) => apiClient.get<QuizAttempt[]>(`/quizzes/${quizId}/history`).then(res => res.data),
};