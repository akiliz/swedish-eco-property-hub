
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, Home, Shield, Settings, FileText, Calendar, Search } from "lucide-react";

interface Activity {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  icon: JSX.Element;
}

const getUserActivityData = (): Activity[] => [
  {
    id: 1,
    action: "Updated property listing",
    user: "Emma Smith",
    timestamp: "Today, 10:42 AM",
    icon: <Home className="h-4 w-4 text-blue-500" />
  },
  {
    id: 2,
    action: "Added new user account",
    user: "Michael Rodriguez",
    timestamp: "Today, 9:30 AM",
    icon: <Users className="h-4 w-4 text-green-500" />
  },
  {
    id: 3,
    action: "Modified permission settings",
    user: "Alex Johnson",
    timestamp: "Yesterday, 4:15 PM",
    icon: <Shield className="h-4 w-4 text-amber-500" />
  },
  {
    id: 4,
    action: "Updated site content",
    user: "Sophia Chen",
    timestamp: "Yesterday, 1:22 PM",
    icon: <FileText className="h-4 w-4 text-purple-500" />
  },
  {
    id: 5,
    action: "Changed system settings",
    user: "Thomas Wilson",
    timestamp: "Feb 12, 11:45 AM",
    icon: <Settings className="h-4 w-4 text-gray-500" />
  }
];

const AdminActivityLog = () => {
  const activities = getUserActivityData();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions by administrators</CardDescription>
          </div>
          <Search className="text-muted-foreground" size={18} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center border-b p-3 last:border-0 hover:bg-muted/50 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs text-muted-foreground">{activity.user}</span>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActivityLog;
