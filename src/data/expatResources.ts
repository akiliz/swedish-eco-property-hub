import { ResourceProps } from "@/components/ExpatResourceCard";

export const expatResources: ResourceProps[] = [
  {
    id: "resource1",
    title: "Eco Property Investment Guide",
    description: "Learn about sustainable property investments, energy ratings, and green certifications in Sweden.",
    category: "Investment", // Changed category to better suit the new resource
    link: "/eco-investment-guide",
    icon: "Leaf" // Changed icon to better suit the new resource
  },
  {
    id: "resource2",
    title: "Residency Permit Guide",
    description: "Step-by-step guide to obtaining residency permits in Sweden through property ownership.",
    category: "Immigration",
    link: "#residency-guide",
    icon: "document"
  },
  {
    id: "resource3",
    title: "International Schools Map",
    description: "Interactive map of international schools across Sweden with ratings and admission information.",
    category: "Education",
    link: "#schools-map",
    icon: "map"
  },
  {
    id: "resource4",
    title: "Eco-Certification Explained",
    description: "Comprehensive guide to understanding Nordic Swan, BREEAM, and other eco-certifications in Sweden.",
    category: "Sustainability",
    link: "#eco-certifications",
    icon: "document"
  },
  {
    id: "resource5",
    title: "Swedish Property Buying Process",
    description: "Guide to the Swedish property purchase process for international buyers.",
    category: "Legal",
    link: "#buying-process",
    icon: "document"
  },
  {
    id: "resource6",
    title: "Expat Relocation Services",
    description: "Connect with trusted relocation services to help with your move to Sweden.",
    category: "Services",
    link: "#relocation-services",
    icon: "link"
  }
];

export default expatResources;