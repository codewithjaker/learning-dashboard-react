import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { UserNav } from './UserNav';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex-1" />
      <ThemeToggle />
      <UserNav />
    </header>
  );
}