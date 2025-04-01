
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileCheck, Clock, Users, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ResidencyGuide = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-eco-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {language === "en" ? "Swedish Residency Permit Guide" : "Guide för Uppehållstillstånd"}
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              {language === "en" 
                ? "Everything you need to know about obtaining residency in Sweden through property investment" 
                : "Allt du behöver veta om att få uppehållstillstånd i Sverige genom fastighetsinvestering"}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {language === "en" ? "Eligibility Requirements" : "Behörighetskrav"}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FileCheck className="h-6 w-6 text-eco-green mr-2 mt-1" />
                    <span>{language === "en" 
                      ? "Property investment value must exceed 2 million SEK" 
                      : "Fastighetsinvesteringen måste överstiga 2 miljoner SEK"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="h-6 w-6 text-eco-green mr-2 mt-1" />
                    <span>{language === "en"
                      ? "Proof of sustainable income source" 
                      : "Bevis på hållbar inkomstkälla"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="h-6 w-6 text-eco-green mr-2 mt-1" />
                    <span>{language === "en"
                      ? "Clean criminal record" 
                      : "Rent brottsregister"}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {language === "en" ? "Application Process" : "Ansökningsprocess"}
                </h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <Clock className="h-8 w-8 text-eco-green mb-3" />
                      <h3 className="text-xl font-semibold mb-2">
                        {language === "en" ? "Processing Time" : "Handläggningstid"}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === "en" 
                          ? "Average processing time is 3-6 months" 
                          : "Genomsnittlig handläggningstid är 3-6 månader"}
                      </p>
                    </CardContent>
                  </Card>
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

export default ResidencyGuide;
