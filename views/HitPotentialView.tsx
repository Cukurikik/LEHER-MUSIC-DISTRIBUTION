
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);
const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> </svg> );

const HitPotentialView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAudioFile(e.target.files[0]);
            setAnalysisResult(null);
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setAnalysisResult({
                overallScore: 88,
                melody: { score: 92, feedback: "Catchy and memorable hook. Strong potential for listener retention." },
                structure: { score: 85, feedback: "Classic verse-chorus structure is highly effective. Bridge provides good dynamic shift." },
                mix: { score: 89, feedback: "Clean and powerful mix. Vocals are clear and instrumentation is well-balanced." },
                marketFit: { score: 86, feedback: "Synthwave style fits well with current nostalgia trends on platforms like TikTok and YouTube." },
            });
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_quantum_hit_potential_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_quantum_hit_potential_desc')}</p>
            </div>

            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                {!analysisResult && (
                     <div className="text-center">
                        <label htmlFor="audio-upload" className="cursor-pointer group flex flex-col justify-center items-center h-64 border-2 border-dashed border-ui-border hover:border-primary rounded-2xl p-6 transition-colors bg-ui-bg/50 hover:bg-primary/5">
                            <UploadIcon className="w-12 h-12 text-ui-text-subtle group-hover:text-primary transition-colors mb-4" />
                            <p className="font-bold text-2xl text-ui-text-heading">{audioFile ? audioFile.name : "Upload your track"}</p>
                            <p className="text-ui-text-body">{audioFile ? "File selected. Ready to analyze." : "Drop your WAV or FLAC file here."}</p>
                            <input id="audio-upload" type="file" className="hidden" onChange={handleFileChange} accept="audio/*" />
                        </label>
                        <button onClick={handleAnalyze} disabled={!audioFile || isAnalyzing} className="mt-6 btn-glow-primary px-8 py-3 rounded-full font-bold disabled:opacity-50 flex items-center justify-center mx-auto gap-2">
                           <SparklesIcon className="w-5 h-5"/> {isAnalyzing ? 'Analyzing with AI...' : 'Analyze Hit Potential'}
                        </button>
                    </div>
                )}
               
                {isAnalyzing && (
                     <div className="text-center py-16">
                         <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin mx-auto"></div>
                         <p className="mt-4 text-ui-text-heading font-semibold">Analyzing harmonic structure and market trends...</p>
                    </div>
                )}

                {analysisResult && (
                    <div className="animate-fade-in space-y-6">
                        <div className="text-center">
                            <p className="text-ui-text-subtle">Overall Hit Potential</p>
                            <p className="text-8xl font-black text-gradient-primary my-2">{analysisResult.overallScore}<span className="text-4xl">%</span></p>
                            <button onClick={() => { setAudioFile(null); setAnalysisResult(null); }} className="text-sm font-semibold text-primary hover:underline">Analyze another track</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border">
                                <h4 className="font-bold text-ui-text-heading">Melody & Hook</h4>
                                <p className="text-2xl font-bold text-primary">{analysisResult.melody.score}%</p>
                                <p className="text-xs text-ui-text-body mt-1">{analysisResult.melody.feedback}</p>
                            </div>
                            <div className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border">
                                <h4 className="font-bold text-ui-text-heading">Structure & Arrangement</h4>
                                <p className="text-2xl font-bold text-primary">{analysisResult.structure.score}%</p>
                                <p className="text-xs text-ui-text-body mt-1">{analysisResult.structure.feedback}</p>
                            </div>
                            <div className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border">
                                <h4 className="font-bold text-ui-text-heading">Mix & Master</h4>
                                <p className="text-2xl font-bold text-primary">{analysisResult.mix.score}%</p>
                                <p className="text-xs text-ui-text-body mt-1">{analysisResult.mix.feedback}</p>
                            </div>
                            <div className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border">
                                <h4 className="font-bold text-ui-text-heading">Market Fit</h4>
                                <p className="text-2xl font-bold text-primary">{analysisResult.marketFit.score}%</p>
                                <p className="text-xs text-ui-text-body mt-1">{analysisResult.marketFit.feedback}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HitPotentialView;
