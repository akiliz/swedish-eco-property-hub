
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/custom-badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Building, MapPin } from "lucide-react";
import { toast } from "sonner";

// Property form schema with validations
const propertyFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  type: z.string({ required_error: "Property type is required" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  location: z.string().min(2, { message: "Location is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  area: z.coerce.number().positive({ message: "Area must be a positive number" }),
  energyClass: z.string(),
  certifications: z.array(z.string()).optional(),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }).optional(),
  isNew: z.boolean().optional(),
  visaEligible: z.boolean().optional(),
  status: z.string()
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

// Mock property data - would come from API in production
const mockProperties = [
  { 
    id: "1", 
    title: "Eco Villa Stockholm", 
    location: "Stockholm", 
    address: "123 Green Street, Stockholm",
    price: 450000, 
    status: "active", 
    type: "residential",
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    energyClass: "A",
    description: "Beautiful eco-friendly villa with solar panels and modern amenities.",
    certifications: ["Nordic Swan", "BREEAM"],
    isNew: false,
    visaEligible: true,
    createdAt: "2024-03-15"
  },
  { 
    id: "2", 
    title: "Green Apartment", 
    location: "Gothenburg", 
    address: "45 Sustainable Avenue, Gothenburg",
    price: 275000, 
    status: "pending", 
    type: "residential",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    energyClass: "A",
    description: "Modern apartment with energy-efficient appliances and heating system.",
    certifications: ["LEED", "Passive House"],
    isNew: true,
    visaEligible: false,
    createdAt: "2024-03-28"
  },
  { 
    id: "3", 
    title: "Solar Cottage", 
    location: "Uppsala", 
    address: "78 Forest Lane, Uppsala",
    price: 320000, 
    status: "sold", 
    type: "residential",
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    energyClass: "B",
    description: "Charming cottage with solar power and rainwater collection system.",
    certifications: ["Nordic Swan"],
    isNew: false,
    visaEligible: true,
    createdAt: "2024-02-18"
  },
  { 
    id: "4", 
    title: "Passive House", 
    location: "Malmö", 
    address: "12 Eco Boulevard, Malmö",
    price: 520000, 
    status: "active", 
    type: "residential",
    bedrooms: 4,
    bathrooms: 2,
    area: 185,
    energyClass: "A+",
    description: "Large family home built to passive house standards with minimal energy consumption.",
    certifications: ["Passive House", "BREEAM", "Nordic Swan"],
    isNew: false,
    visaEligible: true,
    createdAt: "2024-04-01"
  },
  { 
    id: "5", 
    title: "Mountain Eco Cabin", 
    location: "Northern Sweden", 
    address: "3 Mountain View Road, Åre",
    price: 180000, 
    status: "active", 
    type: "residential",
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    energyClass: "B",
    description: "Cozy cabin with eco-friendly heating and insulation, perfect for nature lovers.",
    certifications: ["Nordic Swan"],
    isNew: true,
    visaEligible: false,
    createdAt: "2024-03-10"
  },
];

// Available property certifications
const availableCertifications = [
  "Nordic Swan",
  "BREEAM", 
  "LEED", 
  "Passive House", 
  "Energy Star", 
  "Green Building"
];

const EditProperty = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  // Initialize form
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      type: "",
      price: 0,
      location: "",
      address: "",
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      energyClass: "",
      certifications: [],
      description: "",
      isNew: false,
      visaEligible: false,
      status: "active"
    }
  });

  // Fetch property data when component mounts
  useEffect(() => {
    // In production, this would be an API call
    const fetchProperty = () => {
      setLoading(true);
      try {
        const foundProperty = mockProperties.find(p => p.id === id);
        if (foundProperty) {
          setProperty(foundProperty);
          setSelectedCertifications(foundProperty.certifications || []);
          
          // Set form values
          form.reset({
            title: foundProperty.title,
            type: foundProperty.type,
            price: foundProperty.price,
            location: foundProperty.location,
            address: foundProperty.address,
            bedrooms: foundProperty.bedrooms,
            bathrooms: foundProperty.bathrooms,
            area: foundProperty.area,
            energyClass: foundProperty.energyClass,
            certifications: foundProperty.certifications,
            description: foundProperty.description,
            isNew: foundProperty.isNew,
            visaEligible: foundProperty.visaEligible,
            status: foundProperty.status
          });
        } else {
          toast.error("Property not found");
          navigate("/admin/properties");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate, form]);

  // Handle form submission
  const onSubmit = (data: PropertyFormValues) => {
    try {
      console.log("Form data submitted:", data);
      // In production, this would be an API call to update the property
      toast.success("Property updated successfully");
      navigate("/admin/properties");
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    }
  };

  // Toggle certification selection
  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev => {
      if (prev.includes(cert)) {
        const newCerts = prev.filter(c => c !== cert);
        form.setValue("certifications", newCerts);
        return newCerts;
      } else {
        const newCerts = [...prev, cert];
        form.setValue("certifications", newCerts);
        return newCerts;
      }
    });
  };

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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigate("/admin/properties")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Edit Property</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {property && (
                <Badge variant={
                  property.status === "active" ? "success" :
                  property.status === "pending" ? "warning" : "default"
                }>
                  {property.status}
                </Badge>
              )}
            </div>
          </div>

          {loading ? (
            <div className="w-full h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green"></div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-eco-green" />
                  {property?.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property?.location}
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter property title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Type</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select property type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="residential">Residential</SelectItem>
                                  <SelectItem value="commercial">Commercial</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (€)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="sold">Sold</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Location</h3>
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City/Region</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Stockholm" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter full address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Features */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Features</h3>
                        
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrooms</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bathrooms</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area (m²)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Sustainability */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Sustainability</h3>
                        
                        <FormField
                          control={form.control}
                          name="energyClass"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Energy Class</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select energy class" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="A+">A+</SelectItem>
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="C">C</SelectItem>
                                  <SelectItem value="D">D</SelectItem>
                                  <SelectItem value="E">E</SelectItem>
                                  <SelectItem value="F">F</SelectItem>
                                  <SelectItem value="G">G</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div>
                          <FormLabel className="block mb-2">Certifications</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {availableCertifications.map((cert) => (
                              <div key={cert} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`cert-${cert}`}
                                  checked={selectedCertifications.includes(cert)}
                                  onCheckedChange={() => toggleCertification(cert)}
                                />
                                <label
                                  htmlFor={`cert-${cert}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {cert}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold">Additional Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter property description" 
                                  className="min-h-32" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="isNew"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Mark as New</FormLabel>
                                  <FormDescription>
                                    Display a "New" badge on the property listing
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="visaEligible"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Visa Eligible</FormLabel>
                                  <FormDescription>
                                    Property qualifies for residency visa eligibility
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate("/admin/properties")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-eco-green hover:bg-eco-green/90">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default EditProperty;
