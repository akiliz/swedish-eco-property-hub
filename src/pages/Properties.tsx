
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, LayoutList } from "lucide-react";
import properties from "@/data/properties";
import { PropertyProps } from "@/components/PropertyCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Properties = () => {
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProperties, setFilteredProperties] = useState<PropertyProps[]>(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Get current properties for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handleSearch = (filters: any) => {
    // Filter properties based on search criteria
    let results = properties;

    // Filter by location
    if (filters.location) {
      results = results.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by property type
    if (filters.propertyType) {
      results = results.filter(property => property.type === filters.propertyType);
    }

    // Filter by price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      results = results.filter(property => 
        property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      );
    }

    // Filter by certifications
    if (filters.certifications && filters.certifications.length > 0) {
      results = results.filter(property => 
        filters.certifications.some((cert: string) => property.certifications.includes(cert))
      );
    }

    // Filter by visa eligibility
    if (filters.visaEligible) {
      results = results.filter(property => property.visaEligible);
    }

    // Filter by energy class
    if (filters.energyClass) {
      results = results.filter(property => property.energyClass === filters.energyClass);
    }

    setFilteredProperties(results);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleResetFilters = () => {
    setFilteredProperties(properties);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-eco-green py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Sustainable Properties in Sweden</h1>
            <p className="max-w-3xl mx-auto text-lg mb-8">
              Discover eco-friendly homes and commercial spaces with our exclusive collection of sustainable properties.
            </p>
          </div>
        </section>

        {/* Filters and Results Section */}
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Property Search</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                    className="flex items-center md:hidden"
                  >
                    <Filter size={16} className="mr-2" />
                    {isFiltersCollapsed ? "Show Filters" : "Hide Filters"}
                  </Button>
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none ${viewMode === "grid" ? "bg-eco-green hover:bg-eco-green/90" : ""}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 size={16} />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none ${viewMode === "list" ? "bg-eco-green hover:bg-eco-green/90" : ""}`}
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutList size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <SearchFilters 
                isCollapsed={isFiltersCollapsed} 
                toggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                onSearch={handleSearch}
              />
            </div>

            {/* Results count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
              {filteredProperties.length !== properties.length && (
                <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Property Cards */}
            {currentProperties.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {currentProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search filters
                </p>
                <Button onClick={handleResetFilters}>Reset Filters</Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > propertiesPerPage && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
