
import AdminActivityLog from "@/components/admin/AdminActivityLog";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminTaskManager from "@/components/admin/AdminTaskManager";
import AdminCalendar from "@/components/admin/AdminCalendar";
import { StatsCards } from "@/components/admin/dashboard/StatsCards";

export const AdminOverview = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <StatsCards />
      
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
