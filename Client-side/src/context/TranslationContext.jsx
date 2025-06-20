import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translation';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // default is English

  const t = (key) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext); 