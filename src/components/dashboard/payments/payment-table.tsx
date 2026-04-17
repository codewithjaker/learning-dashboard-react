import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";


interface Payment {
  id: string;
  student: string;
  course: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "overdue";
  method: string;
  invoice: string;
  dueDate?: string;
  studentEmail?: string;
}

interface PaymentTableProps {
  payments: Payment[];
  showActions?: boolean;
}

export function PaymentTable({
  payments,
  showActions = false,
}: PaymentTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            {showActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{payment.student}</p>
                  {payment.studentEmail && (
                    <p className="text-sm text-muted-foreground">
                      {payment.studentEmail}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>{payment.course}</TableCell>
              <TableCell className="font-semibold">
                ৳{payment.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(payment.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(payment.status)}
                  className="flex items-center gap-1 w-fit"
                >
                  {getStatusIcon(payment.status)}
                  {payment.status.charAt(0).toUpperCase() +
                    payment.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{payment.method}</TableCell>
              {showActions && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link to={`/dashboard/payments/${payment.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
