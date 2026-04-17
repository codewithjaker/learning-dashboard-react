"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function DataFilters() {
  const [date, setDate] = useState<Date>();
  const [timeRange, setTimeRange] = useState("30d");
  const [course, setCourse] = useState("all");

  const handleExport = () => {
    // Export functionality would go here
    console.log("Exporting data...");
  };

  return (
    <div className="flex items-center space-x-4">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
          <SelectItem value="all">All time</SelectItem>
        </SelectContent>
      </Select>

      <Select value={course} onValueChange={setCourse}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Courses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Courses</SelectItem>
          <SelectItem value="web-dev">Web Development</SelectItem>
          <SelectItem value="data-science">Data Science</SelectItem>
          <SelectItem value="mobile-dev">Mobile Development</SelectItem>
          <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
          <SelectItem value="graphic-design">Graphic Design</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-40 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>

      <Button onClick={handleExport} variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
