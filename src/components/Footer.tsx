
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-eco-green rounded-md flex items-center justify-center">
                <span className="text-white font-bold">SE</span>
              </div>
              <span className="text-xl font-bold">EcoHome Sweden</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              The premier directory for eco-certified properties in Sweden tailored for international buyers and investors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-300 hover:text-white">
                  Agents
                </Link>
              </li>
              <li>
                <Link to="/expat-resources" className="text-gray-300 hover:text-white">
                  Expat Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Regions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?location=Stockholm" className="text-gray-300 hover:text-white">
                  Stockholm
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Gothenburg" className="text-gray-300 hover:text-white">
                  Gothenburg
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Malmö" className="text-gray-300 hover:text-white">
                  Malmö
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Västra Götaland" className="text-gray-300 hover:text-white">
                  Västra Götaland
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-eco-green" />
                <span className="text-gray-300">
                  Storgatan 1, 11123 Stockholm, Sweden
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-eco-green" />
                <span className="text-gray-300">+46 8 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-eco-green" />
                <span className="text-gray-300">info@ecohomesweden.se</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} EcoHome Sweden. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
              <Link to="/gdpr" className="text-sm text-gray-400 hover:text-white">
                GDPR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
