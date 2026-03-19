
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import { generateAICoverArt } from '../services/geminiService';
import SparklesIcon from '../components/layout/SparklesIcon';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);

const LoadingSpinner: React.FC = () => (
    <div className="w-24 h-24 border-4 border-dashed border-primary rounded-full animate-spin"></div>
);

const CoverArtAIGeneratorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!title || !artist || !prompt) {
            alert('Please fill in title, artist, and prompt.');
            return;
        }
        setIsLoading(true);
        setGeneratedImage(null);
        const result = await generateAICoverArt(title, artist, prompt);
        setIsLoading(false);
        if (result.startsWith('data:image')) {
            setGeneratedImage(result);
        } else {
            alert(result); // Show error
        }
    };

    const inputStyles = "w-full bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-ui-text-heading focus:ring-2 focus:ring-primary focus:border-primary transition";

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_cover_art_ai_generator_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_cover_art_ai_generator_desc')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-4">
                     <div>
                        <label htmlFor="title" className="block font-semibold text-ui-text-heading mb-2">1. {t('table_header_title')}:</label>
                        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputStyles} placeholder="Cosmic Drift" />
                    </div>
                     <div>
                        <label htmlFor="artist" className="block font-semibold text-ui-text-heading mb-2">2. {t('table_header_artist')}:</label>
                        <input id="artist" type="text" value={artist} onChange={e => setArtist(e.target.value)} className={inputStyles} placeholder="Galaxy Runners" />
                    </div>
                    <div>
                        <label htmlFor="prompt" className="block font-semibold text-ui-text-heading mb-2">3. {t('description')}:</label>
                        <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} className={inputStyles} placeholder="A white Ford Mustang sports car with two black racing stripes down the center..." />
                    </div>
                    <button onClick={handleGenerate} disabled={isLoading} className="w-full btn-glow-primary py-3 rounded-full font-bold disabled:opacity-50 flex items-center justify-center gap-2">
                         <SparklesIcon className="w-5 h-5"/>
                        {isLoading ? t('generating') : t('tool_cta_generate')}
                    </button>
                </div>

                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border flex flex-col items-center justify-center min-h-[400px]">
                    {isLoading && <LoadingSpinner />}
                    {!isLoading && generatedImage && (
                        <div className="w-full animate-fade-in space-y-4">
                            <img src={generatedImage} alt="Generated cover art" className="w-full aspect-square rounded-lg shadow-lg" />
                            <a
                                href={generatedImage}
                                download={`${title.replace(/ /g, '_')}_cover.jpg`}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-colors"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                Download Cover
                            </a>
                        </div>
                    )}
                    {!isLoading && !generatedImage && (
                        <div className="text-center text-ui-text-subtle">
                             <p>Your AI-generated cover preview will appear here.</p>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

export default CoverArtAIGeneratorView;
