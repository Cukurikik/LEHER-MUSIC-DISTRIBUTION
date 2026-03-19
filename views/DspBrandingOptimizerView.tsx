
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import { getPlatformIcon } from '../components/icons/PlatformIcons';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);

const DspBrandingOptimizerView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [activePlatform, setActivePlatform] = useState('spotify');
    const [bio, setBio] = useState("Official profile of DJ Galaxy. Producing cosmic synthwave beats from the future.");
    const [isSyncing, setIsSyncing] = useState(false);

    const platforms = [
        { id: 'spotify', name: 'Spotify', color: '#1DB954' },
        { id: 'applemusic', name: 'Apple Music', color: '#FA2D48' },
        { id: 'youtubemusic', name: 'YouTube Music', color: '#FF0000' },
    ];

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
             <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_dsp_branding_optimizer_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_dsp_branding_optimizer_desc')}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Platform Selector */}
                <div className="w-full lg:w-64 space-y-2">
                    {platforms.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setActivePlatform(p.id)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${activePlatform === p.id ? 'bg-ui-surface border-primary shadow-lg' : 'bg-ui-bg/50 border-ui-border hover:bg-ui-surface'}`}
                        >
                            <div className="w-8 h-8 flex items-center justify-center">
                                {getPlatformIcon(p.name)}
                            </div>
                            <span className="font-bold text-ui-text-heading">{p.name}</span>
                        </button>
                    ))}
                </div>

                {/* Editor */}
                <div className="flex-1 bg-ui-surface p-8 rounded-2xl border border-ui-border">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Profile Editor: {platforms.find(p => p.id === activePlatform)?.name}</h3>
                         <button 
                            onClick={handleSync}
                            className="btn-quantum-glow px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                        >
                            {isSyncing ? 'Syncing...' : 'Sync to Store'}
                            {!isSyncing && <CheckIcon className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-ui-text-subtle uppercase mb-2">Profile Image (2660x1140)</label>
                                <div className="aspect-video bg-ui-bg border-2 border-dashed border-ui-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-ui-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">+</span>
                                    </div>
                                    <p className="text-xs text-ui-text-subtle mt-2">Click to Upload</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-ui-text-subtle uppercase mb-2">Gallery (Max 5)</label>
                                <div className="flex gap-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-16 h-16 bg-ui-bg rounded-lg border border-ui-border"></div>
                                    ))}
                                     <div className="w-16 h-16 border-2 border-dashed border-ui-border rounded-lg flex items-center justify-center text-ui-text-subtle cursor-pointer">+</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                             <div>
                                <label className="block text-xs font-bold text-ui-text-subtle uppercase mb-2">Artist Bio</label>
                                <textarea 
                                    value={bio} 
                                    onChange={(e) => setBio(e.target.value)} 
                                    className="form-input-modern w-full h-48 resize-none"
                                />
                                <p className="text-right text-xs text-ui-text-subtle mt-1">{bio.length} / 1500 chars</p>
                            </div>
                            
                             <div className="bg-singularity-black/30 p-4 rounded-lg border border-singularity-purple/30">
                                <h4 className="font-bold text-sm text-quantum-flux mb-2">AI Suggestion</h4>
                                <p className="text-xs text-ui-text-body italic">"Consider mentioning your latest single 'Cosmic Drift' in the first paragraph to boost engagement."</p>
                                <button className="text-xs text-primary font-bold mt-2 hover:underline">Apply Suggestion</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DspBrandingOptimizerView;
