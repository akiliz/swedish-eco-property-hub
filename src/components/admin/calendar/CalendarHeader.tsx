
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarHeaderProps {
  calendarView: "month" | "week" | "day";
  setCalendarView: (view: "month" | "week" | "day") => void;
}

export const CalendarHeader = ({ calendarView, setCalendarView }: CalendarHeaderProps) => {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-1">
            <Button 
              variant={calendarView === "month" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setCalendarView("month")}
            >
              Month
            </Button>
            <Button 
              variant={calendarView === "week" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setCalendarView("week")}
            >
              Week
            </Button>
            <Button 
              variant={calendarView === "day" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setCalendarView("day")}
            >
              Day
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Button size="sm" className="h-8">
        <CalendarIcon className="h-3 w-3 mr-1" />
        Add Event
      </Button>
    </div>
  );
};
