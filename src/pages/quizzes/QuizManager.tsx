import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { fetchQuiz, updateQuiz, deleteQuiz } from '../../store/slices/quizSlice';
import { QuizForm } from './QuizForm';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useToast } from '../../components/ui/use-toast';

export default function QuizManager() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentQuiz, isLoading } = useSelector((state: RootState) => state.quiz);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (quizId && !currentQuiz) dispatch(fetchQuiz(parseInt(quizId)));
  }, [dispatch, quizId, currentQuiz]);

  const handleUpdate = async (data: any) => {
    await dispatch(updateQuiz({ id: currentQuiz!.id, data })).unwrap();
    toast({ title: 'Quiz updated' });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteQuiz(currentQuiz!.id)).unwrap();
    toast({ title: 'Quiz deleted' });
    navigate('/courses');
  };

  if (isLoading || !currentQuiz) return <div className="flex justify-center p-8">Loading...</div>;

  if (isEditing) return <QuizForm initialData={currentQuiz} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} />;

  return (
    <div className="container max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsEditing(true)}>Edit Quiz</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete Quiz</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-2">
          <p><strong>Description:</strong> {currentQuiz.description || 'No description'}</p>
          <p><strong>Time Limit:</strong> {currentQuiz.timeLimit ? `${currentQuiz.timeLimit} minutes` : 'No limit'}</p>
          <p><strong>Passing Score:</strong> {currentQuiz.passingScore}%</p>
          <p><strong>Max Attempts:</strong> {currentQuiz.maxAttempts}</p>
          <p><strong>Questions:</strong> {currentQuiz.questions?.length || 0}</p>
        </CardContent>
      </Card>
    </div>
  );
}