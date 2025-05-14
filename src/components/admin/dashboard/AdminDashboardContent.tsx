
import AdminNotifications from "@/components/admin/AdminNotifications";
import { AdminOverview } from "@/components/admin/dashboard/AdminOverview";

const AdminDashboardContent = () => {
  return (
    <main className="flex-grow p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <AdminNotifications />
        </div>
      </div>
      <AdminOverview />
    </main>
  );
};

export default AdminDashboardContent;
