
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  MessageSquare,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const menuItems = [
    { path: "/admin", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { path: "/admin/properties", label: "Properties", icon: <Home size={20} /> },
    { path: "/admin/inquiries", label: "Inquiries", icon: <MessageSquare size={20} /> },
    { path: "/admin/content", label: "Content", icon: <FileText size={20} /> },
    { path: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={cn(
        "bg-slate-50 border-r border-border h-full transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex justify-between items-center">
          {!collapsed && <h2 className="font-semibold">Admin Panel</h2>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm transition-colors",
                    "hover:bg-slate-100",
                    location.pathname === item.path 
                      ? "bg-slate-100 text-primary font-medium" 
                      : "text-muted-foreground",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <span className="flex items-center">
                    {item.icon}
                  </span>
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <Button 
            variant="ghost" 
            size={collapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start text-destructive hover:text-destructive",
              collapsed && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
