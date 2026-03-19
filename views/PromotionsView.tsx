
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import SparklesIcon from '../components/layout/SparklesIcon';
import SearchIcon from '../components/icons/SearchIcon';
import * as ReactRouterDOM from 'react-router-dom';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

// --- Icons ---
const TargetIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);
const LinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);
const UserGroupIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const RefreshIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void; icon: any }> = ({ label, active, onClick, icon: Icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-bold transition-all text-sm md:text-base whitespace-nowrap ${
            active 
            ? 'bg-gradient-singularity text-white shadow-glow-primary' 
            : 'bg-ui-surface border border-ui-border text-ui-text-body hover:bg-white/5'
        }`}
    >
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
        {label}
    </button>
);

const AiAudienceTab: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [launching, setLaunching] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setResult(null);
        setTimeout(() => {
            setResult({
                genres: ['Indie Pop', 'Lo-Fi', 'Chillwave'],
                locations: ['Jakarta, ID', 'Los Angeles, US', 'Tokyo, JP'],
                lookalikes: ['NIKI', 'Joji', 'Rex Orange County'],
                age: '18 - 24',
                platforms: ['TikTok', 'Spotify']
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    const handleLaunchClick = () => {
        setShowModal(true);
    };

    const handleConfirmLaunch = () => {
        setLaunching(true);
        setShowModal(false);
        setTimeout(() => {
            setLaunching(false);
            alert("Campaign successfully launched! You will receive a performance report in 24 hours.");
        }, 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in relative">
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-ui-surface border border-ui-border rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-ui-text-subtle hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Campaign Launch</h3>
                        
                        <div className="space-y-4 mb-6">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Target Platform</span>
                                    <span className="text-white font-bold">TikTok Spark Ads</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Budget</span>
                                    <span className="text-white font-bold">$50.00 / day</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Duration</span>
                                    <span className="text-white font-bold">7 Days</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">
                                By clicking confirm, you authorize Leher to deploy ads using the AI-generated audience profile.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-sm bg-ui-bg border border-ui-border text-ui-text-body hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmLaunch}
                                className="flex-1 py-3 rounded-xl font-bold text-sm bg-primary text-black hover:bg-primary/90 shadow-glow-primary"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-quantum-blue/20 rounded-lg">
                            <TargetIcon className="w-6 h-6 text-quantum-blue" />
                         </div>
                         <h3 className="text-2xl font-bold text-ui-text-heading">AI Audience Identifier</h3>
                    </div>
                    <p className="text-ui-text-body mb-8 leading-relaxed">
                        Stop guessing. Our AI analyzes your sound signature and matches it with millions of listener data points to find your perfect tribe.
                    </p>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-ui-text-subtle uppercase mb-2 tracking-wider">Select Source Track</label>
                            <div className="relative">
                                <select className="w-full bg-ui-bg border border-ui-border rounded-xl p-4 text-white appearance-none focus:ring-2 focus:ring-primary transition-all outline-none cursor-pointer">
                                    <option>Cosmic Drift</option>
                                    <option>DJ Pesta Gila</option>
                                    <option>Ocean Breath</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ui-text-subtle">▼</div>
                            </div>
                        </div>
                        <button 
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full btn-quantum-glow py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-white text-lg shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:scale-100"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Scanning Neural Network...
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="w-5 h-5" />
                                    Identify Target Audience
                                </>
                            )}
                        </button>
                    </div>
                </div>
                
                {result && (
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-1 rounded-3xl animate-slide-up">
                        <div className="bg-ui-surface/90 backdrop-blur-xl p-6 rounded-[22px] border border-white/10">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">Campaign Ready</h4>
                                    <p className="text-sm text-ui-text-subtle">AI confidence score: <span className="text-green-400 font-bold">94%</span></p>
                                </div>
                            </div>
                            <p className="text-sm text-ui-text-body mb-6">
                                We recommend a <strong>TikTok Spark Ads</strong> campaign targeting users interested in <em>{result.lookalikes.join(', ')}</em> in <strong>{result.locations[0]}</strong>.
                            </p>
                            <button 
                                onClick={handleLaunchClick}
                                disabled={launching}
                                className="w-full py-3 bg-ui-bg border border-primary/50 text-primary font-bold rounded-xl hover:bg-primary hover:text-black transition-all"
                            >
                                {launching ? 'Initializing Ad Manager...' : 'Launch Campaign ($50 min)'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Visualizer Area */}
            <div className="bg-black rounded-3xl border border-ui-border relative overflow-hidden min-h-[500px] flex flex-col">
                
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ 
                         backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                         backgroundSize: '40px 40px'
                     }}>
                </div>

                {isAnalyzing ? (
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                         <div className="relative">
                             <div className="w-32 h-32 border-4 border-primary/30 rounded-full animate-ping absolute inset-0"></div>
                             <div className="w-32 h-32 border-4 border-t-primary border-r-secondary border-b-primary border-l-secondary rounded-full animate-spin"></div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <SparklesIcon className="w-10 h-10 text-white animate-pulse" />
                             </div>
                         </div>
                         <p className="text-primary font-mono mt-8 animate-pulse tracking-widest">ANALYZING AUDIO FINGERPRINT...</p>
                         <div className="mt-2 text-xs text-ui-text-subtle font-mono">
                             Accessing Global Listener Database...
                         </div>
                    </div>
                ) : result ? (
                    <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center animate-fade-in">
                        <h3 className="text-center text-ui-text-subtle uppercase tracking-widest text-xs mb-6">Analysis Complete</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-ui-surface/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group">
                                <p className="text-[10px] text-ui-text-subtle uppercase font-bold mb-1">Top Region</p>
                                <p className="font-black text-xl md:text-2xl text-white group-hover:text-primary transition-colors">{result.locations[0]}</p>
                                <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{width: '85%'}}></div>
                                </div>
                            </div>
                            <div className="bg-ui-surface/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-colors group">
                                <p className="text-[10px] text-ui-text-subtle uppercase font-bold mb-1">Age Demographics</p>
                                <p className="font-black text-xl md:text-2xl text-white group-hover:text-secondary transition-colors">{result.age}</p>
                                <p className="text-xs text-ui-text-subtle mt-1">Gen Z Dominant</p>
                            </div>
                        </div>

                        <div className="bg-ui-surface/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 mb-4">
                            <p className="text-[10px] text-ui-text-subtle uppercase font-bold mb-3">Sonic Lookalikes</p>
                            <div className="flex flex-wrap gap-2">
                                {result.lookalikes.map((artist: string) => (
                                    <span key={artist} className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white text-sm font-bold border border-white/10 hover:border-white/30 transition-colors cursor-default">
                                        {artist}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                         <div className="bg-gradient-to-r from-secondary/20 to-primary/20 p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-white/70 uppercase font-bold mb-1">Best Platform</p>
                                <p className="font-black text-2xl text-white">TikTok</p>
                            </div>
                            <div className="text-right">
                                <span className="text-green-400 font-mono font-bold text-lg">High</span>
                                <p className="text-[10px] text-white/50 uppercase">Viral Potential</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-ui-text-subtle relative z-10">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                             <TargetIcon className="w-10 h-10 opacity-30" />
                        </div>
                        <p className="text-sm">Select a track and start analysis to visualize data.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SmartLinkTab: React.FC = () => {
    const navigate = useNavigate();
    const campaigns = [
        { id: 1, name: "Cosmic Drift Pre-Save", type: "Pre-Save", clicks: 1250, saves: 450, status: "Active" },
        { id: 2, name: "DJ Pesta Gila SmartLink", type: "SmartLink", clicks: 8900, saves: 0, status: "Active" },
        { id: 3, name: "Ocean Breath Launch", type: "Pre-Save", clicks: 300, saves: 120, status: "Draft" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-ui-text-heading">SmartLinks & Pre-Saves</h3>
                    <p className="text-ui-text-body">Manage your marketing landing pages.</p>
                </div>
                <button 
                    onClick={() => navigate('/distribution-tools/smart-links/create')}
                    className="btn-glow-primary px-6 py-2 rounded-full font-bold flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" /> Create New
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {campaigns.map((c) => (
                    <div key={c.id} className="bg-ui-surface p-4 rounded-xl border border-ui-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${c.type === 'Pre-Save' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                                <LinkIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-ui-text-heading">{c.name}</p>
                                <p className="text-xs text-ui-text-subtle">{c.type} • {c.status}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-center">
                                <p className="text-lg font-bold text-white">{c.clicks.toLocaleString()}</p>
                                <p className="text-[10px] text-ui-text-subtle uppercase">Clicks</p>
                            </div>
                            {c.type === 'Pre-Save' && (
                                <div className="text-center">
                                    <p className="text-lg font-bold text-green-400">{c.saves.toLocaleString()}</p>
                                    <p className="text-[10px] text-ui-text-subtle uppercase">Saves</p>
                                </div>
                            )}
                            <button onClick={() => alert(`Opening analytics for ${c.name}`)} className="text-ui-text-body hover:text-primary p-2">
                                <ExternalLinkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CreatorConnectTab: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [invited, setInvited] = useState<string[]>([]);

    const handleInvite = (creatorName: string) => {
        setInvited(prev => [...prev, creatorName]);
        // In a real app, we would use a toast notification system here
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-black px-6 py-3 rounded-xl font-bold shadow-2xl animate-slide-up z-50';
        toast.innerText = `Invite sent to ${creatorName}!`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    const creators = [
        { name: "DanceQueen_99", platform: "TikTok", followers: "2.4M", niche: "Dance Challenges", cost: "$200 - $500", avatar: "https://picsum.photos/seed/creator1/100" },
        { name: "VibeMaster", platform: "Instagram", followers: "850K", niche: "Lifestyle / Aesthetic", cost: "$150 - $300", avatar: "https://picsum.photos/seed/creator2/100" },
        { name: "TechReviewer", platform: "YouTube", followers: "1.1M", niche: "Tech / Gadgets", cost: "$500+", avatar: "https://picsum.photos/seed/creator3/100" },
        { name: "IndieDiscover", platform: "TikTok", followers: "300K", niche: "Music Discovery", cost: "$50 - $100", avatar: "https://picsum.photos/seed/creator4/100" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-indigo-500/30 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white">Creator Marketplace</h3>
                    <p className="text-ui-text-body text-sm mt-1">Connect with influencers to promote your music.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-subtle" />
                    <input type="text" placeholder="Search creators..." className="w-full bg-black/40 border border-ui-border rounded-full py-2 pl-10 pr-4 text-sm form-input-glow" />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'TikTok', 'Instagram', 'YouTube', 'Dance', 'Lifestyle'].map(f => (
                    <button 
                        key={f} 
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === f ? 'bg-white text-black' : 'bg-ui-surface border border-ui-border hover:bg-ui-border'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creators.map((c, i) => (
                    <div key={i} className="bg-ui-surface p-4 rounded-xl border border-ui-border hover:border-primary/50 transition-colors flex gap-4 items-center">
                        <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-full object-cover border-2 border-ui-border" />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-white truncate">{c.name}</h4>
                                <span className="text-xs bg-ui-bg px-2 py-0.5 rounded text-ui-text-subtle">{c.platform}</span>
                            </div>
                            <p className="text-sm text-ui-text-body">{c.niche} • <span className="text-green-400 font-bold">{c.followers}</span></p>
                            <p className="text-xs text-ui-text-subtle mt-1">Est. Cost: {c.cost}</p>
                        </div>
                        <button 
                            onClick={() => handleInvite(c.name)}
                            disabled={invited.includes(c.name)}
                            className={`px-4 py-2 font-bold text-sm rounded-lg transition-colors ${invited.includes(c.name) ? 'bg-green-500/20 text-green-400 cursor-default' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                        >
                            {invited.includes(c.name) ? 'Sent' : 'Invite'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HaloEffectTab: React.FC = () => {
    const haloData = [
        { oldSong: "Neon Nights (2019)", newDriver: "Cosmic Drift (2023)", lift: "+240%", dailyStreams: [100, 120, 150, 300, 350, 340, 360] },
        { oldSong: "Sunset Blvd (2020)", newDriver: "Cosmic Drift (2023)", lift: "+85%", dailyStreams: [200, 210, 220, 300, 380, 400, 410] },
        { oldSong: "Cyber Heart (2021)", newDriver: "Cosmic Drift (2023)", lift: "+45%", dailyStreams: [500, 520, 530, 600, 700, 720, 750] },
    ];

    const [creatingPlaylist, setCreatingPlaylist] = useState(false);

    const handleCreatePlaylist = () => {
        setCreatingPlaylist(true);
        setTimeout(() => {
            setCreatingPlaylist(false);
            alert('Playlist "Complete Collection: Cosmic Drift" created on Spotify!');
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-ui-surface p-6 rounded-2xl border border-ui-border">
                    <h3 className="text-xl font-bold text-ui-text-heading mb-2">Catalogue Halo Effect</h3>
                    <p className="text-ui-text-body mb-6">See how your new releases are driving traffic to your back catalogue.</p>
                    
                    <div className="space-y-4">
                        {haloData.map((item, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-ui-bg/50 p-4 rounded-xl border border-ui-border gap-4">
                                <div className="flex-1">
                                    <p className="font-bold text-white text-lg">{item.oldSong}</p>
                                    <p className="text-xs text-ui-text-subtle flex items-center gap-1">
                                        <SparklesIcon className="w-3 h-3 text-quantum-flux" /> Driven by: {item.newDriver}
                                    </p>
                                </div>
                                <div className="w-full sm:w-32 h-10 flex items-end gap-1 opacity-70">
                                    {item.dailyStreams.map((val, idx) => (
                                        <div key={idx} className="flex-1 bg-green-400 rounded-t-sm" style={{ height: `${(val / 800) * 100}%` }}></div>
                                    ))}
                                </div>
                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold text-green-400 text-2xl">{item.lift}</p>
                                    <p className="text-[10px] text-ui-text-subtle uppercase">Stream Lift</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-1 flex flex-col gap-6">
                     <div className="bg-singularity-black/50 p-6 rounded-2xl border border-singularity-purple/30 text-center flex-1 flex flex-col justify-center">
                        <SparklesIcon className="w-16 h-16 text-singularity-teal mx-auto mb-4" />
                        <h4 className="font-bold text-white text-lg">AI Recommendation</h4>
                        <p className="text-ui-text-body mt-2 mb-6 text-sm">Create a "Complete Collection" playlist on Spotify featuring "Cosmic Drift" as the first track to maximize this effect.</p>
                        <button 
                            onClick={handleCreatePlaylist} 
                            disabled={creatingPlaylist}
                            className="btn-glow-primary px-6 py-3 rounded-full text-sm font-bold w-full disabled:opacity-50"
                        >
                            {creatingPlaylist ? 'Creating...' : 'Auto-Create Playlist'}
                        </button>
                    </div>
                     <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                        <h4 className="font-bold text-ui-text-heading mb-2">Total Back Catalog Uplift</h4>
                        <p className="text-4xl font-black text-white">+12.5%</p>
                        <p className="text-xs text-ui-text-subtle mt-1">Last 30 Days vs Previous Period</p>
                     </div>
                </div>
            </div>
        </div>
    );
};

const PromotionsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'audience' | 'smartlink' | 'creators' | 'halo'>('audience');
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
             <header>
                 <button onClick={() => navigate('/')} className="mb-4 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">Growth & Promotion</h1>
                <p className="text-lg text-ui-text-body mt-1">AI-powered tools to expand your fanbase and market your music.</p>
            </header>

            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <TabButton label="AI Audience" active={activeTab === 'audience'} onClick={() => setActiveTab('audience')} icon={TargetIcon} />
                <TabButton label="SmartLinks" active={activeTab === 'smartlink'} onClick={() => setActiveTab('smartlink')} icon={LinkIcon} />
                <TabButton label="Creator Network" active={activeTab === 'creators'} onClick={() => setActiveTab('creators')} icon={UserGroupIcon} />
                <TabButton label="Halo Effect" active={activeTab === 'halo'} onClick={() => setActiveTab('halo')} icon={RefreshIcon} />
            </div>

            {activeTab === 'audience' && <AiAudienceTab />}
            {activeTab === 'smartlink' && <SmartLinkTab />}
            {activeTab === 'creators' && <CreatorConnectTab />}
            {activeTab === 'halo' && <HaloEffectTab />}
        </div>
    );
};

export default PromotionsView;
