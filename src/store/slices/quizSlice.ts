import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quizService } from '../../api/services/quizService';
import type { Quiz, QuizAttempt, QuizResult } from '../../types/quiz.types';

interface QuizState {
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  quizResult: QuizResult | null;
  attemptHistory: QuizAttempt[];
  isLoading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  currentQuiz: null,
  currentAttempt: null,
  quizResult: null,
  attemptHistory: [],
  isLoading: false,
  error: null,
};

export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async (id: number) => {
  return await quizService.getQuizById(id);
});

export const fetchQuizBySyllabusItem = createAsyncThunk('quiz/fetchQuizBySyllabusItem', async (syllabusItemId: number) => {
  return await quizService.getQuizBySyllabusItem(syllabusItemId);
});

export const createQuiz = createAsyncThunk('quiz/createQuiz', async (data: Partial<Quiz>) => {
  return await quizService.createQuiz(data);
});

export const updateQuiz = createAsyncThunk('quiz/updateQuiz', async ({ id, data }: { id: number; data: Partial<Quiz> }) => {
  return await quizService.updateQuiz(id, data);
});

export const deleteQuiz = createAsyncThunk('quiz/deleteQuiz', async (id: number) => {
  await quizService.deleteQuiz(id);
  return id;
});

export const startQuiz = createAsyncThunk('quiz/startQuiz', async (quizId: number) => {
  return await quizService.startQuiz(quizId);
});

export const submitQuiz = createAsyncThunk('quiz/submitQuiz', async ({ attemptId, data }: { attemptId: number; data: any }) => {
  return await quizService.submitQuiz(attemptId, data);
});

export const fetchQuizResult = createAsyncThunk('quiz/fetchQuizResult', async (attemptId: number) => {
  return await quizService.getQuizResult(attemptId);
});

export const fetchAttemptHistory = createAsyncThunk('quiz/fetchAttemptHistory', async (quizId: number) => {
  return await quizService.getAttemptHistory(quizId);
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearCurrentQuiz: (state) => {
      state.currentQuiz = null;
      state.currentAttempt = null;
      state.quizResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => { state.isLoading = true; })
      .addCase(fetchQuiz.fulfilled, (state, action) => { state.isLoading = false; state.currentQuiz = action.payload; })
      .addCase(fetchQuiz.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || 'Failed to fetch quiz'; })
      .addCase(startQuiz.fulfilled, (state, action) => { state.currentAttempt = action.payload; })
      .addCase(submitQuiz.fulfilled, (state, action) => { state.currentAttempt = { ...state.currentAttempt, ...action.payload, status: 'submitted' }; })
      .addCase(fetchQuizResult.fulfilled, (state, action) => { state.quizResult = action.payload; })
      .addCase(fetchAttemptHistory.fulfilled, (state, action) => { state.attemptHistory = action.payload; });
  },
});

export const { clearCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;