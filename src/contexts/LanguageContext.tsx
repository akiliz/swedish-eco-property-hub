
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'sv';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.properties': 'Properties',
    'nav.agents': 'Agents',
    'nav.resources': 'Expat Resources',
    'nav.about': 'About',
    'nav.listProperty': 'List Property',
    'hero.title': 'Find Your Eco-Friendly Home in Sweden',
    'hero.subtitle': 'Sustainable living starts here',
    'property.price': 'Price',
    'property.location': 'Location',
    'property.type': 'Property Type',
    'property.area': 'Area',
    'property.bedrooms': 'Bedrooms',
    'property.bathrooms': 'Bathrooms',
    'property.energyClass': 'Energy Class',
    'property.contact': 'Contact Agent',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone Number',
    'form.submit': 'Send Request',
    'contact.title': 'Contact Agent',
    'contact.description': 'Fill out the form below and the agent will contact you about this property.',
    'property.residential': 'Residential',
    'property.commercial': 'Commercial'
  },
  sv: {
    'nav.properties': 'Fastigheter',
    'nav.agents': 'Mäklare',
    'nav.resources': 'Utländsk Resurs',
    'nav.about': 'Om Oss',
    'nav.listProperty': 'Lägg Till Fastighet',
    'hero.title': 'Hitta Ditt Miljövänliga Hem i Sverige',
    'hero.subtitle': 'Hållbart boende börjar här',
    'property.price': 'Pris',
    'property.location': 'Plats',
    'property.type': 'Fastighetstyp',
    'property.area': 'Yta',
    'property.bedrooms': 'Sovrum',
    'property.bathrooms': 'Badrum',
    'property.energyClass': 'Energiklass',
    'property.contact': 'Kontakta Mäklare',
    'form.name': 'Namn',
    'form.email': 'E-post',
    'form.phone': 'Telefonnummer',
    'form.submit': 'Skicka Förfrågan',
    'contact.title': 'Kontakta Mäklare',
    'contact.description': 'Fyll i formuläret nedan så kontaktar mäklaren dig om denna fastighet.',
    'property.residential': 'Bostad',
    'property.commercial': 'Kommersiell'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
