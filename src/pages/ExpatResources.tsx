
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpatResourceCard from "@/components/ExpatResourceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, Globe, MapPin, Info } from "lucide-react";
import MortgageCalculator from "@/components/MortgageCalculator";
import expatResources from "@/data/expatResources";

// Define categories for filtering
const categories = ["All", "Taxation", "Immigration", "Education", "Sustainability", "Legal", "Services", "Financial"];

const ExpatResources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter resources based on search query and selected category
  const filteredResources = expatResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-eco-green py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Expat Resources</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Everything you need to know about buying and living in eco-friendly properties in Sweden as an international buyer.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategory === category 
                        ? "bg-eco-green hover:bg-eco-green/90" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="text-muted-foreground mb-6">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
            </p>

            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => (
                  <ExpatResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Mortgage Calculator Section */}
        <section className="py-12 bg-white" id="mortgage-calculator">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Swedish Mortgage Calculator</h2>
            <div className="max-w-xl mx-auto border rounded-lg p-6 shadow-md">
              <MortgageCalculator />
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our team of multilingual experts is available to provide personalized guidance for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-eco-green hover:bg-eco-green/90">
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpatResources;
