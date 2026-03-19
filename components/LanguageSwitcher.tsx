import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, LanguageCode } from '../hooks/useTranslation';
import GlobeIcon from './icons/GlobeIcon';

const languages: { code: LanguageCode; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
];

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 text-ui-text-body hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label={t('select_language')}
            >
                <GlobeIcon className="w-6 h-6" />
                <span className="hidden md:inline font-semibold">{selectedLanguage.name}</span>
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 glass-surface-quantum rounded-xl shadow-2xl animate-page-fade-in-up z-50 overflow-hidden">
                    <ul className="py-1">
                        {languages.map(lang => (
                            <li key={lang.code}>
                                <button
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 flex items-center gap-3 text-ui-text-body hover:bg-white/10 transition-colors ${language === lang.code ? 'font-bold text-primary' : ''}`}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;