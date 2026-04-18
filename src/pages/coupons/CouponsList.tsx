import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { CouponFormDialog } from './CouponFormDialog';
import {type RootState } from '../../store';
import {
  fetchCoupons,
  setQueryParams,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../../store/slices/couponSlice';
import { fetchCourses } from '../../store/slices/courseSlice';
import type { CreateCouponRequest, UpdateCouponRequest } from '../../types/coupon.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function CouponsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { coupons, total, isLoading, queryParams } = useSelector((state: RootState) => state.coupons);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<any>(null);

  const loadCoupons = useCallback(() => {
    dispatch(fetchCoupons(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadCoupons();
    dispatch(fetchCourses({ page: 1, limit: 100 }));
  }, [dispatch, loadCoupons]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleCodeFilter = (code: string) => {
    dispatch(setQueryParams({ code: code || undefined, page: 1 }));
  };

  const handleStatusFilter = (isActive: string) => {
    dispatch(setQueryParams({ isActive: isActive === '' ? undefined : isActive === 'true', page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleCreate = async (data: CreateCouponRequest) => {
    try {
      await dispatch(createCoupon(data)).unwrap();
    //   toast({ title: 'Success', description: 'Coupon created successfully' });
      setFormOpen(false);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: UpdateCouponRequest) => {
    if (!selectedCoupon) return;
    try {
      await dispatch(updateCoupon({ id: selectedCoupon.id, data })).unwrap();
    //   toast({ title: 'Success', description: 'Coupon updated successfully' });
      setFormOpen(false);
      setSelectedCoupon(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!couponToDelete) return;
    try {
      await dispatch(deleteCoupon(couponToDelete.id)).unwrap();
    //   toast({ title: 'Success', description: 'Coupon deleted successfully' });
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openCreateDialog = () => {
    setSelectedCoupon(null);
    setFormOpen(true);
  };

  const openEditDialog = (coupon: any) => {
    setSelectedCoupon(coupon);
    setFormOpen(true);
  };

  const openDeleteDialog = (coupon: any) => {
    setCouponToDelete(coupon);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (coupon: any) => {
    navigate(`/coupons/${coupon.id}`);
  };

  const courseOptions = courses.map(c => ({ id: c.id, title: c.title }));

  const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Coupons Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Create Coupon
        </Button>
      </div>

      <DataTable
        columns={tableColumns}
        data={coupons}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSearch={handleCodeFilter}
        onSort={handleSort}
        searchPlaceholder="Search by coupon code..."
        filters={[
          {
            id: 'isActive',
            label: 'Status',
            options: [
              { label: 'All', value: '' },
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ],
            value: queryParams.isActive === undefined ? '' : queryParams.isActive.toString(),
            onChange: handleStatusFilter,
          },
        ]}
        isLoading={isLoading}
      />

      <CouponFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        coupon={selectedCoupon}
        onSubmit={selectedCoupon ? handleUpdate : handleCreate}
        isLoading={isLoading}
        courses={courseOptions}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Coupon"
        description={`Are you sure you want to delete coupon "${couponToDelete?.code}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}