
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/custom-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Edit, Trash, Plus, MapPin, Filter, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Mock data - would be fetched from API in production
const mockProperties = [
  { 
    id: 1, 
    title: "Eco Villa Stockholm", 
    location: "Stockholm", 
    price: "€450,000", 
    status: "active", 
    type: "Villa",
    bedrooms: 3,
    energyClass: "A",
    createdAt: "2024-03-15"
  },
  { 
    id: 2, 
    title: "Green Apartment", 
    location: "Gothenburg", 
    price: "€275,000", 
    status: "pending", 
    type: "Apartment",
    bedrooms: 2,
    energyClass: "A",
    createdAt: "2024-03-28"
  },
  { 
    id: 3, 
    title: "Solar Cottage", 
    location: "Uppsala", 
    price: "€320,000", 
    status: "sold", 
    type: "Cottage",
    bedrooms: 2,
    energyClass: "B",
    createdAt: "2024-02-18"
  },
  { 
    id: 4, 
    title: "Passive House", 
    location: "Malmö", 
    price: "€520,000", 
    status: "active", 
    type: "House",
    bedrooms: 4,
    energyClass: "A+",
    createdAt: "2024-04-01"
  },
  { 
    id: 5, 
    title: "Mountain Eco Cabin", 
    location: "Northern Sweden", 
    price: "€180,000", 
    status: "active", 
    type: "Cabin",
    bedrooms: 1,
    energyClass: "B",
    createdAt: "2024-03-10"
  },
];

// Energy classes definitions
const energyClasses = [
  {
    category: "EU Energy Performance Classes",
    region: "EU",
    type: "Energy Performance",
    items: [
      { value: "A+++", label: "A+++", efficiency: "high", description: "Highest energy efficiency level in the EU system, typically <30 kWh/m²/year" },
      { value: "A++", label: "A++", efficiency: "high", description: "Very high energy efficiency, typically <50 kWh/m²/year" },
      { value: "A+", label: "A+", efficiency: "high", description: "Excellent energy efficiency, typically <70 kWh/m²/year" },
      { value: "A", label: "A", efficiency: "high", description: "Good energy efficiency, typically <90 kWh/m²/year" },
      { value: "B", label: "B", efficiency: "medium", description: "Above average energy efficiency, typically <120 kWh/m²/year" },
      { value: "C", label: "C", efficiency: "medium", description: "Average energy efficiency, typically <150 kWh/m²/year" },
      { value: "D", label: "D", efficiency: "low", description: "Below average energy efficiency, typically <200 kWh/m²/year" },
      { value: "E", label: "E", efficiency: "low", description: "Poor energy efficiency, typically <250 kWh/m²/year" },
    ]
  },
  {
    category: "LEED Certification",
    region: "Global",
    type: "Green Building",
    items: [
      { value: "LEED Platinum", label: "Platinum", efficiency: "high", description: "Highest LEED certification level, 80+ points" },
      { value: "LEED Gold", label: "Gold", efficiency: "high", description: "High LEED certification level, 60-79 points" },
      { value: "LEED Silver", label: "Silver", efficiency: "medium", description: "Middle LEED certification level, 50-59 points" },
      { value: "LEED Certified", label: "Certified", efficiency: "medium", description: "Basic LEED certification level, 40-49 points" }
    ]
  },
  {
    category: "BREEAM Ratings",
    region: "Global",
    type: "Green Building",
    items: [
      { value: "BREEAM Outstanding", label: "Outstanding", efficiency: "high", description: "Highest BREEAM rating, innovative sustainability solutions" },
      { value: "BREEAM Excellent", label: "Excellent", efficiency: "high", description: "Best practice sustainability performance" },
      { value: "BREEAM Very Good", label: "Very Good", efficiency: "medium", description: "Advanced good practice sustainability performance" }
    ]
  },
  {
    category: "Passive House Certification",
    region: "Global",
    type: "Passive Design",
    items: [
      { value: "Passive House", label: "Certified Passive House", efficiency: "high", description: "Rigorous standard for energy efficiency, <15 kWh/m²/year for heating/cooling" }
    ]
  },
  {
    category: "Nordic Swan Ecolabel",
    region: "Nordic",
    type: "Ecolabel",
    items: [
      { value: "Nordic Swan", label: "Swan-Labeled Building", efficiency: "high", description: "Nordic eco-label certifying environmental performance of buildings" }
    ]
  },
  {
    category: "Energy Star Rating",
    region: "US",
    type: "Energy Performance",
    items: [
      { value: "Energy Star", label: "Energy Star Certified", efficiency: "high", description: "US EPA certification for buildings in the top 25% of energy efficiency" }
    ]
  },
  {
    category: "Swedish Energy Classes",
    region: "Nordic",
    type: "Energy Performance",
    items: [
      { value: "Energiklass A", label: "Energiklass A (<50 kWh/m²/year)", efficiency: "high", description: "Swedish energy classification for buildings with excellent performance" },
      { value: "Energiklass B", label: "Energiklass B (<100 kWh/m²/year)", efficiency: "medium", description: "Swedish energy classification for buildings with good performance" }
    ]
  }
];

const AdminProperties = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [energyClassFilter, setEnergyClassFilter] = useState<string | null>(null);
  const [energySearchTerm, setEnergySearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [certTypeFilter, setCertTypeFilter] = useState<string | null>(null);
  const [efficiencyFilter, setEfficiencyFilter] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Filter properties based on search and filters
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = searchTerm === "" || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || property.status === statusFilter;
    const matchesType = typeFilter === null || property.type === typeFilter;
    const matchesEnergyClass = energyClassFilter === null || property.energyClass === energyClassFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesEnergyClass;
  });

  // Get unique property types for filter
  const propertyTypes = Array.from(new Set(mockProperties.map(p => p.type)));

  // Filter energy classes based on filters and search
  const getFilteredEnergyClasses = () => {
    let filtered = [...energyClasses];
    
    if (regionFilter) {
      filtered = filtered.filter(cat => cat.region === regionFilter);
    }
    
    if (certTypeFilter) {
      filtered = filtered.filter(cat => cat.type === certTypeFilter);
    }
    
    const result = filtered.map(category => ({
      ...category,
      items: category.items.filter(item => {
        const matchesEfficiency = !efficiencyFilter || item.efficiency === efficiencyFilter;
        const matchesSearch = !energySearchTerm || 
          item.label.toLowerCase().includes(energySearchTerm.toLowerCase()) ||
          category.category.toLowerCase().includes(energySearchTerm.toLowerCase());
        
        return matchesEfficiency && matchesSearch;
      })
    })).filter(category => category.items.length > 0);
    
    return result;
  };

  // Handle edit property
  const handleEdit = (propertyId: number) => {
    navigate(`/admin/properties/edit/${propertyId}`);
  };

  // Get badge color based on efficiency
  const getEfficiencyColor = (efficiency: string) => {
    switch(efficiency) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Properties Management</h1>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add New Property</span>
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search properties..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Type: {typeFilter || 'All'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTypeFilter(null)}>All</DropdownMenuItem>
                    {propertyTypes.map(type => (
                      <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Status: {statusFilter || 'All'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("sold")}>Sold</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between">
                      {energyClassFilter ? (
                        <>Energy Class: {energyClassFilter}</>
                      ) : (
                        <>Energy Class: Not Specified</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="end">
                    <Command>
                      <CommandInput 
                        placeholder="Search energy classes..." 
                        value={energySearchTerm} 
                        onValueChange={setEnergySearchTerm}
                      />
                      
                      <div className="border-t p-2 flex flex-wrap gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setRegionFilter(null)}
                          className={cn("text-xs", !regionFilter && "bg-muted")}
                        >
                          All Regions
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setRegionFilter("EU")}
                          className={cn("text-xs", regionFilter === "EU" && "bg-muted")}
                        >
                          EU
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setRegionFilter("Nordic")}
                          className={cn("text-xs", regionFilter === "Nordic" && "bg-muted")}
                        >
                          Nordic
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setRegionFilter("Global")}
                          className={cn("text-xs", regionFilter === "Global" && "bg-muted")}
                        >
                          Global
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setRegionFilter("US")}
                          className={cn("text-xs", regionFilter === "US" && "bg-muted")}
                        >
                          US
                        </Button>
                      </div>
                      
                      <div className="border-t p-2 flex flex-wrap gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCertTypeFilter(null)}
                          className={cn("text-xs", !certTypeFilter && "bg-muted")}
                        >
                          All Types
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCertTypeFilter("Energy Performance")}
                          className={cn("text-xs", certTypeFilter === "Energy Performance" && "bg-muted")}
                        >
                          Energy Performance
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCertTypeFilter("Green Building")}
                          className={cn("text-xs", certTypeFilter === "Green Building" && "bg-muted")}
                        >
                          Green Building
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCertTypeFilter("Passive Design")}
                          className={cn("text-xs", certTypeFilter === "Passive Design" && "bg-muted")}
                        >
                          Passive
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCertTypeFilter("Ecolabel")}
                          className={cn("text-xs", certTypeFilter === "Ecolabel" && "bg-muted")}
                        >
                          Ecolabel
                        </Button>
                      </div>
                      
                      <div className="border-t p-2 flex flex-wrap gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEfficiencyFilter(null)}
                          className={cn("text-xs", !efficiencyFilter && "bg-muted")}
                        >
                          All Efficiency
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEfficiencyFilter("high")}
                          className={cn("text-xs bg-green-50 border-green-200 text-green-700", 
                            efficiencyFilter === "high" && "bg-green-100")}
                        >
                          High
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEfficiencyFilter("medium")}
                          className={cn("text-xs bg-yellow-50 border-yellow-200 text-yellow-700", 
                            efficiencyFilter === "medium" && "bg-yellow-100")}
                        >
                          Medium
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEfficiencyFilter("low")}
                          className={cn("text-xs bg-red-50 border-red-200 text-red-700", 
                            efficiencyFilter === "low" && "bg-red-100")}
                        >
                          Low
                        </Button>
                      </div>
                      
                      <CommandEmpty>No energy class found.</CommandEmpty>
                      
                      <CommandList className="max-h-[300px]">
                        <CommandItem
                          onSelect={() => {
                            setEnergyClassFilter(null);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between"
                        >
                          <span>Not Specified</span>
                          {energyClassFilter === null && <span>✓</span>}
                        </CommandItem>
                        
                        {getFilteredEnergyClasses().map((category) => (
                          <CommandGroup key={category.category} heading={category.category}>
                            {category.items.map((item) => (
                              <TooltipProvider key={item.value}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <CommandItem
                                      className="flex items-center gap-2"
                                      onSelect={() => {
                                        setEnergyClassFilter(item.value);
                                        setOpen(false);
                                      }}
                                    >
                                      <span className={cn("h-2 w-2 rounded-full", 
                                        item.efficiency === "high" ? "bg-green-500" : 
                                        item.efficiency === "medium" ? "bg-yellow-500" : 
                                        "bg-red-500"
                                      )} />
                                      <span className="flex-grow">{item.label}</span>
                                      <span className={cn("text-xs px-2 py-0.5 rounded border",
                                        getEfficiencyColor(item.efficiency)
                                      )}>
                                        {item.efficiency}
                                      </span>
                                      {energyClassFilter === item.value && <span>✓</span>}
                                    </CommandItem>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-xs">
                                    <div className="flex items-start gap-2">
                                      <Info size={14} className="mt-0.5" />
                                      <div>
                                        <p className="font-medium">{category.category}: {item.label}</p>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Properties Table */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Property List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Energy Class</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No properties found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          <div>{property.title}</div>
                          <div className="text-xs text-muted-foreground">{property.bedrooms} bedrooms</div>
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <MapPin size={14} className="text-muted-foreground" />
                          {property.location}
                        </TableCell>
                        <TableCell>{property.price}</TableCell>
                        <TableCell>
                          <Badge variant={
                            property.status === "active" ? "success" :
                            property.status === "pending" ? "warning" : "default"
                          }>
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className={cn(
                                  property.energyClass === "A+++" || 
                                  property.energyClass === "A++" || 
                                  property.energyClass === "A+" || 
                                  property.energyClass === "A" ? 
                                  "bg-green-50 text-green-700 border-green-200" :
                                  property.energyClass === "B" || 
                                  property.energyClass === "C" ?
                                  "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                  "bg-red-50 text-red-700 border-red-200"
                                )}>
                                  {property.energyClass}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                {property.energyClass === "A+++" || 
                                 property.energyClass === "A++" || 
                                 property.energyClass === "A+" || 
                                 property.energyClass === "A" ? 
                                  "High efficiency: <90 kWh/m²/year" :
                                 property.energyClass === "B" || 
                                 property.energyClass === "C" ?
                                  "Medium efficiency: <150 kWh/m²/year" :
                                  "Low efficiency: >150 kWh/m²/year"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="flex items-center gap-2"
                                onClick={() => handleEdit(property.id)}
                              >
                                <Edit className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2" 
                                onClick={() => window.open(`/properties/${property.id}`, '_blank')}>
                                <Search className="h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProperties;
