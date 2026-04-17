import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';
import courseReducer from './slices/courseSlice';
import syllabusReducer from './slices/syllabusSlice';
import enrollmentReducer from './slices/enrollmentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  categories: categoryReducer,
  courses: courseReducer,
  syllabus: syllabusReducer,
  enrollments: enrollmentReducer,
});

export default rootReducer;