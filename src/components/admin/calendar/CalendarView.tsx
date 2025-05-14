
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { hasEvents } from "./calendarUtils";

interface CalendarViewProps {
  date: Date;
  setDate: (date: Date | undefined) => void;
}

export const CalendarView = ({ date, setDate }: CalendarViewProps) => {
  const modifiers = {
    hasEvent: (day: Date) => hasEvents(day),
  };

  return (
    <div>
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
  );
};
