export interface Payment {
  id: number;
  invoiceId: number;
  amount: number;
  paymentMethod: 'sslcommerz' | 'stripe' | 'paypal' | 'cash' | 'bank_transfer';
  transactionId: string | null;
  gatewayResponse: string | null;
  receiptNumber: string | null;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paidAt: string | null;
  installmentNumber: number | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  invoice?: {
    id: number;
    invoiceNumber: string;
    total: number;
    user?: {
      id: number;
      fullName: string;
      email: string;
    };
  };
}

export interface CreatePaymentRequest {
  invoiceId: number;
  amount: number;
  paymentMethod: Payment['paymentMethod'];
  transactionId?: string;
  gatewayResponse?: string;
  receiptNumber?: string;
  status?: Payment['status'];
  paidAt?: string;
  installmentNumber?: number;
  note?: string;
}

export interface UpdatePaymentRequest {
  amount?: number;
  paymentMethod?: Payment['paymentMethod'];
  transactionId?: string;
  gatewayResponse?: string;
  receiptNumber?: string;
  status?: Payment['status'];
  paidAt?: string | null;
  installmentNumber?: number | null;
  note?: string | null;
}

export interface PaymentListResponse {
  data: Payment[];
  total: number;
}

export interface PaymentQueryParams {
  page?: number;
  limit?: number;
  invoiceId?: number;
  userId?: number;
  status?: string;
  paymentMethod?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}