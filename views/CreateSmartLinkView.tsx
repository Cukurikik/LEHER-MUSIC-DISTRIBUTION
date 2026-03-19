
import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song } from '../types';
import { initialSongs } from '../data/releases'; // Data sumber

// --- ICONS ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const CheckCircleIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const SearchIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const MusicNoteIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>);
const XIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

// --- THEMES CONFIG ---
const THEMES = [
    { id: 'quantum', name: 'Quantum Dark', bg: 'bg-[#0A0A1A]', text: 'text-white', btn: 'bg-primary text-white', btnBorder: 'border-primary' },
    { id: 'midnight', name: 'Midnight Blue', bg: 'bg-gradient-to-b from-[#0f172a] to-[#1e293b]', text: 'text-blue-50', btn: 'bg-white text-slate-900', btnBorder: 'border-white' },
    { id: 'sunset', name: 'Sunset Vibe', bg: 'bg-gradient-to-br from-orange-500 to-pink-600', text: 'text-white', btn: 'bg-black/20 backdrop-blur-md text-white', btnBorder: 'border-white/30' },
    { id: 'forest', name: 'Deep Forest', bg: 'bg-[#064e3b]', text: 'text-emerald-50', btn: 'bg-[#10b981] text-white', btnBorder: 'border-[#10b981]' },
    { id: 'cotton', name: 'Cotton Candy', bg: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400', text: 'text-slate-800', btn: 'bg-white text-slate-800', btnBorder: 'border-white' },
];

// --- MOCK STORE LINKS ---
const DEFAULT_LINKS = [
    { id: 'spotify', name: 'Spotify', active: true, url: '', label: 'Listen' },
    { id: 'apple', name: 'Apple Music', active: true, url: '', label: 'Play' },
    { id: 'youtube', name: 'YouTube Music', active: true, url: '', label: 'Stream' },
    { id: 'tiktok', name: 'TikTok', active: false, url: '', label: 'Use Sound' },
];

const CreateSmartLinkView: React.FC<{ songs: Song[]; addCampaign: (c: any) => void }> = ({ songs, addCampaign }) => {
    const navigate = useNavigate();
    
    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [selectedRelease, setSelectedRelease] = useState<Song | null>(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    
    const [campaignTitle, setCampaignTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [activeTheme, setActiveTheme] = useState(THEMES[0]);
    const [storeLinks, setStoreLinks] = useState(DEFAULT_LINKS);
    const [error, setError] = useState('');

    // --- HANDLERS ---

    // Smart Search (Anti-Lag for large catalogs)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length > 1) {
                // Filter locally from props (simulating DB search)
                const results = songs.filter(s => 
                    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    s.artistName.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5); // Limit results
                setSearchResults(results);
                setShowSearchResults(true);
            } else {
                setSearchResults([]);
                setShowSearchResults(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, songs]);

    const handleSelectRelease = (song: Song) => {
        setSelectedRelease(song);
        setCampaignTitle(song.title);
        setSlug(song.title.toLowerCase().replace(/[^a-z0-9]/g, '-'));
        setSearchQuery(song.title);
        setShowSearchResults(false);
        setError('');
    };

    const toggleStore = (id: string) => {
        setStoreLinks(prev => prev.map(link => link.id === id ? { ...link, active: !link.active } : link));
    };

    const handlePublish = () => {
        if (!selectedRelease) {
            setError('Wajib memilih rilis lagu terlebih dahulu.');
            window.scrollTo(0,0);
            return;
        }
        if (!campaignTitle.trim()) {
            setError('Judul kampanye wajib diisi.');
            return;
        }
        if (!slug.trim()) {
            setError('URL Slug wajib diisi.');
            return;
        }

        // Success Logic
        // addCampaign(...) 
        navigate('/distribution-tools/smart-links');
    };

    // --- COMPONENTS ---

    const PhonePreview = () => (
        <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden mx-auto select-none ring-1 ring-white/10">
            <div className={`w-full h-full ${activeTheme.bg} flex flex-col items-center pt-12 px-6 pb-6 overflow-y-auto relative transition-colors duration-500`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-black rounded-b-xl z-20"></div>
                
                {/* Album Art */}
                <div className="w-36 h-36 rounded-lg shadow-2xl mb-6 relative overflow-hidden group mt-4 bg-white/5 flex items-center justify-center">
                    {selectedRelease ? (
                        <img src={selectedRelease.coverArtUrl} alt="Art" className="w-full h-full object-cover" />
                    ) : (
                        <MusicNoteIcon className="w-12 h-12 text-white/20" />
                    )}
                </div>

                {/* Metadata */}
                <div className={`text-center mb-8 ${activeTheme.text}`}>
                    <h2 className="text-xl font-bold leading-tight mb-1 line-clamp-2">
                        {selectedRelease?.title || 'Judul Lagu'}
                    </h2>
                    <p className="text-sm opacity-80">
                        {selectedRelease?.artistName || 'Nama Artis'}
                    </p>
                </div>

                {/* Store Links */}
                <div className="w-full space-y-3 mb-auto">
                    {storeLinks.filter(l => l.active).map(link => (
                        <div 
                            key={link.id} 
                            className={`w-full py-3 px-4 rounded-lg flex items-center justify-between transition-transform active:scale-95 cursor-pointer ${activeTheme.btn} border ${activeTheme.btnBorder || 'border-transparent'}`}
                        >
                            <span className="text-sm font-bold">{link.name}</span>
                            <span className="text-[10px] opacity-70 uppercase tracking-wide">{link.label}</span>
                        </div>
                    ))}
                    {storeLinks.filter(l => l.active).length === 0 && (
                        <p className={`text-xs text-center opacity-50 italic ${activeTheme.text}`}>Pilih store di atas</p>
                    )}
                </div>

                <div className="mt-8 pt-4 opacity-40">
                    <p className={`text-[10px] font-bold ${activeTheme.text}`}>Powered by Leher</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0A0A1A] font-inter text-white flex flex-col animate-fade-in">
            
            {/* 1. HEADER (Static / Non-Sticky) - Ensures no overlapping */}
            <header className="relative z-10 bg-[#0A0A1A] border-b border-white/10 w-full">
                <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/distribution-tools/smart-links')} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">SmartLink Builder</h1>
                            <p className="text-xs text-gray-400">Buat halaman promosi musik Anda</p>
                        </div>
                    </div>
                    <button 
                        onClick={handlePublish}
                        className="hidden md:flex px-6 py-2.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-full text-sm shadow-[0_0_15px_rgba(19,49,255,0.4)] transition-all hover:scale-105 items-center gap-2"
                    >
                        <span>Publish</span>
                        <CheckCircleIcon className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {/* 2. MAIN CONTENT (Natural Scroll) */}
            <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 space-y-10 pb-32 relative z-0">
                
                {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm font-bold text-center animate-bounce">
                        {error}
                    </div>
                )}

                {/* SECTION 1: RELEASE SELECTION */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary text-primary text-sm flex items-center justify-center font-bold">1</span>
                        Pilih Rilis
                    </h2>
                    
                    {/* Search Input (Type-Ahead) */}
                    <div className="relative z-30">
                        <div className="relative group">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ketik judul lagu untuk mencari..." 
                                className="w-full bg-[#151725] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner"
                            />
                        </div>
                        
                        {showSearchResults && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1C2A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up z-40">
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map(song => (
                                            <li 
                                                key={song.id} 
                                                onClick={() => handleSelectRelease(song)}
                                                className="flex items-center gap-3 p-3 hover:bg-primary/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <img src={song.coverArtUrl} alt={song.title} className="w-10 h-10 rounded-md object-cover" />
                                                <div>
                                                    <p className="font-bold text-sm text-white">{song.title}</p>
                                                    <p className="text-xs text-gray-400">{song.artistName}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-sm text-gray-500">Tidak ada rilis ditemukan dengan nama tersebut.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Selected State */}
                    {selectedRelease && (
                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl flex items-center gap-4 animate-fade-in">
                            <img src={selectedRelease.coverArtUrl} className="w-16 h-16 rounded-lg shadow-md" alt="Selected" />
                            <div>
                                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Rilis Terpilih</p>
                                <h3 className="font-bold text-lg">{selectedRelease.title}</h3>
                                <p className="text-sm text-gray-400">{selectedRelease.artistName}</p>
                            </div>
                            <button onClick={() => {setSelectedRelease(null); setSearchQuery('');}} className="ml-auto p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </section>

                <hr className="border-white/5" />

                {/* SECTION 2: DETAILS */}
                <section className={`space-y-4 transition-opacity duration-300 ${!selectedRelease ? 'opacity-50 pointer-events-none' : ''}`}>
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-8 h-8 rounded-full bg-gray-700 text-white text-sm flex items-center justify-center font-bold">2</span>
                        Detail Halaman
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Judul Kampanye *</label>
                            <input 
                                type="text" 
                                value={campaignTitle}
                                onChange={e => setCampaignTitle(e.target.value)}
                                className="w-full bg-[#151725] border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Contoh: Pre-Save Album Baru"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">URL Slug *</label>
                            <div className="flex">
                                <span className="bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-3 py-3 text-gray-500 text-sm select-none">leher.link/</span>
                                <input 
                                    type="text" 
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                    className="flex-1 bg-[#151725] border border-white/10 rounded-r-lg p-3 text-white focus:border-primary outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-white/5" />

                {/* SECTION 3: THEME */}
                <section className={`space-y-4 transition-opacity duration-300 ${!selectedRelease ? 'opacity-50 pointer-events-none' : ''}`}>
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-8 h-8 rounded-full bg-gray-700 text-white text-sm flex items-center justify-center font-bold">3</span>
                        Pilih Tema
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {THEMES.map(theme => (
                            <button 
                                key={theme.id}
                                onClick={() => setActiveTheme(theme)}
                                className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-200 group ${activeTheme.id === theme.id ? 'border-primary ring-2 ring-primary/50 scale-105 z-10' : 'border-transparent hover:border-white/30'}`}
                            >
                                <div className={`absolute inset-0 ${theme.bg}`}></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                                    <div className="w-8 h-8 bg-white/20 rounded-md mb-2"></div>
                                    <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/60 text-[10px] font-bold text-center truncate">
                                    {theme.name}
                                </div>
                                {activeTheme.id === theme.id && (
                                    <div className="absolute top-2 right-2 bg-primary text-black rounded-full p-0.5 shadow-lg">
                                        <CheckCircleIcon className="w-3 h-3" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                <hr className="border-white/5" />

                {/* SECTION 4: LINKS */}
                <section className={`space-y-4 transition-opacity duration-300 ${!selectedRelease ? 'opacity-50 pointer-events-none' : ''}`}>
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-8 h-8 rounded-full bg-gray-700 text-white text-sm flex items-center justify-center font-bold">4</span>
                        Konfigurasi Link
                    </h2>
                    <div className="space-y-3">
                        {storeLinks.map(link => (
                            <div key={link.id} className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${link.active ? 'bg-[#151725] border-white/10' : 'bg-black/20 border-transparent opacity-60'}`}>
                                <input 
                                    type="checkbox" 
                                    checked={link.active} 
                                    onChange={() => toggleStore(link.id)}
                                    className="w-5 h-5 rounded bg-black border-white/20 text-primary focus:ring-primary" 
                                />
                                <span className="font-bold text-sm w-28">{link.name}</span>
                                <input 
                                    type="text" 
                                    placeholder={link.active ? "Otomatis terisi oleh sistem..." : "Tidak aktif"} 
                                    className="flex-1 bg-black/30 border-none rounded-lg py-2 px-3 text-sm text-gray-300 focus:ring-1 focus:ring-white/30 disabled:cursor-not-allowed"
                                    disabled={!link.active}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* PREVIEW SECTION (INLINE AT BOTTOM) */}
                <section className="pt-10">
                     <h2 className="text-xl font-bold text-center mb-6 text-gray-400 uppercase tracking-widest text-xs">Live Mobile Preview</h2>
                     <PhonePreview />
                </section>

                {/* BOTTOM PUBLISH BUTTON (For convenience) */}
                <div className="pt-8 pb-4">
                    <button 
                        onClick={handlePublish}
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(19,49,255,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <span>Publish Campaign</span>
                        <CheckCircleIcon className="w-6 h-6" />
                    </button>
                </div>

            </main>
        </div>
    );
};

export default CreateSmartLinkView;
