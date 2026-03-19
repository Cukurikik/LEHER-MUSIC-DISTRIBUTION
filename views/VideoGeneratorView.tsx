
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);

const VideoGeneratorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isGenerating, setIsGenerating] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [activeStyle, setActiveStyle] = useState('Cosmic Drift');


    const userSongs = [
        { id: "song-1", title: "DJ Pesta Gila" },
        { id: "song-2", title: "DJ Lagu Santai" },
    ];
    
    const visualStyles = ["Cosmic Drift", "Neon Noir", "Minimalist Glitch", "Nature Ethereal", "Retro Film", "Psychedelic Bloom"];

    const handleGenerate = () => {
        setIsGenerating(true);
        setVideoReady(false);
        setTimeout(() => {
            setIsGenerating(false);
            setVideoReady(true);
        }, 4000);
    };
    
    const inputStyles = "w-full bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-ui-text-heading focus:ring-2 focus:ring-primary focus:border-primary transition";

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_ai_music_video_generator_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_ai_music_video_generator_desc')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-6">
                    <div>
                        <label htmlFor="song-select" className="block font-semibold text-ui-text-heading mb-2">1. {t('select_song')}:</label>
                        <select id="song-select" className={inputStyles}>
                            {userSongs.map(song => <option key={song.id} value={song.id}>{song.title}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block font-semibold text-ui-text-heading mb-2">2. {t('select_style')}:</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                           {visualStyles.map(style => 
                                <button 
                                    key={style} 
                                    onClick={() => setActiveStyle(style)}
                                    className={`p-3 border-2 rounded-lg text-sm transition-colors ${activeStyle === style ? 'border-primary bg-primary/20' : 'border-ui-border bg-ui-bg/50 hover:border-primary/50'}`}>
                                    {style}
                                </button>
                            )}
                        </div>
                    </div>
                    <button onClick={handleGenerate} disabled={isGenerating} className="w-full btn-glow-primary py-3 rounded-full font-bold disabled:opacity-50">
                        {isGenerating ? t('generating') : t('tool_cta_generate')}
                    </button>
                </div>
                 <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border flex flex-col items-center justify-center min-h-[300px]">
                    {isGenerating && (
                         <div className="text-center">
                             <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin mx-auto"></div>
                             <p className="mt-4 text-ui-text-heading font-semibold">AI is rendering your visuals...</p>
                        </div>
                    )}
                    {videoReady && (
                        <div className="w-full animate-fade-in space-y-4">
                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-primary font-bold border border-ui-border">[Video Rendered Successfully]</div>
                            <a href="#" download className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-colors">
                                <DownloadIcon className="w-4 h-4" />
                                {t('download_video_mp4')}
                            </a>
                        </div>
                    )}
                     {!isGenerating && !videoReady && (
                        <div className="text-center text-ui-text-subtle">
                             <p>Your video preview will appear here.</p>
                        </div>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default VideoGeneratorView;
