
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, MessageSquare, TrendingUp } from "lucide-react";

const AdminOverview = () => {
  // This would normally be fetched from your API
  const stats = [
    { title: "Total Users", value: "256", icon: <Users size={24} />, change: "+12% from last month" },
    { title: "Active Properties", value: "124", icon: <Home size={24} />, change: "+5% from last month" },
    { title: "New Inquiries", value: "28", icon: <MessageSquare size={24} />, change: "+18% from last month" },
    { title: "Monthly Visits", value: "12,456", icon: <TrendingUp size={24} />, change: "+22% from last month" },
  ];

  const recentActivities = [
    { type: "New User", name: "John Doe", date: "2 hours ago" },
    { type: "Property Listed", name: "Eco Villa Stockholm", date: "5 hours ago" },
    { type: "Inquiry", name: "Alice Smith for Mountain Cabin", date: "1 day ago" },
    { type: "User Update", name: "Mark Johnson", date: "2 days ago" },
    { type: "Property Update", name: "Lake View Apartment", date: "3 days ago" },
  ];

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full py-2 px-3 text-sm bg-slate-100 hover:bg-slate-200 rounded-md text-left transition-colors">
              Add New Property
            </button>
            <button className="w-full py-2 px-3 text-sm bg-slate-100 hover:bg-slate-200 rounded-md text-left transition-colors">
              Create User Account
            </button>
            <button className="w-full py-2 px-3 text-sm bg-slate-100 hover:bg-slate-200 rounded-md text-left transition-colors">
              Review Pending Inquiries
            </button>
            <button className="w-full py-2 px-3 text-sm bg-slate-100 hover:bg-slate-200 rounded-md text-left transition-colors">
              Update Featured Properties
            </button>
            <button className="w-full py-2 px-3 text-sm bg-slate-100 hover:bg-slate-200 rounded-md text-left transition-colors">
              View System Logs
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
