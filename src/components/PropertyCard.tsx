import { Building, MapPin, Home, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface PropertyProps {
  id: string;
  title: string;
  type: "residential" | "commercial";
  price: number;
  location: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  energyClass: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  certifications: string[];
  imageUrl: string;
  images?: string[];
  isNew?: boolean;
  visaEligible?: boolean;
  description: string; // Added description for schema
}

const PropertyCard = ({ property }: { property: PropertyProps }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE").format(price);
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "price": property.price,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressCountry": "SE"
    },
    "image": property.imageUrl
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          {property.isNew && (
            <div className="absolute top-2 left-2 bg-eco-green text-white text-xs font-semibold px-2 py-1 rounded">
              New
            </div>
          )}
          {property.visaEligible && (
            <div className="absolute top-2 right-2 bg-eco-blue text-white text-xs font-semibold px-2 py-1 rounded">
              Visa Eligible
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin size={14} className="mr-1" />
                {property.location}
              </p>
              <h3 className="font-semibold text-lg mt-1 truncate">
                {property.title}
              </h3>
            </div>
            <Badge variant="outline" className={getEnergyClassColor(property.energyClass)}>
              Energy {property.energyClass}
            </Badge>
          </div>

          <div className="text-xl font-bold mb-3 text-eco-green">
            <span className="currency-sek">{formatPrice(property.price)}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm mb-3">
            <div className="flex flex-col items-center p-1 bg-muted rounded">
              <span className="text-muted-foreground">Type</span>
              <div className="flex items-center">
                {property.type === "residential" ? (
                  <Home size={14} className="mr-1" />
                ) : (
                  <Building size={14} className="mr-1" />
                )}
                <span>
                  {property.type === "residential" ? "Residential" : "Commercial"}
                </span>
              </div>
            </div>

            {property.type === "residential" ? (
              <>
                <div className="flex flex-col items-center p-1 bg-muted rounded">
                  <span className="text-muted-foreground">Beds</span>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center p-1 bg-muted rounded">
                  <span className="text-muted-foreground">Baths</span>
                  <span>{property.bathrooms}</span>
                </div>
              </>
            ) : (
              <div className="col-span-2 flex flex-col items-center p-1 bg-muted rounded">
                <span className="text-muted-foreground">Area</span>
                <span>{property.area} m²</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {property.certifications.map((cert, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-xs ${
                  cert === "Nordic Swan"
                    ? "eco-badge-swan"
                    : cert === "BREEAM"
                    ? "eco-badge-breeam"
                    : ""
                }`}
              >
                {cert}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link
            to={`/properties/${property.id}`}
            className="w-full bg-eco-green text-white py-2 rounded text-center hover:bg-eco-darkGreen transition-colors"
          >
            View Details
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default PropertyCard;