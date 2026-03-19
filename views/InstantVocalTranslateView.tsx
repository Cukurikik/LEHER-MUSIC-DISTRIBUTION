
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const LANGUAGES = ["Original (English)", "Spanish", "French", "Japanese", "Korean", "Indonesian"];

const InstantVocalTranslateView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
    const [isTranslating, setIsTranslating] = useState(false);

    const handleLanguageChange = (lang: string) => {
        setIsTranslating(true);
        setSelectedLanguage(lang);
        setTimeout(() => setIsTranslating(false), 1500); // Simulate AI processing
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_instant_vocal_translate_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_instant_vocal_translate_desc')}</p>
            </div>
            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-6 text-center">
                <img src="https://picsum.photos/seed/dj-pesta-gila-cover/400" alt="Cover" className="w-48 h-48 rounded-lg mx-auto shadow-lg" />
                 <div>
                    <p className="font-bold text-2xl text-ui-text-heading">DJ Pesta Gila</p>
                    <p className="text-lg text-ui-text-body">DJ Galaxy FVNKY</p>
                </div>
                
                <PlayIcon className="w-16 h-16 text-primary mx-auto cursor-pointer" />

                <div>
                    <label htmlFor="language-select" className="block font-semibold text-ui-text-heading mb-2">Select Vocal Language:</label>
                    <select 
                        id="language-select" 
                        className="w-full max-w-xs mx-auto p-3 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        value={selectedLanguage}
                    >
                        {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                </div>
                {isTranslating && (
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                        <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin"></div>
                        <span>AI is translating vocals...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstantVocalTranslateView;
