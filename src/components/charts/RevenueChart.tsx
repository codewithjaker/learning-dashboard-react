import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {type RevenueData } from '../../types/dashboard.types';
import { formatCurrency } from '../../lib/utils';

export function RevenueChart({ data, isLoading }: { data: RevenueData[]; isLoading: boolean }) {
//   if (isLoading) return <Card><CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader><CardContent><div className="h-[300px] animate-pulse bg-muted rounded" /></div></CardContent></Card>;
  return (
    <Card>
      <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}