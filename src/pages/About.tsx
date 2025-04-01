
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-eco-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About EcoHome Sweden</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Your trusted partner in sustainable property investments across Sweden
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  At EcoHome Sweden, we are dedicated to connecting international buyers and investors with sustainable, eco-certified properties across Sweden. Our platform makes it easy to find and invest in environmentally conscious real estate while supporting the transition to a greener future.
                </p>
                <h3 className="text-xl font-semibold mb-4">What Sets Us Apart</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-eco-green mr-2 mt-1" />
                    <span>Specialized in eco-certified properties</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-eco-green mr-2 mt-1" />
                    <span>Multilingual support for international buyers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-eco-green mr-2 mt-1" />
                    <span>Comprehensive expat resources and guidance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Values</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p className="text-muted-foreground">We prioritize properties that meet strict environmental standards and contribute to a sustainable future.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                    <p className="text-muted-foreground">We provide clear, accurate information about all our listed properties and their eco-certifications.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground">We continuously improve our platform to make sustainable property investment accessible to all.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
