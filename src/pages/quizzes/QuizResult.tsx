import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {type RootState } from '../../store';
import { fetchQuizResult } from '../../store/slices/quizSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Button } from '../../components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

export default function QuizResult() {
  const { attemptId } = useParams();
  const dispatch = useDispatch();
  const { quizResult, isLoading } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    if (attemptId) dispatch(fetchQuizResult(parseInt(attemptId)));
  }, [dispatch, attemptId]);

  if (isLoading || !quizResult) return <div className="flex justify-center p-8">Loading results...</div>;

  return (
    <div className="container max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quiz Results</h1>
      <Card>
        <CardHeader><CardTitle>Score: {quizResult.score.toFixed(1)}%</CardTitle></CardHeader>
        <CardContent>
          <Progress value={quizResult.score} className="h-3 mb-4" />
          <div className="flex justify-between text-sm">
            <span>Passing Score: {quizResult.passed ? 'Passed' : 'Failed'}</span>
            <span>Earned: {quizResult.earnedPoints} / {quizResult.totalPoints} points</span>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {quizResult.answers.map((ans, idx) => (
          <Card key={ans.questionId}>
            <CardHeader className="flex flex-row items-start justify-between">
              <CardTitle className="text-base">Q{idx+1}. {ans.questionText}</CardTitle>
              {ans.isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
            </CardHeader>
            <CardContent className="space-y-2">
              <div><span className="font-medium">Your answer:</span> {ans.userAnswer || '(No answer)'}</div>
              <div><span className="font-medium">Correct answer:</span> {ans.correctAnswer}</div>
              <div><span className="font-medium">Points earned:</span> {ans.pointsEarned}</div>
              {ans.explanation && <div className="text-sm text-muted-foreground">Explanation: {ans.explanation}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
      <Link to="/my-courses"><Button>Back to My Courses</Button></Link>
    </div>
  );
}