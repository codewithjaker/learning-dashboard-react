import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchEnrollmentReport } from '../../store/slices/reportSlice';
import { BarChart } from '../../components/charts/BarChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DateRangePicker } from '../../components/common/DateRangePicker';

export default function EnrollmentReport() {
  const dispatch = useDispatch();
  const { enrollments, isLoading } = useSelector((state: RootState) => state.reports);
  const [groupBy, setGroupBy] = useState<'day' | 'month' | 'year'>('month');
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  useEffect(() => {
    dispatch(fetchEnrollmentReport({ ...dateRange, groupBy }));
  }, [dispatch, dateRange, groupBy]);

  // Transform data for stacked bar? For simplicity, show active/completed/refunded separately
  const activeData = enrollments.map(e => ({ period: e.period, count: e.active }));
  const completedData = enrollments.map(e => ({ period: e.period, count: e.completed }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Enrollment Report</h1>
        <div className="flex gap-4">
          <DateRangePicker onChange={setDateRange} />
          <Select value={groupBy} onValueChange={(v: any) => setGroupBy(v)}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <BarChart title="Active Enrollments" data={activeData} dataKey="count" nameKey="period" isLoading={isLoading} />
      <BarChart title="Completed Enrollments" data={completedData} dataKey="count" nameKey="period" isLoading={isLoading} />
    </div>
  );
}