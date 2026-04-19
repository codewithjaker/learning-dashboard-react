import { Outlet, NavLink } from 'react-router-dom';

const settingsLinks = [
  { path: '/settings/profile', label: 'Profile' },
  { path: '/settings/security', label: 'Security' },
  { path: '/settings/system', label: 'System' },
  { path: '/settings/email', label: 'Email' },
];

export default function SettingsLayout() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="border-b">
        <nav className="flex space-x-8">
          {settingsLinks.map((link) => (
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