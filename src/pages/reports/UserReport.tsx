import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {type RootState } from '../../store';
import { fetchUserReport } from '../../store/slices/reportSlice';
import { LineChart } from '../../components/charts/LineChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DateRangePicker } from '../../components/common/DateRangePicker';

export default function UserReport() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state: RootState) => state.reports);
  const [groupBy, setGroupBy] = useState<'day' | 'month' | 'year'>('month');
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  useEffect(() => {
    dispatch(fetchUserReport({ ...dateRange, groupBy }));
  }, [dispatch, dateRange, groupBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Report</h1>
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

      {users && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader><CardTitle>Total Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{users.summary.totalUsers}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Students</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{users.summary.totalStudents}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Instructors</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{users.summary.totalInstructors}</div></CardContent></Card>
        </div>
      )}

      <LineChart title="New Users Trend" data={users?.data || []} dataKey="newUsers" nameKey="period" isLoading={isLoading} />
      <LineChart title="New Students vs Instructors" data={users?.data || []} dataKey="newStudents" nameKey="period" isLoading={isLoading} />
    </div>
  );
}