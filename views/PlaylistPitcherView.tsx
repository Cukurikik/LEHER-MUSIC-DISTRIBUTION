
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song } from '../types';
import CustomSelector from '../components/ui/CustomSelector';
import { generatePlaylistPitch } from '../services/geminiService';
import SparklesIcon from '../components/layout/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface PlaylistPitcherViewProps {
  songs: Song[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

interface PitchResult {
    pitch: string;
    playlists: string[];
}

const LoadingSpinner: React.FC = () => (
    <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin"></div>
);

const PlaylistPitcherView: React.FC<PlaylistPitcherViewProps> = ({ songs, showToast }) => {
    const navigate = useNavigate();
    const { language } = useTranslation();
    const [selectedSongId, setSelectedSongId] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<PitchResult | null>(null);
    const [copiedPitch, setCopiedPitch] = useState(false);

    const liveSongs = useMemo(() => songs.filter(s => s.status === 'Live'), [songs]);

    const songOptions = useMemo(() => liveSongs.map(s => ({ 
        value: s.id, 
        label: s.title,
        artist: s.artistName,
        cover: s.coverArtUrl
    })), [liveSongs]);

    const selectedSong = useMemo(() => liveSongs.find(s => s.id === selectedSongId), [liveSongs, selectedSongId]);

    const handleGenerate = async () => {
        if (!selectedSong) {
            showToast('Please select a live release first.', 'warning');
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const pitchData = await generatePlaylistPitch({
                title: selectedSong.title,
                artistName: selectedSong.artistName,
                genre: selectedSong.genre,
            }, language);
            setResult(pitchData);
            showToast('Pitch and playlists generated!', 'success');
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            showToast(message, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (result?.pitch) {
            navigator.clipboard.writeText(result.pitch);
            setCopiedPitch(true);
            setTimeout(() => setCopiedPitch(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                 <button onClick={() => navigate('/toolkit')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading">AI Playlist Pitcher</h1>
                <p className="text-lg text-ui-text mt-1">Get your music heard. Generate pitches and find the right playlists.</p>
            </div>

            <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border shadow-sm p-6 space-y-4">
                <label className="font-semibold mb-2 block text-ui-text">1. Select a Live Release</label>
                <CustomSelector
                    value={selectedSongId}
                    onChange={setSelectedSongId}
                    options={songOptions}
                    placeholder="Choose a song to pitch..."
                     renderOption={(option) => (
                        <div className="flex items-center gap-3">
                            {option.cover && <img src={option.cover} className="w-8 h-8 rounded-md" alt={option.label} />}
                            <div>
                                <p className="font-semibold">{option.label}</p>
                                {option.artist && <p className="text-xs text-ui-text/70">{option.artist}</p>}
                            </div>
                        </div>
                    )}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !selectedSongId}
                    className="w-full mt-2 flex items-center justify-center gap-3 bg-primary text-black font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow-primary btn-border-glow"
                >
                    <SparklesIcon className="w-5 h-5"/>
                    {isLoading ? 'Generating...' : 'Generate Pitch & Playlists'}
                </button>
            </div>
            
            {isLoading && (
                 <div className="text-center py-16 flex flex-col items-center justify-center">
                    <LoadingSpinner />
                    <p className="mt-4 text-ui-text">Finding the perfect words...</p>
                 </div>
            )}
            
            {result && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                     <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-6">
                        <h2 className="text-2xl font-bold text-ui-text-heading mb-3">Your Pitch</h2>
                        <div className="bg-ui-bg/50 p-4 rounded-lg prose prose-sm prose-invert text-ui-text">
                           <p>{result.pitch}</p>
                        </div>
                        <button onClick={handleCopy} className="mt-4 w-full bg-ui-border text-ui-text-heading font-semibold py-2 rounded-lg hover:bg-opacity-50 transition-colors">
                            {copiedPitch ? 'Copied!' : 'Copy Pitch'}
                        </button>
                    </div>
                     <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-6">
                         <h2 className="text-2xl font-bold text-ui-text-heading mb-3">Suggested Playlists</h2>
                         <ul className="space-y-2">
                             {result.playlists.map((playlist, index) => (
                                 <li key={index} className="flex items-center gap-3 bg-ui-bg/50 p-3 rounded-lg">
                                    <SparklesIcon className="w-5 h-5 text-quantum-flux flex-shrink-0" />
                                    <span className="text-ui-text-heading font-semibold">{playlist}</span>
                                 </li>
                             ))}
                         </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PlaylistPitcherView;