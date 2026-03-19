


import React, { useState, useCallback, useRef, DragEvent, useEffect, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import type { Song, Artist, Contributor, UgcMonetizationPolicy as UgcPolicyType, ArtistSearchResult, Video } from '../types';
import { UgcMonetizationPolicy } from '../types';
import { getAudioAnalysis, analyzeCoverArt, getMetadataFromFiles, generateSongDescription, getHitPotential, getAudioQuality, generateAICoverArt } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';
import SparklesIcon from '../components/layout/SparklesIcon';
import { searchArtists } from '../services/artistService';
import YouTubeIcon from '../components/icons/YouTubeIcon';
import CustomSelector from '../components/ui/CustomSelector';
import { ART_CATEGORIES, ART_STYLES } from '../data/coverArtOptions';



export const RECORDING_VERSIONS = [
    "Original",
    "Remix",
    "Live",
    "Remastered",
    "AI Generated",
    "Cover",
    "Acoustic",
    "Demo",
    "Radio Edit",
    "Extended Mix",
    "Instrumental"
];

export const CONTRIBUTOR_ROLES = [
    "Main Artist", 
    "Featured Artist", 
    "Producer", 
    "Composer", 
    "Lyricist", 
    "Arranger", 
    "Mixer", 
    "Remixer", 
    "Video Director",
    "Video Producer",
    "Editor"
];

const AUDIO_RELEASE_TYPES = ['Single', 'EP', 'Mini Album', 'Album', 'Mega Album'];
const VIDEO_RELEASE_TYPES = ['Music Video', 'Lyric Video', 'Visualizer'];

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

// --- ICONS ---
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>);
const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>);
const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const SpotifyIcon: React.FC<{className?: string}> = ({className}) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.839 17.334a.34.34 0 0 1-.491.132c-2.422-1.488-5.484-1.82-9.15-1.002a.34.34 0 0 1-.396-.33c-.02-.18.108-.348.288-.396 3.906-.888 7.248-.5 9.912 1.128a.34.34 0 0 1 .132.492zm1.488-2.664a.415.415 0 0 1-.58.192c-2.82-1.74-7.14-2.22-10.62-1.212a.415.415 0 0 1-.468-.408.415.415 0 0 1 .408-.468c3.84-.996 8.52-.468 11.64 1.452a.415.415 0 0 1 .192.58zm.132-2.856a.514.514 0 0 1-.684.252C14.773 9.42 8.34 8.808 4.92 9.876a.514.514 0 0 1-.576-.48.514.514 0 0 1 .48-.576c3.78-1.152 10.74-.48 14.58 1.944a.514.514 0 0 1 .252.684z"/></svg>);
const VideoCameraIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
const DiscIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);

const inputStyles = "form-input-modern w-full";

type ReleaseFormData = Partial<Omit<Song, 'assetType' | 'releaseType'>> & Partial<Omit<Video, 'assetType' | 'releaseType'>> & {
    assetType?: 'Audio' | 'Video';
    releaseType?: Song['releaseType'] | Video['releaseType'];
    includedVersions?: {
        clean: boolean;
        instrumental: boolean;
        remix: boolean;
        laguCurian: boolean;
    };
    enableTimezoneSync?: boolean;
    enableRealtimeDspFormat?: boolean;
    enableAdaptiveFormat?: boolean;
    enableGeoFencing?: boolean;
    enableIsrcUpcEmbedding?: boolean;
    customRevenueRules?: string;
};

const initialFormData: ReleaseFormData = {
    releaseType: 'Single',
    recordingVersion: 'Original',
    releaseDate: new Date().toISOString().split('T')[0],
    contributors: [{ id: crypto.randomUUID(), name: '', role: 'Main Artist', share: 100 }],
    ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
    isExplicit: false,
    duplicateCheck: { status: 'idle' },
    distributionMode: 'Normal',
    includedVersions: {
        clean: false,
        instrumental: false,
        remix: false,
        laguCurian: false,
    },
    enableTimezoneSync: true,
    enableRealtimeDspFormat: true,
    enableAdaptiveFormat: true,
    enableGeoFencing: false,
    enableIsrcUpcEmbedding: true,
    customRevenueRules: '',
    subGenre: '',
};

const Stepper: React.FC<{ currentStep: number; steps: string[] }> = ({ currentStep, steps }) => (
    <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-8">
        {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isActive = currentStep === stepNumber;
            return (
                <React.Fragment key={step}>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 border-2 ${isActive ? 'bg-singularity-teal text-black border-singularity-teal shadow-glow-accent' : isCompleted ? 'bg-singularity-teal/50 border-singularity-teal/50 text-black' : 'bg-ui-surface border-singularity-purple/50 text-ui-text-body'}`}>
                            {isCompleted ? '✓' : stepNumber}
                        </div>
                        <span className={`hidden md:inline font-semibold transition-colors ${isActive ? 'text-singularity-teal' : 'text-ui-text-body'}`}>{step}</span>
                    </div>
                    {stepNumber < steps.length && <div className={`flex-1 h-0.5 rounded-full transition-colors ${isCompleted ? 'bg-singularity-teal' : 'bg-singularity-purple/50'}`}></div>}
                </React.Fragment>
            );
        })}
    </div>
);

// --- Track Item Component for Step 2 ---
const TrackUploadRow: React.FC<{ 
    index: number; 
    file: File | null; 
    title: string; 
    onFileChange: (file: File) => void;
    onTitleChange: (title: string) => void;
    onRemove: () => void;
}> = ({ index, file, title, onFileChange, onTitleChange, onRemove }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-center gap-3 bg-ui-surface/40 p-3 rounded-xl border border-ui-border hover:border-primary/40 transition-colors group">
             <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-ui-text-subtle bg-ui-bg rounded-full border border-ui-border">
                 {index + 1}
             </div>
             
             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                 <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${file ? 'border-green-500/50 bg-green-500/10' : 'border-ui-border hover:border-primary/50 bg-ui-bg'}`}
                 >
                    <UploadIcon className={`w-4 h-4 ${file ? 'text-green-400' : 'text-ui-text-subtle'}`} />
                    <span className={`text-xs truncate font-medium ${file ? 'text-green-300' : 'text-ui-text-subtle'}`}>
                        {file ? file.name : "Upload Audio (.WAV)"}
                    </span>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="audio/*,.wav,.flac,.mp3" 
                        onChange={(e) => e.target.files?.[0] && onFileChange(e.target.files[0])}
                    />
                 </div>

                 <input 
                    type="text" 
                    placeholder="Judul Lagu" 
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className="bg-ui-bg border border-ui-border rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                 />
             </div>

             <button onClick={onRemove} className="p-2 text-ui-text-subtle hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors">
                 <TrashIcon className="w-4 h-4" />
             </button>
        </div>
    );
};

// --- Step 1: Project Definition ---
const Step1ProjectDefinition: React.FC<{
    assetType: 'Audio' | 'Video';
    setAssetType: (t: 'Audio' | 'Video') => void;
    releaseType: string;
    setReleaseType: (t: string) => void;
    onNext: () => void;
}> = ({ assetType, setAssetType, releaseType, setReleaseType, onNext }) => {
    const { t } = useTranslation();
    const availableFormats = assetType === 'Audio' ? AUDIO_RELEASE_TYPES : VIDEO_RELEASE_TYPES;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Mulai Proyek Baru</h2>
                <p className="text-ui-text-subtle">Pilih jenis konten yang ingin Anda distribusikan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <button
                    onClick={() => setAssetType('Audio')}
                    className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${assetType === 'Audio' ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(19,49,255,0.15)] scale-[1.02]' : 'border-ui-border bg-ui-surface/30 hover:border-primary/30 hover:bg-ui-surface/50'}`}
                >
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${assetType === 'Audio' ? 'bg-primary text-white shadow-lg' : 'bg-ui-bg text-ui-text-subtle group-hover:text-white'}`}>
                        <MusicNoteIcon className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                        <h3 className={`text-xl font-bold ${assetType === 'Audio' ? 'text-primary' : 'text-ui-text-heading'}`}>Audio Release</h3>
                        <p className="text-xs text-ui-text-subtle mt-2">Lagu untuk Spotify, Apple Music, TikTok, dll.</p>
                    </div>
                    {assetType === 'Audio' && <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-glow-green animate-pulse"></div>}
                </button>

                <button
                    onClick={() => setAssetType('Video')}
                    className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${assetType === 'Video' ? 'border-secondary bg-secondary/5 shadow-[0_0_30px_rgba(254,45,139,0.15)] scale-[1.02]' : 'border-ui-border bg-ui-surface/30 hover:border-secondary/30 hover:bg-ui-surface/50'}`}
                >
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${assetType === 'Video' ? 'bg-secondary text-white shadow-lg' : 'bg-ui-bg text-ui-text-subtle group-hover:text-white'}`}>
                        <VideoCameraIcon className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                        <h3 className={`text-xl font-bold ${assetType === 'Video' ? 'text-secondary' : 'text-ui-text-heading'}`}>Video Release</h3>
                        <p className="text-xs text-ui-text-subtle mt-2">Video Musik Resmi, Lirik, atau Visualizer.</p>
                    </div>
                     {assetType === 'Video' && <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-glow-green animate-pulse"></div>}
                </button>
            </div>

            <div className="max-w-3xl mx-auto mt-8 pt-8 border-t border-ui-border/50">
                <h3 className="text-lg font-bold text-center mb-4">Pilih Format</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {availableFormats.map(format => (
                        <button
                            key={format}
                            onClick={() => setReleaseType(format)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all transform hover:-translate-y-1 ${releaseType === format ? 'bg-white text-black border-white shadow-glow-white' : 'bg-ui-surface border-ui-border text-ui-text-body hover:border-white/50'}`}
                        >
                            {format}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-center mt-10">
                 <button onClick={onNext} className="bg-gradient-singularity text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                    Lanjut ke Upload <ArrowRightIcon className="w-5 h-5" />
                 </button>
            </div>
        </div>
    );
};

// --- Step 2: Asset Studio ---
const Step2Assets: React.FC<{
    tracks: { id: string; file: File | null; title: string }[];
    setTracks: React.Dispatch<React.SetStateAction<{ id: string; file: File | null; title: string }[]>>;
    coverArtFile: File | null;
    setCoverArtFile: (f: File) => void;
    coverArtPreview: string;
    setCoverArtPreview: (s: string) => void;
    onNext: () => void;
    onAnalyze: () => void;
    isAnalyzing: boolean;
    releaseType: string;
    assetType: 'Audio' | 'Video';
}> = ({ tracks, setTracks, coverArtFile, setCoverArtFile, coverArtPreview, setCoverArtPreview, onNext, onAnalyze, isAnalyzing, releaseType, assetType }) => {
    const { t } = useTranslation();
    const coverInputRef = useRef<HTMLInputElement>(null);
    
    // AI Art Logic
    const [artMode, setArtMode] = useState<'upload' | 'ai'>('upload');
    const [aiCategory, setAiCategory] = useState('');
    const [aiStyle, setAiStyle] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGeneratingArt, setIsGeneratingArt] = useState(false);
    
    const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files?.[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setCoverArtFile(file);
                setCoverArtPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleTrackFileChange = (index: number, file: File) => {
        const newTracks = [...tracks];
        newTracks[index].file = file;
        // Auto-fill title if empty
        if (!newTracks[index].title) {
            newTracks[index].title = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
        }
        setTracks(newTracks);
    };

    const handleTrackTitleChange = (index: number, title: string) => {
        const newTracks = [...tracks];
        newTracks[index].title = title;
        setTracks(newTracks);
    };

    const addTrackSlot = () => {
        setTracks([...tracks, { id: crypto.randomUUID(), file: null, title: '' }]);
    };

    const removeTrackSlot = (index: number) => {
        if (tracks.length > 1) {
            const newTracks = [...tracks];
            newTracks.splice(index, 1);
            setTracks(newTracks);
        }
    };

    const handleGenerateArt = async () => {
        if (!aiCategory || !aiStyle) { alert("Pilih kategori dan gaya."); return; }
        setIsGeneratingArt(true);
        try {
            const fullPrompt = `Subject: ${aiCategory}. Style: ${aiStyle}. ${aiPrompt ? `Details: ${aiPrompt}` : ''}`;
            const result = await generateAICoverArt("Untitled", "Artist", fullPrompt);
            if (result.startsWith('data:image')) {
                // Convert data URL to file
                const res = await fetch(result);
                const blob = await res.blob();
                const file = new File([blob], "ai_generated_cover.jpg", { type: "image/jpeg" });
                setCoverArtFile(file);
                setCoverArtPreview(result);
                setArtMode('upload');
            }
        } catch (e) { console.error(e); alert("Gagal generate art."); } 
        finally { setIsGeneratingArt(false); }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* LEFT: COVER ART */}
                <div className="w-full lg:w-1/3 space-y-4">
                    <h3 className="text-lg font-bold text-ui-text-heading">1. Artwork</h3>
                    <div className="bg-ui-surface rounded-2xl p-1 border border-ui-border">
                         <div className="flex mb-2 bg-ui-bg rounded-lg p-1">
                            <button onClick={() => setArtMode('upload')} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${artMode === 'upload' ? 'bg-ui-surface text-white shadow' : 'text-ui-text-subtle hover:text-white'}`}>Upload File</button>
                            <button onClick={() => setArtMode('ai')} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1 ${artMode === 'ai' ? 'bg-gradient-singularity text-white shadow' : 'text-ui-text-subtle hover:text-white'}`}>
                                <SparklesIcon className="w-3 h-3" /> AI Studio
                            </button>
                         </div>

                         {artMode === 'upload' ? (
                            <div 
                                onClick={() => coverInputRef.current?.click()}
                                onDrop={handleCoverDrop}
                                onDragOver={e => e.preventDefault()}
                                className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden ${coverArtFile ? 'border-primary bg-black' : 'border-ui-border hover:border-primary/50 bg-ui-bg/30'}`}
                            >
                                {coverArtPreview ? (
                                    <img src={coverArtPreview} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-4">
                                        <ImageIcon className="w-10 h-10 mx-auto mb-2 text-ui-text-subtle" />
                                        <p className="text-xs text-ui-text-subtle font-bold">3000 x 3000 px</p>
                                        <p className="text-[10px] text-ui-text-subtle mt-1">JPG/PNG</p>
                                    </div>
                                )}
                                <input type="file" ref={coverInputRef} onChange={e => e.target.files?.[0] && (setCoverArtFile(e.target.files[0]), setCoverArtPreview(URL.createObjectURL(e.target.files[0])))} className="hidden" accept="image/*" />
                            </div>
                         ) : (
                             <div className="aspect-square bg-ui-bg/50 rounded-xl p-4 border border-singularity-purple/30 overflow-y-auto custom-scrollbar">
                                <div className="space-y-3">
                                    <div><label className="text-[10px] font-bold uppercase text-ui-text-subtle">Category</label><CustomSelector value={aiCategory} onChange={(v) => setAiCategory(v||'')} options={ART_CATEGORIES} placeholder="Select..." /></div>
                                    <div><label className="text-[10px] font-bold uppercase text-ui-text-subtle">Style</label><CustomSelector value={aiStyle} onChange={(v) => setAiStyle(v||'')} options={ART_STYLES} placeholder="Select..." /></div>
                                    <div><label className="text-[10px] font-bold uppercase text-ui-text-subtle">Prompt</label><input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} className="w-full bg-black/50 border border-ui-border rounded p-2 text-xs text-white" placeholder="Details..."/></div>
                                    <button onClick={handleGenerateArt} disabled={isGeneratingArt} className="w-full btn-quantum-glow py-2 rounded-lg text-xs font-bold text-white mt-2">{isGeneratingArt ? 'Generating...' : 'Create Art'}</button>
                                </div>
                             </div>
                         )}
                    </div>
                </div>

                {/* RIGHT: TRACKS */}
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className="flex justify-between items-center">
                         <h3 className="text-lg font-bold text-ui-text-heading">2. {assetType} Upload ({releaseType})</h3>
                         <button onClick={addTrackSlot} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"><PlusCircleIcon className="w-4 h-4"/> Add Track</button>
                    </div>
                    
                    <div className="bg-ui-surface rounded-2xl p-4 border border-ui-border min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="space-y-3">
                            {tracks.map((track, idx) => (
                                <TrackUploadRow 
                                    key={track.id} 
                                    index={idx} 
                                    file={track.file} 
                                    title={track.title} 
                                    onFileChange={(f) => handleTrackFileChange(idx, f)} 
                                    onTitleChange={(t) => handleTrackTitleChange(idx, t)}
                                    onRemove={() => removeTrackSlot(idx)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                         <button 
                            onClick={onAnalyze}
                            disabled={isAnalyzing || !coverArtFile || tracks.some(t => !t.file)}
                            className="btn-quantum-glow px-8 py-3 rounded-full font-bold text-white disabled:opacity-50 flex items-center gap-2 transition-transform hover:scale-105"
                        >
                             <SparklesIcon className="w-5 h-5" />
                             {isAnalyzing ? 'Analyzing Content...' : 'Analyze & Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Step2Metadata: React.FC<{
    formData: ReleaseFormData;
    setFormData: React.Dispatch<React.SetStateAction<ReleaseFormData>>;
    onGenerateDescription: () => void;
    isGeneratingDescription: boolean;
    artists: Artist[];
    assetType: 'Audio' | 'Video';
}> = ({ formData, setFormData, onGenerateDescription, isGeneratingDescription, artists, assetType }) => {
    const { t } = useTranslation();
    const [genreInput, setGenreInput] = useState(formData.genre || '');
    const artistOptions = artists.map(a => ({ value: a.name, label: a.name }));

    const handleChange = (field: keyof ReleaseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-ui-text-heading">Metadata Rilis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_title')}</label>
                    <input 
                        type="text" 
                        value={formData.title || ''} 
                        onChange={e => handleChange('title', e.target.value)} 
                        className={inputStyles} 
                        placeholder="Judul Lagu/Video" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_main_artist')}</label>
                    <CustomSelector 
                        value={formData.artistName} 
                        onChange={val => handleChange('artistName', val)} 
                        options={artistOptions}
                        placeholder="Pilih atau ketik nama artis"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_genre')}</label>
                    <input 
                        type="text" 
                        value={formData.genre || ''} 
                        onChange={e => handleChange('genre', e.target.value)} 
                        className={inputStyles} 
                        placeholder="Genre Utama (e.g. Pop, Rock)" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">Sub-Genre</label>
                    <input 
                        type="text" 
                        value={formData.subGenre || ''} 
                        onChange={e => handleChange('subGenre', e.target.value)} 
                        className={inputStyles} 
                        placeholder="Sub-Genre (Optional)" 
                    />
                </div>
            </div>
            
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-ui-text-subtle">{t('description')}</label>
                    <button 
                        onClick={onGenerateDescription} 
                        disabled={isGeneratingDescription || !formData.title || !formData.artistName}
                        className="text-xs flex items-center gap-1 text-primary hover:text-white disabled:opacity-50"
                    >
                        <SparklesIcon className="w-3 h-3" />
                        {isGeneratingDescription ? 'Writing...' : 'Generate with AI'}
                    </button>
                </div>
                <textarea 
                    value={formData.description || ''} 
                    onChange={e => handleChange('description', e.target.value)} 
                    className={`${inputStyles} min-h-[100px]`} 
                    placeholder="Deskripsi rilis untuk toko digital..."
                />
            </div>
        </div>
    );
};

const Step3Details: React.FC<{
    formData: ReleaseFormData;
    setFormData: React.Dispatch<React.SetStateAction<ReleaseFormData>>;
    releaseTime: string;
    setReleaseTime: (time: string) => void;
}> = ({ formData, setFormData, releaseTime, setReleaseTime }) => {
    const { t } = useTranslation();
    
    const handleChange = (field: keyof ReleaseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-ui-text-heading">Detail Rilis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_record_label')}</label>
                    <input 
                        type="text" 
                        value={formData.label || ''} 
                        onChange={e => handleChange('label', e.target.value)} 
                        className={inputStyles} 
                        placeholder={t('form_placeholder_record_label_optional')}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                     <div>
                        <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_copyright_holder_c')}</label>
                        <input 
                            type="text" 
                            value={formData.cHolder || `${currentYear} ${formData.artistName || ''}`} 
                            onChange={e => handleChange('cHolder', e.target.value)} 
                            className={inputStyles} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_copyright_holder_p')}</label>
                        <input 
                            type="text" 
                            value={formData.pHolder || `${currentYear} ${formData.label || formData.artistName || ''}`} 
                            onChange={e => handleChange('pHolder', e.target.value)} 
                            className={inputStyles} 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_release_date')}</label>
                    <input 
                        type="date" 
                        value={formData.releaseDate?.split('T')[0]} 
                        onChange={e => handleChange('releaseDate', e.target.value)} 
                        className={inputStyles} 
                    />
                </div>
                 
                 <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_release_time')}</label>
                    <input 
                        type="time" 
                        value={releaseTime} 
                        onChange={e => setReleaseTime(e.target.value)} 
                        className={inputStyles} 
                    />
                </div>
                 
                <div>
                     <label className="block text-sm font-bold text-ui-text-subtle mb-1">{t('form_label_isrc_upc')}</label>
                     <div className="grid grid-cols-2 gap-2">
                        <input 
                            type="text" 
                            value={formData.upc || ''} 
                            onChange={e => handleChange('upc', e.target.value)} 
                            className={inputStyles} 
                            placeholder="UPC (Optional)"
                        />
                        <input 
                            type="text" 
                            value={formData.isrc || ''} 
                            onChange={e => handleChange('isrc', e.target.value)} 
                            className={inputStyles} 
                            placeholder="ISRC (Optional)"
                        />
                     </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={formData.isExplicit || false} 
                        onChange={e => handleChange('isExplicit', e.target.checked)} 
                        className="rounded text-primary bg-ui-bg border-ui-border"
                    />
                    <span className="text-sm text-ui-text-body">Explicit Content</span>
                </label>
            </div>
        </div>
    );
};

const Step4DistributionStrategy: React.FC<{
    formData: ReleaseFormData;
    setFormData: React.Dispatch<React.SetStateAction<ReleaseFormData>>;
}> = ({ formData, setFormData }) => {
    const { t } = useTranslation();

    const handleChange = (field: keyof ReleaseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-ui-text-heading">Strategi Distribusi</h3>
            
            <div className="bg-ui-surface border border-ui-border rounded-xl p-4">
                <label className="block text-sm font-bold text-ui-text-subtle mb-2">{t('release_mode')}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Normal', 'Stealth', 'NFT', 'Preview'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => handleChange('distributionMode', mode)}
                            className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${formData.distributionMode === mode ? 'border-primary bg-primary/20 text-primary' : 'border-ui-border bg-ui-bg hover:border-white/50'}`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-2">Format Tambahan</label>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 p-3 border border-ui-border rounded-lg bg-ui-bg cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.includedVersions?.instrumental || false} 
                                onChange={e => setFormData(prev => ({...prev, includedVersions: {...prev.includedVersions, instrumental: e.target.checked}}))}
                                className="rounded text-primary"
                            />
                            <span className="text-sm">Include Instrumental</span>
                        </label>
                        <label className="flex items-center gap-2 p-3 border border-ui-border rounded-lg bg-ui-bg cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.includedVersions?.clean || false} 
                                onChange={e => setFormData(prev => ({...prev, includedVersions: {...prev.includedVersions, clean: e.target.checked}}))}
                                className="rounded text-primary"
                            />
                            <span className="text-sm">Include Clean Version</span>
                        </label>
                    </div>
                </div>
                
                <div>
                     <label className="block text-sm font-bold text-ui-text-subtle mb-2">{t('form_label_ugc_policy')}</label>
                     <select 
                        value={formData.ugcMonetizationPolicy} 
                        onChange={e => handleChange('ugcMonetizationPolicy', e.target.value)} 
                        className={inputStyles}
                    >
                        {Object.values(UgcMonetizationPolicy).map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                     </select>
                     <p className="text-xs text-ui-text-subtle mt-2">Determines how your music is handled on YouTube, TikTok, and Meta.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-ui-border">
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-2">Wilayah Distribusi</label>
                    <select 
                        className={inputStyles}
                        defaultValue="Worldwide"
                    >
                        <option value="Worldwide">Worldwide (200+ Countries)</option>
                        <option value="Exclude">Exclude Specific Territories</option>
                        <option value="Select">Select Specific Territories</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-ui-text-subtle mb-2">Pricing Tier</label>
                    <select 
                        className={inputStyles}
                        defaultValue="Mid"
                    >
                        <option value="Low">Budget (Low)</option>
                        <option value="Mid">Standard (Mid)</option>
                        <option value="High">Premium (High)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

const Step5Review: React.FC<{
    formData: ReleaseFormData;
    coverArtPreview: string;
    mediaFile: File | null | undefined;
    onStepChange: (step: number) => void;
    releaseTime: string;
    termsAgreed: boolean;
    setTermsAgreed: (agreed: boolean) => void;
}> = ({ formData, coverArtPreview, mediaFile, onStepChange, releaseTime, termsAgreed, setTermsAgreed }) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-ui-text-heading text-center">Review Release</h3>
            
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <div className="w-48 h-48 flex-shrink-0">
                    <img src={coverArtPreview} alt="Cover" className="w-full h-full object-cover rounded-xl shadow-2xl" />
                </div>
                <div className="flex-1 w-full space-y-4">
                    <div className="border-b border-ui-border pb-4">
                        <p className="text-sm text-ui-text-subtle uppercase tracking-wider">Release Title</p>
                        <h2 className="text-3xl font-black text-white">{formData.title}</h2>
                        <p className="text-xl text-primary font-bold">{formData.artistName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-ui-text-subtle">Type</p>
                            <p className="font-semibold">{formData.releaseType}</p>
                        </div>
                         <div>
                            <p className="text-ui-text-subtle">Genre</p>
                            <p className="font-semibold">{formData.genre}</p>
                        </div>
                        <div>
                            <p className="text-ui-text-subtle">Release Date</p>
                            <p className="font-semibold">{formData.releaseDate ? new Date(formData.releaseDate).toLocaleDateString() : 'TBA'} @ {releaseTime}</p>
                        </div>
                        <div>
                            <p className="text-ui-text-subtle">Label</p>
                            <p className="font-semibold">{formData.label || 'Independent'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-ui-bg/50 p-4 rounded-xl border border-ui-border flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-full text-green-400"><CheckCircleIcon className="w-6 h-6"/></div>
                    <div>
                        <p className="font-bold text-sm">Audio File</p>
                        <p className="text-xs text-ui-text-subtle">{mediaFile?.name || 'No file'}</p>
                    </div>
                 </div>
                 <div className="bg-ui-bg/50 p-4 rounded-xl border border-ui-border flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-full text-green-400"><CheckCircleIcon className="w-6 h-6"/></div>
                    <div>
                        <p className="font-bold text-sm">Artwork</p>
                        <p className="text-xs text-ui-text-subtle">3000x3000px Verified</p>
                    </div>
                 </div>
                 <div className="bg-ui-bg/50 p-4 rounded-xl border border-ui-border flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-full text-green-400"><CheckCircleIcon className="w-6 h-6"/></div>
                    <div>
                        <p className="font-bold text-sm">Metadata</p>
                        <p className="text-xs text-ui-text-subtle">Complete</p>
                    </div>
                 </div>
            </div>

            <div className="bg-ui-surface p-6 rounded-xl border border-ui-border">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={termsAgreed} 
                        onChange={e => setTermsAgreed(e.target.checked)}
                        className="mt-1 rounded text-primary bg-ui-bg border-ui-border"
                    />
                    <div className="text-sm text-ui-text-subtle">
                        <p className="font-bold text-white mb-1">Terms & Conditions</p>
                        I confirm that I have the rights to distribute this content and agree to the <a href="#" className="text-primary hover:underline">Distribution Agreement</a>. I understand that fraudulent streams or copyright infringement will result in immediate account termination.
                    </div>
                </label>
            </div>
        </div>
    );
};

// --- Main Component ---
export const CreateReleaseView: React.FC<{ artists: Artist[]; addRelease: (release: Omit<Song | Video, 'id' | 'status'>) => string; }> = ({ artists, addRelease }) => {
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [currentStep, setCurrentStep] = useState(1);
    
    // Step 1 States
    const [assetType, setAssetType] = useState<'Audio' | 'Video'>('Audio');
    const [releaseType, setReleaseType] = useState('Single');

    // Step 2 States (Assets)
    const [tracks, setTracks] = useState<{ id: string; file: File | null; title: string }[]>([{ id: 'init', file: null, title: '' }]);
    const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
    const [coverArtPreview, setCoverArtPreview] = useState('');
    
    // Other Steps
    const [formData, setFormData] = useState<ReleaseFormData>(initialFormData);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [releaseTime, setReleaseTime] = useState('10:00');

    // --- EFFECTS ---
    useEffect(() => {
        if (location.state?.initialAssetType) {
            setAssetType(location.state.initialAssetType);
        }
    }, [location.state]);

    // Dynamic Track Slot Logic based on Release Type
    useEffect(() => {
        if (currentStep === 1) {
             // When changing release type in step 1, adjust the expected tracks
             // This logic runs when moving TO step 2 mostly, but pre-setting here is fine
             let count = 1;
             if (releaseType === 'EP') count = 4;
             if (releaseType === 'Album' || releaseType === 'Mega Album') count = 10;
             
             // Only reset if the current list is empty or basic default
             if (tracks.length === 1 && !tracks[0].file && !tracks[0].title) {
                 const newTracks = Array.from({ length: count }, () => ({ id: crypto.randomUUID(), file: null, title: '' }));
                 setTracks(newTracks);
             } else if (tracks.length !== count) {
                 // Smart adjust: Keep existing data, add/remove slots
                 if (tracks.length < count) {
                     const needed = count - tracks.length;
                     const additions = Array.from({length: needed}, () => ({ id: crypto.randomUUID(), file: null, title: '' }));
                     setTracks([...tracks, ...additions]);
                 } else if (tracks.length > count && releaseType === 'Single') {
                     // If forcing single, trim to 1
                     setTracks([tracks[0]]);
                 }
             }
        }
    }, [releaseType, currentStep]);

    // Sync Asset/Release Type to FormData
    useEffect(() => {
         setFormData(prev => ({ ...prev, assetType, releaseType: releaseType as any }));
    }, [assetType, releaseType]);


    const STEPS = useMemo(() => ['Project', 'Assets', 'Metadata', 'Rights', 'Strategy', 'Review'], [t]);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    const goToStep = (step: number) => setCurrentStep(step);
    
    const handleAnalyze = async () => {
        // Logic to analyze the first track + cover art
        // In a real app, we might analyze all tracks or batch them
        if (!tracks[0].file || !coverArtFile) return;
        setIsAnalyzing(true);
        setAnalysisResult(null);
        try {
            const mainFile = tracks[0].file;
            const [metadata, artIssues, audioAnalysis, hit, quality] = await Promise.all([
                getMetadataFromFiles(mainFile.name, coverArtFile.name),
                analyzeCoverArt(coverArtFile),
                getAudioAnalysis(formData.title || tracks[0].title || mainFile.name, formData.artistName || 'Unknown Artist', formData.genre || 'Unknown', language),
                getHitPotential(formData.title || tracks[0].title || mainFile.name, formData.genre || 'Unknown', language),
                getAudioQuality(mainFile.name)
            ]);
            
            const newContributors = [{id: crypto.randomUUID(), name: metadata.artist, role: 'Main Artist', share: 100 }];
            
            // If title was empty, use metadata title
            const updatedTitle = formData.title || metadata.title || tracks[0].title;
            
            setFormData(prev => ({ 
                ...prev, 
                title: updatedTitle, 
                artistName: metadata.artist, 
                genre: metadata.suggestedGenre, 
                ...audioAnalysis, 
                contributors: newContributors 
            }));
            
            const results = { aiValidationIssues: artIssues.issues, hitPotential: hit, audioQuality: quality, duplicateCheck: audioAnalysis.duplicateCheck };
            setAnalysisResult(results);
            setTimeout(nextStep, 1000); 
        } catch (e) {
            console.error(e);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const handleGenerateDescription = async () => {
        if (!formData.title || !formData.artistName) return;
        setIsGeneratingDescription(true);
        try {
            const desc = await generateSongDescription(formData.title, formData.artistName, language);
            setFormData(prev => ({...prev, description: desc}));
        } catch (e) { console.error(e); } finally {
            setIsGeneratingDescription(false);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        const releaseDateVal = formData.releaseDate ? formData.releaseDate.split('T')[0] : new Date().toISOString().split('T')[0];
        const combinedDateTime = new Date(`${releaseDateVal}T${releaseTime}:00`).toISOString();
        const finalReleaseData: ReleaseFormData = {
            ...formData,
            releaseDate: combinedDateTime,
        };
        
        let finalRelease: any;
        const mainFile = tracks[0].file; // Using first track for main data in this simplified model
        
        if (assetType === 'Audio') {
             finalRelease = { ...initialFormData, ...finalReleaseData, assetType: 'Audio', coverArtUrl: coverArtPreview, fileName: mainFile?.name || 'audio.wav', distribution: {}, ...analysisResult! };
        } else {
             finalRelease = { ...initialFormData, ...finalReleaseData, assetType: 'Video', coverArtUrl: coverArtPreview, videoFileName: mainFile?.name || 'video.mp4', distribution: {}, ...analysisResult! };
        }

        const newId = addRelease(finalRelease);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate(`/release/${newId}`);
        }, 1000);
    };
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return (
                <Step1ProjectDefinition 
                    assetType={assetType} 
                    setAssetType={setAssetType} 
                    releaseType={releaseType} 
                    setReleaseType={setReleaseType} 
                    onNext={nextStep} 
                />
            );
            case 2: return (
                <Step2Assets 
                    tracks={tracks}
                    setTracks={setTracks}
                    coverArtFile={coverArtFile}
                    setCoverArtFile={setCoverArtFile}
                    coverArtPreview={coverArtPreview}
                    setCoverArtPreview={setCoverArtPreview}
                    onNext={nextStep}
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                    releaseType={releaseType}
                    assetType={assetType}
                />
            );
            // Mapping old steps to new flow index
            case 3: return <Step2Metadata formData={formData} setFormData={setFormData} onGenerateDescription={handleGenerateDescription} isGeneratingDescription={isGeneratingDescription} artists={artists} assetType={assetType} />;
            case 4: return <Step3Details formData={formData} setFormData={setFormData} releaseTime={releaseTime} setReleaseTime={setReleaseTime} />;
            case 5: return <Step4DistributionStrategy formData={formData} setFormData={setFormData} />;
            case 6: return <Step5Review formData={formData} coverArtPreview={coverArtPreview} mediaFile={tracks[0]?.file} onStepChange={goToStep} releaseTime={releaseTime} termsAgreed={termsAgreed} setTermsAgreed={setTermsAgreed} />;
            default: return null;
        }
    };

    const isNextDisabled = () => {
        // Logic moved inside individual step components for Steps 1 & 2
        return false; 
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-24">
            <header className="flex justify-between items-start">
                <div>
                     <h1 className="text-4xl font-bold text-gradient-singularity">{t('create_release_quantum_console_title')}</h1>
                     <p className="text-lg text-ui-text-body mt-1">{t('create_release_quantum_console_desc')}</p>
                </div>
                <Link to="/releases" className="px-4 py-2 rounded-full bg-ui-surface border border-ui-border text-ui-text-body font-semibold hover:border-singularity-teal transition-colors">{t('cancel')}</Link>
            </header>
            
            <div className="glass-surface-quantum p-6 md:p-8 rounded-2xl min-h-[500px]">
                <Stepper currentStep={currentStep} steps={STEPS} />
                <div className="mt-8">
                    {renderStepContent()}
                </div>
            </div>

            {/* Navigation Buttons - Conditionally rendered based on step, as Step 1/2 handle their own next logic */}
            {currentStep > 2 && (
                <div className="flex justify-between items-center">
                    <button onClick={prevStep} disabled={currentStep === 1 || isSubmitting} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-ui-text-body bg-ui-surface border border-ui-border hover:border-singularity-teal disabled:opacity-50 transition">
                        <ArrowLeftIcon className="w-5 h-5" /> {t('previous_step')}
                    </button>
                    {currentStep < STEPS.length ? (
                        <button onClick={nextStep} disabled={isNextDisabled() || isSubmitting} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-gradient-singularity hover:brightness-110 disabled:opacity-50 transition">
                            {t('next_step')} <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    ) : (
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2"><input type="checkbox" id="terms" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} className="w-4 h-4 rounded text-singularity-teal bg-ui-surface border-ui-border focus:ring-singularity-teal"/> <label htmlFor="terms" className="text-xs text-ui-text-body">{t('terms_agree')}</label></div>
                            <button onClick={handleSubmit} disabled={!termsAgreed || isSubmitting} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-gradient-singularity hover:brightness-110 disabled:opacity-50 transition">
                                {isSubmitting ? t('submitting') : '//: EXECUTE RELEASE'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};