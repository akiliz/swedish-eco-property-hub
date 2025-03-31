import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Building, 
  MapPin, 
  Home, 
  Users, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import properties from "@/data/properties";
import { PropertyProps } from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Find the property from our data
    const propertyData = properties.find(p => p.id === id);
    
    if (propertyData) {
      setProperty(propertyData);
      setLoading(false);
    } else {
      setLoading(false);
      // Log that property was not found
      console.error(`Property with id ${id} not found`);
    }
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE").format(price);
  };

  const handleContactAgent = () => {
    toast({
      title: "Request sent",
      description: "An agent will contact you shortly about this property.",
    });
  };

  const getEnergyClassColor = (energyClass: string) => {
    const colors: Record<string, string> = {
      A: "bg-green-100 text-green-800",
      B: "bg-green-200 text-green-800",
      C: "bg-yellow-100 text-yellow-800",
      D: "bg-yellow-200 text-yellow-800",
      E: "bg-orange-100 text-orange-800",
      F: "bg-orange-200 text-orange-800",
      G: "bg-red-100 text-red-800",
    };
    return colors[energyClass] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-green"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col p-8">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The property you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/properties">
              <ArrowLeft className="mr-2" size={16} />
              Back to Properties
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const propertyImages = property.images || [property.imageUrl];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <Link 
            to="/properties" 
            className="text-eco-green hover:text-eco-darkGreen flex items-center transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Properties
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-lg text-muted-foreground flex items-center">
                <MapPin size={18} className="mr-2" />
                {property.address}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {property.isNew && (
                  <Badge className="bg-eco-green text-white">New</Badge>
                )}
                {property.visaEligible && (
                  <Badge className="bg-eco-blue text-white">Visa Eligible</Badge>
                )}
                <Badge variant="outline" className={getEnergyClassColor(property.energyClass)}>
                  Energy {property.energyClass}
                </Badge>
              </div>
            </div>
            
            <div className="mb-6">
              <PropertyGallery images={propertyImages} title={property.title} />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="text-muted-foreground text-sm">Type</span>
                  <div className="flex items-center mt-1">
                    {property.type === "residential" ? (
                      <><Home size={18} className="mr-1" /> Residential</>
                    ) : (
                      <><Building size={18} className="mr-1" /> Commercial</>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {property.type === "residential" ? (
                <>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                      <span className="text-muted-foreground text-sm">Bedrooms</span>
                      <div className="flex items-center mt-1">
                        <Users size={18} className="mr-1" /> {property.bedrooms}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                      <span className="text-muted-foreground text-sm">Bathrooms</span>
                      <div className="flex items-center mt-1">
                        {property.bathrooms}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : null}
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="text-muted-foreground text-sm">Area</span>
                  <div className="flex items-center mt-1">
                    {property.area} m²
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground mb-4">
                This {property.type === "residential" ? "home" : "property"} is located in the desirable area of {property.location}. 
                It features modern design with sustainable elements and has received {property.certifications.join(" and ")} certifications 
                for its eco-friendly construction and energy efficiency.
              </p>
              
              {property.visaEligible && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-eco-blue flex items-center mb-2">
                    <CheckCircle2 size={18} className="mr-2" />
                    Visa Eligibility Information
                  </h3>
                  <p className="text-sm">
                    This property qualifies for visa eligibility under Swedish investment provisions. 
                    Purchase of this property may contribute toward residency requirements. 
                    Consult with our immigration specialists for more details.
                  </p>
                </div>
              )}
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-eco-green flex items-center mb-2">
                  <CheckCircle2 size={18} className="mr-2" />
                  Sustainability Features
                </h3>
                <ul className="text-sm list-disc pl-5">
                  {property.certifications.map((cert, index) => (
                    <li key={index} className="mb-1">
                      {cert === "Nordic Swan" 
                        ? "Nordic Swan certified with low environmental impact materials"
                        : cert === "BREEAM" 
                        ? "BREEAM certified with excellent rating for sustainability"
                        : cert === "LEED" 
                        ? "LEED certified with gold standard for green building"
                        : cert === "Miljöbyggnad"
                        ? "Miljöbyggnad certified with silver rating for environmental performance"
                        : cert}
                    </li>
                  ))}
                  <li>Energy Class {property.energyClass} rating for efficient energy consumption</li>
                  <li>Proximity to public transportation and local amenities</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-3 text-eco-green">
                  <span className="currency-sek">{formatPrice(property.price)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Key Information</h3>
                  <div className="text-sm grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">Location:</div>
                    <div>{property.location}</div>
                    
                    <div className="text-muted-foreground">Property type:</div>
                    <div>{property.type === "residential" ? "Residential" : "Commercial"}</div>
                    
                    <div className="text-muted-foreground">Energy class:</div>
                    <div>Class {property.energyClass}</div>
                    
                    <div className="text-muted-foreground">Area:</div>
                    <div>{property.area} m²</div>
                    
                    {property.type === "residential" && (
                      <>
                        <div className="text-muted-foreground">Bedrooms:</div>
                        <div>{property.bedrooms}</div>
                        
                        <div className="text-muted-foreground">Bathrooms:</div>
                        <div>{property.bathrooms}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    className="bg-eco-green hover:bg-eco-darkGreen"
                    onClick={handleContactAgent}
                  >
                    Contact Agent
                  </Button>
                  <Button variant="outline">
                    Schedule Viewing
                  </Button>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Listed on {new Date().toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
