
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyProps } from "@/components/PropertyCard";

interface PropertyHeaderProps {
  property: PropertyProps;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
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

  return (
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
  );
};

export default PropertyHeader;
