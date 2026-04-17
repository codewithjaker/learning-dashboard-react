"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  BadgeCheck,
  Clock,
  MapPin,
  GraduationCap,
  Award,
  FileText,
  Edit,
  Download,
  Share2,
} from "lucide-react";

interface StudentProfileProps {
  studentId: string;
}

export function StudentProfile({ studentId }: StudentProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock student data - in real app, fetch by studentId
  const student = {
    id: "1",
    name: "Ahmed Rahman",
    email: "ahmed.rahman@example.com",
    phone: "+880 1234-567890",
    address: "123 Tech Street, Feni, Bangladesh",
    joinDate: "2024-01-15",
    status: "active",
    overallProgress: 75,
    completedCourses: 2,
    activeCourses: 1,
    totalCourses: 3,
    avatar: "",
    enrollmentHistory: [
      {
        id: "1",
        courseName: "Full-Stack Web Development",
        enrollDate: "2024-01-20",
        progress: 85,
        status: "active",
        instructor: "Michael Chen",
      },
      {
        id: "2",
        courseName: "React Native Mobile Development",
        enrollDate: "2024-03-15",
        progress: 65,
        status: "active",
        instructor: "Emily Rodriguez",
      },
      {
        id: "3",
        courseName: "UI/UX Design Fundamentals",
        enrollDate: "2024-02-10",
        progress: 100,
        status: "completed",
        instructor: "Sarah Johnson",
      },
    ],
    assignments: [
      {
        id: "1",
        title: "E-commerce Website Project",
        course: "Full-Stack Web Development",
        dueDate: "2024-11-15",
        status: "submitted",
        score: 92,
      },
      {
        id: "2",
        title: "Mobile App Prototype",
        course: "React Native Mobile Development",
        dueDate: "2024-11-20",
        status: "in-progress",
        score: null,
      },
    ],
    certificates: [
      {
        id: "1",
        name: "UI/UX Design Fundamentals",
        issueDate: "2024-04-15",
        instructor: "Sarah Johnson",
      },
      {
        id: "2",
        name: "JavaScript Advanced Concepts",
        issueDate: "2024-03-20",
        instructor: "Michael Chen",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {student.name}
                  </h1>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status.charAt(0).toUpperCase() +
                      student.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {student.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {student.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {student.address}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(student.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {student.totalCourses} Courses
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Progress
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {student.overallProgress}%
                </div>
                <Progress value={student.overallProgress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {student.completedCourses} of {student.totalCourses} courses
                  completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Courses
                </CardTitle>
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {student.activeCourses}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently enrolled in courses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Certificates
                </CardTitle>
                <Award className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {student.certificates.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Certificates earned
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest learning activities and progress updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.enrollmentHistory.slice(0, 3).map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {enrollment.courseName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Instructor: {enrollment.instructor}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{enrollment.progress}%</div>
                      <Badge
                        variant={
                          enrollment.status === "completed"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {enrollment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>
                All courses the student is enrolled in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.enrollmentHistory.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {enrollment.courseName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span>Instructor: {enrollment.instructor}</span>
                          <span>•</span>
                          <span>
                            Enrolled:{" "}
                            {new Date(
                              enrollment.enrollDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={enrollment.progress}
                          className="w-24"
                        />
                        <span className="font-medium text-sm">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <Badge
                        variant={
                          enrollment.status === "completed"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {enrollment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignments & Projects</CardTitle>
              <CardDescription>
                Student's assignment submissions and project work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          assignment.status === "submitted"
                            ? "bg-green-100"
                            : assignment.status === "in-progress"
                            ? "bg-yellow-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${
                            assignment.status === "submitted"
                              ? "text-green-600"
                              : assignment.status === "in-progress"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{assignment.title}</div>
                        <div className="text-sm text-gray-500">
                          {assignment.course} • Due:{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {assignment.score ? (
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-600">
                            {assignment.score}%
                          </div>
                          <Badge variant="success">Graded</Badge>
                        </div>
                      ) : (
                        <Badge variant="secondary">In Progress</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earned Certificates</CardTitle>
              <CardDescription>
                Certificates and achievements earned by the student
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.certificates.map((certificate) => (
                  <Card
                    key={certificate.id}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-900">
                              Certificate of Completion
                            </span>
                          </div>
                          <div className="font-bold text-lg">
                            {certificate.name}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Instructor: {certificate.instructor}</div>
                            <div>
                              Issued:{" "}
                              {new Date(
                                certificate.issueDate
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Add missing icon component
function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
