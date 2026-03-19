
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const EpkGeneratorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const artists = ["DJ Galaxy FVNKY", "DJ Wave SOPAN", "DJ Maman FVNKY"];
    const templates = ["Modern Minimalist", "Bold & Punchy", "Classic Press"];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_ai_press_kit_generator_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_ai_press_kit_generator_desc')}</p>
            </div>
            
            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-6">
                 <div>
                    <label htmlFor="artist-select" className="block font-semibold text-ui-text-heading mb-2">1. {t('select_artist')}:</label>
                    <select id="artist-select" className="w-full p-3 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow">
                        {artists.map(artist => <option key={artist}>{artist}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block font-semibold text-ui-text-heading mb-2">2. Select Template:</label>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {templates.map(template => (
                           <button key={template} className="p-4 border-2 border-ui-border rounded-lg hover:border-primary transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50">
                               <div className="h-24 bg-ui-bg/50 rounded-md mb-2 flex items-center justify-center text-xs text-ui-text-subtle">{template} Template Preview</div>
                               <p className="font-semibold">{template}</p>
                           </button>
                       ))}
                    </div>
                </div>
                 <button className="w-full btn-glow-primary py-3 rounded-full font-bold">Generate EPK & Download PDF</button>
            </div>
        </div>
    );
};

export default EpkGeneratorView;
