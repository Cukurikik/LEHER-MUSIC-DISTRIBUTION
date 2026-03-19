
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { translations } from '../translations';
import type { TranslationKeys as TKeys } from '../types';

// Define types
export type LanguageCode = 'en' | 'id';
export type TranslationKeys = TKeys;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKeys, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Force default state to 'id'
  const [language, setLanguageState] = useState<LanguageCode>('id');

  useEffect(() => {
    // Force 'id' on mount regardless of previous setting to fix the user's issue immediately
    const currentLang = localStorage.getItem('leher_lang');
    if (currentLang !== 'id') {
        localStorage.setItem('leher_lang', 'id');
        setLanguageState('id');
    } else {
        setLanguageState('id');
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('leher_lang', lang);
    setLanguageState(lang);
  };

  const t = useCallback((key: TranslationKeys, replacements?: Record<string, string | number>): string => {
    // Try ID first, then EN as fallback
    let translation = (translations as any)[language]?.[key] || translations.en[key] || String(key);
    
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`\\{${rKey}\\}`, 'g');
            translation = translation.replace(regex, String(replacements[rKey]));
        });
    }

    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
