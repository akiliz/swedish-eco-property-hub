
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Cookies = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === "en" ? "Cookie Policy" : "Cookie-policy"}
        </h1>
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {language === "en" ? "What Are Cookies" : "Vad Är Cookies"}
            </h2>
            <p className="mb-4">
              {language === "en"
                ? "Cookies are small text files that are placed on your device when you visit our website."
                : "Cookies är små textfiler som placeras på din enhet när du besöker vår webbplats."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
