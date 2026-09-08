
import React, { useState } from "react";
import { Search } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EnergyClassDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const energyClasses = [
  {
    category: "EU Energy Performance Classes",
    tooltip: "European Union standardized energy ratings based on primary energy consumption",
    options: [
      { value: "A+++", label: "A+++", color: "bg-emerald-500", efficiency: "high", region: "EU" },
      { value: "A++", label: "A++", color: "bg-emerald-500", efficiency: "high", region: "EU" },
      { value: "A+", label: "A+", color: "bg-green-500", efficiency: "high", region: "EU" },
      { value: "A", label: "A", color: "bg-green-500", efficiency: "high", region: "EU" },
      { value: "B", label: "B", color: "bg-lime-500", efficiency: "medium", region: "EU" },
      { value: "C", label: "C", color: "bg-yellow-500", efficiency: "medium", region: "EU" },
      { value: "D", label: "D", color: "bg-amber-500", efficiency: "medium", region: "EU" },
      { value: "E", label: "E", color: "bg-orange-500", efficiency: "low", region: "EU" },
      { value: "F", label: "F", color: "bg-red-500", efficiency: "low", region: "EU" },
      { value: "G", label: "G", color: "bg-red-700", efficiency: "low", region: "EU" },
    ]
  },
  {
    category: "LEED Certification",
    tooltip: "Leadership in Energy and Environmental Design - US Green Building Council's certification system",
    options: [
      { value: "LEED Platinum", label: "Platinum", color: "bg-emerald-500", efficiency: "high", region: "Global" },
      { value: "LEED Gold", label: "Gold", color: "bg-green-500", efficiency: "high", region: "Global" },
      { value: "LEED Silver", label: "Silver", color: "bg-blue-500", efficiency: "medium", region: "Global" },
      { value: "LEED Certified", label: "Certified", color: "bg-blue-400", efficiency: "medium", region: "Global" },
    ]
  },
  {
    category: "BREEAM Ratings",
    tooltip: "Building Research Establishment Environmental Assessment Method - UK's sustainability assessment method",
    options: [
      { value: "BREEAM Outstanding", label: "Outstanding", color: "bg-emerald-500", efficiency: "high", region: "Global" },
      { value: "BREEAM Excellent", label: "Excellent", color: "bg-green-500", efficiency: "high", region: "Global" },
      { value: "BREEAM Very Good", label: "Very Good", color: "bg-lime-500", efficiency: "medium", region: "Global" },
      { value: "BREEAM Good", label: "Good", color: "bg-yellow-500", efficiency: "medium", region: "Global" },
      { value: "BREEAM Pass", label: "Pass", color: "bg-amber-500", efficiency: "low", region: "Global" },
    ]
  },
  {
    category: "Passive House Certification",
    tooltip: "International energy efficiency standard focused on minimal energy consumption",
    options: [
      { value: "Passive House", label: "Certified Passive House", color: "bg-emerald-500", efficiency: "high", region: "Global" },
      { value: "Passive House Plus", label: "Passive House Plus", color: "bg-green-500", efficiency: "high", region: "Global" },
      { value: "Passive House Premium", label: "Passive House Premium", color: "bg-emerald-600", efficiency: "high", region: "Global" },
    ]
  },
  {
    category: "Nordic Swan Ecolabel",
    tooltip: "Nordic countries' official ecolabel for environmentally-friendly buildings",
    options: [
      { value: "Nordic Swan", label: "Swan-Labeled Buildings", color: "bg-green-500", efficiency: "high", region: "Nordic" },
    ]
  },
  {
    category: "Energy Star Rating",
    tooltip: "US EPA and DOE program that certifies energy-efficient buildings",
    options: [
      { value: "Energy Star", label: "Energy Star Certified Building", color: "bg-blue-500", efficiency: "high", region: "US" },
    ]
  },
  {
    category: "Swedish Energy Classes",
    tooltip: "Sweden's energy classification system based on energy consumption per square meter per year",
    options: [
      { value: "Energiklass A", label: "Energiklass A (<50 kWh/m²/year)", color: "bg-emerald-500", efficiency: "high", region: "Nordic" },
      { value: "Energiklass B", label: "Energiklass B (<100 kWh/m²/year)", color: "bg-green-500", efficiency: "high", region: "Nordic" },
      { value: "Energiklass C", label: "Energiklass C (<130 kWh/m²/year)", color: "bg-lime-500", efficiency: "medium", region: "Nordic" },
      { value: "Energiklass D", label: "Energiklass D (<160 kWh/m²/year)", color: "bg-yellow-500", efficiency: "medium", region: "Nordic" },
      { value: "Energiklass E", label: "Energiklass E (<190 kWh/m²/year)", color: "bg-amber-500", efficiency: "medium", region: "Nordic" },
      { value: "Energiklass F", label: "Energiklass F (<230 kWh/m²/year)", color: "bg-orange-500", efficiency: "low", region: "Nordic" },
      { value: "Energiklass G", label: "Energiklass G (>230 kWh/m²/year)", color: "bg-red-500", efficiency: "low", region: "Nordic" },
    ]
  }
];

const EnergyClassDropdown: React.FC<EnergyClassDropdownProps> = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    region: "all",
    efficiency: "all"
  });

  // Apply filters and search
  const filteredCategories = energyClasses.map(category => {
    const filteredOptions = category.options.filter(option => {
      const matchesSearch = option.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            category.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedFilters.region === "all" || option.region === selectedFilters.region;
      const matchesEfficiency = selectedFilters.efficiency === "all" || option.efficiency === selectedFilters.efficiency;
      
      return matchesSearch && matchesRegion && matchesEfficiency;
    });
    
    return {
      ...category,
      options: filteredOptions
    };
  }).filter(category => category.options.length > 0);

  const handleSelectEnergyClass = (energyClass: string) => {
    onChange(energyClass);
  };

  const handleFilterChange = (type: "region" | "efficiency", value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Find the currently selected option for display
  const displayOption = energyClasses
    .flatMap(category => category.options)
    .find(option => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>{value ? value : "Select Energy Class"}</span>
          {displayOption && (
            <div className={`ml-2 w-3 h-3 rounded-full ${displayOption.color}`}></div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-[500px] overflow-auto">
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search energy classes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <DropdownMenuLabel className="font-medium">Filter By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="grid grid-cols-2 gap-2 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Region: {selectedFilters.region === "all" ? "All" : selectedFilters.region}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFilterChange("region", "all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("region", "EU")}>EU</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("region", "Nordic")}>Nordic</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("region", "US")}>US</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("region", "Global")}>Global</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Efficiency: {selectedFilters.efficiency === "all" ? "All" : selectedFilters.efficiency}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFilterChange("efficiency", "all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("efficiency", "high")}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("efficiency", "medium")}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("efficiency", "low")}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onSelect={() => handleSelectEnergyClass("")}
          className={!value ? "bg-accent text-accent-foreground" : ""}
        >
          Not Specified (Default)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, idx) => (
            <DropdownMenuGroup key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuLabel className="font-medium cursor-help">
                    {category.category}
                  </DropdownMenuLabel>
                </TooltipTrigger>
                <TooltipContent>
                  {category.tooltip}
                </TooltipContent>
              </Tooltip>
              
              {category.options.map((option, optIdx) => (
                <DropdownMenuItem 
                  key={optIdx}
                  onSelect={() => handleSelectEnergyClass(option.value)}
                  className={value === option.value ? "bg-accent text-accent-foreground" : ""}
                >
                  <div className="flex justify-between w-full items-center">
                    {option.label}
                    <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                  </div>
                </DropdownMenuItem>
              ))}
              {idx < filteredCategories.length - 1 && <DropdownMenuSeparator />}
            </DropdownMenuGroup>
          ))
        ) : (
          <div className="p-2 text-center text-sm text-muted-foreground">
            No energy classes found matching your criteria
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnergyClassDropdown;
