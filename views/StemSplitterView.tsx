
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);

const StemSplitterView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isSplitting, setIsSplitting] = useState(false);
    const [stems, setStems] = useState<string[] | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAudioFile(e.target.files[0]);
            setStems(null);
        }
    };
    
    const handleSplit = () => {
        setIsSplitting(true);
        setTimeout(() => {
            setStems(["Vocals", "Drums", "Bass", "Other"]);
            setIsSplitting(false);
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_ai_stem_splitter_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_ai_stem_splitter_desc')}</p>
            </div>

            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                {!stems && (
                    <div className="text-center">
                        <label htmlFor="audio-upload" className="cursor-pointer group flex flex-col justify-center items-center h-64 border-2 border-dashed border-ui-border hover:border-primary rounded-2xl p-6 transition-colors bg-ui-bg/50 hover:bg-primary/5">
                            <UploadIcon className="w-12 h-12 text-ui-text-subtle group-hover:text-primary transition-colors mb-4" />
                            <p className="font-bold text-2xl text-ui-text-heading">{audioFile ? audioFile.name : "Upload your track"}</p>
                            <p className="text-ui-text-body">{audioFile ? "Ready to be split." : "Drop your mixed audio file here."}</p>
                            <input id="audio-upload" type="file" className="hidden" onChange={handleFileChange} accept="audio/*" />
                        </label>
                        <button onClick={handleSplit} disabled={!audioFile || isSplitting} className="mt-6 btn-glow-primary px-8 py-3 rounded-full font-bold disabled:opacity-50">
                            {isSplitting ? 'Splitting Stems...' : 'Split Stems'}
                        </button>
                    </div>
                )}
                
                {isSplitting && (
                     <div className="text-center py-16">
                         <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin mx-auto"></div>
                         <p className="mt-4 text-ui-text-heading font-semibold">AI is analyzing and splitting your track...</p>
                    </div>
                )}

                {stems && (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-2xl font-bold text-ui-text-heading text-center">Your Stems are Ready!</h2>
                        {stems.map(stem => (
                            <div key={stem} className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border flex items-center justify-between">
                                <p className="font-semibold text-lg text-ui-text-heading">{stem}</p>
                                <a href="#" download className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-colors">
                                    <DownloadIcon className="w-4 h-4" />
                                    Download
                                </a>
                            </div>
                        ))}
                         <button onClick={() => { setAudioFile(null); setStems(null); }} className="w-full mt-4 text-sm font-semibold text-primary hover:underline">Split another track</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StemSplitterView;
