import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {type RootState } from '../../store';
import { fetchQuiz, startQuiz, submitQuiz } from '../../store/slices/quizSlice';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Progress } from '../../components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { useToast } from '../../components/ui/use-toast';

export default function TakeQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentQuiz, currentAttempt, isLoading } = useSelector((state: RootState) => state.quiz);
  const [answers, setAnswers] = useState<Record<number, { optionId?: number; text?: string }>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (quizId) dispatch(fetchQuiz(parseInt(quizId)));
  }, [dispatch, quizId]);

  useEffect(() => {
    if (currentQuiz && !currentAttempt) {
      dispatch(startQuiz(currentQuiz.id)).unwrap().then(() => {
        // toast({ title: 'Quiz started', description: 'Good luck!' });
      });
    }
  }, [currentQuiz, currentAttempt, dispatch, toast]);

  useEffect(() => {
    if (currentQuiz?.timeLimit && currentAttempt?.startedAt) {
      const start = new Date(currentAttempt.startedAt).getTime();
      const limit = currentQuiz.timeLimit * 60 * 1000;
      const interval = setInterval(() => {
        const remaining = limit - (Date.now() - start);
        if (remaining <= 0) {
          clearInterval(interval);
          handleAutoSubmit();
        } else {
          setTimeLeft(Math.floor(remaining / 1000));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuiz, currentAttempt]);

  const handleAutoSubmit = async () => {
    if (!currentAttempt) return;
    const answerList = Object.entries(answers).map(([qId, ans]) => ({
      questionId: parseInt(qId),
      selectedOptionId: ans.optionId,
      textAnswer: ans.text,
    }));
    await dispatch(submitQuiz({ attemptId: currentAttempt.id, data: { answers: answerList } })).unwrap();
    // toast({ title: 'Time expired', description: 'Your quiz has been auto-submitted.' });
    navigate(`/quiz/result/${currentAttempt.id}`);
  };

  const handleAnswerChange = (questionId: number, optionId?: number, text?: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: { optionId, text } }));
  };

  const handleSubmit = async () => {
    if (!currentAttempt) return;
    const answerList = Object.entries(answers).map(([qId, ans]) => ({
      questionId: parseInt(qId),
      selectedOptionId: ans.optionId,
      textAnswer: ans.text,
    }));
    await dispatch(submitQuiz({ attemptId: currentAttempt.id, data: { answers: answerList } })).unwrap();
    // toast({ title: 'Quiz submitted', description: 'Your answers have been recorded.' });
    navigate(`/quiz/result/${currentAttempt.id}`);
  };

  if (isLoading || !currentQuiz || !currentAttempt) {
    return <div className="flex justify-center p-8">Loading quiz...</div>;
  }

  const questions = currentQuiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
        {timeLeft !== null && <div className="text-lg font-mono bg-muted px-3 py-1 rounded">Time left: {formatTime(timeLeft)}</div>}
      </div>
      <Progress value={progress} className="h-2" />
      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <p className="text-sm text-muted-foreground">{currentQuestion.questionText}</p>
          <p className="text-xs text-muted-foreground">Points: {currentQuestion.points}</p>
        </CardHeader>
        <CardContent>
          {currentQuestion.questionType === 'multiple_choice' || currentQuestion.questionType === 'true_false' ? (
            <RadioGroup value={answers[currentQuestion.id!]?.optionId?.toString()} onValueChange={(val) => handleAnswerChange(currentQuestion.id!, parseInt(val))}>
              {currentQuestion.options?.map(opt => (
                <div key={opt.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.id!.toString()} id={`opt-${opt.id}`} />
                  <Label htmlFor={`opt-${opt.id}`}>{opt.optionText}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea placeholder="Type your answer here..." value={answers[currentQuestion.id!]?.text || ''} onChange={(e) => handleAnswerChange(currentQuestion.id!, undefined, e.target.value)} />
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0}>Previous</Button>
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>Next</Button>
        ) : (
          <Button onClick={() => setSubmitDialogOpen(true)}>Submit Quiz</Button>
        )}
      </div>
      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Submit Quiz?</AlertDialogTitle><AlertDialogDescription>Are you sure you want to submit? You cannot change your answers after submission.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}