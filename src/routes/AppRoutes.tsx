import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import UsersList from '../pages/users/UsersList';
import UserDetails from '../pages/users/UserDetails';
import CategoriesList from '../pages/categories/CategoriesList';
import CoursesList from '../pages/courses/CoursesList';
import CourseDetails from '../pages/courses/CourseDetails';
import ManageSyllabus from '../pages/courses/ManageSyllabus';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/syllabus" element={<ManageSyllabus />} />
        </Route>
      </Route>
    </Routes>
  );
}