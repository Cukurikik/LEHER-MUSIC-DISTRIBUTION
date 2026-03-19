
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { TOOLS } from '../data/tools';
import { useTranslation } from '../hooks/useTranslation';
import type { TranslationKeys, Tool } from '../types';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';
import SearchIcon from '../components/icons/SearchIcon';
import SparklesIcon from '../components/layout/SparklesIcon';

// --- Styled Components & Assets ---

const GridPattern = () => (
    <div className="absolute inset-0 pointer-events-none z-0" 
         style={{ 
             backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
             backgroundSize: '32px 32px'
         }}>
    </div>
);

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
    const { t } = useTranslation();
    return (
        <Link
            to={tool.link}
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-[#121212]/60 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm z-0"
        >
            {/* Pro Badge - Minimalist */}
            {tool.isPro && (
                <div className="absolute top-3 right-3 z-20">
                    <div className="flex items-center gap-1 bg-[#FFD700]/10 border border-[#FFD700]/20 px-2 py-0.5 rounded-md">
                        <span className="text-[9px] font-bold text-[#FFD700] tracking-widest uppercase">PRO</span>
                    </div>
                </div>
            )}

            <div className="p-5 flex flex-col h-full relative z-10">
                {/* Header: Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-ui-surface border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300">
                            <tool.icon className="h-5 w-5 text-ui-text-subtle group-hover:text-primary transition-colors duration-300" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white font-oxanium leading-tight group-hover:text-primary transition-colors duration-300">
                            {t(tool.title as TranslationKeys)}
                        </h3>
                        <p className="text-[10px] text-ui-text-subtle uppercase tracking-wider mt-1 opacity-60">
                            {t(tool.category as any)}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-ui-text-subtle leading-relaxed line-clamp-2 mb-4 flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
                    {t(tool.description as TranslationKeys)}
                </p>

                {/* CTA */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-medium text-ui-text-subtle group-hover:text-white transition-colors">
                        v5.8.0
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-50 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <span>{t(tool.ctaText as TranslationKeys)}</span>
                        <ArrowRightIcon className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

const DistributionToolsDashboardView: React.FC = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTools = useMemo(() => {
        return TOOLS.filter(tool => {
            const searchLower = searchTerm.toLowerCase();
            return t(tool.title as TranslationKeys).toLowerCase().includes(searchLower) || 
                   t(tool.description as TranslationKeys).toLowerCase().includes(searchLower) ||
                   t(tool.category as any).toLowerCase().includes(searchLower);
        });
    }, [searchTerm, t]);

    return (
        <div className="min-h-screen pb-32 relative bg-[#050505] text-white overflow-x-hidden animate-fade-in">
            <GridPattern />
            
            {/* --- HERO & SEARCH SECTION (RELATIVE / NOT STICKY) --- */}
            <div className="relative z-10 bg-[#050505] border-b border-white/5 shadow-2xl mb-8">
                <div className="relative pt-8 pb-10 px-4 flex flex-col items-center justify-center">
                    
                    <div className="text-center space-y-3 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                             <SparklesIcon className="w-3 h-3 text-secondary" />
                             <span className="text-[10px] font-bold tracking-widest text-ui-text-subtle uppercase">Quantum Toolkit v5.8</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black font-oxanium tracking-tight">
                            <span className="text-white">COMMAND</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">CENTER</span>
                        </h1>
                    </div>

                    {/* THE VIRTUAL SEARCH */}
                    <div className="w-full max-w-xl relative group">
                        {/* Animated Border/Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-50 blur group-focus-within:opacity-100 group-focus-within:blur-md transition duration-500 animate-gradient-xy"></div>
                        
                        <div className="relative flex items-center bg-[#0A0A0A] rounded-full p-1 shadow-2xl">
                            <div className="pl-4 pr-3 text-ui-text-subtle group-focus-within:text-white transition-colors">
                                <SearchIcon className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder={t('toolkit_search_placeholder')}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent border-none text-base text-white placeholder-ui-text-subtle/50 focus:ring-0 focus:outline-none h-12 font-medium"
                            />
                            <div className="pr-2">
                                <kbd className="hidden md:inline-block px-2 py-1 text-[10px] font-bold text-ui-text-subtle bg-white/5 rounded border border-white/10">
                                    CTRL + K
                                </kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TOOLS GRID --- */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-0">
                <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-2">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Available Modules
                    </h2>
                    <span className="text-xs text-ui-text-subtle font-mono">
                        {filteredTools.length} / {TOOLS.length} ONLINE
                    </span>
                </div>

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredTools.map((tool, index) => (
                            <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 30}ms` }}>
                                <ToolCard tool={tool} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center opacity-0 animate-fade-in" style={{animationFillMode: 'forwards'}}>
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                            <SearchIcon className="w-8 h-8 text-ui-text-subtle" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('no_results_found')}</h3>
                        <p className="text-sm text-ui-text-subtle max-w-xs mx-auto">{t('no_releases_found_desc')}</p>
                        <button onClick={() => setSearchTerm('')} className="mt-6 px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors">
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistributionToolsDashboardView;
