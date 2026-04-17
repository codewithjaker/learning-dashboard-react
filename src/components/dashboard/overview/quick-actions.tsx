import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus, BookOpen, CreditCard } from "lucide-react";

const actions = [
  {
    title: "Add Course",
    description: "Create new training course",
    icon: Plus,
    href: "/dashboard/courses/new",
    variant: "default" as const,
  },
  {
    title: "Enroll Student",
    description: "Register new student",
    icon: UserPlus,
    href: "/dashboard/students/new",
    variant: "outline" as const,
  },
  {
    title: "Create Assignment",
    description: "Add new assignment",
    icon: BookOpen,
    href: "/dashboard/assignments/new",
    variant: "outline" as const,
  },
  {
    title: "Process Payment",
    description: "Record payment transaction",
    icon: CreditCard,
    href: "/dashboard/payments/new",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="w-full justify-start gap-2"
            asChild
          >
            <a href={action.href}>
              <action.icon className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span>{action.title}</span>
                <span className="text-xs font-normal opacity-70">
                  {action.description}
                </span>
              </div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
