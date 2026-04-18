import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { type Invoice } from '../../types/invoice.types';
import { formatDate, formatCurrency } from '../../lib/utils';

export const columns = (
    onView: (invoice: Invoice) => void,
    onEdit: (invoice: Invoice) => void,
    onDelete: (invoice: Invoice) => void
): ColumnDef<Invoice>[] => [
        {
            accessorKey: 'invoiceNumber',
            header: 'Invoice #',
        },
        {
            accessorKey: 'user',
            header: 'Customer',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.user?.fullName || '-'}</div>
                    <div className="text-sm text-muted-foreground">{row.original.user?.email || '-'}</div>
                </div>
            ),
        },
        {
            accessorKey: 'total',
            header: 'Amount',
            cell: ({ row }) => formatCurrency(row.original.total),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.status;
                const variants = {
                    pending: 'warning',
                    paid: 'success',
                    refunded: 'secondary',
                    cancelled: 'destructive',
                };
                return <Badge variant={variants[status] as any}>{status}</Badge>;
            },
        },
        {
            accessorKey: 'issuedAt',
            header: 'Issued',
            cell: ({ row }) => formatDate(row.original.issuedAt),
        },
        {
            accessorKey: 'paidAt',
            header: 'Paid',
            cell: ({ row }) => row.original.paidAt ? formatDate(row.original.paidAt) : '-',
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const invoice = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onView(invoice)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(invoice)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete(invoice)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];