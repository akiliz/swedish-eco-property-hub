
// Mock events data and utility functions for the admin calendar

// Add events for the calendar
export const events = [
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
export const todaysEvents = [
  { id: 1, title: "Team Standup", time: "10:00 AM - 10:30 AM", type: "meeting" },
  { id: 2, title: "Property Viewing: Lake View Apartment", time: "1:00 PM - 2:30 PM", type: "property-tour" },
  { id: 3, title: "Client Call: Johnson Family", time: "3:00 PM - 3:30 PM", type: "call" },
];

// Helper to check if a date has events
export const hasEvents = (day: Date) => {
  return events.some(event => 
    event.date.getDate() === day.getDate() && 
    event.date.getMonth() === day.getMonth() &&
    event.date.getFullYear() === day.getFullYear()
  );
};

// Get events for selected date
export const getSelectedDateEvents = (date: Date) => {
  return events.filter(event => 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
};

// Get type-specific styling for events
export const getEventTypeStyle = (type: string) => {
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
