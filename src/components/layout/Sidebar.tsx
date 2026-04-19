import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderTree,
  ShoppingCart,
  CreditCard,
  Ticket,
  Star,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/categories', label: 'Categories', icon: FolderTree },
  { path: '/enrollments', label: 'Enrollments', icon: ShoppingCart },
  { path: '/payments', label: 'Payments', icon: CreditCard },
  { path: '/invoices', label: 'Invoices', icon: CreditCard },
  { path: '/coupons', label: 'Coupons', icon: Ticket },
  { path: '/reviews', label: 'Reviews', icon: Star },
  { path: '/payouts', label: 'Payouts', icon: DollarSign },
  { path: '/reports', label: 'Reports', icon: LayoutDashboard },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => onOpenChange(false)} />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-lg transition-transform duration-300 lg:relative lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h1 className="text-xl font-bold">LMS Admin</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )
                }
                onClick={() => onOpenChange(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Separator className="my-4" />
          <div className="px-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => logout()}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}