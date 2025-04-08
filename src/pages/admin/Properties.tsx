
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Edit, Trash, Plus, MapPin } from "lucide-react";

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

const AdminProperties = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

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
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique property types for filter
  const propertyTypes = Array.from(new Set(mockProperties.map(p => p.type)));

  // Handle edit property
  const handleEdit = (propertyId: number) => {
    navigate(`/admin/properties/edit/${propertyId}`);
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
              <div className="flex gap-2">
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
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {property.energyClass}
                          </Badge>
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
