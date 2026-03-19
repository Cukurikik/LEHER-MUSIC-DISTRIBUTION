
import React, { useState, useEffect, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import DoughnutChart from '../components/charts/DoughnutChart';
import CashIcon from '../components/icons/CashIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import SparklesIcon from '../components/layout/SparklesIcon';

// --- Icons ---
const SplitIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);
const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void; icon: any }> = ({ label, active, onClick, icon: Icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap flex-shrink-0 ${
            active 
            ? 'bg-gradient-singularity text-white shadow-glow-secondary scale-105' 
            : 'bg-ui-surface border border-ui-border text-ui-text-body hover:bg-white/5'
        }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

// --- Initial Data for Resets ---
const INITIAL_SHARES = [
    { id: 1, name: 'Me (Owner)', email: 'andikaa@leher.com', percentage: 60, color: '#1331FF' },
    { id: 2, name: 'Producer A', email: 'prod@studio.com', percentage: 30, color: '#FE2D8B' },
    { id: 3, name: 'Songwriter B', email: 'writer@music.com', percentage: 10, color: '#18D59C' },
];

const SmartSplitsTab: React.FC<{ showToast: (msg: string, type: 'success'|'error') => void }> = ({ showToast }) => {
    const [shares, setShares] = useState(JSON.parse(JSON.stringify(INITIAL_SHARES)));
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            showToast("Splits saved successfully! Invites sent.", 'success');
        }, 1500);
    };

    const handleCancel = () => {
        if(window.confirm("Discard unsaved changes?")) {
             setShares(JSON.parse(JSON.stringify(INITIAL_SHARES)));
             showToast("Changes discarded.", 'error'); 
        }
    };

    const handleAddCollaborator = () => {
        setShares([...shares, { id: Date.now(), name: 'New Collaborator', email: '', percentage: 0, color: '#FECA0D' }]);
    };

    const handleRemove = (id: number) => {
        setShares(shares.filter((s: any) => s.id !== id));
    };

    const chartData = shares.map((s: any) => ({ label: s.name, value: s.percentage, color: s.color }));
    const totalPercentage = shares.reduce((acc: number, curr: any) => acc + curr.percentage, 0);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
            <div className="xl:col-span-2 bg-ui-surface p-6 rounded-3xl border border-ui-border shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-ui-text-heading">Smart Split Sheets</h3>
                        <p className="text-sm text-ui-text-body mt-1">Automated royalty distribution for your team.</p>
                    </div>
                    <button 
                        onClick={handleAddCollaborator}
                        className="flex items-center gap-2 px-4 py-2 bg-ui-bg border border-ui-border rounded-full text-xs font-bold hover:bg-white/10 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" /> Add Collaborator
                    </button>
                </div>
                
                <div className="space-y-4">
                    {shares.map((share: any, idx: number) => (
                        <div key={share.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-[#0A0A0A] p-4 rounded-2xl border border-white/5 relative group">
                            <div className="flex items-center gap-3 w-full md:w-auto md:flex-1">
                                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-black text-xs" style={{ backgroundColor: share.color }}>
                                    {share.percentage}%
                                </div>
                                <div className="min-w-0 flex-1">
                                    <input 
                                        type="text" 
                                        value={share.name} 
                                        onChange={(e) => {
                                            const newShares = [...shares];
                                            newShares[idx].name = e.target.value;
                                            setShares(newShares);
                                        }}
                                        className="font-bold text-white bg-transparent border-none p-0 w-full focus:ring-0 text-base placeholder-white/20"
                                        placeholder="Name"
                                    />
                                    <input 
                                        type="text" 
                                        value={share.email}
                                        placeholder="collaborator@email.com"
                                        onChange={(e) => {
                                            const newShares = [...shares];
                                            newShares[idx].email = e.target.value;
                                            setShares(newShares);
                                        }} 
                                        className="text-sm text-ui-text-subtle bg-transparent border-none p-0 w-full focus:ring-0 placeholder-ui-text-subtle/50"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <div className="flex items-center bg-ui-surface rounded-xl border border-ui-border px-3 py-2 w-24">
                                    <input 
                                        type="number" 
                                        value={share.percentage} 
                                        onChange={(e) => {
                                            const newShares = [...shares];
                                            newShares[idx].percentage = parseFloat(e.target.value) || 0;
                                            setShares(newShares);
                                        }}
                                        className="bg-transparent w-full text-right font-bold text-white focus:outline-none"
                                    />
                                    <span className="ml-1 text-ui-text-subtle">%</span>
                                </div>
                                <button onClick={() => handleRemove(share.id)} className="p-2 text-ui-text-subtle hover:text-red-500 transition-colors">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-ui-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className={`px-4 py-2 rounded-full border ${totalPercentage === 100 ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                        <span className="font-bold text-sm">Total Allocation: {totalPercentage}%</span>
                    </div>
                    
                    <div className="flex gap-3 w-full sm:w-auto">
                         <button 
                            onClick={handleCancel}
                            className="flex-1 sm:flex-none px-6 py-3 rounded-full font-bold text-sm text-ui-text-body hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-ui-border"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={saving || totalPercentage !== 100}
                            className="flex-1 sm:flex-none btn-glow-primary px-8 py-3 rounded-full font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-105 transition-transform"
                        >
                            {saving ? 'Processing...' : 'Save & Deploy'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="xl:col-span-1">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border h-full flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
                    <h4 className="font-bold text-ui-text-subtle mb-8 uppercase tracking-widest text-xs z-10">Equity Distribution</h4>
                    <div className="w-full max-w-[240px] mx-auto z-10 scale-110">
                         <DoughnutChart data={chartData} title="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdvancesTab: React.FC<{ showToast: (msg: string, type: 'success'|'error') => void }> = ({ showToast }) => {
    const [accepted, setAccepted] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleAccept = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setAccepted(true);
            showToast("Advance accepted! Funds are on the way.", 'success');
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-br from-[#1A103C] to-[#0D1F2D] p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 p-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow"></div>
                <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center">
                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
                            <SparklesIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Pre-Approved Offer</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">Instant Capital <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">For Creators</span></h2>
                        <p className="text-base text-ui-text-body mb-8 max-w-lg leading-relaxed">Unlock future royalties today. No credit checks, just data-driven funding based on your streaming history.</p>
                         
                         <div className="flex flex-wrap gap-4">
                             <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5">
                                 <p className="text-[10px] text-ui-text-subtle uppercase font-bold mb-1">Available Now</p>
                                 <p className="text-3xl font-black text-green-400">$5,200</p>
                             </div>
                              <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5">
                                 <p className="text-[10px] text-ui-text-subtle uppercase font-bold mb-1">Recoup Rate</p>
                                 <p className="text-3xl font-black text-white">100%</p>
                             </div>
                         </div>
                    </div>
                    
                    <div className="w-full lg:w-96 bg-ui-surface/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
                         {!accepted ? (
                             <div className="space-y-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-ui-text-subtle">Processing Fee</span>
                                    <span className="text-white font-bold">$150</span>
                                </div>
                                <div className="flex justify-between text-sm mb-4 pb-4 border-b border-white/10">
                                    <span className="text-ui-text-subtle">Est. Recoup Duration</span>
                                    <span className="text-white font-bold">8 Months</span>
                                </div>
                                <button 
                                    onClick={handleAccept}
                                    disabled={processing}
                                    className="w-full btn-glow-primary py-4 rounded-xl font-bold text-black text-lg transition-all hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 shadow-lg"
                                >
                                    {processing ? 'Transferring...' : 'Accept $5,200'}
                                </button>
                                <p className="text-[10px] text-center text-ui-text-subtle">Funds deposited to your wallet instantly.</p>
                             </div>
                         ) : (
                             <div className="text-center py-8">
                                 <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-success animate-bounce">
                                     <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                 </div>
                                 <p className="text-xl font-bold text-white mb-1">Funds Received!</p>
                                 <p className="text-sm text-ui-text-subtle">Transaction ID: #TX-99821</p>
                             </div>
                         )}
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                    <p className="text-[10px] uppercase text-ui-text-subtle font-bold">Credit Score</p>
                    <p className="text-2xl font-bold text-white mt-1">785</p>
                    <p className="text-[10px] text-green-400 font-bold">Excellent</p>
                </div>
                <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                    <p className="text-[10px] uppercase text-ui-text-subtle font-bold">Avg. Monthly</p>
                    <p className="text-2xl font-bold text-white mt-1">$650</p>
                    <p className="text-[10px] text-ui-text-subtle">Last 6 mo</p>
                </div>
                <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                    <p className="text-[10px] uppercase text-ui-text-subtle font-bold">Next Review</p>
                    <p className="text-2xl font-bold text-white mt-1">Nov 1</p>
                    <p className="text-[10px] text-ui-text-subtle">Offers update monthly</p>
                </div>
            </div>
        </div>
    );
};

// --- MOCK DATA GENERATORS FOR GLOBAL HITS ---
const genres = [
    "Pop", "Rock", "Hip-Hop", "R&B", "Country", "Jazz", "Electronic", "Latin", "Reggae", 
    "K-Pop", "J-Pop", "Metal", "Classical", "Folk", "Blues", "Soul", "Funk", "Disco", 
    "Techno", "House", "Indie", "Alternative", "Reggaeton", "Afrobeat", "Mandopop", 
    "Bollywood", "Sertanejo", "Dangdut", "C-Pop", "Thai Pop"
];

const globalArtists = [
    // Western
    "Taylor Swift", "The Weeknd", "Drake", "Ed Sheeran", "Ariana Grande", "Justin Bieber", "Billie Eilish", "Dua Lipa", "Coldplay", "Imagine Dragons", "Maroon 5", "Bruno Mars", "Adele", "Rihanna", "Beyoncé", "Eminem", "Post Malone", "Harry Styles", "Katy Perry", "Lady Gaga",
    // Latin
    "Bad Bunny", "Karol G", "J Balvin", "Shakira", "Daddy Yankee", "Maluma", "Ozuna", "Anitta", "Rauw Alejandro", "Rosalía", "Luis Fonsi", "Enrique Iglesias",
    // K-Pop
    "BTS", "BLACKPINK", "Twice", "EXO", "Seventeen", "NewJeans", "IVE", "Le Sserafim", "Stray Kids", "NCT", "Aespa", "Red Velvet", "ITZY", "TXT", "Enhypen", "Jungkook", "Lisa",
    // J-Pop
    "YOASOBI", "Kenshi Yonezu", "Official Hige Dandism", "Ado", "King Gnu", "LiSA", "Hikaru Utada", "Gen Hoshino", "Fujii Kaze", "Vaundy",
    // Bollywood/Indian
    "Arijit Singh", "Neha Kakkar", "Shreya Ghoshal", "A.R. Rahman", "Badshah", "Diljit Dosanjh", "Sonu Nigam", "Atif Aslam", "Guru Randhawa",
    // Afrobeat
    "Burna Boy", "Wizkid", "Davido", "Rema", "Tems", "Ckay", "Fireboy DML", "Asake",
    // C-Pop/Mandopop
    "Jay Chou", "G.E.M.", "Eason Chan", "JJ Lin", "Eric Chou", "Jolin Tsai", "Mayday"
];

const songWords = [
    // English
    "Love", "Heart", "Night", "Day", "Dream", "Life", "World", "Time", "Way", "Light", "Dark", "Good", "Bad", "Happy", "Sad", "Beautiful", "Crazy", "Wild", "Free", "Young", "Old", "New", "Big", "Small", "High", "Low", "Hot", "Cold", "Sweet", "Sour", "Hard", "Soft", "Fast", "Slow", "Loud", "Quiet", "Bright", "Dim", "Clear", "Blurry", "Real", "Fake", "True", "False", "Right", "Wrong", "Up", "Down", "In", "Out", "On", "Off", "Over", "Under", "Through", "Around", "Between", "Among", "Beyond", "Within", "Without", "Forever", "Together", "Always", "Never", "Maybe", "Perhaps", "Sometimes", "Often", "Rarely", "Seldom", "Usually", "Normally", "Generally", "Typically", "Regularly", "Frequently", "Occasionally", "Sky", "Ocean", "River", "Mountain", "Fire", "Rain", "Wind", "Storm", "Snow", "Ice", "Sun", "Moon", "Star",
    // Spanish
    "Amor", "Corazón", "Vida", "Noche", "Día", "Sol", "Luna", "Estrella", "Cielo", "Mar", "Fuego", "Alma", "Beso", "Baile", "Fiesta", "Loco", "Feliz", "Triste", "Bello", "Grande", "Pequeño",
    // Korean (Romanized)
    "Sarang", "Maum", "Bam", "Nat", "Kkum", "Insaeng", "Sesang", "Sigan", "Gil", "Bit", "Eodum", "Joheun", "Nappeun", "Haengbok", "Seulpeun", "Areumdaun", "Michin", "Yasaeng", "Jayu",
    // Japanese (Romanized)
    "Ai", "Kokoro", "Yoru", "Hi", "Yume", "Inochi", "Sekai", "Jikan", "Michi", "Hikari", "Yami", "Ii", "Warui", "Shiawase", "Kanashii", "Utsukushii", "Kureijī", "Wairudo", "Jiyū",
    // Hindi (Romanized)
    "Pyar", "Dil", "Raat", "Din", "Sapna", "Zindagi", "Duniya", "Waqt", "Raasta", "Roshni", "Andhera", "Accha", "Bura", "Khush", "Udaas", "Sundar", "Pagal", "Junglee", "Azaad"
];

const generateGlobalHits = (searchTerm: string): any[] => {
    const hits = [];
    const count = 8; // Return 8 results
    const searchLower = searchTerm.toLowerCase();
    
    for (let i = 0; i < count; i++) {
        let title = "";
        let artist = "";
        let genre = "";

        // If no search term, generate random hits
        if (!searchTerm) {
            const word1 = songWords[Math.floor(Math.random() * songWords.length)];
            const word2 = songWords[Math.floor(Math.random() * songWords.length)];
            title = `${word1} ${word2}`;
            artist = globalArtists[Math.floor(Math.random() * globalArtists.length)];
            genre = genres[Math.floor(Math.random() * genres.length)];
        } else {
            // Generate results that feel related to the search term
            // Check if search term matches a known artist
            const matchedArtist = globalArtists.find(a => a.toLowerCase().includes(searchLower));
            
            if (matchedArtist) {
                artist = matchedArtist;
                // Generate a title that sounds plausible for this artist
                const word1 = songWords[Math.floor(Math.random() * songWords.length)];
                const word2 = songWords[Math.floor(Math.random() * songWords.length)];
                title = `${word1} ${word2}`;
                // Try to pick a genre that fits (simplified logic)
                if (["BTS", "BLACKPINK", "NewJeans"].includes(artist)) genre = "K-Pop";
                else if (["Bad Bunny", "Karol G"].includes(artist)) genre = "Reggaeton";
                else genre = genres[Math.floor(Math.random() * genres.length)];
            } else {
                // Search term is part of title
                const randomWord = songWords[Math.floor(Math.random() * songWords.length)];
                title = Math.random() > 0.5 ? `${searchTerm} ${randomWord}` : `${randomWord} ${searchTerm}`;
                // Capitalize title
                title = title.replace(/\b\w/g, l => l.toUpperCase());
                artist = globalArtists[Math.floor(Math.random() * globalArtists.length)];
                genre = genres[Math.floor(Math.random() * genres.length)];
            }
        }

        hits.push({
            id: `hit-${Date.now()}-${i}`,
            title: title,
            artist: artist,
            genre: genre,
            fee: `$${(20 + Math.random() * 80).toFixed(2)}`,
            status: 'Available'
        });
    }
    
    return hits;
};

const LicensingTab: React.FC<{ showToast: (msg: string, type: 'success'|'error') => void }> = ({ showToast }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [purchasingId, setPurchasingId] = useState<number | null>(null);

    // Initial Top Hits
    useEffect(() => {
        setResults(generateGlobalHits(''));
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search works even if empty to refresh random hits
        setIsSearching(true);
        setTimeout(() => {
            setResults(generateGlobalHits(searchTerm));
            setIsSearching(false);
        }, 800);
    };
    
    const handleBuy = (id: number, title: string) => {
        setPurchasingId(id);
        setTimeout(() => {
            setPurchasingId(null);
            showToast(`Mechanical license for "${title}" acquired successfully.`, 'success');
        }, 1500);
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-3 font-oxanium">Global Cover Licensing Database</h3>
                    <p className="text-base text-ui-text-body mb-8 max-w-xl mx-auto">
                        Search over <strong>100 Million</strong> songs. We handle the mechanical licenses, royalty payments, and paperwork so you can release cover songs legally on all major platforms.
                    </p>
                    
                    <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group z-20">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30 group-hover:opacity-70 transition duration-500 blur"></div>
                        <div className="relative flex items-center bg-[#0A0A0A] rounded-full p-1">
                            <div className="pl-4 pr-2 text-ui-text-subtle">
                                <SearchIcon className="w-5 h-5" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by Song Title, Artist, or ISRC..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent border-none py-3 text-white placeholder-ui-text-subtle focus:ring-0 focus:outline-none text-sm font-medium"
                            />
                            <button type="submit" className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="flex flex-wrap justify-center gap-2 mt-4 text-[10px] text-ui-text-subtle uppercase tracking-wider font-bold">
                        <span>Trending:</span>
                        <span className="text-primary cursor-pointer hover:underline" onClick={() => {setSearchTerm('Taylor Swift');}}>Taylor Swift</span>
                        <span>•</span>
                        <span className="text-primary cursor-pointer hover:underline" onClick={() => {setSearchTerm('K-Pop');}}>K-Pop</span>
                         <span>•</span>
                        <span className="text-primary cursor-pointer hover:underline" onClick={() => {setSearchTerm('Bad Bunny');}}>Bad Bunny</span>
                         <span>•</span>
                        <span className="text-primary cursor-pointer hover:underline" onClick={() => {setSearchTerm('Bollywood');}}>Bollywood</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 min-h-[300px]">
                {results.map((res) => (
                    <div key={res.id} className="bg-ui-surface p-5 rounded-2xl border border-ui-border flex flex-col sm:flex-row justify-between items-center gap-4 hover:border-primary/50 transition-all group animate-fade-in-up">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-12 h-12 bg-gradient-to-br from-ui-bg to-black rounded-lg flex items-center justify-center border border-white/5 text-xl font-bold text-ui-text-subtle shadow-inner">
                                ♫
                            </div>
                            <div className="min-w-0 text-left">
                                <p className="font-bold text-white text-lg truncate">{res.title}</p>
                                <p className="text-sm text-ui-text-body truncate flex items-center gap-2">
                                    {res.artist} 
                                    <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-ui-text-subtle">{res.genre}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-ui-text-subtle uppercase tracking-wider font-bold">License Fee</p>
                                <p className="text-xl font-mono font-bold text-white">{res.fee}</p>
                            </div>
                             <div className="flex items-center gap-4 sm:hidden w-full justify-between border-t border-white/5 pt-3 mt-1">
                                <div>
                                     <p className="text-xs text-ui-text-subtle uppercase tracking-wider font-bold">License Fee</p>
                                    <p className="text-xl font-mono font-bold text-white">{res.fee}</p>
                                </div>
                                <button 
                                    onClick={() => handleBuy(res.id, res.title)}
                                    disabled={purchasingId === res.id}
                                    className="px-6 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/50 font-bold text-sm hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {purchasingId === res.id ? 'Processing...' : 'Purchase'}
                                </button>
                            </div>
                            <button 
                                onClick={() => handleBuy(res.id, res.title)}
                                disabled={purchasingId === res.id}
                                className="hidden sm:block px-6 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/50 font-bold text-sm hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {purchasingId === res.id ? 'Processing...' : 'Purchase'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MonetizationView: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'splits' | 'advances' | 'licensing'>('splits');
    const { t } = useTranslation();
    const [toast, setToast] = useState<{msg: string, type: 'success'|'error'} | null>(null);

    const showToast = (msg: string, type: 'success'|'error') => {
        setToast({msg, type});
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="min-h-screen bg-[#050505] pb-32 pt-6 px-4 md:px-8 animate-fade-in">
             {toast && (
                <div className={`fixed top-24 right-8 z-50 px-6 py-3 rounded-xl shadow-2xl text-white font-bold animate-bounce-in border ${toast.type === 'success' ? 'bg-green-900/80 border-green-500' : 'bg-red-900/80 border-red-500'} backdrop-blur-md`}>
                    {toast.msg}
                </div>
            )}
            
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <button onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 text-ui-text-subtle hover:text-white transition-colors font-bold group text-sm">
                            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-6xl font-black text-white font-oxanium tracking-tighter">
                            ADVANCED <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">MONETIZATION</span>
                        </h1>
                        <p className="text-lg text-ui-text-body mt-2 max-w-2xl">
                            Next-gen financial tools to maximize your revenue streams.
                        </p>
                    </div>
                    
                    {/* SCROLLABLE TAB CONTAINER FIXED */}
                    <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <div className="flex gap-2 bg-ui-surface p-1.5 rounded-full border border-ui-border min-h-[56px] min-w-max items-center">
                            <TabButton label="Smart Splits" active={activeTab === 'splits'} onClick={() => setActiveTab('splits')} icon={SplitIcon} />
                            <TabButton label="Cash Advances" active={activeTab === 'advances'} onClick={() => setActiveTab('advances')} icon={CashIcon} />
                            <TabButton label="Licensing" active={activeTab === 'licensing'} onClick={() => setActiveTab('licensing')} icon={DocumentTextIcon} />
                        </div>
                    </div>
                </header>

                <main className="relative">
                    {activeTab === 'splits' && <SmartSplitsTab showToast={showToast} />}
                    {activeTab === 'advances' && <AdvancesTab showToast={showToast} />}
                    {activeTab === 'licensing' && <LicensingTab showToast={showToast} />}
                </main>
            </div>
        </div>
    );
};

export default MonetizationView;
