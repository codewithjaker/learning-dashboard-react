import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { UserNav } from './UserNav';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden hover:bg-muted/80 dark:hover:bg-muted/20"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Optional: Logo/Brand */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold tracking-tight">LMS Admin</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle and user menu */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}