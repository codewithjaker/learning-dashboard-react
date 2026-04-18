import apiClient from '../client';
import type{
  Payment,
  CreatePaymentRequest,
  UpdatePaymentRequest,
  PaymentListResponse,
  PaymentQueryParams,
} from '../../types/payment.types';

export const paymentService = {
  getPayments: (params: PaymentQueryParams) =>
    apiClient.get<PaymentListResponse>('/payments', { params }).then((res) => res.data),

  getPaymentById: (id: number) =>
    apiClient.get<Payment>(`/payments/${id}`).then((res) => res.data),

  createPayment: (data: CreatePaymentRequest) =>
    apiClient.post<Payment>('/payments', data).then((res) => res.data),

  updatePayment: (id: number, data: UpdatePaymentRequest) =>
    apiClient.patch<Payment>(`/payments/${id}`, data).then((res) => res.data),

  deletePayment: (id: number) =>
    apiClient.delete(`/payments/${id}`),

  completePayment: (id: number, data?: { transactionId?: string; receiptNumber?: string }) =>
    apiClient.patch<Payment>(`/payments/${id}/complete`, data).then((res) => res.data),
};