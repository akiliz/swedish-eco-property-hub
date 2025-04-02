import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PropertyDetails = lazy(() => import("@/pages/PropertyDetails"));
const ExpatResources = lazy(() => import("@/pages/ExpatResources"));
const Properties = lazy(() => import("./pages/Properties"));
const Agents = lazy(() => import("./pages/Agents"));
const EcoInvestmentGuide = lazy(() => import("@/pages/EcoInvestmentGuide"));
const ListProperty = lazy(() => import("./pages/ListProperty"));
const About = lazy(() => import("./pages/About"));
const ResidencyGuide = lazy(() => import("@/pages/ResidencyGuide"));
const BuyingProcess = lazy(() => import("@/pages/BuyingProcess"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const GDPR = lazy(() => import("./pages/GDPR"));
const MortgageCalculator = lazy(() => import("./components/MortgageCalculator"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <Index />
            </Suspense>
          } />
          <Route path="/properties" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <Properties />
            </Suspense>
          } />
          <Route path="/properties/:id" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <PropertyDetails />
            </Suspense>
          } />
          <Route path="/agents" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <Agents />
            </Suspense>
          } />
          <Route path="/expat-resources" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <ExpatResources />
            </Suspense>
          } />
          <Route path="/eco-investment-guide" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <EcoInvestmentGuide />
            </Suspense>
          } />
          <Route path="/list-property" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <ListProperty />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <About />
            </Suspense>
          } />
          <Route path="/residency-guide" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <ResidencyGuide />
            </Suspense>
          } />
          <Route path="/buying-process" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <BuyingProcess />
            </Suspense>
          } />
          <Route path="/privacy" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <Privacy />
            </Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <Terms />
            </Suspense>
          } />
          <Route path="/cookies" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <Cookies />
            </Suspense>
          } />
          <Route path="/gdpr" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <GDPR />
            </Suspense>
          } />
          <Route path="/mortgage-calculator" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                  <h1 className="text-3xl font-bold mb-8">Mortgage Calculator</h1>
                  <MortgageCalculator />
                </main>
                <Footer />
              </div>
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<div className="w-full h-screen"><Skeleton className="h-full w-full" /></div>}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;