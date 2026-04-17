// import React, { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FolderCode,
//   BookOpen,
//   Users,
//   GraduationCap,
//   ClipboardList,
//   FileText,
//   CreditCard,
//   BarChart3,
//   Settings,
//   HeadphonesIcon,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { Button } from "../ui/button";
// import { cn } from "@/lib/utils";

// type NavItem = {
//   name: string;
//   href: string;
//   icon: React.ElementType;
//   children?: NavItem[];
// };

// /* ================= LMS NAVIGATION ================= */

// const dashboardLinks: NavItem[] = [
//   // { name: "Dashboard", href: "/", icon: LayoutDashboard },
//   // { name: "Software", href: "/software", icon: FolderCode },
//   {
//     name: "Courses",
//     href: "/courses",
//     icon: BookOpen,
//     children: [
//       {
//         name: "All Courses",
//         href: "/courses",
//         icon: BookOpen,
//       },
//       {
//         name: "Create Course",
//         href: "/courses/new",
//         icon: BookOpen,
//       },
//     ],
//   },

//   /* ================= COURSE CONTENT ================= */
//   {
//     name: "Sections",
//     href: "/sections",
//     icon: ClipboardList,
//     children: [
//       {
//         name: "All Sections",
//         // href: "/sections",
//         href: "/courses/:courseId/sections",

//         icon: ClipboardList,
//       },
//       {
//         name: "Create Section",
//         // href: "/courses", // select course → create section
//         href: "/courses/:courseId/sections/new", // select course → create section
//         icon: ClipboardList,
//       },
//     ],
//   },
//   /* ================= LESSONS ================= */
//   {
//     name: "Lessons",
//     href: "/lessons",
//     icon: FileText,
//     children: [
//       {
//         name: "All Lessons",
//         href: "/lessons",
//         icon: FileText,
//       },
//     ],
//   },
//   { name: "Students", href: "/students", icon: Users },
//   { name: "Users", href: "/users", icon: Users },
//   { name: "Instructors", href: "/instructors", icon: GraduationCap },
//   { name: "Enrollments", href: "/enrollments", icon: FileText },
//   { name: "Payments", href: "/payments", icon: CreditCard },
//   // { name: "Analytics", href: "/analytics", icon: BarChart3 },
//   // { name: "Settings", href: "/settings", icon: Settings },
// ];

// const bottomLinks: NavItem[] = [
//   { name: "Support", href: "/support", icon: HeadphonesIcon },
//   { name: "Log Out", href: "/logout", icon: LogOut },
// ];

// /* ================= SIDEBAR COMPONENT ================= */

// export function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const [collapsed, setCollapsed] = useState(false);
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
//     Admissions: true,
//   });

//   const toggleMenu = (name: string) => {
//     setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   const renderNavItems = (items: NavItem[]) => (
//     <ul className="space-y-1">
//       {items.map((item) => {
//         const hasChildren = item.children && item.children.length > 0;
//         const isOpen = openMenus[item.name];
//         const isParentActive =
//           hasChildren &&
//           item.children?.some((child) => pathname === child.href);

//         if (item.name === "Log Out") {
//           return (
//             <li key={item.name}>
//               <button
//                 onClick={handleLogout}
//                 className={cn(
//                   "w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors",
//                   collapsed && "justify-center",
//                 )}
//               >
//                 <item.icon
//                   size={20}
//                   className={cn(collapsed ? "mr-0" : "mr-3")}
//                 />
//                 {!collapsed && <span>{item.name}</span>}
//               </button>
//             </li>
//           );
//         }

//         return (
//           <li key={item.href}>
//             {hasChildren ? (
//               <>
//                 <button
//                   onClick={() => toggleMenu(item.name)}
//                   className={cn(
//                     "w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors",
//                     isParentActive
//                       ? "bg-indigo-50 text-indigo-600"
//                       : "text-gray-700 hover:bg-gray-100",
//                     collapsed && "justify-center",
//                   )}
//                 >
//                   <div className="flex items-center">
//                     <item.icon
//                       size={20}
//                       className={cn(collapsed ? "mr-0" : "mr-3")}
//                     />
//                     {!collapsed && <span>{item.name}</span>}
//                   </div>
//                   {!collapsed &&
//                     (isOpen ? (
//                       <ChevronUp size={16} />
//                     ) : (
//                       <ChevronDown size={16} />
//                     ))}
//                 </button>

//                 {!collapsed && isOpen && (
//                   <ul className="ml-8 mt-1 space-y-1">
//                     {item.children?.map((child) => (
//                       <li key={child.href}>
//                         <NavLink
//                           to={child.href}
//                           className={({ isActive }) =>
//                             cn(
//                               "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
//                               isActive
//                                 ? "bg-indigo-50 text-indigo-600"
//                                 : "text-gray-700 hover:bg-gray-100",
//                             )
//                           }
//                         >
//                           <child.icon size={18} className="mr-3" />
//                           <span>{child.name}</span>
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </>
//             ) : (
//               <NavLink
//                 to={item.href}
//                 className={({ isActive }) =>
//                   cn(
//                     "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
//                     isActive
//                       ? "bg-indigo-50 text-indigo-600"
//                       : "text-gray-700 hover:bg-gray-100",
//                     collapsed && "justify-center",
//                   )
//                 }
//               >
//                 <item.icon
//                   size={20}
//                   className={cn(collapsed ? "mr-0" : "mr-3")}
//                 />
//                 {!collapsed && <span>{item.name}</span>}
//               </NavLink>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );

//   return (
//     <aside
//       className={cn(
//         "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col sticky top-0",
//         collapsed ? "w-20" : "w-64",
//       )}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between h-16 px-4 border-b">
//         {!collapsed && (
//           <span className="text-xl font-bold text-indigo-600">LMS Admin</span>
//         )}
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => setCollapsed(!collapsed)}
//           className="ml-auto"
//         >
//           {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//         </Button>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 overflow-y-auto py-4">
//         {renderNavItems(dashboardLinks)}

//         <div className="mt-6 border-t pt-4">{renderNavItems(bottomLinks)}</div>
//       </div>
//     </aside>
//   );
// }

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