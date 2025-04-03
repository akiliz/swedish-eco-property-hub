
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <AdminOverview />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
