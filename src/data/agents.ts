
import { AgentProps } from "@/components/AgentCard";

export const agents: AgentProps[] = [
  {
    id: "agent1",
    name: "Anna Lindberg",
    title: "Senior Real Estate Agent",
    email: "anna.lindberg@ecohomesweden.se",
    phone: "+46 70 123 45 67",
    fmiLicense: "12345-FMI",
    languages: ["Swedish", "English", "German"],
    specializations: ["Eco Homes", "International Buyers", "Residential"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
    propertiesSold: 124,
    verified: true
  },
  {
    id: "agent2",
    name: "Erik Johansson",
    title: "Commercial Property Specialist",
    email: "erik.johansson@ecohomesweden.se",
    phone: "+46 70 234 56 78",
    fmiLicense: "23456-FMI",
    languages: ["Swedish", "English", "Finnish"],
    specializations: ["Commercial Properties", "Office Spaces", "Sustainable Buildings"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    propertiesSold: 87,
    verified: true
  },
  {
    id: "agent3",
    name: "Sofia Ahmed",
    title: "International Relocation Expert",
    email: "sofia.ahmed@ecohomesweden.se",
    phone: "+46 70 345 67 89",
    fmiLicense: "34567-FMI",
    languages: ["Swedish", "English", "Arabic", "French"],
    specializations: ["Expat Services", "Relocation", "Luxury Properties"],
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
    propertiesSold: 156,
    verified: true
  },
  {
    id: "agent4",
    name: "Lars Svensson",
    title: "Green Building Consultant",
    email: "lars.svensson@ecohomesweden.se",
    phone: "+46 70 456 78 90",
    fmiLicense: "45678-FMI",
    languages: ["Swedish", "English", "Danish"],
    specializations: ["Eco Certifications", "Sustainable Properties", "Energy Efficient Homes"],
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
    propertiesSold: 92,
    verified: true
  }
];

export default agents;
