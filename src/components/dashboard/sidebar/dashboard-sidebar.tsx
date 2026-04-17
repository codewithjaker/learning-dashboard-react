"use client";

import { useState } from "react";
// import { Logo } from '@/components/logo'
import { SidebarNav } from "./sidebar-nav";
import { SidebarToggle } from "./sidebar-toggle";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            {/* <Logo size="sm" /> */}
            <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <SidebarNav />
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="text-center text-sm text-muted-foreground">
              <p>Skill Based IT</p>
              <p className="text-xs">...lead to the way of IT</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
