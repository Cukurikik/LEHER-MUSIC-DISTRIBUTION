import React, { useState, useRef, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useParams, useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { MasteringProject } from '../types';

// Icons
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);


const Waveform: React.FC<{ isMastered: boolean }> = ({ isMastered }) => (
    <div className={`h-20 w-full flex items-center gap-px ${isMastered ? '[&>div]:bg-primary' : '[&>div]:bg-ui-text/50'}`}>
        {Array.from({ length: 60 }).map((_, i) => {
            const height = isMastered
                ? Math.sin(i / 3 + 2) * 25 + 60
                : Math.sin(i / 5) * 20 + 40;
            return <div key={i} className="w-full rounded-full" style={{ height: `${height}%` }}></div>
        })}
    </div>
);


const ABPlayer: React.FC<{ project: MasteringProject }> = ({ project }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeVersion, setActiveVersion] = useState<'original' | 'mastered'>('mastered');
    const [progress, setProgress] = useState(0);

    // In a real app, these would point to actual audio files.
    const originalRef = useRef<HTMLAudioElement>(null);
    const masteredRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audioToPlay = activeVersion === 'original' ? originalRef.current : masteredRef.current;
        const audioToPause = activeVersion === 'original' ? masteredRef.current : originalRef.current;
        
        if (isPlaying) {
            audioToPlay?.play();
            audioToPause?.pause();
        } else {
            audioToPlay?.pause();
        }
    }, [isPlaying, activeVersion]);
    
    // This is a mock effect. A real implementation would sync the two audio tracks.
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setProgress(p => (p + 1) % 100);
            }, 300);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    return (
         <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
            <div className="flex justify-center items-center gap-4 mb-4">
                 <button onClick={togglePlay} className="text-primary hover:text-white transition-colors">
                     {isPlaying ? <PauseIcon className="w-16 h-16"/> : <PlayIcon className="w-16 h-16" />}
                 </button>
                 <div className="flex-1 space-y-2">
                     <Waveform isMastered={activeVersion === 'mastered'} />
                     <div className="w-full bg-ui-border h-1 rounded-full overflow-hidden">
                        <div className="bg-primary h-1" style={{width: `${progress}%`}}></div>
                     </div>
                 </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setActiveVersion('original')} className={`py-2 px-4 rounded-md font-semibold transition-colors ${activeVersion === 'original' ? 'bg-ui-border text-primary' : 'bg-transparent text-ui-text hover:bg-ui-border/50'}`}>Original</button>
                <button onClick={() => setActiveVersion('mastered')} className={`py-2 px-4 rounded-md font-semibold transition-colors ${activeVersion === 'mastered' ? 'bg-primary text-black' : 'bg-transparent text-ui-text hover:bg-ui-border/50'}`}>Mastered</button>
            </div>
        </div>
    );
};

const StatDisplay: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-ui-surface p-3 rounded-lg text-center">
        <p className="text-sm font-semibold text-ui-text/80">{label}</p>
        <p className="text-xl font-bold text-ui-text-heading">{value}</p>
    </div>
);

interface MasteringDetailViewProps {
    projects: MasteringProject[];
}

const MasteringDetailView: React.FC<MasteringDetailViewProps> = ({ projects }) => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const project = useMemo(() => projects.find(p => p.id === projectId), [projects, projectId]);

    if (!project) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold">Project Not Found</h2>
                <button onClick={() => navigate('/distribution-tools/ai-mastering')} className="mt-4 text-primary hover:underline">Return to Mastering Studio</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
             <div>
                <button onClick={() => navigate('/distribution-tools/ai-mastering')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Mastering Studio
                </button>
                <div className="flex items-start gap-6">
                     <img src={project.coverArtUrl} alt="cover art" className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover flex-shrink-0" />
                     <div className="pt-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-ui-text-heading">{project.projectName}</h1>
                        <p className="text-lg text-ui-text mt-1">{project.artistName}</p>
                        <p className="text-md text-quantum-flux font-semibold mt-2">Style: {project.style}</p>
                     </div>
                </div>
            </div>

            <ABPlayer project={project} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-ui-surface/50 border border-ui-border rounded-xl p-4">
                    <h3 className="text-lg font-bold text-ui-text-heading mb-3 text-center">Original Audio</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <StatDisplay label="LUFS" value={project.originalStats.lufs.toFixed(1)} />
                        <StatDisplay label="Peak" value={`${project.originalStats.peak.toFixed(1)} dB`} />
                        <StatDisplay label="DR" value={project.originalStats.dr} />
                    </div>
                </div>
                 <div className="bg-primary/10 border border-primary/50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-quantum-flux mb-3 text-center">Mastered Audio</h3>
                     <div className="grid grid-cols-3 gap-3">
                        <StatDisplay label="LUFS" value={project.masteredStats.lufs.toFixed(1)} />
                        <StatDisplay label="Peak" value={`${project.masteredStats.peak.toFixed(1)} dB`} />
                        <StatDisplay label="DR" value={project.masteredStats.dr} />
                    </div>
                </div>
            </div>
            
             <div className="pt-6 border-t border-ui-border flex flex-col md:flex-row justify-center gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ui-border hover:bg-opacity-50 text-ui-text-heading font-bold transition btn-glow-subtle">
                    <DownloadIcon className="w-5 h-5" /> Download Original (.WAV)
                </button>
                 <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 btn-glow-primary">
                    <DownloadIcon className="w-5 h-5" /> Download Mastered (.WAV)
                </button>
            </div>

        </div>
    );
};

export default MasteringDetailView;