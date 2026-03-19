


import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { Song, Release } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';
import { getPlatformIcon } from '../components/icons/PlatformIcons';
import SparklesIcon from '../components/layout/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';
import { ALL_PLATFORMS } from '../data/platforms';
import MetadataEditor from '../components/MetadataEditor';

const { useParams, useNavigate, Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

// --- ICONS ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>);
const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 9.91l4.243 4.243a2 2 0 012.828 0l4.243-4.243M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const PencilAltIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>);
const DangerIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>);

interface ReleaseManagerViewProps {
  songs: Release[];
  onDistribute: (songId: string, selectedPlatformIds: string[]) => void;
  onGenerateStrategy: (songId: string) => void;
  onTakedown: (songId: string, platformId: string) => void;
  onDeleteSong: (songId: string) => void;
  onUpdateSong: (songId: string, updatedData: Partial<Song>) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

type ManagerTab = 'overview' | 'distribution' | 'metadata' | 'danger';

const TabButton: React.FC<{ name: string; icon: React.FC<{className?: string}>; isActive: boolean; onClick: () => void }> = ({ name, icon: Icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-shrink-0 relative flex items-center justify-center gap-2 px-6 py-4 font-bold text-sm transition-all duration-200 whitespace-nowrap ${
            isActive 
            ? 'text-primary border-b-2 border-primary bg-primary/5' 
            : 'text-ui-text-subtle hover:text-white hover:bg-white/5'
        }`}
    >
        <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-ui-text-subtle'}`} />
        <span className="relative z-10">{name}</span>
    </button>
);

const DistributionTab: React.FC<{song: Song, onDistribute: (songId: string, platformIds: string[]) => void, onTakedown: (songId: string, platformId: string) => void}> = ({ song, onDistribute, onTakedown }) => {
    const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
    const handleSelect = (id: string) => {
        const newSet = new Set(selectedPlatforms);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedPlatforms(newSet);
    }
    const isDistributable = song.status === 'Draft' || song.status === 'Rejected';

    const handleSelectAll = () => {
        if (selectedPlatforms.size >= ALL_PLATFORMS.length) {
            setSelectedPlatforms(new Set());
        } else {
            const allPlatformIds = new Set(ALL_PLATFORMS.map(p => p.id));
            setSelectedPlatforms(allPlatformIds);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
             {/* Status Overview Card */}
             <div className="bg-gradient-to-r from-singularity-purple/10 to-singularity-teal/10 p-6 rounded-2xl border border-singularity-purple/30 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-20 bg-primary/10 blur-[80px] rounded-full"></div>
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Global Distribution Network</h3>
                        <p className="text-ui-text-body text-sm max-w-xl">
                            Manage availability across {ALL_PLATFORMS.length}+ Digital Service Providers (DSPs). 
                            Your music is currently live on <span className="text-green-400 font-bold">{Object.values(song.distribution).filter((d: any) => d?.status === 'Live').length}</span> platforms.
                        </p>
                    </div>
                    {isDistributable && (
                        <button onClick={handleSelectAll} className="px-5 py-2.5 text-sm font-bold rounded-xl bg-ui-surface border border-ui-border text-primary hover:bg-primary/10 transition-colors shadow-lg">
                            {selectedPlatforms.size >= ALL_PLATFORMS.length ? 'Deselect All' : 'Select All Targets'}
                        </button>
                    )}
                 </div>
             </div>

             {/* Platforms Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                 {ALL_PLATFORMS.map(platform => {
                     const info = song.distribution[platform.id];
                     const status = info?.status;
                     const isLive = status === 'Live';
                     const isProcessing = status === 'Processing' || status === 'Submitted';
                     const canSelect = isDistributable && !status;
                     const isSelected = selectedPlatforms.has(platform.id);

                     return (
                         <div 
                            key={platform.id} 
                            onClick={() => canSelect && handleSelect(platform.id)} 
                            className={`
                                relative group p-4 rounded-2xl border transition-all duration-300 overflow-hidden
                                ${canSelect ? 'cursor-pointer hover:-translate-y-1' : ''}
                                ${isSelected ? 'bg-singularity-teal/10 border-singularity-teal shadow-[0_0_15px_rgba(20,184,166,0.15)]' : 
                                  isLive ? 'bg-green-900/10 border-green-500/30 hover:border-green-500/50' :
                                  isProcessing ? 'bg-blue-900/10 border-blue-500/30' :
                                  'bg-ui-surface border-ui-border hover:border-primary/40'}
                            `}
                         >
                             {/* Selection Glow */}
                             {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-singularity-teal/5 to-transparent pointer-events-none"></div>}

                             <div className="relative z-10 flex items-center gap-3 mb-3">
                                {canSelect && (
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-singularity-teal bg-singularity-teal' : 'border-ui-text-subtle'}`}>
                                        {isSelected && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                )}
                                {getPlatformIcon(platform.name, 'w-8 h-8')}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white truncate">{platform.name}</p>
                                    <p className="text-[10px] text-ui-text-subtle truncate">{platform.region}</p>
                                </div>
                             </div>

                             {/* Status Indicator */}
                             <div className="flex items-center justify-between mt-2">
                                 {status ? (
                                     <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                                         isLive ? 'bg-green-500/20 text-green-400 border-green-500/20' : 
                                         isProcessing ? 'bg-blue-500/20 text-blue-400 border-blue-500/20' : 
                                         'bg-ui-bg text-ui-text-subtle border-ui-border'
                                     }`}>
                                         <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-400 shadow-[0_0_5px_#4ade80]' : 'bg-current'}`}></div>
                                         {status}
                                     </div>
                                 ) : (
                                    <span className="text-[10px] text-ui-text-subtle font-mono">Ready to ship</span>
                                 )}

                                 {isLive && (
                                     <button 
                                        onClick={(e) => { e.stopPropagation(); onTakedown(song.id, platform.id); }} 
                                        className="text-[10px] font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
                                     >
                                         Takedown
                                     </button>
                                 )}
                             </div>
                         </div>
                     )
                 })}
             </div>

             {/* Floating Action Bar - STATIC position at bottom for stability */}
             {selectedPlatforms.size > 0 && isDistributable && (
                <div className="fixed bottom-4 left-0 right-0 px-4 z-50 flex justify-center">
                    <div className="bg-[#0A0A1A] border border-singularity-teal/50 p-3 rounded-full shadow-2xl flex items-center gap-4 pr-3 pl-6 max-w-md w-full">
                        <div className="flex-1">
                            <p className="text-xs text-ui-text-subtle uppercase font-bold">Ready to Deploy</p>
                            <p className="text-white font-bold">{selectedPlatforms.size} Stores Selected</p>
                        </div>
                        <button 
                            onClick={() => onDistribute(song.id, Array.from(selectedPlatforms))} 
                            className="bg-gradient-singularity text-black px-6 py-3 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-glow-primary whitespace-nowrap"
                        >
                            DISTRIBUTE
                        </button>
                    </div>
                </div>
             )}
        </div>
    )
}

export const ReleaseManagerView: React.FC<ReleaseManagerViewProps> = ({ songs: releases, onDeleteSong, onGenerateStrategy: parentGenerateStrategy, onDistribute, onTakedown, onUpdateSong, showToast }) => {
  const { songId } = useParams() as { songId: string };
  const navigate = useNavigate();
  const { language } = useTranslation();
  const release = useMemo(() => releases.find(s => s.id === songId), [releases, songId]);

  const [activeTab, setActiveTab] = useState<ManagerTab>('metadata');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => { if (!release) navigate('/releases') }, [release, navigate]);
  
  const song = useMemo(() => release?.assetType === 'Audio' ? release as Song : null, [release]);

  const handleDeleteConfirm = () => {
    if (!release) return;
    onDeleteSong(release.id);
    setDeleteModalOpen(false);
    navigate('/releases');
  };

  const handleSaveMetadata = (updatedData: Partial<Song>) => {
    if (!song) return;
    onUpdateSong(song.id, updatedData);
  };
  
  const handleGenerateStrategy = () => {
      if (!song) return;
      // Call parent function to trigger the API call in App.tsx where the logic resides
      // Note: App.tsx needs to be updated to pass language to the service, 
      // or we need to intercept it here if `onGenerateStrategy` was a direct service call.
      // Since it's passed from App.tsx, App.tsx handles the service call.
      // We should ensure App.tsx or the service respects the language.
      parentGenerateStrategy(song.id);
  };

  const tabs: {id: ManagerTab; label: string; icon: React.FC<{className?: string}>}[] = [
    { id: 'metadata', label: 'Metadata', icon: PencilAltIcon },
    { id: 'distribution', label: 'Distribution', icon: GlobeIcon },
    { id: 'overview', label: 'Strategy', icon: ChartBarIcon },
    { id: 'danger', label: 'Settings', icon: DangerIcon },
  ];
  
  if (!release || !song) return null;
  
  return (
    <div className="min-h-screen bg-[#050505] text-white font-inter pb-32">
        
        {/* --- IMMERSIVE HEADER --- */}
        <div className="relative w-full min-h-[300px] md:h-[400px] overflow-hidden flex flex-col">
             {/* Blurry Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center blur-[80px] opacity-40 scale-110 transition-all duration-1000"
                style={{ backgroundImage: `url(${release.coverArtUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/80 to-[#050505]"></div>
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex-grow flex flex-col justify-end pb-6 pt-20">
                
                <button onClick={() => navigate('/releases')} className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-sm">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Back</span>
                </button>

                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
                    {/* Cover Art with Holographic Effect */}
                    <div className="relative group shrink-0 mx-auto md:mx-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-50 blur-lg group-hover:opacity-100 transition duration-1000 animate-gradient-xy"></div>
                        <img 
                            src={release.coverArtUrl} 
                            alt={release.title} 
                            className="relative w-40 h-40 md:w-56 md:h-56 rounded-xl shadow-2xl object-cover border border-white/10 z-10" 
                        />
                    </div>

                    {/* Release Info */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                             <span className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80">
                                {release.assetType}
                             </span>
                             <span className={`px-3 py-1 rounded-md backdrop-blur-md border text-[10px] font-bold uppercase tracking-widest ${
                                 release.status === 'Live' ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                             }`}>
                                {release.status}
                             </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2 font-oxanium drop-shadow-xl">
                            {release.title}
                        </h1>
                        <h2 className="text-lg md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-4">
                            {song.artistName}
                        </h2>

                        {/* Quick Stats Mini-Grid */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 border-t border-white/10 pt-4 mt-2">
                            <div>
                                <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Released</p>
                                <p className="text-xs md:text-sm font-bold text-white mt-0.5 font-mono">{new Date(song.releaseDate || Date.now()).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Format</p>
                                <p className="text-xs md:text-sm font-bold text-white mt-0.5">{song.releaseType}</p>
                            </div>
                             <div>
                                <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Genre</p>
                                <p className="text-xs md:text-sm font-bold text-white mt-0.5">{song.genre}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- STATIC NAVIGATION (NO STICKY) --- */}
        <div className="relative z-40 bg-[#050505] border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full">
                    {tabs.map(tab => (
                        <TabButton 
                            key={tab.id} 
                            name={tab.label} 
                            icon={tab.icon} 
                            isActive={activeTab === tab.id} 
                            onClick={() => setActiveTab(tab.id as ManagerTab)} 
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <main className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
            
            {activeTab === 'metadata' && (
                <div className="bg-[#0A0A0A] rounded-3xl border border-white/5 p-1 overflow-hidden shadow-2xl">
                     <MetadataEditor 
                        releaseData={song}
                        onSave={handleSaveMetadata}
                        showToast={showToast}
                        onCancel={() => navigate('/releases')}
                    />
                </div>
            )}

            {activeTab === 'distribution' && (
                <DistributionTab song={song} onDistribute={onDistribute} onTakedown={onTakedown} />
            )}

            {activeTab === 'overview' && (
                <div className="bg-[#0A0A0A] rounded-3xl border border-white/5 p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white font-oxanium">AI Strategy Engine</h3>
                            <p className="text-sm text-ui-text-subtle mt-1">Automated marketing plan based on sonic analysis.</p>
                        </div>
                        {!song.marketingStrategy && (
                            <button onClick={handleGenerateStrategy} className="w-full md:w-auto btn-quantum-glow px-6 py-3 rounded-full font-bold text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                                <SparklesIcon className="w-5 h-5" />
                                Generate New Strategy
                            </button>
                        )}
                    </div>

                    {song.marketingStrategy ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Strategy Content */}
                            <div className="lg:col-span-2 prose prose-invert prose-lg max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: song.marketingStrategy.replace(/\n/g, '<br/>') }} />
                            </div>
                            
                            {/* Sidebar Widgets */}
                            <div className="space-y-6">
                                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                                    <h4 className="text-sm font-bold text-ui-text-subtle uppercase mb-4">Target Audience</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Gen Z', 'Gamers', 'Lofi Listeners', 'Night Drive'].map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold border border-white/10">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl border border-white/10 text-center">
                                    <h4 className="text-2xl font-bold text-white mb-1">92/100</h4>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Viral Potential</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-ui-surface rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <SparklesIcon className="w-10 h-10 text-ui-text-subtle"/>
                            </div>
                            <h3 className="text-xl font-bold text-white">No Strategy Generated</h3>
                            <p className="text-ui-text-subtle mt-2 max-w-md">Use our AI engine to analyze your track's audio signature and metadata to create a tailored launch plan.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'danger' && (
                <div className="flex items-center justify-center py-20">
                    <div className="bg-[#1A0505] border border-red-500/30 p-6 md:p-10 rounded-3xl max-w-2xl w-full text-center shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                            <DangerIcon className="w-10 h-10 text-red-500"/>
                        </div>
                        <h3 className="text-3xl font-bold text-red-500 mb-3">Danger Zone</h3>
                        <p className="text-red-200/70 mb-8 leading-relaxed text-sm md:text-base">
                            Deleting this release will permanently remove it from your catalog and issue takedown requests to all connected stores. This action cannot be undone.
                        </p>
                        <button onClick={() => setDeleteModalOpen(true)} className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/40 hover:-translate-y-1 w-full md:w-auto">
                            Permanently Delete Release
                        </button>
                    </div>
                </div>
            )}
        </main>

        <ConfirmationModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            title="Confirm Nuclear Option"
            message={`Are you absolutely sure you want to delete "${release.title}"? This is irreversible.`}
        />
    </div>
  );
};