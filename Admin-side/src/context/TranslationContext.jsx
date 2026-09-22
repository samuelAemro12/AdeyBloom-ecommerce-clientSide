import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translation';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  // Get language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am') 
      ? savedLanguage 
      : 'en';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key, values = {}) => {
    const currentLanguage = language === 'am' ? 'am' : 'en';
    const lookup = (catalogue) => key.split('.').reduce(
      (value, part) => (value && typeof value === 'object' ? value[part] : undefined),
      catalogue,
    );
    const phrase = lookup(translations[currentLanguage]) ?? lookup(translations.en) ?? key;

    return typeof phrase === 'string'
      ? phrase.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`)
      : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext); 
