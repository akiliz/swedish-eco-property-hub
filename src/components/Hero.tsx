
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?location=${location}&type=${propertyType}`);
  };

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div 
        className="h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://cdn.mos.cms.futurecdn.net/rFWTirBgcDcqhLMHPhnL4e-1180-80.jpg')"
        }}
      ></div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Eco-Friendly Swedish Property
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Discover sustainable properties in Sweden perfect for international buyers and investors
          </p>
          
          <div className="max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-white" />
                <Input 
                  placeholder="City, region or neighborhood"
                  className="pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-white/20 text-white border-white/30 w-full md:w-[200px]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="all">All Properties</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleSearch}
                className="bg-eco-green hover:bg-eco-darkGreen text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Button variant="link" className="text-white hover:text-eco-wood h-auto p-0">
                Stockholm Properties
              </Button>
              <span className="text-white/50">•</span>
              <Button variant="link" className="text-white hover:text-eco-wood h-auto p-0">
                Gothenburg Properties
              </Button>
              <span className="text-white/50">•</span>
              <Button variant="link" className="text-white hover:text-eco-wood h-auto p-0">
                Malmö Properties
              </Button>
              <span className="text-white/50">•</span>
              <Button variant="link" className="text-white hover:text-eco-wood h-auto p-0">
                Sustainable Homes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
