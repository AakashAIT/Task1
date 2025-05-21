// src/context/LanguageContext.js

import React, { createContext, useContext, useState } from 'react';
import en from '../i18n/en';
import ta from '../i18n/ta';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const translations = language === 'ta' ? ta : en;

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => useContext(LanguageContext);
