import apiClient from '../client';
import type{
  Coupon,
  CreateCouponRequest,
  UpdateCouponRequest,
  CouponListResponse,
  CouponQueryParams,
} from '../../types/coupon.types';

export const couponService = {
  getCoupons: (params: CouponQueryParams) =>
    apiClient.get<CouponListResponse>('/coupons', { params }).then((res) => res.data),

  getCouponById: (id: number) =>
    apiClient.get<Coupon>(`/coupons/${id}`).then((res) => res.data),

  getCouponByCode: (code: string) =>
    apiClient.get<Coupon>(`/coupons/code/${code}`).then((res) => res.data),

  createCoupon: (data: CreateCouponRequest) =>
    apiClient.post<Coupon>('/coupons', data).then((res) => res.data),

  updateCoupon: (id: number, data: UpdateCouponRequest) =>
    apiClient.patch<Coupon>(`/coupons/${id}`, data).then((res) => res.data),

  deleteCoupon: (id: number) =>
    apiClient.delete(`/coupons/${id}`),
};