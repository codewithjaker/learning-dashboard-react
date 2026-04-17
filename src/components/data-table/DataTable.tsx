import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';
import { DataTableViewOptions } from './DataTableViewOptions';
import { Skeleton } from '../ui/skeleton';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    total: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    onSearch?: (search: string) => void;
    onSort?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
    searchPlaceholder?: string;
    filters?: Array<{
        id: string;
        label: string;
        options: Array<{ label: string; value: string }>;
        value: string;
        onChange: (value: string) => void;
    }>;
    isLoading?: boolean;
    showToolbar?: boolean;
    showPagination?: boolean;
    enableColumnVisibility?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    total,
    page,
    limit,
    onPageChange,
    onLimitChange,
    onSearch,
    onSort,
    searchPlaceholder = 'Search...',
    filters = [],
    isLoading = false,
    showToolbar = true,
    showPagination = true,
    enableColumnVisibility = true,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(newSorting);
            if (onSort && newSorting.length > 0) {
                const sort = newSorting[0];
                onSort(sort.id, sort.desc ? 'desc' : 'asc');
            }
        },
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: Math.ceil(total / limit),
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((col, idx) => (
                                    <TableHead key={idx}>
                                        <Skeleton className="h-4 w-20" />
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: limit }).map((_, idx) => (
                                <TableRow key={idx}>
                                    {columns.map((_, colIdx) => (
                                        <TableCell key={colIdx}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {showToolbar && (onSearch || filters.length > 0 || enableColumnVisibility) && (
                <div className="flex items-center justify-between">
                    <DataTableToolbar
                        table={table}
                        onSearch={onSearch}
                        searchPlaceholder={searchPlaceholder}
                        filters={filters}
                    />
                    {enableColumnVisibility && <DataTableViewOptions table={table} />}
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {showPagination && (
                <DataTablePagination
                    table={table}
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                />
            )}
        </div>
    );
}