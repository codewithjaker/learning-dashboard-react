import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    return { label: value.charAt(0).toUpperCase() + value.slice(1), path };
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link to="/dashboard" className="hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium ml-1">{item.label}</span>
          ) : (
            <Link to={item.path} className="hover:text-foreground transition-colors ml-1">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}