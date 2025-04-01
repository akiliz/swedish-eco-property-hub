
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const BuyingProcess = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-eco-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {language === "en" ? "Swedish Property Buying Process" : "Köpprocess för Fastigheter"}
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              {language === "en"
                ? "A step-by-step guide to purchasing property in Sweden"
                : "En steg-för-steg guide för att köpa fastighet i Sverige"}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">
                {language === "en" ? "Key Steps in the Process" : "Viktiga Steg i Processen"}
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-eco-green mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {language === "en" ? "1. Property Viewing" : "1. Visning av Fastighet"}
                        </h3>
                        <p className="text-muted-foreground">
                          {language === "en"
                            ? "Schedule viewings and inspect properties with our agents"
                            : "Boka visningar och inspektera fastigheter med våra mäklare"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-eco-green mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {language === "en" ? "2. Making an Offer" : "2. Lägga ett Bud"}
                        </h3>
                        <p className="text-muted-foreground">
                          {language === "en"
                            ? "Submit your offer through our platform or agent"
                            : "Lämna ditt bud genom vår plattform eller mäklare"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-eco-green mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {language === "en" ? "3. Contract Signing" : "3. Kontraktsskrivning"}
                        </h3>
                        <p className="text-muted-foreground">
                          {language === "en"
                            ? "Review and sign the purchase agreement with legal assistance"
                            : "Granska och skriv under köpeavtalet med juridisk hjälp"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuyingProcess;
