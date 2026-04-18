import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchCourseReport } from '../../store/slices/reportSlice';
import { DataTable } from '../../components/data-table/DataTable';
import { type ColumnDef } from '@tanstack/react-table';
import { type CourseReportData } from '../../types/report.types';
import { formatCurrency } from '../../lib/utils';

const columns: ColumnDef<CourseReportData>[] = [
  { accessorKey: 'title', header: 'Course' },
  { accessorKey: 'enrollments', header: 'Enrollments' },
  { accessorKey: 'completed', header: 'Completed' },
  { accessorKey: 'revenue', header: 'Revenue', cell: ({ row }) => formatCurrency(row.original.revenue) },
  { accessorKey: 'averageRating', header: 'Avg Rating', cell: ({ row }) => row.original.averageRating.toFixed(1) },
];

export default function CourseReport() {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    dispatch(fetchCourseReport());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Course Performance Report</h1>
      <DataTable columns={columns} data={courses} total={courses.length} page={1} limit={100} onPageChange={() => {}} onLimitChange={() => {}} isLoading={isLoading} />
    </div>
  );
}