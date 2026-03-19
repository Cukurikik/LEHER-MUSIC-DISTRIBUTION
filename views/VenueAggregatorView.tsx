
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import WorldMapChart from '../components/charts/WorldMapChart';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);

const VenueAggregatorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const venues = [
        { name: "The Cosmic Lounge", city: "Jakarta", plays: 142, revenue: "$12.40", trend: "+15%" },
        { name: "Hard Rock Cafe", city: "Bali", plays: 85, revenue: "$8.20", trend: "+5%" },
        { name: "Skye Bar", city: "Jakarta", plays: 64, revenue: "$5.10", trend: "-2%" },
        { name: "Atlas Beach Club", city: "Bali", plays: 210, revenue: "$25.50", trend: "+30%" },
    ];

    const mapData = {
        'id': { value: 500, city: 'Jakarta' },
        'sg': { value: 120, city: 'Singapore' },
        'my': { value: 80, city: 'Kuala Lumpur' }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
             <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_venue_aggregator_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_venue_aggregator_desc')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-ui-surface p-6 rounded-2xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Live Performance Map</h3>
                    <div className="h-[400px] bg-singularity-black/50 rounded-xl border border-ui-border/50">
                         <WorldMapChart data={mapData} />
                    </div>
                </div>

                <div className="lg:col-span-1 bg-ui-surface p-6 rounded-2xl border border-ui-border flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4">Top Venues</h3>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar max-h-[400px]">
                        {venues.map((v, i) => (
                            <div key={i} className="bg-ui-bg/50 p-4 rounded-xl border border-ui-border hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-bold text-white text-lg">{v.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-ui-text-subtle">
                                            <LocationMarkerIcon className="w-3 h-3" />
                                            {v.city}
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${v.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{v.trend}</span>
                                </div>
                                <div className="flex justify-between items-end mt-2">
                                     <div>
                                         <p className="text-xs text-ui-text-subtle uppercase">Plays</p>
                                         <p className="font-mono font-bold text-white">{v.plays}</p>
                                     </div>
                                     <div className="text-right">
                                         <p className="text-xs text-ui-text-subtle uppercase">Est. Royalty</p>
                                         <p className="font-mono font-bold text-green-400">{v.revenue}</p>
                                     </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 btn-glow-primary py-3 rounded-xl font-bold">Download Report</button>
                </div>
            </div>
        </div>
    );
};

export default VenueAggregatorView;
