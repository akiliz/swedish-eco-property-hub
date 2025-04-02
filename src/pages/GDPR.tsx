
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const GDPR = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === "en" ? "GDPR Compliance" : "GDPR-efterlevnad"}
        </h1>
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {language === "en" ? "Your Rights Under GDPR" : "Dina Rättigheter Enligt GDPR"}
            </h2>
            <ul className="list-disc pl-6 mb-4">
              <li>{language === "en" ? "Right to access" : "Rätt till tillgång"}</li>
              <li>{language === "en" ? "Right to rectification" : "Rätt till rättelse"}</li>
              <li>{language === "en" ? "Right to erasure" : "Rätt till radering"}</li>
              <li>{language === "en" ? "Right to data portability" : "Rätt till dataportabilitet"}</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPR;
