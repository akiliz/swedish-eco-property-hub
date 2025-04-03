
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "sv">("en");
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sv" : "en");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-eco-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold">SE</span>
            </div>
            <span className="text-xl font-bold text-eco-green">
              {language === "en" ? "EcoHome Sweden" : "EkoHem Sverige"}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/properties" 
            className="text-foreground hover:text-eco-green transition-colors"
          >
            {language === "en" ? "Properties" : "Fastigheter"}
          </Link>
          <Link 
            to="/agents" 
            className="text-foreground hover:text-eco-green transition-colors"
          >
            {language === "en" ? "Agents" : "Mäklare"}
          </Link>
          <Link 
            to="/expat-resources" 
            className="text-foreground hover:text-eco-green transition-colors"
          >
            {language === "en" ? "Expat Resources" : "Utländsk Resurs"}
          </Link>
          <Link 
            to="/about" 
            className="text-foreground hover:text-eco-green transition-colors"
          >
            {language === "en" ? "About" : "Om Oss"}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleLanguage}>
                {language === "en" ? "Svenska" : "English"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  {language === "en" ? "My Profile" : "Min Profil"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/saved-properties")}>
                  {language === "en" ? "Saved Properties" : "Sparade Fastigheter"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  {language === "en" ? "Logout" : "Logga Ut"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              className="hidden md:inline-flex"
              onClick={() => navigate("/auth")}
            >
              {language === "en" ? "Login" : "Logga In"}
            </Button>
          )}

          <Button 
            variant="default" 
            className="hidden md:inline-flex"
            onClick={() => navigate("/list-property")}
          >
            {language === "en" ? "List Property" : "Lägg Till Fastighet"}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-2 px-4 space-y-2">
          <button
            className="block w-full text-left py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => handleNavigation("/properties")}
          >
            {language === "en" ? "Properties" : "Fastigheter"}
          </button>
          <button
            className="block w-full text-left py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => handleNavigation("/agents")}
          >
            {language === "en" ? "Agents" : "Mäklare"}
          </button>
          <button
            className="block w-full text-left py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => handleNavigation("/expat-resources")}
          >
            {language === "en" ? "Expat Resources" : "Utländsk Resurs"}
          </button>
          <button
            className="block w-full text-left py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => handleNavigation("/about")}
          >
            {language === "en" ? "About" : "Om Oss"}
          </button>
          {isAuthenticated ? (
            <>
              <button
                className="block w-full text-left py-2 text-foreground hover:text-eco-green transition-colors"
                onClick={() => handleNavigation("/profile")}
              >
                {language === "en" ? "My Profile" : "Min Profil"}
              </button>
              <button
                className="block w-full text-left py-2 text-destructive hover:text-destructive/80 transition-colors"
                onClick={handleLogout}
              >
                {language === "en" ? "Logout" : "Logga Ut"}
              </button>
            </>
          ) : (
            <button
              className="block w-full text-left py-2 text-foreground hover:text-eco-green transition-colors"
              onClick={() => handleNavigation("/auth")}
            >
              {language === "en" ? "Login" : "Logga In"}
            </button>
          )}
          <Button 
            className="w-full mt-2"
            onClick={() => handleNavigation("/list-property")}
          >
            {language === "en" ? "List Property" : "Lägg Till Fastighet"}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
