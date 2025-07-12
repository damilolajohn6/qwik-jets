"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Availability } from "@prisma/client";

interface AvailabilityCalendarProps {
  availability: Availability[];
}

export function AvailabilityCalendar({
  availability,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Create a map for quick availability lookup
  const availabilityMap = new Map(
    availability.map((a) => [
      format(new Date(a.date), "yyyy-MM-dd"),
      a.available,
    ])
  );

  const isAvailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availabilityMap.get(dateStr) !== false;
  };

  const isPast = (date: Date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            disabled={isSameMonth(currentMonth, new Date())}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const available = isAvailable(day);
          const past = isPast(day);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "relative p-2 text-center text-sm rounded-md",
                past && "text-gray-400",
                !past && available && "bg-green-50 text-green-700 font-medium",
                !past && !available && "bg-red-50 text-red-700 font-medium",
                "transition-colors"
              )}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 rounded" />
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 rounded" />
          <span className="text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
