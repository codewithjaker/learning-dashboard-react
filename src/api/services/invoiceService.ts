import apiClient from '../client';
import type {
  Invoice,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceListResponse,
  InvoiceQueryParams,
} from '../../types/invoice.types';

export const invoiceService = {
  getInvoices: (params: InvoiceQueryParams) =>
    apiClient.get<InvoiceListResponse>('/invoices', { params }).then((res) => res.data),

  getInvoiceById: (id: number) =>
    apiClient.get<Invoice>(`/invoices/${id}`).then((res) => res.data),

  createInvoice: (data: CreateInvoiceRequest) =>
    apiClient.post<Invoice>('/invoices', data).then((res) => res.data),

  updateInvoice: (id: number, data: UpdateInvoiceRequest) =>
    apiClient.patch<Invoice>(`/invoices/${id}`, data).then((res) => res.data),

  deleteInvoice: (id: number) =>
    apiClient.delete(`/invoices/${id}`),
};