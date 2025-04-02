
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import properties from "@/data/properties";
import { PropertyProps } from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFeatures from "@/components/PropertyFeatures";
import PropertyDetailInfo from "@/components/PropertyDetailInfo";
import PropertyContactCard from "@/components/PropertyContactCard";

import { SEO } from "@/components/SEO";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  const seoData = {
    title: property ? `${property.title} | EcoHome Sweden` : 'Property Details | EcoHome Sweden',
    description: property ? `${property.description.substring(0, 160)}...` : 'Eco-friendly property in Sweden',
    keywords: 'eco property, sustainable home, swedish real estate',
  };
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
            <PropertyHeader property={property} />
            
            <div className="mb-6">
              <PropertyGallery images={propertyImages} title={property.title} />
            </div>
            
            <PropertyFeatures property={property} />
            
            <PropertyDetailInfo property={property} />
          </div>
          
          <div>
            <PropertyContactCard property={property} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
