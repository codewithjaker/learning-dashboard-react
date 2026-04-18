import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../lib/utils';

interface LineChartProps {
  title: string;
  data: any[];
  dataKey: string;
  nameKey: string;
  isLoading?: boolean;
  currency?: boolean;
}

export function LineChart({ title, data, dataKey, nameKey, isLoading, currency }: LineChartProps) {
//   if (isLoading) return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><div className="h-[300px] animate-pulse bg-muted rounded" /></div></CardContent></Card>;
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={nameKey} />
              <YAxis tickFormatter={(v) => currency ? formatCurrency(v) : v} />
              <Tooltip formatter={(v: number) => currency ? formatCurrency(v) : v} />
              <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}