import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchSalesReport } from '../../store/slices/reportSlice';
import { LineChart } from '../../components/charts/LineChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DateRangePicker } from '../../components/common/DateRangePicker';
import { formatCurrency } from '../../lib/utils';

export default function SalesReport() {
  const dispatch = useDispatch();
  const { sales, isLoading } = useSelector((state: RootState) => state.reports);
  const [groupBy, setGroupBy] = useState<'day' | 'month' | 'year'>('month');
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  useEffect(() => {
    dispatch(fetchSalesReport({ ...dateRange, groupBy }));
  }, [dispatch, dateRange, groupBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sales Report</h1>
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

      {sales && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{formatCurrency(sales.summary.totalRevenue)}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Total Enrollments</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{sales.summary.totalEnrollments}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Average Order Value</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{formatCurrency(sales.summary.averageOrderValue)}</div></CardContent></Card>
        </div>
      )}

      <LineChart title="Revenue Trend" data={sales?.data || []} dataKey="totalRevenue" nameKey="period" isLoading={isLoading} currency />
      <LineChart title="Enrollments Trend" data={sales?.data || []} dataKey="totalEnrollments" nameKey="period" isLoading={isLoading} />
    </div>
  );
}