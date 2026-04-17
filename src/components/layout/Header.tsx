// "use client";

// import { Bell, Search, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";

// export function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
//       <div className="flex-1 flex items-center">
//         <h1 className="text-lg font-semibold text-gray-800">
//           Good Morning, Jaker! 👋
//         </h1>
//         <span className="ml-4 text-sm text-gray-500 hidden sm:inline">
//           Here's what happening with your store today!
//         </span>
//       </div>

//       <div className="flex items-center space-x-3">
//         {/* Search */}
//         <div className="relative hidden md:block">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-100 border-none focus-visible:ring-1"
//           />
//         </div>

//         {/* Notifications */}
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell size={20} />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </Button>

//         {/* User Menu */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="flex items-center space-x-2 p-1">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src="https://github.com/shadcn.png" alt="User" />
//                 <AvatarFallback>MR</AvatarFallback>
//               </Avatar>
//               <ChevronDown size={16} className="text-gray-600" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Jaker Ahmed</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>Log out</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

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