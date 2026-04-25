/*
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { InvoiceFormDialog } from './InvoiceFormDialog';
import { type RootState } from '../../store';
import {
  fetchInvoices,
  setQueryParams,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../../store/slices/invoiceSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import type { CreateInvoiceRequest, UpdateInvoiceRequest } from '../../types/invoice.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function InvoicesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { invoices, total, isLoading, queryParams } = useSelector((state: RootState) => state.invoices);
  const { users } = useSelector((state: RootState) => state.users);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<any>(null);

  const loadInvoices = useCallback(() => {
    dispatch(fetchInvoices(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadInvoices();
    dispatch(fetchUsers({ page: 1, limit: 100 }));
  }, [dispatch, loadInvoices]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleSearch = (search: string) => {
    dispatch(setQueryParams({ search, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setQueryParams({ status: status || undefined, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleCreate = async (data: CreateInvoiceRequest) => {
    try {
      await dispatch(createInvoice(data)).unwrap();
      //   toast({ title: 'Success', description: 'Invoice created successfully' });
      setFormOpen(false);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: UpdateInvoiceRequest) => {
    if (!selectedInvoice) return;
    try {
      await dispatch(updateInvoice({ id: selectedInvoice.id, data })).unwrap();
      //   toast({ title: 'Success', description: 'Invoice updated successfully' });
      setFormOpen(false);
      setSelectedInvoice(null);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!invoiceToDelete) return;
    try {
      await dispatch(deleteInvoice(invoiceToDelete.id)).unwrap();
      //   toast({ title: 'Success', description: 'Invoice deleted successfully' });
      setDeleteDialogOpen(false);
      setInvoiceToDelete(null);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openCreateDialog = () => {
    setSelectedInvoice(null);
    setFormOpen(true);
  };

  const openEditDialog = (invoice: any) => {
    setSelectedInvoice(invoice);
    setFormOpen(true);
  };

  const openDeleteDialog = (invoice: any) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (invoice: any) => {
    navigate(`/invoices/${invoice.id}`);
  };

  const userOptions = users.map(u => ({ id: u.id, fullName: u.fullName, email: u.email }));

  const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Generate Invoice
        </Button>
      </div>

      <DataTable
        columns={tableColumns}
        data={invoices}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSearch={handleSearch}
        onSort={handleSort}
        searchPlaceholder="Search by invoice number or customer..."
        filters={[
          {
            id: 'status',
            label: 'Status',
            options: [
              { label: 'All', value: '' },
              { label: 'Pending', value: 'pending' },
              { label: 'Paid', value: 'paid' },
              { label: 'Refunded', value: 'refunded' },
              { label: 'Cancelled', value: 'cancelled' },
            ],
            value: queryParams.status || '',
            onChange: handleStatusFilter,
          },
        ]}
        isLoading={isLoading}
      />

      <InvoiceFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        invoice={selectedInvoice}
        onSubmit={selectedInvoice ? handleUpdate : handleCreate}
        isLoading={isLoading}
        users={userOptions}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Invoice"
        description={`Are you sure you want to delete this invoice? This action cannot be undone.`}
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
import { fetchInvoices, setQueryParams, deleteInvoice } from '../../store/slices/invoiceSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { InvoiceFormDialog } from './InvoiceFormDialog';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useToast } from '../../components/ui/use-toast';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function InvoicesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { invoices, total, isLoading, queryParams } = useSelector((state: RootState) => state.invoices);
  const { users } = useSelector((state: RootState) => state.users);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState(queryParams.search || '');

  const loadInvoices = useCallback(() => {
    dispatch(fetchInvoices(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadInvoices();
    dispatch(fetchUsers({ page: 1, limit: 100 }));
  }, [dispatch, loadInvoices]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== queryParams.search) {
        dispatch(setQueryParams({ search: searchInput, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch, queryParams.search]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setQueryParams({ status: status === 'all' ? '' : status, page: 1 }));
  };

  const handleSort = (field: string) => {
    const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
  };

  const openCreateDialog = () => {
    setSelectedInvoice(null);
    setFormOpen(true);
  };

  const openEditDialog = (invoice: any) => {
    setSelectedInvoice(invoice);
    setFormOpen(true);
  };

  const openDeleteDialog = (invoice: any) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!invoiceToDelete) return;
    try {
      await dispatch(deleteInvoice(invoiceToDelete.id)).unwrap();
      // toast({ title: 'Success', description: 'Invoice deleted successfully' });
      setDeleteDialogOpen(false);
      setInvoiceToDelete(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / (queryParams.limit || 10));
  const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
  const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Generate Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number or customer..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={queryParams.status || 'all'}
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead className="cursor-pointer" onClick={() => handleSort('invoiceNumber')}>
                    Invoice # {queryParams.sortBy === 'invoiceNumber' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('total')}>
                    Amount {queryParams.sortBy === 'total' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                    Status {queryParams.sortBy === 'status' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('issuedAt')}>
                    Issued {queryParams.sortBy === 'issuedAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{invoice.user?.fullName || `User ${invoice.userId}`}</div>
                          <div className="text-sm text-muted-foreground">{invoice.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.total)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === 'paid'
                              ? 'success'
                              : invoice.status === 'pending'
                              ? 'warning'
                              : invoice.status === 'refunded'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(invoice.issuedAt)}</TableCell>
                      <TableCell>{invoice.paidAt ? formatDate(invoice.paidAt) : '-'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/invoices/${invoice.id}`)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(invoice)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteDialog(invoice)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
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

      <InvoiceFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        invoice={selectedInvoice}
        onSubmit={selectedInvoice ? (data) => dispatch(updateInvoice({ id: selectedInvoice.id, data })) : (data) => dispatch(createInvoice(data))}
        isLoading={isLoading}
        users={users}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Invoice"
        description={`Are you sure you want to delete invoice "${invoiceToDelete?.invoiceNumber}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}