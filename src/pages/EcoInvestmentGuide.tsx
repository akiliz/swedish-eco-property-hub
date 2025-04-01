
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Leaf, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EcoInvestmentGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-eco-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Eco Property Investment Guide</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Your comprehensive guide to sustainable property investments in Sweden
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <Leaf className="h-12 w-12 text-eco-green mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Sustainability Ratings</h3>
                  <p className="text-muted-foreground">
                    Understanding energy efficiency ratings and eco-certifications in Swedish properties
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 text-eco-green mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Investment Benefits</h3>
                  <p className="text-muted-foreground">
                    Financial advantages and long-term value of eco-friendly properties
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <CheckCircle2 className="h-12 w-12 text-eco-green mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Certification Guide</h3>
                  <p className="text-muted-foreground">
                    Key eco-certifications and their importance in Swedish real estate
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-6">Understanding Swedish Eco Property Investment</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Energy Ratings Explained</h3>
                <p className="text-muted-foreground mb-4">
                  Swedish properties are rated from A to G, with A being the most energy-efficient. 
                  Properties rated A-C are considered highly energy efficient and typically command 
                  premium prices and lower operating costs.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Eco Certifications</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-eco-green mr-2 mt-1" />
                    <div>
                      <span className="font-semibold">Nordic Swan Ecolabel</span>
                      <p className="text-muted-foreground">The official sustainability ecolabel of the Nordic countries</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-eco-green mr-2 mt-1" />
                    <div>
                      <span className="font-semibold">BREEAM-SE</span>
                      <p className="text-muted-foreground">Swedish adaptation of the international BREEAM standard</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-eco-green mr-2 mt-1" />
                    <div>
                      <span className="font-semibold">Miljöbyggnad</span>
                      <p className="text-muted-foreground">Swedish environmental building certification system</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-eco-green hover:bg-eco-green/90">
                <Download className="mr-2 h-5 w-5" />
                Download Complete Guide
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EcoInvestmentGuide;
