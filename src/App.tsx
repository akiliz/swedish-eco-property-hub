import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyDetails from "@/pages/PropertyDetails";
import ExpatResources from "@/pages/ExpatResources";
import Properties from "./pages/Properties";
import Agents from "./pages/Agents";
import EcoInvestmentGuide from "@/pages/EcoInvestmentGuide"; // Added import

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
          <Route path="/eco-investment-guide" element={<EcoInvestmentGuide />} /> {/* Added route */}
          <Route path="/about" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;