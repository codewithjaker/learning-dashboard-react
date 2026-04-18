import { Outlet, NavLink } from 'react-router-dom';

const reportLinks = [
  { path: '/reports/sales', label: 'Sales' },
  { path: '/reports/users', label: 'Users' },
  { path: '/reports/courses', label: 'Courses' },
  { path: '/reports/enrollments', label: 'Enrollments' },
  { path: '/reports/payments', label: 'Payments' },
  { path: '/reports/payment-methods', label: 'Payment Methods' },
  { path: '/reports/instructor-earnings', label: 'Instructor Earnings' },
];

export default function ReportsLayout() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="border-b">
        <nav className="flex space-x-8">
          {reportLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `pb-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}