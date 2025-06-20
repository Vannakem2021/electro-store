"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../lib/i18n";

export type Language = "en" | "km";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isKhmer: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize language from i18n
    const currentLang = i18n.language as Language;
    setLanguageState(currentLang === "km" ? "km" : "en");
    setIsInitialized(true);
  }, [i18n.language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);

    // Update document language attribute
    document.documentElement.lang = lang;

    // Update font class on body
    const body = document.body;
    if (lang === "km") {
      body.classList.add("font-khmer");
      body.classList.remove("font-rubik");
    } else {
      body.classList.add("font-rubik");
      body.classList.remove("font-khmer");
    }
  };

  const isKhmer = language === "km";

  // Don't render until initialized to prevent hydration mismatch
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isKhmer }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
