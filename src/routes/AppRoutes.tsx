import { Routes, Route, Navigate } from 'react-router-dom';
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
import EnrollmentsList from '../pages/enrollments/EnrollmentsList';
import EnrollmentDetails from '../pages/enrollments/EnrollmentDetails';
import InvoicesList from '../pages/invoices/InvoicesList';
import InvoiceDetails from '../pages/invoices/InvoiceDetails';
import PaymentsList from '../pages/payments/PaymentsList';
import PaymentDetails from '../pages/payments/PaymentDetails';
import PayoutDetails from '../pages/payouts/PayoutDetails';
import PayoutsList from '../pages/payouts/PayoutsList';
import CouponDetails from '../pages/coupons/CouponDetails';
import CouponsList from '../pages/coupons/CouponsList';
import ReviewsList from '../pages/reviews/ReviewsList';
import ReviewDetails from '../pages/reviews/ReviewDetails';
import ReportsLayout from '../pages/reports/ReportsLayout';
import SalesReport from '../pages/reports/SalesReport';
import UserReport from '../pages/reports/UserReport';
import CourseReport from '../pages/reports/CourseReport';
import EnrollmentReport from '../pages/reports/EnrollmentReport';
import PaymentReport from '../pages/reports/PaymentReport';
import PaymentMethodsReport from '../pages/reports/PaymentMethodsReport';
import InstructorEarningsReport from '../pages/reports/InstructorEarningsReport';


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
          <Route path="/enrollments" element={<EnrollmentsList />} />
          <Route path="/enrollments/:id" element={<EnrollmentDetails />} />
          <Route path="/invoices" element={<InvoicesList />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/payments" element={<PaymentsList />} />
          <Route path="/payments/:id" element={<PaymentDetails />} />
          <Route path="/payouts" element={<PayoutsList />} />
          <Route path="/payouts/:id" element={<PayoutDetails />} />
          <Route path="/coupons" element={<CouponsList />} />
          <Route path="/coupons/:id" element={<CouponDetails />} />
          <Route path="/reviews" element={<ReviewsList />} />
          <Route path="/reviews/:id" element={<ReviewDetails />} />
        </Route>
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
    </Routes>
  );
}