
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Slider 
} from "@/components/ui/slider";
import { 
  Checkbox 
} from "@/components/ui/checkbox";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Search, 
  Building, 
  Home, 
  Filter, 
  X, 
  ChevronDown 
} from "lucide-react";

interface SearchFiltersProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  onSearch?: (filters: any) => void;
}

const SearchFilters = ({ 
  isCollapsed = false, 
  toggleCollapse,
  onSearch 
}: SearchFiltersProps) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [priceRange, setPriceRange] = useState([3000000, 10000000]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [visaEligible, setVisaEligible] = useState(false);
  const [schoolDistance, setSchoolDistance] = useState<string>("");
  const [sellerType, setSellerType] = useState<string>("");
  const [propertyAge, setPropertyAge] = useState<string>("");
  const [energyClass, setEnergyClass] = useState<string>("");

  const handleCertificationToggle = (certification: string) => {
    setCertifications((prev) => 
      prev.includes(certification)
        ? prev.filter(c => c !== certification)
        : [...prev, certification]
    );
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        propertyType,
        priceRange,
        certifications,
        visaEligible,
        schoolDistance,
        sellerType,
        propertyAge,
        energyClass
      });
    }
  };

  const handleReset = () => {
    setLocation("");
    setPropertyType("");
    setPriceRange([3000000, 10000000]);
    setCertifications([]);
    setVisaEligible(false);
    setSchoolDistance("");
    setSellerType("");
    setPropertyAge("");
    setEnergyClass("");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE").format(price);
  };

  return (
    <Card className="bg-white">
      <CardContent className={`p-4 ${isCollapsed ? "hidden" : "block"} md:block`}>
        <div className="grid gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location, district or address"
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      Residential
                    </div>
                  </SelectItem>
                  <SelectItem value="commercial">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Commercial
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={energyClass} onValueChange={setEnergyClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Energy Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Energy Class A</SelectItem>
                  <SelectItem value="B">Energy Class B</SelectItem>
                  <SelectItem value="C">Energy Class C</SelectItem>
                  <SelectItem value="D">Energy Class D</SelectItem>
                  <SelectItem value="E">Energy Class E</SelectItem>
                  <SelectItem value="F">Energy Class F</SelectItem>
                  <SelectItem value="G">Energy Class G</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={propertyAge} onValueChange={setPropertyAge}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_construction">New Construction</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="existing">Existing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Price Range (SEK)</p>
            <div className="mb-6">
              <Slider
                defaultValue={[3000000, 10000000]}
                max={25000000}
                min={500000}
                step={100000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="currency-sek">{formatPrice(priceRange[0])}</span>
              <span className="currency-sek">{formatPrice(priceRange[1])}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Sustainability Certifications</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="nordic-swan" 
                    checked={certifications.includes("Nordic Swan")}
                    onCheckedChange={() => handleCertificationToggle("Nordic Swan")}
                  />
                  <label htmlFor="nordic-swan" className="text-sm">Nordic Swan</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="breeam" 
                    checked={certifications.includes("BREEAM")}
                    onCheckedChange={() => handleCertificationToggle("BREEAM")}
                  />
                  <label htmlFor="breeam" className="text-sm">BREEAM</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="leed" 
                    checked={certifications.includes("LEED")}
                    onCheckedChange={() => handleCertificationToggle("LEED")}
                  />
                  <label htmlFor="leed" className="text-sm">LEED</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="miljöbyggnad" 
                    checked={certifications.includes("Miljöbyggnad")}
                    onCheckedChange={() => handleCertificationToggle("Miljöbyggnad")}
                  />
                  <label htmlFor="miljöbyggnad" className="text-sm">Miljöbyggnad</label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Visa Eligibility</p>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="visa-eligible" 
                    checked={visaEligible}
                    onCheckedChange={() => setVisaEligible(!visaEligible)}
                  />
                  <label htmlFor="visa-eligible" className="text-sm">Eligible for visa sponsorship</label>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Distance from International Schools</p>
                <Select value={schoolDistance} onValueChange={setSchoolDistance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">< 1 km</SelectItem>
                    <SelectItem value="5">< 5 km</SelectItem>
                    <SelectItem value="10">< 10 km</SelectItem>
                    <SelectItem value="any">Any distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Seller Type</p>
            <Select value={sellerType} onValueChange={setSellerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select seller type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="any">Any seller</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1 bg-eco-green hover:bg-eco-darkGreen" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search Properties
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <X className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>

      {toggleCollapse && (
        <div className="md:hidden p-4 flex justify-center border-t">
          <Button variant="ghost" onClick={toggleCollapse} className="w-full flex justify-center">
            <span className="mr-2">
              {isCollapsed ? "Show Filters" : "Hide Filters"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SearchFilters;
