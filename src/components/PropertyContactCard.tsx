
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { PropertyProps } from "@/components/PropertyCard";

interface PropertyContactCardProps {
  property: PropertyProps;
}

const PropertyContactCard = ({ property }: PropertyContactCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE").format(price);
  };

  const handleContactAgent = () => {
    toast({
      title: "Request sent",
      description: "An agent will contact you shortly about this property.",
    });
  };

  return (
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
  );
};

export default PropertyContactCard;
