import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchPaymentReport } from '../../store/slices/reportSlice';
import { LineChart } from '../../components/charts/LineChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DateRangePicker } from '../../components/common/DateRangePicker';

export default function PaymentReport() {
  const dispatch = useDispatch();
  const { payments, isLoading } = useSelector((state: RootState) => state.reports);
  const [groupBy, setGroupBy] = useState<'day' | 'month' | 'year'>('month');
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  useEffect(() => {
    dispatch(fetchPaymentReport({ ...dateRange, groupBy }));
  }, [dispatch, dateRange, groupBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Report</h1>
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
      <LineChart title="Payment Amount Trend" data={payments} dataKey="totalAmount" nameKey="period" isLoading={isLoading} currency />
      <LineChart title="Payment Count Trend" data={payments} dataKey="count" nameKey="period" isLoading={isLoading} />
    </div>
  );
}