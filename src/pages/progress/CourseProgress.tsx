import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {type  RootState } from '../../store';
import { fetchCourseProgress, updateItemProgress } from '../../store/slices/progressSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Checkbox } from '../../components/ui/checkbox';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Video, FileText, HelpCircle, Code, PenTool, File } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { useToast } from '../../components/ui/use-toast';

const itemIcons = {
  video: Video,
  article: FileText,
  quiz: HelpCircle,
  coding: Code,
  assignment: PenTool,
  resource: File,
  exercise: File,
};

export default function CourseProgress() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentProgress, isLoading } = useSelector((state: RootState) => state.progress);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseProgress({ courseId: parseInt(courseId) }));
    }
  }, [dispatch, courseId]);

  const handleToggleComplete = async (itemId: number, completed: boolean) => {
    setUpdating(itemId);
    try {
      await dispatch(updateItemProgress({
        userId: 0, // backend will use authenticated user
        itemId,
        completed: !completed,
      })).unwrap();
    //   toast({ title: 'Progress updated', description: `Item marked as ${!completed ? 'completed' : 'incomplete'}` });
    } catch (error) {
    //   toast({ title: 'Error', description: 'Failed to update progress', variant: 'destructive' });
    } finally {
      setUpdating(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading progress...</div>;
  }

  if (!currentProgress) {
    return <div className="text-center p-8">No progress data found for this course.</div>;
  }

  const totalItems = currentProgress.total;
  const completedItems = currentProgress.completed;
  const percentage = currentProgress.percentage;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/my-courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Courses
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Course Progress</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{completedItems} of {totalItems} items completed</span>
            <span>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentProgress.data.map((item) => {
              const Icon = itemIcons[item.type as keyof typeof itemIcons] || File;
              return (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        {item.completedAt && (
                          <span className="text-xs text-muted-foreground">Completed {formatDate(item.completedAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => handleToggleComplete(item.itemId, item.completed)}
                      disabled={updating === item.itemId}
                    />
                    <span className="text-sm text-muted-foreground">
                      {updating === item.itemId ? 'Updating...' : (item.completed ? 'Completed' : 'Mark complete')}
                    </span>
                  </div>
                </div>
              );
            })}
            {currentProgress.data.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No items found in this course.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}