
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminProperties = () => {
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
          <h1 className="text-2xl font-bold mb-6">Properties Management</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-muted-foreground">Property management functionality will be implemented here.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProperties;
