// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import PublicRoute from './PublicRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Users
import UsersList from '../pages/users/UsersList';
import UserDetails from '../pages/users/UserDetails';

// Categories
import CategoriesList from '../pages/categories/CategoriesList';

// Courses
import CoursesList from '../pages/courses/CoursesList';
import CourseDetails from '../pages/courses/CourseDetails';
import ManageSyllabus from '../pages/courses/ManageSyllabus';

// Enrollments
import EnrollmentsList from '../pages/enrollments/EnrollmentsList';
import EnrollmentDetails from '../pages/enrollments/EnrollmentDetails';

// Invoices
import InvoicesList from '../pages/invoices/InvoicesList';
import InvoiceDetails from '../pages/invoices/InvoiceDetails';

// Payments
import PaymentsList from '../pages/payments/PaymentsList';
import PaymentDetails from '../pages/payments/PaymentDetails';

// Payouts
import PayoutsList from '../pages/payouts/PayoutsList';
import PayoutDetails from '../pages/payouts/PayoutDetails';

// Coupons
import CouponsList from '../pages/coupons/CouponsList';
import CouponDetails from '../pages/coupons/CouponDetails';

// Reviews
import ReviewsList from '../pages/reviews/ReviewsList';
import ReviewDetails from '../pages/reviews/ReviewDetails';

// Reports (nested)
import ReportsLayout from '../pages/reports/ReportsLayout';
import SalesReport from '../pages/reports/SalesReport';
import UserReport from '../pages/reports/UserReport';
import CourseReport from '../pages/reports/CourseReport';
import EnrollmentReport from '../pages/reports/EnrollmentReport';
import PaymentReport from '../pages/reports/PaymentReport';
import PaymentMethodsReport from '../pages/reports/PaymentMethodsReport';
import InstructorEarningsReport from '../pages/reports/InstructorEarningsReport';

// Settings (nested)
import SettingsLayout from '../pages/settings/SettingsLayout';
import ProfileSettings from '../pages/settings/ProfileSettings';
import SecuritySettings from '../pages/settings/SecuritySettings';
import SystemSettings from '../pages/settings/SystemSettings';
import EmailSettings from '../pages/settings/EmailSettings';

// Error Pages
import NotFound from '../pages/errors/NotFound';
// import Unauthorized from '../pages/errors/Unauthorized';
import Forbidden from '@/pages/errors/Forbidden';
import InternalError from '@/pages/errors/InternalError';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes (authenticated only) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Users */}
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />

          {/* Categories */}
          <Route path="/categories" element={<CategoriesList />} />

          {/* Courses & Syllabus */}
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/syllabus" element={<ManageSyllabus />} />

          {/* Enrollments */}
          <Route path="/enrollments" element={<EnrollmentsList />} />
          <Route path="/enrollments/:id" element={<EnrollmentDetails />} />

          {/* Invoices */}
          <Route path="/invoices" element={<InvoicesList />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />

          {/* Payments */}
          <Route path="/payments" element={<PaymentsList />} />
          <Route path="/payments/:id" element={<PaymentDetails />} />

          {/* Payouts */}
          <Route path="/payouts" element={<PayoutsList />} />
          <Route path="/payouts/:id" element={<PayoutDetails />} />

          {/* Coupons */}
          <Route path="/coupons" element={<CouponsList />} />
          <Route path="/coupons/:id" element={<CouponDetails />} />

          {/* Reviews */}
          <Route path="/reviews" element={<ReviewsList />} />
          <Route path="/reviews/:id" element={<ReviewDetails />} />

          {/* Reports (nested routes) */}
          <Route path="/reports" element={<ReportsLayout />}>
            <Route index element={<Navigate to="sales" replace />} />
            <Route path="sales" element={<SalesReport />} />
            <Route path="users" element={<UserReport />} />
            <Route path="courses" element={<CourseReport />} />
            <Route path="enrollments" element={<EnrollmentReport />} />
            <Route path="payments" element={<PaymentReport />} />
            <Route path="payment-methods" element={<PaymentMethodsReport />} />
            <Route path="instructor-earnings" element={<InstructorEarningsReport />} />
          </Route>

          {/* Settings (nested routes) */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="system" element={<SystemSettings />} />
            <Route path="email" element={<EmailSettings />} />
          </Route>

          <Route path="reports" element={<ReportsLayout />}>
            <Route index element={<Navigate to="sales" replace />} />
            <Route path="sales" element={<SalesReport />} />
            <Route path="users" element={<UserReport />} />
            <Route path="courses" element={<CourseReport />} />
            <Route path="enrollments" element={<EnrollmentReport />} />
            <Route path="payments" element={<PaymentReport />} />
            <Route path="payment-methods" element={<PaymentMethodsReport />} />
            <Route path="instructor-earnings" element={<InstructorEarningsReport />} />
          </Route>

          {/* Error Pages */}
          {/* <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} /> */}
          {/* Standalone error pages (no layout) */}
          <Route path="/403" element={<Forbidden />} />
          <Route path="/500" element={<InternalError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}