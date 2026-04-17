import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Users, Eye, Trash2 } from "lucide-react";

import { coursesData } from "@/data/courses";
import { Link } from "react-router-dom";

export function CoursesTable() {
  const [courses] = useState(coursesData);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.level}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{course.category}</Badge>
              </TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">/5.0</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{course.price}</TableCell>
              <TableCell>
                <Badge
                  className={
                    course.featured
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  }
                >
                  {course.featured ? "Featured" : "Active"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link to={`/dashboard/courses/${course.id}`}>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </Link>
                    <Link to={`/dashboard/courses/${course.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Course
                      </DropdownMenuItem>
                    </Link>
                    <Link to={`/dashboard/courses/${course.id}/students`}>
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" />
                        Manage Students
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
