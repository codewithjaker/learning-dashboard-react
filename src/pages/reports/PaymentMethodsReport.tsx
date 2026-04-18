import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchPaymentMethodReport } from '../../store/slices/reportSlice';
import { PieChart } from '../../components/charts/PieChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { DateRangePicker } from '../../components/common/DateRangePicker';
import { formatCurrency } from '../../lib/utils';

export default function PaymentMethodsReport() {
  const dispatch = useDispatch();
  const { paymentMethods, isLoading } = useSelector((state: RootState) => state.reports);
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  useEffect(() => {
    dispatch(fetchPaymentMethodReport(dateRange));
  }, [dispatch, dateRange]);

  const pieData = paymentMethods.map(m => ({ name: m.method, value: m.totalAmount }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Methods Report</h1>
        <DateRangePicker onChange={setDateRange} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PieChart title="Revenue by Payment Method" data={pieData} isLoading={isLoading} />
        <div className="space-y-4">
          {paymentMethods.map((m) => (
            <Card key={m.method}>
              <CardHeader><CardTitle className="capitalize">{m.method}</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(m.totalAmount)}</div>
                <div className="text-sm text-muted-foreground">{m.count} transactions</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}