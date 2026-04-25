import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';
import courseReducer from './slices/courseSlice';
import syllabusReducer from './slices/syllabusSlice';
import enrollmentReducer from './slices/enrollmentSlice';
import invoiceReducer from './slices/invoiceSlice';
import paymentReducer from './slices/paymentSlice';
import payoutReducer from './slices/payoutSlice';
import couponReducer from './slices/couponSlice';
import reviewReducer from './slices/reviewSlice';
import dashboardReducer from './slices/dashboardSlice';
import reportReducer from './slices/reportSlice';
import settingsReducer from './slices/settingsSlice';
import progressReducer from './slices/progressSlice';
import quizReducer from './slices/quizSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  categories: categoryReducer,
  courses: courseReducer,
  syllabus: syllabusReducer,
  enrollments: enrollmentReducer,
  invoices: invoiceReducer,
  payments: paymentReducer,
  payouts: payoutReducer,
  coupons: couponReducer,
  reviews: reviewReducer,
  dashboard: dashboardReducer,
  reports: reportReducer,
  settings: settingsReducer,
  progress: progressReducer,
  quiz: quizReducer,
});

export default rootReducer;