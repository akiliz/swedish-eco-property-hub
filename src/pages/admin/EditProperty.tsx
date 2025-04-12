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
import { ArrowLeft, Save, Building, MapPin, Upload, ImageIcon, Trash2, Eye, Info } from "lucide-react";
import { toast } from "sonner";
import EnergyClassDropdown from "@/components/admin/EnergyClassDropdown";
import SustainabilityFeatures from "@/components/admin/SustainabilityFeatures";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf"];

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
  sustainabilityFeatures: z.array(z.string()).optional(),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }).optional(),
  virtualTourUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  isNew: z.boolean().optional(),
  visaEligible: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  status: z.string(),
  metaTitle: z.string().max(60, { message: "Meta title should be 60 characters or less" }).optional(),
  metaDescription: z.string().max(160, { message: "Meta description should be 160 characters or less" }).optional(),
  metaKeywords: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

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
    sustainabilityFeatures: ["solar", "energy_appliances", "smart_home"],
    virtualTourUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isNew: false,
    visaEligible: true,
    isFeatured: true,
    metaTitle: "Eco Villa Stockholm - Sustainable Living",
    metaDescription: "Beautiful eco-friendly villa with solar panels in Stockholm's most prestigious area.",
    metaKeywords: "eco villa, stockholm, sustainable living, solar panels",
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
    sustainabilityFeatures: ["energy_appliances", "insulation"],
    virtualTourUrl: "",
    isNew: true,
    visaEligible: false,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
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
    sustainabilityFeatures: ["solar", "rainwater"],
    virtualTourUrl: "",
    isNew: false,
    visaEligible: true,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
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
    sustainabilityFeatures: ["insulation", "geothermal", "energy_appliances", "natural_ventilation"],
    virtualTourUrl: "https://www.youtube.com/embed/aBcd12345",
    isNew: false,
    visaEligible: true,
    isFeatured: true,
    metaTitle: "Passive House Malmö - Zero Energy Home",
    metaDescription: "Experience sustainable living with this certified passive house in Malmö",
    metaKeywords: "passive house, malmö, sustainable, zero energy",
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
    sustainabilityFeatures: ["insulation", "energy_appliances", "led_lighting"],
    virtualTourUrl: "",
    isNew: true,
    visaEligible: false,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    createdAt: "2024-03-10"
  },
];

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
  const [selectedSustainabilityFeatures, setSelectedSustainabilityFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [certificateNames, setCertificateNames] = useState<string[]>([]);
  const [previewVirtualTour, setPreviewVirtualTour] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");

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
      sustainabilityFeatures: [],
      description: "",
      virtualTourUrl: "",
      isNew: false,
      visaEligible: false,
      isFeatured: false,
      status: "active",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    }
  });

  useEffect(() => {
    const fetchProperty = () => {
      setLoading(true);
      try {
        const foundProperty = mockProperties.find(p => p.id === id);
        if (foundProperty) {
          setProperty(foundProperty);
          setSelectedCertifications(foundProperty.certifications || []);
          setSelectedSustainabilityFeatures(foundProperty.sustainabilityFeatures || []);
          
          // Mock image URLs for demonstration
          if (foundProperty.id === "1") {
            setImageUrls([
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
            ]);
          }
          
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
            sustainabilityFeatures: foundProperty.sustainabilityFeatures || [],
            description: foundProperty.description,
            virtualTourUrl: foundProperty.virtualTourUrl || "",
            isNew: foundProperty.isNew,
            visaEligible: foundProperty.visaEligible,
            isFeatured: foundProperty.isFeatured || false,
            status: foundProperty.status,
            metaTitle: foundProperty.metaTitle || "",
            metaDescription: foundProperty.metaDescription || "",
            metaKeywords: foundProperty.metaKeywords || "",
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

  const onSubmit = (data: PropertyFormValues) => {
    try {
      console.log("Form data submitted:", data);
      toast.success("Property updated successfully");
      navigate("/admin/properties");
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    }
  };

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

  const handleSustainabilityFeaturesChange = (features: string[]) => {
    setSelectedSustainabilityFeatures(features);
    form.setValue("sustainabilityFeatures", features);
  };

  // Image handling functions
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: File[] = [];
    const newImageUrls: string[] = [];

    Array.from(files).forEach(file => {
      if (file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        newImages.push(file);
        newImageUrls.push(URL.createObjectURL(file));
      } else {
        toast.error(`File "${file.name}" is too large or not an accepted image type`);
      }
    });

    setImages(prev => [...prev, ...newImages]);
    setImageUrls(prev => [...prev, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newImageUrls = [...imageUrls];
    
    // If it's a file we uploaded, revoke the object URL to prevent memory leaks
    if (index < newImages.length) {
      URL.revokeObjectURL(newImageUrls[index]);
    }
    
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    
    setImages(newImages);
    setImageUrls(newImageUrls);
  };

  const reorderImages = (dragIndex: number, hoverIndex: number) => {
    // This would be implemented with a drag-and-drop library
    // For now, we'll just swap the images
    const newImages = [...images];
    const newImageUrls = [...imageUrls];
    
    const tempImage = newImages[dragIndex];
    const tempUrl = newImageUrls[dragIndex];
    
    newImages[dragIndex] = newImages[hoverIndex];
    newImageUrls[dragIndex] = newImageUrls[hoverIndex];
    
    newImages[hoverIndex] = tempImage;
    newImageUrls[hoverIndex] = tempUrl;
    
    setImages(newImages);
    setImageUrls(newImageUrls);
  };

  // Certificate handling functions
  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newCertificates: File[] = [];
    const newCertificateNames: string[] = [];

    Array.from(files).forEach(file => {
      if (file.size <= MAX_FILE_SIZE && ACCEPTED_DOCUMENT_TYPES.includes(file.type)) {
        newCertificates.push(file);
        newCertificateNames.push(file.name);
      } else {
        toast.error(`File "${file.name}" is too large or not an accepted document type`);
      }
    });

    setCertificates(prev => [...prev, ...newCertificates]);
    setCertificateNames(prev => [...prev, ...newCertificateNames]);
  };

  const removeCertificate = (index: number) => {
    const newCertificates = [...certificates];
    const newCertificateNames = [...certificateNames];
    
    newCertificates.splice(index, 1);
    newCertificateNames.splice(index, 1);
    
    setCertificates(newCertificates);
    setCertificateNames(newCertificateNames);
  };

  const handleVirtualTourPreview = () => {
    const url = form.getValues("virtualTourUrl");
    if (url) {
      setPreviewVirtualTour(!previewVirtualTour);
    } else {
      toast.error("Please enter a virtual tour URL first");
    }
  };

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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-green-500" />
                  {property?.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property?.location}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                    <TabsTrigger value="media">Media & Tours</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>

                  
                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        
                        <FormField
                          control={form.control}
                          name="isFeatured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Featured Listing</FormLabel>
                                <FormDescription>
                                  Property will be prominently displayed on homepage and search results
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

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
                        
                        <div className="pt-4">
                          <h3 className="text-lg font-semibold">Features</h3>
                        </div>
                        
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

                      <div className="md:col-span-2 space-y-4">
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
                  </TabsContent>

                  <TabsContent value="sustainability" className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Energy Classification</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Select the appropriate energy efficiency certification for this property</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="energyClass"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Energy Class</FormLabel>
                              <FormControl>
                                <EnergyClassDropdown 
                                  value={field.value} 
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Certifications</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Select all applicable environmental certifications this property has achieved</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        
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
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Sustainability Features</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Select all eco-friendly and sustainability features present in this property</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="sustainabilityFeatures"
                          render={() => (
                            <FormItem>
                              <FormControl>
                                <SustainabilityFeatures
                                  selectedFeatures={selectedSustainabilityFeatures}
                                  onChange={handleSustainabilityFeaturesChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Image Gallery</h3>
                      
                      <div className="border rounded-md p-4 bg-muted/30">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <ImageIcon className="w-8 h-8 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                JPG, PNG or WebP (MAX. 5MB)
                              </p>
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              multiple
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                        
                        {imageUrls.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium text-sm mb-2">Property Images</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {imageUrls.map((url, index) => (
                                <div
                                  key={`image-${index}`}
                                  className="relative group aspect-square rounded-md overflow-hidden border"
                                >
                                  <img
                                    src={url}
                                    alt={`Property image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => removeImage(index)}
                                      className="h-8 w-8"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Drag and drop to reorder images (first image will be the featured image)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Virtual Tour</h3>
                      
                      <FormField
                        control={form.control}
                        name="virtualTourUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Virtual Tour URL</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input 
                                  placeholder="Enter Matterport or YouTube URL" 
                                  {...field}
                                />
                              </FormControl>
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={handleVirtualTourPreview}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                {previewVirtualTour ? "Hide Preview" : "Preview"}
                              </Button>
                            </div>
                            <FormDescription>
                              Enter a valid Matterport, YouTube, or other virtual tour URL
                            </FormDescription>
                            <Form
