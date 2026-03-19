
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import WorldMapChart from '../components/charts/WorldMapChart';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const MarketFinderView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Mock data for the map
    const marketData = {
        'br': { value: 95, city: 'São Paulo' }, // High demand, low supply
        'jp': { value: 88, city: 'Tokyo' },
        'de': { value: 85, city: 'Berlin' },
        'id': { value: 75, city: 'Jakarta' },
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_market_opportunity_finder_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_market_opportunity_finder_desc')}</p>
            </div>
            
            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label htmlFor="genre-select" className="block text-sm font-medium text-ui-text-subtle mb-1">Select Your Genre:</label>
                        <select id="genre-select" className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow">
                            <option>DJ Remix</option>
                            <option>Synthwave</option>
                            <option>Lofi Hip-Hop</option>
                            <option>Ambient</option>
                        </select>
                    </div>
                    <div className="flex-1">
                         <label htmlFor="region-select" className="block text-sm font-medium text-ui-text-subtle mb-1">Region Focus:</label>
                        <select id="region-select" className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow">
                            <option>Global</option>
                            <option>Southeast Asia</option>
                            <option>Latin America</option>
                            <option>Europe</option>
                        </select>
                    </div>
                </div>
                <div className="h-96 rounded-lg overflow-hidden border border-ui-border">
                    <WorldMapChart data={marketData} />
                </div>
                <p className="text-center text-xs text-ui-text-subtle mt-2">Highlighted countries represent high-demand, low-supply markets for the selected genre.</p>
            </div>
        </div>
    );
};

export default MarketFinderView;
