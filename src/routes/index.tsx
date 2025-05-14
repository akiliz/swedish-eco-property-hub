
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded page components
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PropertyDetails = lazy(() => import("@/pages/PropertyDetails"));
const ExpatResources = lazy(() => import("@/pages/ExpatResources"));
const Properties = lazy(() => import("@/pages/Properties"));
const Agents = lazy(() => import("@/pages/Agents"));
const EcoInvestmentGuide = lazy(() => import("@/pages/EcoInvestmentGuide"));
const ListProperty = lazy(() => import("@/pages/ListProperty"));
const About = lazy(() => import("@/pages/About"));
const ResidencyGuide = lazy(() => import("@/pages/ResidencyGuide"));
const BuyingProcess = lazy(() => import("@/pages/BuyingProcess"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const GDPR = lazy(() => import("@/pages/GDPR"));
const MortgageCalculator = lazy(() => import("@/components/MortgageCalculator"));
const Auth = lazy(() => import("@/pages/Auth"));
const Profile = lazy(() => import("@/pages/Profile"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminProperties = lazy(() => import("@/pages/admin/Properties"));
const AdminInquiries = lazy(() => import("@/pages/admin/Inquiries"));
const AdminContent = lazy(() => import("@/pages/admin/Content"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const EditProperty = lazy(() => import("@/pages/admin/EditProperty"));
const Navbar = lazy(() => import("@/components/Navbar"));
const Footer = lazy(() => import("@/components/Footer"));

// Wrapper for lazy-loaded components with fallback
const LazyLoadWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
    {children}
  </Suspense>
);

// Special component for mortgage calculator with layout
const MortgageCalculatorPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mortgage Calculator</h1>
      <MortgageCalculator />
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LazyLoadWrapper><Index /></LazyLoadWrapper>} />
      <Route path="/properties" element={<LazyLoadWrapper><Properties /></LazyLoadWrapper>} />
      <Route path="/properties/:id" element={<LazyLoadWrapper><PropertyDetails /></LazyLoadWrapper>} />
      <Route path="/agents" element={<LazyLoadWrapper><Agents /></LazyLoadWrapper>} />
      <Route path="/expat-resources" element={<LazyLoadWrapper><ExpatResources /></LazyLoadWrapper>} />
      <Route path="/eco-investment-guide" element={<LazyLoadWrapper><EcoInvestmentGuide /></LazyLoadWrapper>} />
      <Route path="/list-property" element={<LazyLoadWrapper><ListProperty /></LazyLoadWrapper>} />
      <Route path="/about" element={<LazyLoadWrapper><About /></LazyLoadWrapper>} />
      <Route path="/residency-guide" element={<LazyLoadWrapper><ResidencyGuide /></LazyLoadWrapper>} />
      <Route path="/buying-process" element={<LazyLoadWrapper><BuyingProcess /></LazyLoadWrapper>} />
      <Route path="/privacy" element={<LazyLoadWrapper><Privacy /></LazyLoadWrapper>} />
      <Route path="/terms" element={<LazyLoadWrapper><Terms /></LazyLoadWrapper>} />
      <Route path="/cookies" element={<LazyLoadWrapper><Cookies /></LazyLoadWrapper>} />
      <Route path="/gdpr" element={<LazyLoadWrapper><GDPR /></LazyLoadWrapper>} />
      <Route path="/mortgage-calculator" element={<LazyLoadWrapper><MortgageCalculatorPage /></LazyLoadWrapper>} />
      <Route path="/auth" element={<LazyLoadWrapper><Auth /></LazyLoadWrapper>} />
      <Route path="/profile" element={<LazyLoadWrapper><Profile /></LazyLoadWrapper>} />
      <Route path="/admin" element={<LazyLoadWrapper><AdminDashboard /></LazyLoadWrapper>} />
      <Route path="/admin/users" element={<LazyLoadWrapper><AdminUsers /></LazyLoadWrapper>} />
      <Route path="/admin/properties" element={<LazyLoadWrapper><AdminProperties /></LazyLoadWrapper>} />
      <Route path="/admin/properties/edit/:id" element={<LazyLoadWrapper><EditProperty /></LazyLoadWrapper>} />
      <Route path="/admin/inquiries" element={<LazyLoadWrapper><AdminInquiries /></LazyLoadWrapper>} />
      <Route path="/admin/content" element={<LazyLoadWrapper><AdminContent /></LazyLoadWrapper>} />
      <Route path="/admin/settings" element={<LazyLoadWrapper><AdminSettings /></LazyLoadWrapper>} />
      <Route path="*" element={<LazyLoadWrapper><NotFound /></LazyLoadWrapper>} />
    </Routes>
  );
};

export default AppRoutes;
