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
import { Star, Download, Edit, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Software {
  id: string;
  name: string;
  description: string;
  version: string;
  category: string;
  status: string;
  price: string;
  licenseType: string;
  supportIncluded: boolean;
  rating: number;
  downloads: number;
}

interface SoftwareCardProps {
  software: Software;
  detailed?: boolean;
}

export function SoftwareCard({
  software,
  detailed = false,
}: SoftwareCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{software.name}</CardTitle>
            <CardDescription>{software.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/software/products/${software.id}`}>
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/software/products/${software.id}/edit`}>
                  Edit
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{software.category}</Badge>
          <Badge
            variant={software.status === "active" ? "default" : "secondary"}
          >
            {software.status}
          </Badge>
          {software.supportIncluded && (
            <Badge variant="outline">Support Included</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{software.rating}</span>
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              <span>{software.downloads}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{software.price}</div>
            <div className="text-xs text-muted-foreground">
              {software.licenseType}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/software/products/${software.id}`}>
            View Details
          </Link>
        </Button>
        <Button size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
