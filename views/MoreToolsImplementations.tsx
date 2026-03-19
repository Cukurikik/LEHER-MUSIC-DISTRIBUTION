
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import SparklesIcon from '../components/layout/SparklesIcon';
import { GavelIcon, ShieldVortexIcon, RocketIcon } from '../components/icons/AdminIcons';
import UploadIcon from '../components/icons/UploadIcon';
import UserGroupIcon from '../components/icons/UserGroupIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import SearchIcon from '../components/icons/SearchIcon';
import LockClosedIcon from '../components/icons/LockClosedIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import FilmIcon from '../components/icons/FilmIcon';
import GlobeIcon from '../components/icons/GlobeIcon';
import LocationMarkerIcon from '../components/icons/LocationMarkerIcon';
import ChipIcon from '../components/icons/ChipIcon';
import TagIcon from '../components/icons/TagIcon';
import Toast from '../components/ui/Toast';

// --- Shared Layout ---
const ToolLayout: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, icon, children }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="max-w-7xl mx-auto px-4 pb-20 pt-6 animate-fade-in">
             <div className="mb-8 border-b border-white/10 pb-6">
                <button onClick={() => navigate('/distribution-tools')} className="mb-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold group text-sm uppercase tracking-wider">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)] shrink-0 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors"></div>
                        <div className="relative z-10">{icon}</div>
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white font-oxanium tracking-tight drop-shadow-lg uppercase">
                            {title}
                        </h1>
                        <p className="text-cyan-200/70 mt-2 text-lg max-w-2xl font-light">{subtitle}</p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

const CyberButton: React.FC<{ onClick: () => void; loading?: boolean; label: string; variant?: 'primary' | 'danger' | 'success' }> = ({ onClick, loading, label, variant = 'primary' }) => {
    const colors = {
        primary: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]',
        danger: 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]',
        success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
    };
    
    return (
        <button 
            onClick={onClick} 
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 uppercase tracking-wider text-sm font-mono ${colors[variant]}`}
        >
            {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> PROCESSING</>
            ) : (
                <><SparklesIcon className="w-4 h-4"/> {label}</>
            )}
        </button>
    );
};

// --- 1. Smart Legal Dispute Resolver ---
export const SmartLegalDisputeResolverView: React.FC = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<'clean' | 'issue' | null>(null);

    const handleScan = () => {
        setAnalyzing(true);
        setResult(null);
        setTimeout(() => {
            setAnalyzing(false);
            setResult('clean');
        }, 2000);
    };

    return (
        <ToolLayout title="Smart Legal Dispute Resolver" subtitle="AI-powered copyright conflict resolution." icon={<GavelIcon className="w-8 h-8 text-indigo-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Case File Analysis</h3>
                    <p className="text-gray-400 mb-6">Upload legal notices or claim IDs to auto-generate counter-notifications based on fair use precedents.</p>
                    
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer bg-black/20">
                        <UploadIcon className="w-12 h-12 text-gray-500 mx-auto mb-4"/>
                        <p className="text-sm text-gray-300 font-bold">Drop PDF or Text Files Here</p>
                        <p className="text-xs text-gray-600 mt-2">Supports .pdf, .txt, .docx</p>
                    </div>

                    <div className="mt-6">
                        <CyberButton label="Analyze Claims" onClick={handleScan} loading={analyzing} />
                    </div>
                </div>

                <div className="bg-black/40 p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
                    {!result && !analyzing && (
                        <div className="opacity-50">
                            <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4"/>
                            <p className="text-gray-500">Waiting for input...</p>
                        </div>
                    )}
                    
                    {analyzing && (
                        <div className="animate-pulse">
                            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-indigo-400 font-mono">Scanning Legal Precedents...</p>
                        </div>
                    )}

                    {result === 'clean' && (
                        <div className="animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircleIcon className="w-10 h-10 text-green-400"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Actionable Claims Found</h3>
                            <p className="text-gray-400 max-w-xs mx-auto">The analyzed documents do not contain valid DMCA takedown requests requiring automated response.</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 2. Batch Uploader ---
export const BatchUploaderView: React.FC = () => {
    const [files, setFiles] = useState<number>(0);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    const handleUpload = () => {
        if (files === 0) return;
        setUploading(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    setToast({ message: 'Batch processing complete! Metadata extracted.', type: 'success' });
                    return 100;
                }
                return p + 5;
            });
        }, 100);
    };

    return (
        <ToolLayout title="Batch Uploader" subtitle="Bulk ingestion with AI metadata extraction." icon={<UploadIcon className="w-8 h-8 text-blue-400"/>}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div 
                            className="h-64 border-2 border-dashed border-blue-500/30 rounded-2xl bg-blue-900/5 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-900/10 transition-colors"
                            onClick={() => setFiles(prev => prev + 5)}
                        >
                            <UploadIcon className="w-16 h-16 text-blue-400 mb-4"/>
                            <h3 className="text-xl font-bold text-white">Drag & Drop Folders</h3>
                            <p className="text-blue-300/70 mt-2">or click to browse (WAV, FLAC, MP3)</p>
                            {files > 0 && (
                                <div className="mt-4 px-4 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                                    {files} Files Selected
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                            <h4 className="font-bold text-white mb-4">Processing Queue</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Metadata Extraction</span>
                                    <span className="text-green-400">Auto-Enabled</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Audio Fingerprinting</span>
                                    <span className="text-green-400">Auto-Enabled</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Artwork Matching</span>
                                    <span className="text-green-400">Auto-Enabled</span>
                                </div>
                            </div>
                        </div>

                        {uploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-blue-400 uppercase">
                                    <span>Uploading...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        )}

                        <CyberButton label="Start Batch Ingestion" onClick={handleUpload} loading={uploading} variant="primary" />
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 3. Brand Matchmaking ---
export const BrandMatchmakingView: React.FC = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);

    const findMatches = () => {
        setSearching(true);
        setTimeout(() => {
            setMatches([
                { brand: 'Nike', score: 98, budget: '$50k - $150k', type: 'Sync & Sponsorship' },
                { brand: 'Red Bull', score: 94, budget: '$20k - $80k', type: 'Event Activation' },
                { brand: 'Apple', score: 89, budget: '$100k+', type: 'Commercial Sync' },
            ]);
            setSearching(false);
        }, 1500);
    };

    return (
        <ToolLayout title="Brand Matchmaking" subtitle="AI-driven sponsorship alignment." icon={<UserGroupIcon className="w-8 h-8 text-pink-400"/>}>
            <div className="space-y-8">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Find Your Perfect Brand Partner</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">Our AI analyzes your audience demographics, lyrical themes, and visual aesthetic to match you with brands looking for authentic creators.</p>
                    
                    <div className="max-w-md mx-auto">
                        <CyberButton label="Scan for Brand Matches" onClick={findMatches} loading={searching} variant="success" />
                    </div>
                </div>

                {matches.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                        {matches.map((m, i) => (
                            <div key={i} className="bg-black/60 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xl font-black text-white">{m.brand}</h4>
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">{m.score}% Match</span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-400 mb-6">
                                    <p>Budget: <span className="text-white font-mono">{m.budget}</span></p>
                                    <p>Type: <span className="text-white">{m.type}</span></p>
                                </div>
                                <button className="w-full py-2 rounded-lg bg-pink-600/20 text-pink-400 font-bold text-sm border border-pink-600/50 hover:bg-pink-600 hover:text-white transition-colors">
                                    View Opportunity
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

// --- 4. Lyric Translation ---
export const LyricTranslationView: React.FC = () => {
    const [translating, setTranslating] = useState(false);
    const [lyrics, setLyrics] = useState("Original lyrics will appear here...");
    const [translated, setTranslated] = useState("");

    const handleTranslate = () => {
        setTranslating(true);
        setTimeout(() => {
            setTranslating(false);
            setTranslated("Translated lyrics will appear here...\n(AI translation complete)");
        }, 2000);
    };

    return (
        <ToolLayout title="Lyric Translation" subtitle="Reach global audiences with AI localization." icon={<SparklesIcon className="w-8 h-8 text-purple-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-6 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Source Text</h3>
                    <textarea 
                        className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                        placeholder="Paste your lyrics here..."
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                    />
                </div>
                <div className="bg-ui-surface p-6 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Translation</h3>
                    <div className="relative h-64 bg-black/40 border border-white/10 rounded-xl p-4">
                        {translating ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <p className="text-gray-300 whitespace-pre-wrap">{translated || "Select a language and click translate."}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <div className="w-full max-w-md">
                    <CyberButton label="Translate to Spanish" onClick={handleTranslate} loading={translating} />
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 5. Masterclass Portal ---
export const MasterclassPortalView: React.FC = () => {
    const courses = [
        { title: "Music Marketing 101", instructor: "Sarah Jenkins", duration: "2h 15m", progress: 0 },
        { title: "Advanced Mixing", instructor: "Mike Dean", duration: "4h 30m", progress: 35 },
        { title: "Copyright Law", instructor: "Legal Eagle", duration: "1h 45m", progress: 100 },
    ];

    return (
        <ToolLayout title="Masterclass Portal" subtitle="Learn from the best in the industry." icon={<UserGroupIcon className="w-8 h-8 text-yellow-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((c, i) => (
                    <div key={i} className="bg-ui-surface p-6 rounded-2xl border border-ui-border hover:border-yellow-500/50 transition-all group cursor-pointer">
                        <div className="h-32 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 flex items-center justify-center">
                            <SparklesIcon className="w-10 h-10 text-white/20 group-hover:text-yellow-400 transition-colors" />
                        </div>
                        <h4 className="font-bold text-white text-lg mb-1">{c.title}</h4>
                        <p className="text-sm text-gray-400 mb-4">{c.instructor} • {c.duration}</p>
                        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-yellow-500 h-full" style={{ width: `${c.progress}%` }}></div>
                        </div>
                        <p className="text-xs text-right text-gray-500 mt-2">{c.progress}% Complete</p>
                    </div>
                ))}
            </div>
        </ToolLayout>
    );
};

// --- 6. Social Licensing ---
export const SocialLicensingView: React.FC = () => {
    const [whitelisted, setWhitelisted] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input) {
            setWhitelisted([...whitelisted, input]);
            setInput("");
        }
    };

    return (
        <ToolLayout title="Social Licensing" subtitle="Manage UGC and creator whitelists." icon={<CheckCircleIcon className="w-8 h-8 text-green-400"/>}>
            <div className="max-w-2xl mx-auto bg-ui-surface p-8 rounded-3xl border border-ui-border">
                <h3 className="text-xl font-bold text-white mb-4">Whitelist Creator Channels</h3>
                <p className="text-gray-400 mb-6">Prevent copyright claims on authorized content creators.</p>
                
                <div className="flex gap-4 mb-8">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter Channel URL or ID"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 text-white focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <button onClick={handleAdd} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                        Add
                    </button>
                </div>

                <div className="space-y-3">
                    {whitelisted.length === 0 && <p className="text-center text-gray-500 italic">No channels whitelisted yet.</p>}
                    {whitelisted.map((url, i) => (
                        <div key={i} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                            <span className="text-white font-mono text-sm truncate">{url}</span>
                            <span className="text-green-400 text-xs font-bold uppercase border border-green-500/30 px-2 py-1 rounded">Active</span>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 7. Proof of Ownership (Blockchain Timestamp) ---
export const ProofOfOwnershipBlockchainTimestampView: React.FC = () => {
    const [hashing, setHashing] = useState(false);
    const [hash, setHash] = useState<string | null>(null);

    const handleTimestamp = () => {
        setHashing(true);
        setTimeout(() => {
            setHashing(false);
            setHash("0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
        }, 2500);
    };

    return (
        <ToolLayout title="Proof of Ownership" subtitle="Immutable blockchain timestamping for your creative works." icon={<LockClosedIcon className="w-8 h-8 text-blue-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Secure Your IP</h3>
                    <p className="text-gray-400 mb-6">Upload your project file or master audio to generate a cryptographic hash and timestamp it on the Ethereum blockchain.</p>
                    
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-blue-500/50 transition-colors cursor-pointer bg-black/20 group">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                            <UploadIcon className="w-8 h-8 text-blue-400"/>
                        </div>
                        <p className="text-sm text-gray-300 font-bold">Drag & Drop Project Files</p>
                        <p className="text-xs text-gray-600 mt-2">Supports .zip, .als, .logicx, .wav</p>
                    </div>

                    <div className="mt-6">
                        <CyberButton label="Generate Timestamp" onClick={handleTimestamp} loading={hashing} />
                    </div>
                </div>

                <div className="bg-black/40 p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
                    {!hash && !hashing && (
                        <div className="text-center opacity-50">
                            <LockClosedIcon className="w-16 h-16 text-gray-600 mx-auto mb-4"/>
                            <p className="text-gray-500">Waiting for file upload...</p>
                        </div>
                    )}
                    
                    {hashing && (
                        <div className="text-center animate-pulse">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-blue-400 font-mono">Calculating SHA-256 Hash...</p>
                        </div>
                    )}

                    {hash && (
                        <div className="animate-fade-in-up space-y-6">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                    <CheckCircleIcon className="w-10 h-10 text-green-400"/>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">Timestamp Secured</h3>
                                <p className="text-gray-400 text-sm">Block #18492041</p>
                            </div>
                            
                            <div className="bg-black/60 p-4 rounded-xl border border-white/10">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-2">Transaction Hash</p>
                                <p className="text-xs text-blue-400 font-mono break-all">{hash}</p>
                            </div>

                            <button className="w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-bold">
                                View on Etherscan
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 8. Sample Usage Detector ---
export const SampleUsageDetectorView: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setResults([
                { time: "0:12 - 0:15", source: "Funky Drummer - James Brown", confidence: "98%", cleared: false },
                { time: "1:45 - 1:48", source: "Amen Break - The Winstons", confidence: "92%", cleared: true },
            ]);
        }, 3000);
    };

    return (
        <ToolLayout title="Sample Usage Detector" subtitle="AI-powered audio fingerprinting to identify uncleared samples." icon={<SearchIcon className="w-8 h-8 text-red-400"/>}>
            <div className="space-y-8">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Scan Your Mix</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">Upload your track to detect potential copyright infringements before release.</p>
                    
                    <div className="max-w-md mx-auto">
                        <CyberButton label="Analyze Audio" onClick={handleScan} loading={scanning} variant="danger" />
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="bg-ui-surface rounded-3xl border border-ui-border overflow-hidden animate-fade-in-up">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">Detection Report</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {results.map((r, i) => (
                                <div key={i} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${r.cleared ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {r.cleared ? '✓' : '!'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{r.source}</h4>
                                            <p className="text-sm text-gray-400">Detected at <span className="text-white font-mono">{r.time}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-bold">Confidence</p>
                                            <p className="text-lg font-bold text-white">{r.confidence}</p>
                                        </div>
                                        {r.cleared ? (
                                            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">Cleared</span>
                                        ) : (
                                            <button className="px-4 py-2 rounded-full bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                                                Clear Sample
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

// --- 9. Automated DMCA Issuer ---
export const AutomatedDmcaIssuerView: React.FC = () => {
    const [url, setUrl] = useState("");
    const [issuing, setIssuing] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    const handleIssue = () => {
        if (!url) return;
        setIssuing(true);
        setTimeout(() => {
            setIssuing(false);
            setToast({ message: `Takedown notice sent to host of ${url}`, type: 'success' });
            setUrl("");
        }, 1500);
    };

    return (
        <ToolLayout title="Automated DMCA Issuer" subtitle="Rapid response copyright enforcement." icon={<GavelIcon className="w-8 h-8 text-orange-400"/>}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="max-w-3xl mx-auto bg-ui-surface p-8 rounded-3xl border border-ui-border">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-orange-500/20 rounded-xl">
                        <ShieldVortexIcon className="w-8 h-8 text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Issue Takedown Notice</h3>
                        <p className="text-gray-400">Enter the URL of the infringing content. Our system will auto-generate and send the legal notice.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Infringing URL</label>
                        <input 
                            type="text" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com/illegal-download/my-song.mp3"
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 cursor-pointer hover:border-orange-500/50 transition-colors">
                            <input type="radio" name="reason" className="accent-orange-500 mr-2" defaultChecked />
                            <span className="text-white text-sm font-bold">Unauthorized Distribution</span>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 cursor-pointer hover:border-orange-500/50 transition-colors">
                            <input type="radio" name="reason" className="accent-orange-500 mr-2" />
                            <span className="text-white text-sm font-bold">Trademark Violation</span>
                        </div>
                    </div>

                    <CyberButton label="Issue Takedown" onClick={handleIssue} loading={issuing} variant="danger" />
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                        By submitting, you declare under penalty of perjury that you are the copyright owner.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 10. Cross-Platform Copyright Watchdog ---
export const CrossPlatformCopyrightWatchdogView: React.FC = () => {
    const platforms = [
        { name: "YouTube", status: "Active", infringements: 12, resolved: 145 },
        { name: "SoundCloud", status: "Active", infringements: 3, resolved: 42 },
        { name: "TikTok", status: "Active", infringements: 85, resolved: 1200 },
        { name: "Instagram", status: "Scanning", infringements: 0, resolved: 310 },
    ];

    return (
        <ToolLayout title="Copyright Watchdog" subtitle="24/7 monitoring across all major UGC platforms." icon={<ShieldCheckIcon className="w-8 h-8 text-indigo-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {platforms.map((p, i) => (
                    <div key={i} className="bg-ui-surface p-6 rounded-2xl border border-ui-border relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-16 bg-indigo-500/5 rounded-full -mr-8 -mt-8 group-hover:bg-indigo-500/10 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-white text-lg">{p.name}</h4>
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${p.status === 'Scanning' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10 animate-pulse' : 'border-green-500/30 text-green-400 bg-green-500/10'}`}>
                                    {p.status}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Detected</span>
                                    <span className="text-red-400 font-bold">{p.infringements}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Resolved</span>
                                    <span className="text-green-400 font-bold">{p.resolved}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-ui-surface rounded-3xl border border-ui-border p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Live Detection Feed</h3>
                    <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">View All</button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-bold">Unauthorized Upload Detected</p>
                                <p className="text-xs text-gray-500">Video ID: XyZ_99{i} • Match Duration: 45s</p>
                            </div>
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors">
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 11. Sync Licensing Marketplace ---
export const SyncLicensingMarketplaceView: React.FC = () => {
    const opportunities = [
        { title: "Netflix Series - 'Cyberpunk 2077'", budget: "$15,000", type: "Background Instrumental", deadline: "2 Days" },
        { title: "Nike Commercial - Summer Campaign", budget: "$45,000", type: "High Energy / Sport", deadline: "5 Days" },
        { title: "Indie Film - 'Lost in Tokyo'", budget: "$2,500", type: "Lo-Fi / Chill", deadline: "1 Week" },
    ];

    return (
        <ToolLayout title="Sync Marketplace" subtitle="Pitch your music for TV, Film, and Ads." icon={<FilmIcon className="w-8 h-8 text-teal-400"/>}>
            <div className="space-y-6">
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {['All', 'TV Shows', 'Movies', 'Commercials', 'Video Games'].map(f => (
                        <button key={f} className="px-4 py-2 rounded-full bg-ui-surface border border-ui-border text-sm font-bold text-gray-300 hover:text-white hover:border-teal-500/50 transition-colors whitespace-nowrap">
                            {f}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {opportunities.map((op, i) => (
                        <div key={i} className="bg-ui-surface p-6 rounded-2xl border border-ui-border hover:border-teal-500/50 transition-all group flex flex-col h-full">
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-1 bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase rounded border border-teal-500/20">Exclusive</span>
                                    <span className="text-xs text-gray-500 font-mono">{op.deadline} left</span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{op.title}</h4>
                                <p className="text-sm text-gray-400 mb-4">{op.type}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-lg font-black text-white">{op.budget}</span>
                                <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-teal-500/20">
                                    Pitch Song
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 12. Live Performance Rights Tracker ---
export const LivePerformanceRightsTrackerView: React.FC = () => {
    const performances = [
        { venue: "O2 Academy Brixton", date: "2023-10-15", status: "Collected", amount: "£450.00" },
        { venue: "The Roxy, LA", date: "2023-11-02", status: "Processing", amount: "$320.00" },
        { venue: "Berghain, Berlin", date: "2023-11-20", status: "Pending", amount: "€550.00" },
    ];

    return (
        <ToolLayout title="Live Rights Tracker" subtitle="Claim royalties from your live gigs worldwide." icon={<GlobeIcon className="w-8 h-8 text-pink-400"/>}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Performances</h3>
                        <div className="space-y-4">
                            {performances.map((p, i) => (
                                <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 hover:border-pink-500/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                                            <LocationMarkerIcon className="w-5 h-5 text-pink-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{p.venue}</h4>
                                            <p className="text-xs text-gray-400">{p.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-white font-bold">{p.amount}</p>
                                        <p className={`text-xs font-bold ${p.status === 'Collected' ? 'text-green-400' : 'text-yellow-400'}`}>{p.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border h-fit">
                    <h3 className="text-xl font-bold text-white mb-4">Register New Gig</h3>
                    <div className="space-y-4">
                        <input type="text" placeholder="Venue Name" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-pink-500 outline-none" />
                        <input type="date" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-pink-500 outline-none" />
                        <input type="file" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20" />
                        <button className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-pink-500/20">
                            Submit Claim
                        </button>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 13. Micro-Publishing Dashboard ---
export const MicroPublishingView: React.FC = () => {
    return (
        <ToolLayout title="Micro-Publishing" subtitle="Manage rights for short-form content and stems." icon={<ChipIcon className="w-8 h-8 text-yellow-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Stem Revenue</h3>
                    <div className="h-48 flex items-center justify-center bg-black/40 rounded-xl border border-white/5">
                        <p className="text-gray-500 italic">Chart Visualization Placeholder</p>
                    </div>
                </div>
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-4">Top Micro-Licensors</h3>
                    <ul className="space-y-3">
                        {['Splice', 'Tracklib', 'BandLab', 'TikTok Sounds'].map((p, i) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                                <span className="text-gray-300">{p}</span>
                                <span className="text-yellow-400 font-mono font-bold">Top 5%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
};

// --- 14. Release Optimizer ---
export const ReleaseOptimizerView: React.FC = () => {
    const [optimizing, setOptimizing] = useState(false);
    const [score, setScore] = useState(72);

    const handleOptimize = () => {
        setOptimizing(true);
        setTimeout(() => {
            setOptimizing(false);
            setScore(95);
        }, 2000);
    };

    return (
        <ToolLayout title="Release Optimizer" subtitle="AI-driven checklist for maximum impact." icon={<RocketIcon className="w-8 h-8 text-cyan-400"/>}>
            <div className="flex flex-col items-center justify-center py-12">
                <div className="relative w-48 h-48 mb-8">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-800" />
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * score) / 100} className="text-cyan-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-white">{score}</span>
                        <span className="text-sm text-cyan-400 uppercase font-bold tracking-wider">Score</span>
                    </div>
                </div>

                <div className="max-w-xl w-full space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        <span>High-Res Audio Uploaded</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        <span>Artwork Metadata Complete</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 opacity-70">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                        <span>Pre-Save Campaign Active</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 opacity-70">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                        <span>Social Assets Generated</span>
                    </div>
                </div>

                <CyberButton label="Run Optimization AI" onClick={handleOptimize} loading={optimizing} />
            </div>
        </ToolLayout>
    );
};

// --- 15. Merch Generator ---
export const MerchGeneratorView: React.FC = () => {
    const products = [
        { name: "Heavyweight Tee", price: "$25.00", image: "👕" },
        { name: "Vinyl LP", price: "$35.00", image: "💿" },
        { name: "Dad Hat", price: "$20.00", image: "🧢" },
    ];

    return (
        <ToolLayout title="Merch Generator" subtitle="Create and sell physical products instantly." icon={<TagIcon className="w-8 h-8 text-purple-400"/>}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((p, i) => (
                    <div key={i} className="bg-ui-surface p-6 rounded-3xl border border-ui-border hover:border-purple-500/50 transition-all group cursor-pointer text-center">
                        <div className="h-48 bg-black/40 rounded-2xl mb-6 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                            {p.image}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{p.name}</h4>
                        <p className="text-purple-400 font-mono font-bold mb-4">Base Cost: {p.price}</p>
                        <button className="w-full py-2 rounded-xl bg-white/5 text-white font-bold hover:bg-purple-600 transition-colors">
                            Customize
                        </button>
                    </div>
                ))}
            </div>
        </ToolLayout>
    );
};

// --- 16. Reputation Shield ---
export const ReputationShieldView: React.FC = () => {
    return (
        <ToolLayout title="Reputation Shield" subtitle="Monitor and protect your artist brand online." icon={<ShieldCheckIcon className="w-8 h-8 text-blue-500"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-6">Sentiment Analysis</h3>
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-center">
                            <p className="text-4xl font-black text-green-400">88%</p>
                            <p className="text-xs text-gray-500 uppercase mt-1">Positive</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-black text-gray-400">10%</p>
                            <p className="text-xs text-gray-500 uppercase mt-1">Neutral</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-black text-red-400">2%</p>
                            <p className="text-xs text-gray-500 uppercase mt-1">Negative</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                            <p className="text-gray-300 text-sm">"This new track is absolute fire! 🔥"</p>
                            <p className="text-xs text-green-400 mt-2 font-bold">Positive • Twitter</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                            <p className="text-gray-300 text-sm">"Waiting for the tour dates..."</p>
                            <p className="text-xs text-gray-400 mt-2 font-bold">Neutral • Instagram</p>
                        </div>
                    </div>
                </div>

                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-6">Alert Configuration</h3>
                    <div className="space-y-4">
                        {['Negative Press Mentions', 'Viral Spikes', 'Copyright Strikes', 'Fake Profiles'].map((a, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-white font-bold">{a}</span>
                                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};
