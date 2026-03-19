
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const ChipIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>);

export const ToolViewWrapper: React.FC<{ titleKey: any; descKey: any; children: React.ReactNode; backLink?: string }> = ({ titleKey, descKey, children, backLink = '/distribution-tools' }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" style={{animationDelay: '2s'}}></div>

            <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
                <div className="inline-block p-1 bg-gradient-to-br from-white/10 to-white/0 rounded-full border border-white/10 backdrop-blur-md mb-8">
                     <button onClick={() => navigate(backLink)} className="flex items-center gap-2 px-6 py-2 rounded-full bg-black/50 hover:bg-white/10 transition-colors font-bold text-white group">
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>{t('back')}</span>
                    </button>
                </div>
                
                <div className="space-y-4 animate-fade-in-up">
                    <div className="w-24 h-24 mx-auto bg-ui-surface/50 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                        <ChipIcon className="w-12 h-12 text-quantum-flux" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white font-oxanium tracking-tighter drop-shadow-lg">
                        {t(titleKey)}
                    </h1>
                    <p className="text-xl text-ui-text-body font-light max-w-2xl mx-auto leading-relaxed">
                        {t(descKey)}
                    </p>
                </div>

                <div className="pt-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const ComingSoonTool: React.FC<{ titleKey: any, descKey: any, backLink?: string }> = ({ titleKey, descKey, backLink }) => {
    const { t } = useTranslation();
    return (
        <ToolViewWrapper titleKey={titleKey} descKey={descKey} backLink={backLink}>
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-30 blur group-hover:opacity-60 transition duration-1000 animate-gradient-x"></div>
                <div className="relative bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></div>
                        <span className="text-yellow-400 font-mono font-bold tracking-widest uppercase text-sm">Compiling Module</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{t('coming_soon_title')}</h2>
                    <p className="text-ui-text-subtle max-w-md mx-auto">
                        {t('coming_soon_desc')} Our engineers are finalizing the quantum algorithms for this feature. Access will be granted soon.
                    </p>
                    
                    <div className="w-full max-w-sm h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4 animate-pulse"></div>
                    </div>
                    <p className="text-[10px] font-mono text-ui-text-subtle mt-2">Development Progress: 85%</p>
                </div>
            </div>
        </ToolViewWrapper>
    );
};
