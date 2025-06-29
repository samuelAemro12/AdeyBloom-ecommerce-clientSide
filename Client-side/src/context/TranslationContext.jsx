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

  const t = (key) => {
    // Ensure we have a valid language
    const currentLanguage = language === 'am' ? 'am' : 'en';
    
    // Check if the key exists in the current language
    if (translations[currentLanguage]?.[key]) {
      return translations[currentLanguage][key];
    }
    
    // Fallback to English if key doesn't exist in current language
    if (translations['en']?.[key]) {
      console.warn(`Translation key "${key}" not found in ${currentLanguage}, falling back to English`);
      return translations['en'][key];
    }
    
    // If key doesn't exist in either language, return the key itself
    console.warn(`Translation key "${key}" not found in any language`);
    return key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext); 