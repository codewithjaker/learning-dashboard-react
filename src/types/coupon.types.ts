export interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  courseId: number | null;
  maxUses: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  course?: {
    id: number;
    title: string;
  };
}

export interface CreateCouponRequest {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  courseId?: number | null;
  maxUses?: number | null;
  validFrom: string;
  validUntil: string;
  isActive?: boolean;
}

export interface UpdateCouponRequest {
  code?: string;
  type?: 'percentage' | 'fixed';
  value?: number;
  courseId?: number | null;
  maxUses?: number | null;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
}

export interface CouponListResponse {
  data: Coupon[];
  total: number;
}

export interface CouponQueryParams {
  page?: number;
  limit?: number;
  code?: string;
  courseId?: number;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}