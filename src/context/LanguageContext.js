// src/context/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../i18n/en';
import ta from '../i18n/ta';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLanguageReady, setIsLanguageReady] = useState(false); // loading flag

  
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('language');
      if (savedLang) setLanguage(savedLang);
      setIsLanguageReady(true);
    };
    loadLanguage();
  }, []);

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'ta' : 'en';
    setLanguage(newLang);
    await AsyncStorage.setItem('language', newLang);
  };

  const translations = language === 'ta' ? ta : en;

  if (!isLanguageReady) return null; // or show splash / loading component

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
