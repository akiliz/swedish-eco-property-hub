
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarView } from "./calendar/CalendarView";
import { EventList } from "./calendar/EventList";
import { CalendarHeader } from "./calendar/CalendarHeader";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month");

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Schedule and upcoming events</CardDescription>
          </div>
          <CalendarHeader calendarView={calendarView} setCalendarView={setCalendarView} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-5">
            <CalendarView date={date} setDate={setDate} />
          </div>
          <div className="md:col-span-2">
            <EventList date={date} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCalendar;
