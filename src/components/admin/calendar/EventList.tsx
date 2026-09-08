
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { todaysEvents, getSelectedDateEvents, getEventTypeStyle } from "./calendarUtils";

interface EventListProps {
  date: Date;
}

export const EventList = ({ date }: EventListProps) => {
  const selectedDateEvents = getSelectedDateEvents(date);
  const isToday = date.toDateString() === new Date().toDateString();
  
  return (
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
          
          {selectedDateEvents.length > 0 && !isToday && (
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
  );
};
