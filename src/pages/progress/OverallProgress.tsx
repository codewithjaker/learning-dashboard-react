import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {type RootState } from '../../store';
import { fetchOverallProgress } from '../../store/slices/progressSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Button } from '../../components/ui/button';

export default function OverallProgress() {
  const dispatch = useDispatch();
  const { overallProgress, isLoading } = useSelector((state: RootState) => state.progress);

  useEffect(() => {
    dispatch(fetchOverallProgress());
  }, [dispatch]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading your progress...</div>;
  }

  if (overallProgress.length === 0) {
    return (
      <div className="text-center p-8">
        <p>You are not enrolled in any courses yet.</p>
        <Link to="/courses"><Button className="mt-4">Browse Courses</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Learning Progress</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {overallProgress.map((course) => (
          <Link key={course.courseId} to={`/progress/${course.courseId}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{course.courseTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{course.completedItems} / {course.totalItems} items</span>
                  <span>{course.percentage}%</span>
                </div>
                <Progress value={course.percentage} className="h-2" />
                <Button variant="ghost" size="sm" className="w-full mt-4">Continue Learning</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}