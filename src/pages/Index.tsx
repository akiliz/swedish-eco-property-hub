
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import AgentCard from "@/components/AgentCard";
import ExpatResourceCard from "@/components/ExpatResourceCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Home, Search, Users, FileText, ArrowRight } from "lucide-react";

import properties from "@/data/properties";
import agents from "@/data/agents";
import expatResources from "@/data/expatResources";

const Index = () => {
  const featuredProperties = properties.slice(0, 3);
  const featuredAgents = agents.slice(0, 3);
  const featuredResources = expatResources.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Quick Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-lg bg-eco-gray">
                <p className="text-3xl font-bold text-eco-green mb-2">2,300+</p>
                <p className="text-muted-foreground">Properties Listed</p>
              </div>
              <div className="p-6 rounded-lg bg-eco-gray">
                <p className="text-3xl font-bold text-eco-blue mb-2">530+</p>
                <p className="text-muted-foreground">Eco-Certified Properties</p>
              </div>
              <div className="p-6 rounded-lg bg-eco-gray">
                <p className="text-3xl font-bold text-eco-green mb-2">150+</p>
                <p className="text-muted-foreground">Verified Agents</p>
              </div>
              <div className="p-6 rounded-lg bg-eco-gray">
                <p className="text-3xl font-bold text-eco-blue mb-2">980+</p>
                <p className="text-muted-foreground">Happy International Buyers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold">Featured Properties</h2>
                <p className="text-muted-foreground mt-2">
                  Discover our top eco-certified properties across Sweden
                </p>
              </div>
              <Link to="/properties">
                <Button variant="outline" className="hidden md:flex items-center">
                  View All Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link to="/properties">
                <Button>View All Properties</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Choose EcoHome Sweden</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                We specialize in connecting international buyers with sustainable, eco-certified properties across Sweden
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-eco-green h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Eco-Certified Properties</h3>
                <p className="text-muted-foreground">
                  All our properties meet strict environmental and sustainability standards, reducing your carbon footprint.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-eco-blue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expat-Friendly Support</h3>
                <p className="text-muted-foreground">
                  Our multilingual team specializes in helping international buyers navigate the Swedish property market.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-eco-green h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
                <p className="text-muted-foreground">
                  Every property and agent is thoroughly verified to ensure legitimate FMI licensing and accurate information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Agents */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold">Meet Our Agents</h2>
                <p className="text-muted-foreground mt-2">
                  Licensed professionals specialized in helping international buyers
                </p>
              </div>
              <Link to="/agents">
                <Button variant="outline" className="hidden md:flex items-center">
                  View All Agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link to="/agents">
                <Button>View All Agents</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Expat Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold">Expat Resources</h2>
                <p className="text-muted-foreground mt-2">
                  Helpful guides and tools for international buyers in Sweden
                </p>
              </div>
              <Link to="/expat-resources">
                <Button variant="outline" className="hidden md:flex items-center">
                  View All Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <ExpatResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link to="/expat-resources">
                <Button>View All Resources</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-eco-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Swedish Eco-Property?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Start your journey to owning a sustainable property in Sweden today. Our team of experts is ready to help you every step of the way.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button size="lg" variant="default" className="bg-white text-eco-green hover:bg-eco-wood">
                  <Home className="mr-2 h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eco-green">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
