/*
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

*/

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { MoreHorizontal, Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { type RootState } from '../../store';
import { fetchCoupons, setQueryParams, deleteCoupon } from '../../store/slices/couponSlice';
import { CouponFormDialog } from './CouponFormDialog';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useToast } from '../../components/ui/use-toast';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function CouponsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { coupons, total, isLoading, queryParams } = useSelector((state: RootState) => state.coupons);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState(queryParams.code || '');

  const loadCoupons = useCallback(() => {
    dispatch(fetchCoupons(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== queryParams.code) {
        dispatch(setQueryParams({ code: searchInput, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch, queryParams.code]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleStatusFilter = (isActive: string) => {
    const activeBool = isActive === 'all' ? undefined : isActive === 'active';
    dispatch(setQueryParams({ isActive: activeBool, page: 1 }));
  };

  const handleSort = (field: string) => {
    const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
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

  const handleDelete = async () => {
    if (!couponToDelete) return;
    try {
      await dispatch(deleteCoupon(couponToDelete.id)).unwrap();
      // toast({ title: 'Success', description: 'Coupon deleted successfully' });
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / (queryParams.limit || 10));
  const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
  const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

  // Helper to check if coupon is expired or not yet valid
  const getValidityStatus = (coupon: any) => {
    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validUntil = new Date(coupon.validUntil);
    if (now < validFrom) return 'upcoming';
    if (now > validUntil) return 'expired';
    return 'active';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Coupons Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Create Coupon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by coupon code..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={queryParams.isActive === undefined ? 'all' : queryParams.isActive ? 'active' : 'inactive'}
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(queryParams.limit || 10)}
              onValueChange={(v) => handleLimitChange(Number(v))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('code')}>
                    Code {queryParams.sortBy === 'code' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Created {queryParams.sortBy === 'createdAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : coupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No coupons found
                    </TableCell>
                  </TableRow>
                ) : (
                  coupons.map((coupon) => {
                    const validityStatus = getValidityStatus(coupon);
                    return (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-mono font-medium">
                          {coupon.code}
                        </TableCell>
                        <TableCell>
                          {coupon.type === 'percentage'
                            ? `${coupon.value}%`
                            : formatCurrency(coupon.value)}
                        </TableCell>
                        <TableCell>
                          {coupon.course?.title || 'All Courses'}
                        </TableCell>
                        <TableCell>
                          {coupon.usedCount}
                          {coupon.maxUses ? ` / ${coupon.maxUses}` : ''}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{formatDate(coupon.validFrom)}</div>
                            <div className="text-muted-foreground">to</div>
                            <div>{formatDate(coupon.validUntil)}</div>
                          </div>
                          {validityStatus === 'expired' && (
                            <Badge variant="destructive" className="mt-1">Expired</Badge>
                          )}
                          {validityStatus === 'upcoming' && (
                            <Badge variant="warning" className="mt-1">Upcoming</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={coupon.isActive ? 'success' : 'secondary'}>
                            {coupon.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(coupon.createdAt)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => navigate(`/coupons/${coupon.id}`)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditDialog(coupon)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openDeleteDialog(coupon)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {total} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange((queryParams.page || 1) - 1)}
                      className={queryParams.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    const currentPage = queryParams.page || 1;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange((queryParams.page || 1) + 1)}
                      className={queryParams.page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <CouponFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        coupon={selectedCoupon}
        onSubmit={selectedCoupon ? (data) => dispatch(updateCoupon({ id: selectedCoupon.id, data })) : (data) => dispatch(createCoupon(data))}
        isLoading={isLoading}
        courses={[] /* Add courses from state if needed */}
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