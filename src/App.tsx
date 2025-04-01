import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyDetails from "@/pages/PropertyDetails";
import ExpatResources from "@/pages/ExpatResources";
import Properties from "./pages/Properties";
import Agents from "./pages/Agents";
import EcoInvestmentGuide from "@/pages/EcoInvestmentGuide";
import ListProperty from "./pages/ListProperty";
import About from "@/pages/About";
import ResidencyGuide from "@/pages/ResidencyGuide";
import BuyingProcess from "@/pages/BuyingProcess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/expat-resources" element={<ExpatResources />} />
          <Route path="/eco-investment-guide" element={<EcoInvestmentGuide />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/about" element={<About />} />
          <Route path="/residency-guide" element={<ResidencyGuide />} />
          <Route path="/buying-process" element={<BuyingProcess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;