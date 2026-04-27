# React + TypeScript + Vite

```json
admin-dashboard/
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── userService.ts
│   │   │   ├── courseService.ts
│   │   │   ├── categoryService.ts
│   │   │   ├── enrollmentService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── invoiceService.ts
│   │   │   ├── reviewService.ts
│   │   │   ├── couponService.ts
│   │   │   └── payoutService.ts
│   │   └── types.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── rootReducer.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── userSlice.ts
│   │       ├── courseSlice.ts
│   │       ├── categorySlice.ts
│   │       ├── enrollmentSlice.ts
│   │       ├── paymentSlice.ts
│   │       ├── invoiceSlice.ts
│   │       ├── reviewSlice.ts
│   │       ├── couponSlice.ts
│   │       ├── payoutSlice.ts
│   │       ├── dashboardSlice.ts
│   │       └── uiSlice.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── use-toast.ts
│   │   │   ├── popover.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── slider.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── data-table/
│   │   │   ├── DataTable.tsx
│   │   │   ├── DataTableHeader.tsx
│   │   │   ├── DataTablePagination.tsx
│   │   │   ├── DataTableToolbar.tsx
│   │   │   ├── DataTableRowActions.tsx
│   │   │   ├── DataTableColumnHeader.tsx
│   │   │   ├── DataTableViewOptions.tsx
│   │   │   ├── DataTableFacetedFilter.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── forms/
│   │   │   ├── UserForm.tsx
│   │   │   ├── CourseForm.tsx
│   │   │   ├── CategoryForm.tsx
│   │   │   ├── CouponForm.tsx
│   │   │   ├── EnrollmentForm.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   ├── PayoutForm.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── UserNav.tsx
│   │   │
│   │   ├── charts/
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── EnrollmentChart.tsx
│   │   │   ├── ProgressChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── LineChart.tsx
│   │   │
│   │   └── common/
│   │       ├── ConfirmationDialog.tsx
│   │       ├── LoadingScreen.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── SearchBar.tsx
│   │       ├── EmptyState.tsx
│   │       ├── Breadcrumb.tsx
│   │       ├── PageHeader.tsx
│   │       └── ProtectedRoute.tsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   └── RecentActivity.tsx
│   │   │
│   │   ├── users/
│   │   │   ├── UsersList.tsx
│   │   │   ├── UserFormDialog.tsx
│   │   │   ├── UserDetails.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── courses/
│   │   │   ├── CoursesList.tsx
│   │   │   ├── CourseFormDialog.tsx
│   │   │   ├── CourseDetails.tsx
│   │   │   ├── ManageSyllabus.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── categories/
│   │   │   ├── CategoriesList.tsx
│   │   │   ├── CategoryFormDialog.tsx
│   │   │   ├── CategoryTree.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── enrollments/
│   │   │   ├── EnrollmentsList.tsx
│   │   │   ├── EnrollmentFormDialog.tsx
│   │   │   ├── EnrollmentDetails.tsx
│   │   │   ├── BulkEnroll.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── payments/
│   │   │   ├── PaymentsList.tsx
│   │   │   ├── PaymentDetails.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── invoices/
│   │   │   ├── InvoicesList.tsx
│   │   │   ├── InvoiceDetails.tsx
│   │   │   ├── GenerateInvoice.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── payouts/
│   │   │   ├── PayoutsList.tsx
│   │   │   ├── PayoutFormDialog.tsx
│   │   │   ├── PayoutSettings.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── coupons/
│   │   │   ├── CouponsList.tsx
│   │   │   ├── CouponFormDialog.tsx
│   │   │   ├── CouponStats.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── reviews/
│   │   │   ├── ReviewsList.tsx
│   │   │   ├── ReviewDetails.tsx
│   │   │   ├── ModerateReview.tsx
│   │   │   └── columns.tsx
│   │   │
│   │   ├── reports/
│   │   │   ├── SalesReport.tsx
│   │   │   ├── UserReport.tsx
│   │   │   ├── CourseReport.tsx
│   │   │   └── ExportData.tsx
│   │   │
│   │   ├── settings/
│   │   │   ├── ProfileSettings.tsx
│   │   │   ├── SystemSettings.tsx
│   │   │   └── EmailSettings.tsx
│   │   │
│   │   └── errors/
│   │       ├── NotFound.tsx
│   │       └── Unauthorized.tsx
│   │
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   ├── course.types.ts
│   │   ├── payment.types.ts
│   │   ├── enrollment.types.ts
│   │   ├── category.types.ts
│   │   ├── review.types.ts
│   │   ├── coupon.types.ts
│   │   ├── invoice.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── validations/
│   │   │   ├── auth.schema.ts
│   │   │   ├── user.schema.ts
│   │   │   ├── course.schema.ts
│   │   │   ├── category.schema.ts
│   │   │   ├── enrollment.schema.ts
│   │   │   ├── payment.schema.ts
│   │   │   ├── invoice.schema.ts
│   │   │   ├── review.schema.ts
│   │   │   ├── coupon.schema.ts
│   │   │   └── payout.schema.ts
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── usePagination.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useToast.ts
│   │   └── useDataTable.ts
│   │
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── routes.config.ts
│   │
│   ├── contexts/
│   │   ├── ThemeContext.tsx
│   │   └── NotificationContext.tsx
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── public/
│   ├── favicon.ico
│   └── logo.svg
│
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── components.json
├── index.html
├── package.json
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```



```json
├── learner-app/                          # Next.js 15 Learner Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── login/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── actions.ts
│   │   │   │   ├── register/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── actions.ts
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── reset-password/
│   │   │   │       └── [token]/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── components/
│   │   │   │   │       ├── StatsCards.tsx
│   │   │   │   │       ├── RecentCourses.tsx
│   │   │   │   │       └── ProgressChart.tsx
│   │   │   │   ├── my-courses/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── components/
│   │   │   │   │       ├── CourseCard.tsx
│   │   │   │   │       └── CourseFilters.tsx
│   │   │   │   ├── course/
│   │   │   │   │   └── [courseId]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       ├── layout.tsx
│   │   │   │   │       └── components/
│   │   │   │   │           ├── CourseHeader.tsx
│   │   │   │   │           ├── SyllabusList.tsx
│   │   │   │   │           └── CourseProgress.tsx
│   │   │   │   ├── learn/
│   │   │   │   │   └── [courseId]/
│   │   │   │   │       └── [itemId]/
│   │   │   │   │           ├── page.tsx
│   │   │   │   │           └── components/
│   │   │   │   │               ├── VideoPlayer.tsx
│   │   │   │   │               ├── QuizComponent.tsx
│   │   │   │   │               └── NotesSection.tsx
│   │   │   │   ├── explore/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── components/
│   │   │   │   │       ├── CourseSearchBar.tsx
│   │   │   │   │       ├── CourseGrid.tsx
│   │   │   │   │       └── CategoryFilter.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── certificates/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── payments/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── invoices/
│   │   │   │   │       └── [invoiceId]/
│   │   │   │   │           └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── (marketing)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx              # Landing page
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── pricing/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contact/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── [...nextauth]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── register/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── courses/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [courseId]/
│   │   │   │   │       ├── route.ts
│   │   │   │   │       └── enroll/
│   │   │   │   │           └── route.ts
│   │   │   │   ├── user/
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── progress/
│   │   │   │   │       └── route.ts
│   │   │   │   └── payments/
│   │   │   │       └── webhook/
│   │   │   │           └── route.ts
│   │   │   │
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── providers.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                       # Shadcn components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── courses/
│   │   │   │   ├── CourseCard.tsx
│   │   │   │   ├── CourseGrid.tsx
│   │   │   │   └── EnrollmentButton.tsx
│   │   │   ├── forms/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProfileForm.tsx
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.tsx
│   │   │       └── EmptyState.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   ├── api-client.ts
│   │   │   └── validations/
│   │   │       ├── auth.schema.ts
│   │   │       └── profile.schema.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useCourses.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── store/                        # Zustand store
│   │   │   ├── useAuthStore.ts
│   │   │   ├── useCourseStore.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── user.types.ts
│   │   │   ├── course.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── middleware.ts
│   │
│   ├── public/
│   │   ├── images/
│   │   └── favicon.ico
│   │
│   ├── .env
│   ├── .env.example
│   ├── next.config.ts
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── README.md
```






