

import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { generateLyrics } from '../services/geminiService';
import SparklesIcon from '../components/layout/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface LyricsGeneratorViewProps {
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const LyricsGeneratorView: React.FC<LyricsGeneratorViewProps> = ({ showToast }) => {
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [mood, setMood] = useState('');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lyrics, setLyrics] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!title || !artist || !mood || !topic) {
            showToast('Please fill in all fields.', 'warning');
            return;
        }
        setIsLoading(true);
        setLyrics('');
        try {
            const result = await generateLyrics(title, artist, mood, topic, language);
            setLyrics(result);
            showToast('Lyrics generated successfully!', 'success');
        } catch (error) {
            showToast('Failed to generate lyrics.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (lyrics) {
            navigator.clipboard.writeText(lyrics);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const inputStyles = "w-full bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-ui-text-heading focus:ring-2 focus:ring-primary focus:border-primary transition";

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading">AI Lyrics Generator</h1>
                <p className="text-lg text-ui-text mt-1">Generate creative song lyrics based on your ideas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-ui-text-heading">Input Details</h2>
                    <div><label className="font-semibold mb-1 block">Song Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputStyles} placeholder="e.g., Midnight Drive"/></div>
                    <div><label className="font-semibold mb-1 block">Artist Name</label><input type="text" value={artist} onChange={e => setArtist(e.target.value)} className={inputStyles} placeholder="e.g., Neon Bloom"/></div>
                    <div><label className="font-semibold mb-1 block">Mood</label><input type="text" value={mood} onChange={e => setMood(e.target.value)} className={inputStyles} placeholder="e.g., Nostalgic, Hopeful"/></div>
                    <div><label className="font-semibold mb-1 block">Topic / Theme</label><textarea value={topic} onChange={e => setTopic(e.target.value)} className={inputStyles} placeholder="e.g., Driving through the city at night, thinking about the past" rows={3}/></div>
                    <button onClick={handleGenerate} disabled={isLoading} className="w-full mt-2 flex items-center justify-center gap-3 bg-primary text-black font-bold py-3 px-6 rounded-full hover:brightness-110 transition disabled:opacity-50 btn-glow-primary">
                        <SparklesIcon className="w-5 h-5"/>
                        {isLoading ? 'Generating...' : 'Generate Lyrics'}
                    </button>
                </div>
                <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-6">
                    <h2 className="text-2xl font-bold text-ui-text-heading mb-4">Generated Lyrics</h2>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full"><div className="w-12 h-12 border-4 border-dashed border-primary rounded-full animate-spin"></div></div>
                    ) : lyrics ? (
                        <div className="space-y-4">
                            <div className="prose prose-sm prose-invert max-w-none text-ui-text-body bg-ui-bg/50 p-4 rounded-lg max-h-80 overflow-y-auto" dangerouslySetInnerHTML={{ __html: lyrics.replace(/\n/g, '<br/>') }}></div>
                            <button onClick={handleCopy} className="w-full bg-ui-border text-ui-text-heading font-semibold py-2 rounded-lg hover:bg-opacity-50 transition-colors">{copied ? 'Copied!' : 'Copy Lyrics'}</button>
                        </div>
                    ) : (
                        <div className="text-center text-ui-text-subtle h-full flex items-center justify-center"><p>Your generated lyrics will appear here.</p></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LyricsGeneratorView;