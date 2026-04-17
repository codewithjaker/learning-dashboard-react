import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const enrollments = [
  {
    id: 1,
    student: {
      name: "John Smith",
      email: "john@example.com",
      avatar: "/avatars/01.png",
    },
    course: "Full-Stack Development",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    student: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/avatars/02.png",
    },
    course: "Data Science",
    date: "2024-01-14",
    status: "in-progress",
  },
  {
    id: 3,
    student: {
      name: "Mike Chen",
      email: "mike@example.com",
      avatar: "/avatars/03.png",
    },
    course: "Digital Marketing",
    date: "2024-01-13",
    status: "pending",
  },
  {
    id: 4,
    student: {
      name: "Emma Davis",
      email: "emma@example.com",
      avatar: "/avatars/04.png",
    },
    course: "UI/UX Design",
    date: "2024-01-12",
    status: "completed",
  },
];

const statusColors = {
  completed: "bg-green-100 text-green-800",
  "in-progress": "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
};

export function RecentEnrollments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
        <CardDescription>Latest student course enrollments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={enrollment.student.avatar}
                  alt={enrollment.student.name}
                />
                <AvatarFallback>
                  {enrollment.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {enrollment.student.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {enrollment.course}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={
                  statusColors[enrollment.status as keyof typeof statusColors]
                }
              >
                {enrollment.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
