
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, getBrowserLanguage, TranslationKey } from '../utils/translations';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode; initialLanguage?: Language }> = ({ children, initialLanguage }) => {
    const [language, setLanguage] = useState<Language>(initialLanguage || getBrowserLanguage());

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: TranslationKey): string => {
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
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
