
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
    // Add more translations as needed
  },
  sv: {
    'nav.properties': 'Fastigheter',
    'nav.agents': 'Mäklare',
    'nav.resources': 'Utländsk Resurs',
    'nav.about': 'Om Oss',
    'nav.listProperty': 'Lägg Till Fastighet',
    // Add more translations as needed
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
