import { UserNav } from "./user-nav";
import { NotificationBell } from "./notification-bell";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Skill Based IT Admin
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
