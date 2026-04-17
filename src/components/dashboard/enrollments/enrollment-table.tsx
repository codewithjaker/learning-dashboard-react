import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  Eye,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";


// Mock data - replace with actual API call
const enrollments = [
  {
    id: "EN001",
    studentName: "John Doe",
    email: "john.doe@example.com",
    course: "Full-Stack Web Development",
    enrollmentDate: "2024-01-15",
    status: "active",
    progress: 75,
    amount: "৳25,000",
    paymentStatus: "paid",
  },
  {
    id: "EN002",
    studentName: "Sarah Smith",
    email: "sarah.smith@example.com",
    course: "Professional Graphic Design",
    enrollmentDate: "2024-01-14",
    status: "active",
    progress: 45,
    amount: "৳18,000",
    paymentStatus: "paid",
  },
  {
    id: "EN003",
    studentName: "Mike Johnson",
    email: "mike.johnson@example.com",
    course: "Digital Marketing & SEO",
    enrollmentDate: "2024-01-13",
    status: "pending",
    progress: 0,
    amount: "৳15,000",
    paymentStatus: "pending",
  },
  {
    id: "EN004",
    studentName: "Emily Chen",
    email: "emily.chen@example.com",
    course: "Mobile App Development",
    enrollmentDate: "2024-01-12",
    status: "completed",
    progress: 100,
    amount: "৳22,000",
    paymentStatus: "paid",
  },
  {
    id: "EN005",
    studentName: "David Wilson",
    email: "david.wilson@example.com",
    course: "Data Science & Machine Learning",
    enrollmentDate: "2024-01-11",
    status: "active",
    progress: 60,
    amount: "৳28,000",
    paymentStatus: "paid",
  },
];

export function EnrollmentTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, label: "Active" },
      pending: { variant: "secondary" as const, label: "Pending" },
      completed: { variant: "outline" as const, label: "Completed" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    );
  };

  const getPaymentBadge = (status: string) => {
    const paymentConfig = {
      paid: { variant: "default" as const, label: "Paid" },
      pending: { variant: "secondary" as const, label: "Pending" },
      failed: { variant: "destructive" as const, label: "Failed" },
      refunded: { variant: "outline" as const, label: "Refunded" },
    };

    const config = paymentConfig[status as keyof typeof paymentConfig] || paymentConfig.pending;

    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search enrollments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Enrollment ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Enrollment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEnrollments.map((enrollment) => (
            <TableRow key={enrollment.id}>
              <TableCell className="font-medium">{enrollment.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{enrollment.studentName}</div>
                  <div className="text-sm text-muted-foreground">
                    {enrollment.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{enrollment.course}</TableCell>
              <TableCell>
                {new Date(enrollment.enrollmentDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <span className="text-sm">{enrollment.progress}%</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{enrollment.amount}</TableCell>
              <TableCell>{getPaymentBadge(enrollment.paymentStatus)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={`/dashboard/enrollments/${enrollment.id}`}>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </Link>
                    <Link to={`/dashboard/enrollments/${enrollment.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Empty State */}
      {filteredEnrollments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No enrollments found matching your search criteria.
          </div>
        </div>
      )}

      {/* Pagination would go here */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {filteredEnrollments.length} of {enrollments.length} enrollments
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}