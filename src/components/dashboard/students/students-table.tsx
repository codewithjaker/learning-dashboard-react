"use client";

import { useState } from "react";
import {
  type ColumnDef,
   type ColumnFiltersState,
   type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourses: string[];
  joinDate: string;
  status: "active" | "completed" | "pending";
  progress: number;
  lastActivity: string;
  avatar?: string;
  courseCount: number;
  completionRate: number;
};

const data: Student[] = [
  {
    id: "1",
    name: "Ahmed Rahman",
    email: "ahmed.rahman@gmail.com",
    phone: "+880 1234-567890",
    enrolledCourses: ["Full-Stack Web Development", "React Native"],
    joinDate: "2024-01-15",
    status: "active",
    progress: 75,
    lastActivity: "2024-10-20",
    avatar: "/images/user/user1.jpg",
    courseCount: 2,
    completionRate: 50,
  },
  {
    id: "2",
    name: "Fatima Begum",
    email: "fatima.begum@gmail.com",
    phone: "+880 1234-567891",
    enrolledCourses: ["UI/UX Design Masterclass"],
    joinDate: "2024-02-20",
    status: "active",
    progress: 90,
    lastActivity: "2024-10-21",
    avatar: "/images/user/user2.jpg",
    courseCount: 1,
    completionRate: 90,
  },
  {
    id: "3",
    name: "Rahim Khan",
    email: "rahim.khan@gmail.com",
    phone: "+880 1234-567892",
    enrolledCourses: ["Data Science & Machine Learning", "Python Programming"],
    joinDate: "2024-03-10",
    status: "completed",
    progress: 100,
    lastActivity: "2024-10-18",
    avatar: "/images/user/user3.jpg",
    courseCount: 2,
    completionRate: 100,
  },
  {
    id: "4",
    name: "Ayesha Siddiqua",
    email: "ayesha.siddiqua@gmail.com",
    phone: "+880 1234-567893",
    enrolledCourses: ["Digital Marketing & SEO"],
    joinDate: "2024-04-05",
    status: "pending",
    progress: 25,
    lastActivity: "2024-10-15",
    avatar: "/images/user/user4.jpg",
    courseCount: 1,
    completionRate: 25,
  },
  {
    id: "5",
    name: "Kamal Hossain",
    email: "kamal.hossain@gmail.com",
    phone: "+880 1234-567894",
    enrolledCourses: ["Mobile App Development", "Flutter"],
    joinDate: "2024-05-12",
    status: "active",
    progress: 60,
    lastActivity: "2024-10-22",
    avatar: "/images/user/user5.jpg",
    courseCount: 2,
    completionRate: 30,
  },
  {
    id: "6",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@gmail.com",
    phone: "+880 1234-567895",
    enrolledCourses: ["Cyber Security Essentials", "Ethical Hacking"],
    joinDate: "2024-06-01",
    status: "active",
    progress: 45,
    lastActivity: "2024-10-23",
    avatar: "/images/user/user6.jpg",
    courseCount: 2,
    completionRate: 20,
  },
  {
    id: "7",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@gmail.com",
    phone: "+880 1234-567896",
    enrolledCourses: ["Cloud Computing with AWS"],
    joinDate: "2024-06-15",
    status: "pending",
    progress: 10,
    lastActivity: "2024-10-12",
    avatar: "/images/user/user7.jpg",
    courseCount: 1,
    completionRate: 0,
  },
  {
    id: "8",
    name: "Meherun Nesa",
    email: "meherun.nesa@gmail.com",
    phone: "+880 1234-567897",
    enrolledCourses: ["Graphic Design Fundamentals", "Adobe Illustrator"],
    joinDate: "2024-07-05",
    status: "completed",
    progress: 100,
    lastActivity: "2024-10-19",
    avatar: "/images/user/user8.jpg",
    courseCount: 2,
    completionRate: 100,
  },
  {
    id: "9",
    name: "Samiul Islam",
    email: "samiul.islam@gmail.com",
    phone: "+880 1234-567898",
    enrolledCourses: ["Backend Development with Node.js"],
    joinDate: "2024-08-10",
    status: "active",
    progress: 82,
    lastActivity: "2024-10-24",
    avatar: "/images/user/user9.jpg",
    courseCount: 1,
    completionRate: 80,
  },
  {
    id: "10",
    name: "Zarin Tasnim",
    email: "zarin.tasnim@gmail.com",
    phone: "+880 1234-567899",
    enrolledCourses: ["Content Writing", "Copywriting Masterclass"],
    joinDate: "2024-09-02",
    status: "active",
    progress: 55,
    lastActivity: "2024-10-22",
    avatar: "/images/user/user10.jpg",
    courseCount: 2,
    completionRate: 50,
  },
];

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {row.getValue("name")}
          </span>
          <span className="text-sm text-gray-500">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="w-4 h-4" />
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "enrolledCourses",
    header: "Courses",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.enrolledCourses.slice(0, 2).map((course, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {course}
          </Badge>
        ))}
        {row.original.enrolledCourses.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{row.original.enrolledCourses.length - 2} more
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig = {
        active: { label: "Active", variant: "default" as const },
        completed: { label: "Completed", variant: "success" as const },
        pending: { label: "Pending", variant: "secondary" as const },
      };

      const config = statusConfig[status as keyof typeof statusConfig];

      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${row.getValue("progress")}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {row.getValue("progress")}%
        </span>
      </div>
    ),
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        {new Date(row.getValue("lastActivity")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.id)}
            >
              Copy student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Edit student</DropdownMenuItem>
            <DropdownMenuItem>View progress</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Remove student
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function StudentsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>
              Manage all students and track their learning progress
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Status
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {table.getFilteredRowModel().rows.length} of {data.length}{" "}
            students
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
