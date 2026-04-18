import apiClient from '../client';
import type {
  Payout,
  CreatePayoutRequest,
  UpdatePayoutRequest,
  PayoutListResponse,
  PayoutQueryParams,
} from '../../types/payout.types';

export const payoutService = {
  getPayouts: (params: PayoutQueryParams) =>
    apiClient.get<PayoutListResponse>('/payouts', { params }).then((res) => res.data),

  getPayoutById: (id: number) =>
    apiClient.get<Payout>(`/payouts/${id}`).then((res) => res.data),

  createPayout: (data: CreatePayoutRequest) =>
    apiClient.post<Payout>('/payouts', data).then((res) => res.data),

  updatePayout: (id: number, data: UpdatePayoutRequest) =>
    apiClient.patch<Payout>(`/payouts/${id}`, data).then((res) => res.data),

  deletePayout: (id: number) =>
    apiClient.delete(`/payouts/${id}`),
};