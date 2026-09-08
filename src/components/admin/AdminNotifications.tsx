
import { useState } from "react";
import {
  Bell,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  User,
  Settings,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "warning" | "success";
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New User Registration",
    description: "Anna Johnson has signed up for an account.",
    timestamp: "10 minutes ago",
    type: "info",
    read: false
  },
  {
    id: "2",
    title: "Property Listing Approved",
    description: "Eco Villa Stockholm has been approved and is now live.",
    timestamp: "1 hour ago",
    type: "success",
    read: false
  },
  {
    id: "3",
    title: "Inquiry Response Needed",
    description: "Mark Smith's inquiry has been waiting for 48 hours.",
    timestamp: "2 days ago",
    type: "warning",
    read: false
  },
  {
    id: "4",
    title: "Site Maintenance",
    description: "Scheduled maintenance tonight from 2-4am CET.",
    timestamp: "5 hours ago",
    type: "info",
    read: true
  }
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      description: "All notifications marked as read",
      variant: "success",
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8" 
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id}
                className={cn(
                  "border-b last:border-0 px-4 py-3 relative",
                  !notification.read && "bg-muted/50"
                )}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <NotificationIcon type={notification.type} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mr-2"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="border-t p-2 flex justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full"
            onClick={() => setIsOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminNotifications;
