
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SustainabilityFeaturesProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
}

const sustainabilityFeaturesList = [
  { id: "solar", label: "Solar Panels" },
  { id: "geothermal", label: "Geothermal Heating" },
  { id: "recycled", label: "Recycled Materials" },
  { id: "energy_appliances", label: "Energy-Efficient Appliances" },
  { id: "water_saving", label: "Water-Saving Fixtures" },
  { id: "insulation", label: "Advanced Insulation" },
  { id: "smart_home", label: "Smart Home Technology" },
  { id: "rainwater", label: "Rainwater Harvesting" },
  { id: "led_lighting", label: "LED Lighting Throughout" },
  { id: "green_roof", label: "Green Roof/Living Roof" },
  { id: "natural_ventilation", label: "Natural Ventilation System" },
  { id: "low_voc", label: "Low-VOC Materials" },
];

const SustainabilityFeatures: React.FC<SustainabilityFeaturesProps> = ({
  selectedFeatures,
  onChange,
}) => {
  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    
    onChange(newFeatures);
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {sustainabilityFeaturesList.map((feature) => (
        <div key={feature.id} className="flex items-start space-x-2">
          <Checkbox
            id={`feature-${feature.id}`}
            checked={selectedFeatures.includes(feature.id)}
            onCheckedChange={() => toggleFeature(feature.id)}
          />
          <Label
            htmlFor={`feature-${feature.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {feature.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default SustainabilityFeatures;
