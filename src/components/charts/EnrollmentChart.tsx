import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {type EnrollmentData } from '../../types/dashboard.types';

export function EnrollmentChart({ data, isLoading }: { data: EnrollmentData[]; isLoading: boolean }) {
//   if (isLoading) return <Card><CardHeader><CardTitle>Enrollment Trend</CardTitle></CardHeader><CardContent><div className="h-[300px] animate-pulse bg-muted rounded" /></div></CardContent></Card>;
  return (
    <Card>
      <CardHeader><CardTitle>Enrollment Trend</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}