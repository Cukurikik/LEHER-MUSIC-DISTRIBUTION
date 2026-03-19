
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const ArtAnimatorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [animationStyle, setAnimationStyle] = useState('pulse-glow');
    
    const animationClasses: Record<string, string> = {
        'pulse-glow': 'animate-pulse',
        'subtle-zoom': 'group-hover:scale-110 transition-transform duration-1000',
        'holographic': 'holographic-glow',
        'shimmer': 'shimmer',
    };

    const styles = ["Pulse Glow", "Subtle Zoom", "Holographic", "Shimmer"];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_ai_cover_art_animator_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_ai_cover_art_animator_desc')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-4">
                    <h2 className="text-xl font-bold">{t('select_style')}</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {styles.map(style => {
                            const styleKey = style.toLowerCase().replace(' ', '-');
                            return (
                                <button 
                                    key={styleKey}
                                    onClick={() => setAnimationStyle(styleKey)} 
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${animationStyle === styleKey ? 'border-primary bg-primary/20' : 'border-ui-border bg-ui-bg/50 hover:border-primary/50'}`}>
                                    {style}
                                </button>
                            )
                        })}
                    </div>
                     <button className="w-full mt-4 btn-glow-primary py-2.5 rounded-full font-semibold">{t('export_as_mp4')}</button>
                </div>
                <div className="group flex items-center justify-center">
                    <div className={`relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden`}>
                        <img src="https://picsum.photos/seed/dj-pesta-gila-cover/400" alt="Cover Art" className={`w-full h-full object-cover shadow-2xl ${animationClasses[animationStyle]}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtAnimatorView;
