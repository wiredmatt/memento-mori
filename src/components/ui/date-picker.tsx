"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerProps {
  placeholder: string;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
}

export function DatePicker({ placeholder, date, setDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const handleSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    if (setDate) {
      setDate(newDate);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "border-2 border-gray-400 border-dashed hover:border-gray-500 focus:border-gray-500",
            "text-center font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpen(!open)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={selectedDate || undefined}
          fromDate={new Date(1900, 0, 1)}
          toDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
