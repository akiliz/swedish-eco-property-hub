
import { Card, CardContent } from "@/components/ui/card";
import { Building, Home, Users } from "lucide-react";
import { PropertyProps } from "@/components/PropertyCard";

interface PropertyFeaturesProps {
  property: PropertyProps;
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  return (
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
  );
};

export default PropertyFeatures;
