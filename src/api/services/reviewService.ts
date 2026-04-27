import apiClient from '../client';
import type { Review, CreateReviewRequest, UpdateReviewRequest, ReviewListResponse, ReviewQueryParams } from '../../types/review.types';

export const reviewService = {
  // Get reviews with pagination and filters
  getReviews: (params: ReviewQueryParams) =>
    apiClient.get<ReviewListResponse>('/reviews', { params }).then((res) => res.data),

  // Get a single review by ID
  getReviewById: (id: number) =>
    apiClient.get<Review>(`/reviews/${id}`).then((res) => res.data),

  // Create a new review
  createReview: (data: CreateReviewRequest) =>
    apiClient.post<Review>('/reviews', data).then((res) => res.data),

  // Update an existing review
  updateReview: (id: number, data: UpdateReviewRequest) =>
    apiClient.patch<Review>(`/reviews/${id}`, data).then((res) => res.data),

  // Delete a review
  deleteReview: (id: number) =>
    apiClient.delete(`/reviews/${id}`),
};