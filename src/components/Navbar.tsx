
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "sv">("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sv" : "en");
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

          <Button variant="default" className="hidden md:inline-flex">
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
          <Link
            to="/properties"
            className="block py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {language === "en" ? "Properties" : "Fastigheter"}
          </Link>
          <Link
            to="/agents"
            className="block py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {language === "en" ? "Agents" : "Mäklare"}
          </Link>
          <Link
            to="/expat-resources"
            className="block py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {language === "en" ? "Expat Resources" : "Utländsk Resurs"}
          </Link>
          <Link
            to="/about"
            className="block py-2 text-foreground hover:text-eco-green transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {language === "en" ? "About" : "Om Oss"}
          </Link>
          <Button className="w-full mt-2">
            {language === "en" ? "List Property" : "Lägg Till Fastighet"}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
