
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { getAudioAnalysis, AudioAnalysisResult } from '../services/geminiService';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> </svg> );
const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>);

const AudioAnalysisView: React.FC = () => {
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [genre, setGenre] = useState('Pop');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AudioAnalysisResult | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!songTitle || !artistName) return;
        
        setIsAnalyzing(true);
        setAnalysisResult(null);
        try {
            const result = await getAudioAnalysis(songTitle, artistName, genre, language);
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            alert("Failed to analyze audio. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_audio_analysis_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_audio_analysis_desc')}</p>
            </div>

            <div className="bg-ui-surface p-8 rounded-2xl border border-ui-border shadow-xl">
                <form onSubmit={handleAnalyze} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ui-text-heading uppercase tracking-wider">Song Title</label>
                            <input 
                                type="text" 
                                value={songTitle}
                                onChange={(e) => setSongTitle(e.target.value)}
                                placeholder="e.g. Blinding Lights"
                                className="w-full bg-ui-bg border border-ui-border rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ui-text-heading uppercase tracking-wider">Artist Name</label>
                            <input 
                                type="text" 
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                placeholder="e.g. The Weeknd"
                                className="w-full bg-ui-bg border border-ui-border rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-ui-text-heading uppercase tracking-wider">Genre</label>
                        <select 
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full bg-ui-bg border border-ui-border rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        >
                            <option>Pop</option>
                            <option>Electronic</option>
                            <option>Hip-Hop</option>
                            <option>Rock</option>
                            <option>Jazz</option>
                            <option>Classical</option>
                            <option>R&B</option>
                            <option>Country</option>
                            <option>Indie</option>
                            <option>Metal</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isAnalyzing || !songTitle || !artistName}
                        className="w-full btn-glow-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5" />
                                {t('tool_audio_analysis_cta')}
                            </>
                        )}
                    </button>
                </form>
            </div>

            {analysisResult && (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-ui-surface p-8 rounded-2xl border border-ui-border shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MusicNoteIcon className="w-32 h-32" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-primary rounded-full"></div>
                            Analysis Results
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-ui-bg/40 p-6 rounded-xl border border-white/5 flex flex-col items-center text-center">
                                <span className="text-ui-text-subtle text-xs uppercase tracking-widest mb-2">Tempo</span>
                                <span className="text-4xl font-black text-primary">{analysisResult.bpm}</span>
                                <span className="text-ui-text-body text-sm mt-1">BPM</span>
                            </div>
                            <div className="bg-ui-bg/40 p-6 rounded-xl border border-white/5 flex flex-col items-center text-center">
                                <span className="text-ui-text-subtle text-xs uppercase tracking-widest mb-2">Musical Key</span>
                                <span className="text-4xl font-black text-secondary">{analysisResult.key}</span>
                                <span className="text-ui-text-body text-sm mt-1">Scale</span>
                            </div>
                            <div className="bg-ui-bg/40 p-6 rounded-xl border border-white/5 flex flex-col items-center text-center">
                                <span className="text-ui-text-subtle text-xs uppercase tracking-widest mb-2">Instrumental</span>
                                <span className="text-4xl font-black text-accent">{analysisResult.isInstrumental ? 'YES' : 'NO'}</span>
                                <span className="text-ui-text-body text-sm mt-1">Vocal Check</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-ui-text-heading uppercase tracking-wider mb-4">Mood Profile</h3>
                                <div className="flex flex-wrap gap-3">
                                    {analysisResult.moods.map((mood, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
                                            {mood}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <h3 className="text-sm font-bold text-ui-text-heading uppercase tracking-wider mb-4">Rights & Duplication Check</h3>
                                <div className={`p-4 rounded-xl border flex items-center gap-4 ${analysisResult.duplicateCheck.status === 'clean' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                                    <div className={`w-3 h-3 rounded-full animate-pulse ${analysisResult.duplicateCheck.status === 'clean' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <div>
                                        <p className="font-bold uppercase text-xs tracking-widest">Status: {analysisResult.duplicateCheck.status}</p>
                                        {analysisResult.duplicateCheck.matchDetails && (
                                            <p className="text-sm mt-1 opacity-80">{analysisResult.duplicateCheck.matchDetails}</p>
                                        )}
                                        {analysisResult.duplicateCheck.status === 'clean' && (
                                            <p className="text-sm mt-1 opacity-80">No significant matches found in our global fingerprint database.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <button 
                            onClick={() => { setAnalysisResult(null); setSongTitle(''); setArtistName(''); }}
                            className="text-ui-text-subtle hover:text-white transition-colors text-sm font-medium underline underline-offset-4"
                        >
                            Analyze another track
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioAnalysisView;
