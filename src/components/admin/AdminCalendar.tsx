
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Add events for the calendar
const events = [
  { 
    id: 1, 
    title: "Team Meeting", 
    date: new Date(2025, 4, 15), 
    type: "meeting" 
  },
  { 
    id: 2, 
    title: "Property Tour: Eco Villa", 
    date: new Date(2025, 4, 17), 
    type: "property-tour" 
  },
  { 
    id: 3, 
    title: "Content Review", 
    date: new Date(2025, 4, 20), 
    type: "meeting" 
  },
  { 
    id: 4, 
    title: "New Property Launch", 
    date: new Date(2025, 4, 22), 
    type: "event" 
  },
  { 
    id: 5, 
    title: "Investor Call", 
    date: new Date(2025, 4, 14), 
    type: "call" 
  },
];

// Mock data for today's events
const todaysEvents = [
  { id: 1, title: "Team Standup", time: "10:00 AM - 10:30 AM", type: "meeting" },
  { id: 2, title: "Property Viewing: Lake View Apartment", time: "1:00 PM - 2:30 PM", type: "property-tour" },
  { id: 3, title: "Client Call: Johnson Family", time: "3:00 PM - 3:30 PM", type: "call" },
];

const AdminCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month");
  
  // Helper to check if a date has events
  const hasEvents = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Get events for selected date
  const selectedDateEvents = events.filter(event => 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );

  // Custom day renderer - removed as it's not supported by the Calendar component
  const modifiers = {
    hasEvent: (day: Date) => hasEvents(day),
  };

  // Get type-specific styling for events
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "property-tour":
        return "bg-green-100 text-green-800 border-green-200";
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "call":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Schedule and upcoming events</CardDescription>
          </div>
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
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-5">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className={cn("border rounded-md p-3 pointer-events-auto")}
              modifiers={modifiers}
              modifiersClassNames={{
                hasEvent: "has-event",
              }}
            />
            {/* Fix: Remove jsx and global props from style tag */}
            <style>
              {`.has-event::after {
                content: '';
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: currentColor;
                opacity: 0.7;
              }`}
            </style>
          </div>
          <div className="md:col-span-2">
            <div className="border rounded-md h-full p-3">
              <div className="flex items-center justify-between border-b pb-2 mb-3">
                <h3 className="font-medium text-sm">Today's Schedule</h3>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              
              {todaysEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No events scheduled
                </div>
              ) : (
                <div className="space-y-3">
                  {todaysEvents.map((event) => (
                    <div key={event.id} className="border rounded-md p-2 text-sm">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                      <Badge 
                        variant="outline" 
                        className={cn("mt-2 text-xs", getEventTypeStyle(event.type))}
                      >
                        {event.type.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Badge>
                    </div>
                  ))}
                  
                  {selectedDateEvents.length > 0 && date.toDateString() !== new Date().toDateString() && (
                    <div className="border-t mt-4 pt-3">
                      <h4 className="text-xs font-medium mb-2">
                        Selected Date: {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </h4>
                      {selectedDateEvents.map((event) => (
                        <div key={event.id} className="border rounded-md p-2 text-sm mb-2 last:mb-0">
                          <p className="font-medium">{event.title}</p>
                          <Badge 
                            variant="outline" 
                            className={cn("mt-2 text-xs", getEventTypeStyle(event.type))}
                          >
                            {event.type.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCalendar;
