
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { PropertyProps } from "@/components/PropertyCard";

interface PropertyDetailInfoProps {
  property: PropertyProps;
}

const PropertyDetailInfo = ({ property }: PropertyDetailInfoProps) => {
  return (
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
  );
};

export default PropertyDetailInfo;
