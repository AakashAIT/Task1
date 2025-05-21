// src/i18n/strings.js

import { useLanguage } from '../context/LanguageContext';

const useStrings = () => {
  const { translations } = useLanguage();

  const t = (key) => translations[key] || key;

  return { t };
};

export default useStrings;
