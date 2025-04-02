
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === "en" ? "Privacy Policy" : "Integritetspolicy"}
        </h1>
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {language === "en" ? "Information We Collect" : "Information Vi Samlar In"}
            </h2>
            <p className="mb-4">
              {language === "en"
                ? "We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support."
                : "Vi samlar in information som du tillhandahåller direkt till oss, inklusive när du skapar ett konto, gör ett köp eller kontaktar oss för support."}
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {language === "en" ? "How We Use Your Information" : "Hur Vi Använder Din Information"}
            </h2>
            <p className="mb-4">
              {language === "en"
                ? "We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you."
                : "Vi använder informationen vi samlar in för att tillhandahålla, underhålla och förbättra våra tjänster, behandla dina transaktioner och kommunicera med dig."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
