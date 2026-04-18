export interface InvoiceItem {
  id?: number;
  courseName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  userId: number;
  enrollmentId: number | null;
  couponId: number | null;
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'refunded' | 'cancelled';
  issuedAt: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
  enrollment?: {
    id: number;
    course?: {
      title: string;
    };
  };
  items?: InvoiceItem[];
}

export interface CreateInvoiceRequest {
  invoiceNumber: string;
  userId: number;
  enrollmentId?: number | null;
  couponId?: number | null;
  subtotal: number;
  discount?: number;
  total: number;
  status?: 'pending' | 'paid' | 'refunded' | 'cancelled';
  issuedAt?: string;
  items: InvoiceItem[];
}

export interface UpdateInvoiceRequest {
  status?: 'pending' | 'paid' | 'refunded' | 'cancelled';
  paidAt?: string | null;
  items?: InvoiceItem[];
}

export interface InvoiceListResponse {
  data: Invoice[];
  total: number;
}

export interface InvoiceQueryParams {
  page?: number;
  limit?: number;
  userId?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}