import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Use 'import type' to satisfy verbatimModuleSyntax
import type { LucideIcon } from "lucide-react";

interface ChartWrapperProps {
  title: string;
  description: string;
  // CHANGE THIS: Use LucideIcon type instead of React.ReactNode
  icon: LucideIcon; 
  children: React.ReactNode;
  className?: string;
}

export function ChartWrapper({
  title,
  description,
  icon: Icon, // Now 'Icon' is a Component, not a Node
  children,
  className = "",
}: ChartWrapperProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {/* This works now because Icon is a Component type */}
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}