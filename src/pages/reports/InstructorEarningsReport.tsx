import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchInstructorEarnings } from '../../store/slices/reportSlice';
import { DataTable } from '../../components/data-table/DataTable';
import { type ColumnDef } from '@tanstack/react-table';
import { type InstructorEarningsData } from '../../types/report.types';
import { formatCurrency } from '../../lib/utils';

const columns: ColumnDef<InstructorEarningsData>[] = [
    { accessorKey: 'name', header: 'Instructor' },
    { accessorKey: 'totalEarned', header: 'Total Earned', cell: ({ row }) => formatCurrency(row.original.totalEarned) },
    { accessorKey: 'pendingPayout', header: 'Pending Payout', cell: ({ row }) => formatCurrency(row.original.pendingPayout) },
    { accessorKey: 'paidOut', header: 'Paid Out', cell: ({ row }) => formatCurrency(row.original.paidOut) },
];

export default function InstructorEarningsReport() {
    const dispatch = useDispatch();
    const { instructorEarnings, isLoading } = useSelector((state: RootState) => state.reports);

    useEffect(() => {
        dispatch(fetchInstructorEarnings());
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Instructor Earnings Report</h1>
            <DataTable columns={columns} data={instructorEarnings} total={instructorEarnings.length} page={1} limit={100} onPageChange={() => { }} onLimitChange={() => { }} isLoading={isLoading} />
        </div>
    );
}