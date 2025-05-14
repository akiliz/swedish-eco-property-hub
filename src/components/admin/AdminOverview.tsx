
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, MessageSquare, TrendingUp, DollarSign } from "lucide-react";
import AdminActivityLog from "@/components/admin/AdminActivityLog";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminTaskManager from "@/components/admin/AdminTaskManager";
import AdminCalendar from "@/components/admin/AdminCalendar";

// Mock data for stats - would come from API in production
const stats = [
  { title: "Total Users", value: "256", icon: <Users size={24} />, change: "+12% from last month" },
  { title: "Active Properties", value: "124", icon: <Home size={24} />, change: "+5% from last month" },
  { title: "New Inquiries", value: "28", icon: <MessageSquare size={24} />, change: "+18% from last month" },
  { title: "Revenue", value: "€24,600", icon: <DollarSign size={24} />, change: "+22% from last month" },
];

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminAnalytics />
        <AdminActivityLog />
      </div>
      
      {/* Task Manager & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminTaskManager />
        <AdminCalendar />
      </div>
    </div>
  );
};

export default AdminOverview;
