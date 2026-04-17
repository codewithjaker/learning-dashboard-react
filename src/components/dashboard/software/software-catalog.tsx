"use client";

import { SoftwareCard } from "./software-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Star, Download } from "lucide-react";

const softwareProducts = [
  {
    id: "1",
    name: "ERP Management System",
    description: "Complete enterprise resource planning solution",
    version: "2.1.0",
    category: "Enterprise",
    status: "active",
    price: "৳50,000",
    licenseType: "Subscription",
    supportIncluded: true,
    rating: 4.8,
    downloads: 1245,
  },
  {
    id: "2",
    name: "Inventory Tracker Pro",
    description: "Real-time inventory management system",
    version: "1.5.2",
    category: "Business",
    status: "active",
    price: "৳25,000",
    licenseType: "Perpetual",
    supportIncluded: false,
    rating: 4.6,
    downloads: 892,
  },
  {
    id: "3",
    name: "HR Management Suite",
    description: "Human resources and payroll management",
    version: "3.0.1",
    category: "Enterprise",
    status: "active",
    price: "৳35,000",
    licenseType: "Subscription",
    supportIncluded: true,
    rating: 4.9,
    downloads: 567,
  },
];

export function SoftwareCatalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {softwareProducts.map((software) => (
        <SoftwareCard key={software.id} software={software} />
      ))}

      {/* Add New Card */}
      <Card className="border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] p-6 text-center">
          <Package className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Add New Software</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a new software product
          </p>
          <Button>Add Product</Button>
        </CardContent>
      </Card>
    </div>
  );
}
