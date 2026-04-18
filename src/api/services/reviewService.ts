import apiClient from '../client';
import type{
  Review,
  ReviewListResponse,
  ReviewQueryParams,
} from '../../types/review.types';

export const reviewService = {
  getReviews: (params: ReviewQueryParams) =>
    apiClient.get<ReviewListResponse>('/reviews', { params }).then((res) => res.data),

  getReviewById: (id: number) =>
    apiClient.get<Review>(`/reviews/${id}`).then((res) => res.data),

  deleteReview: (id: number) =>
    apiClient.delete(`/reviews/${id}`),
};