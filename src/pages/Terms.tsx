
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === "en" ? "Terms of Service" : "Användarvillkor"}
        </h1>
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {language === "en" ? "Acceptance of Terms" : "Godkännande av Villkor"}
            </h2>
            <p className="mb-4">
              {language === "en"
                ? "By accessing and using our services, you agree to be bound by these terms and conditions."
                : "Genom att använda våra tjänster godkänner du att vara bunden av dessa villkor."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
