
import { PropertyProps } from "@/components/PropertyCard";

export const properties: PropertyProps[] = [
  {
    id: "prop1",
    title: "Modern Villa in Stockholm",
    type: "residential",
    description: "Stunning modern villa with eco-friendly features in Stockholm's prestigious area. Features solar panels and smart home technology.",
    price: 7500000,
    location: "Stockholm",
    address: "Sveavägen 12, 113 50 Stockholm",
    bedrooms: 4,
    bathrooms: 2,
    area: 210,
    energyClass: "A",
    certifications: ["Nordic Swan", "BREEAM"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1470&auto=format&fit=crop"
    ],
    isNew: true,
    visaEligible: true
  },
  {
    id: "prop2",
    title: "Eco-Friendly Apartment",
    type: "residential",
    price: 4200000,
    location: "Gothenburg",
    address: "Avenyn 25, 411 36 Gothenburg",
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    energyClass: "B",
    certifications: ["Nordic Swan"],
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185009-5bf9f2849488?q=80&w=1470&auto=format&fit=crop"
    ],
    visaEligible: true
  },
  {
    id: "prop3",
    title: "Sustainable Office Building",
    type: "commercial",
    price: 18500000,
    location: "Stockholm",
    address: "Vasagatan 38, 111 20 Stockholm",
    area: 450,
    energyClass: "A",
    certifications: ["BREEAM", "LEED"],
    imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1470&auto=format&fit=crop"
    ],
    isNew: false,
    visaEligible: true
  },
  {
    id: "prop4",
    title: "Contemporary Family House",
    type: "residential",
    price: 6800000,
    location: "Malmö",
    address: "Storgatan 7, 211 41 Malmö",
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    energyClass: "B",
    certifications: ["Miljöbyggnad"],
    imageUrl: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1467&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1467&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1470&auto=format&fit=crop"
    ],
    isNew: false,
    visaEligible: false
  },
  {
    id: "prop5",
    title: "Waterfront Restaurant Space",
    type: "commercial",
    price: 12200000,
    location: "Gothenburg",
    address: "Hamngatan 13, 411 06 Gothenburg",
    area: 325,
    energyClass: "C",
    certifications: ["BREEAM"],
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop"
    ],
    isNew: true,
    visaEligible: false
  },
  {
    id: "prop6",
    title: "Green Living Townhouse",
    type: "residential",
    price: 5400000,
    location: "Västra Götaland",
    address: "Ekvägen 8, 431 36 Mölndal",
    bedrooms: 3,
    bathrooms: 1,
    area: 130,
    energyClass: "A",
    certifications: ["Nordic Swan", "Miljöbyggnad"],
    imageUrl: "https://images.unsplash.com/photo-1636055981100-9c96b2e3b9ab?q=80&w=1470&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1636055981100-9c96b2e3b9ab?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633505650409-cc8deb2df8c9?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580237072044-f2fa64c42655?q=80&w=1470&auto=format&fit=crop"
    ],
    isNew: false,
    visaEligible: true
  }
];

export default properties;
