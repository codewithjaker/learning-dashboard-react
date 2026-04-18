export interface Payout {
  id: number;
  instructorId: number;
  amount: number;
  periodStart: string;
  periodEnd: string;
  status: 'pending' | 'paid' | 'failed';
  paymentMethod: string | null;
  transactionId: string | null;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  instructor?: {
    id: number;
    fullName: string;
    email: string;
  };
}

export interface CreatePayoutRequest {
  instructorId: number;
  amount: number;
  periodStart: string;
  periodEnd: string;
  paymentMethod?: string;
  transactionId?: string;
  notes?: string;
  status?: 'pending' | 'paid' | 'failed';
  paidAt?: string;
}

export interface UpdatePayoutRequest {
  amount?: number;
  paymentMethod?: string;
  transactionId?: string;
  notes?: string;
  status?: 'pending' | 'paid' | 'failed';
  paidAt?: string | null;
}

export interface PayoutListResponse {
  data: Payout[];
  total: number;
}

export interface PayoutQueryParams {
  page?: number;
  limit?: number;
  instructorId?: number;
  status?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}