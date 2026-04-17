import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <img
                src={course.image}
                alt={course.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm">{course.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/courses/${course.id}`}>View</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Tag className="w-3 h-3" />
              {course.category}
            </CardDescription>
          </div>
          {course.featured && (
            <Badge className="bg-green-100 text-green-800">Featured</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <div className="font-semibold text-primary">{course.price}</div>
        <Button size="sm" asChild>
          <Link href={`/dashboard/courses/${course.id}`}>Manage Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
