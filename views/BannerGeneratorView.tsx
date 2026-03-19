

import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song } from '../types';
import CustomSelector from '../components/ui/CustomSelector';
import { generateBannerImage } from '../services/geminiService';
import SparklesIcon from '../components/layout/SparklesIcon';
import ApiCodeSnippet from '../components/ApiCodeSnippet';

interface BannerGeneratorViewProps {
  songs: Song[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

type AspectRatio = '16:9' | '1:1' | '4:3' | '3:4' | '9:16';

const aspectRatios: { value: AspectRatio; label: string }[] = [
    { value: '16:9', label: '16:9 (YouTube Banner)' },
    { value: '9:16', label: '9:16 (Stories & Reels)' },
    { value: '1:1', label: '1:1 (Social Post)' },
    { value: '4:3', label: '4:3 (Landscape)' },
    { value: '3:4', label: '3:4 (Portrait)' },
];

const LoadingSpinner: React.FC = () => (
    <div className="w-24 h-24 border-4 border-dashed border-primary rounded-full animate-spin"></div>
);

const BannerGeneratorView: React.FC<BannerGeneratorViewProps> = ({ songs, showToast }) => {
    const navigate = useNavigate();
    const [selectedSongId, setSelectedSongId] = useState<string | undefined>();
    const [userPrompt, setUserPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

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
            showToast('Please select a song first.', 'warning');
            return;
        }

        setIsLoading(true);
        setGeneratedImage(null);

        const result = await generateBannerImage(
            { title: selectedSong.title, artistName: selectedSong.artistName, genre: selectedSong.genre, description: selectedSong.description },
            userPrompt,
            aspectRatio
        );

        setIsLoading(false);

        if (result.startsWith('data:image')) {
            setGeneratedImage(result);
            showToast('Banner generated successfully!', 'success');
        } else {
            showToast(result, 'error');
        }
    };
    
    const inputStyles = "w-full bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-ui-text-heading focus:ring-2 focus:ring-primary focus:border-primary transition";

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <div>
                 <button onClick={() => navigate('/toolkit')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading">AI Banner Generator</h1>
                <p className="text-lg text-ui-text mt-1">Create stunning promotional banners for your releases using AI.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6 bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-ui-text-heading">Configuration</h2>
                    <div>
                        <label className="font-semibold mb-2 block text-ui-text">1. Select a Live Release</label>
                        <CustomSelector
                            value={selectedSongId}
                            onChange={setSelectedSongId}
                            options={songOptions}
                            placeholder="Choose a song..."
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
                    </div>
                     <div>
                        <label htmlFor="aspect-ratio" className="font-semibold mb-2 block text-ui-text">2. Choose Aspect Ratio</label>
                        <div className="grid grid-cols-2 gap-2">
                             {aspectRatios.map(ar => (
                                <button
                                    key={ar.value}
                                    type="button"
                                    onClick={() => setAspectRatio(ar.value)}
                                    className={`p-2 rounded-lg border-2 transition-all text-sm ${aspectRatio === ar.value ? 'border-primary shadow-md bg-primary/10' : 'border-ui-border hover:border-primary/50'}`}
                                >
                                    {ar.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="user-prompt" className="font-semibold mb-2 block text-ui-text">3. Add Your Instructions (Optional)</label>
                        <textarea
                            id="user-prompt"
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            className={inputStyles}
                            rows={4}
                            placeholder="e.g., a cosmic theme with planets and nebulae, retro 80s vibe, minimalist and clean..."
                        />
                         <p className="text-xs text-ui-text/70 mt-1">Note: AI may not render text perfectly. For best results, you might want to generate a background and add text with an editor.</p>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !selectedSongId}
                        className="w-full mt-4 flex items-center justify-center gap-3 bg-primary text-black font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow-primary btn-border-glow"
                    >
                        <SparklesIcon className="w-5 h-5"/>
                        {isLoading ? 'Generating...' : 'Generate Banner'}
                    </button>
                </div>

                <div className="lg:col-span-2 bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border shadow-sm p-6 flex flex-col items-center justify-center min-h-[400px]">
                    <h2 className="text-2xl font-bold text-ui-text-heading mb-4">Result</h2>
                    <div className="w-full flex-grow flex items-center justify-center">
                        {isLoading && <LoadingSpinner />}
                        {!isLoading && generatedImage && (
                            <div className="space-y-4 w-full">
                                <img src={generatedImage} alt="Generated banner" className="w-full rounded-lg shadow-lg" />
                                <a
                                    href={generatedImage}
                                    download={`${selectedSong?.title}_banner.jpg`}
                                    className="w-full block text-center bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"
                                >
                                    Download Banner
                                </a>
                            </div>
                        )}
                        {!isLoading && !generatedImage && (
                            <div className="text-center text-ui-text">
                                <p>Your generated banner will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
             <div className="mt-8 bg-ui-surface/70 backdrop-blur-lg border border-ui-border rounded-xl p-6">
                <ApiCodeSnippet
                    title="Automate with API"
                    description="Generate banners programmatically using our API."
                    endpoint="POST /api/v1/tools/banner-generator/generate"
                    snippets={{
                        curl: `curl -X POST https://api.lehermusic.com/api/v1/tools/banner-generator/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "songId": "${selectedSongId || 'SONG_ID'}",
    "prompt": "${userPrompt || 'A cosmic theme with planets'}",
    "aspectRatio": "${aspectRatio}"
  }'`,
                        javascript: `const response = await fetch('https://api.lehermusic.com/api/v1/tools/banner-generator/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    songId: '${selectedSongId || 'SONG_ID'}',
    prompt: '${userPrompt || 'A cosmic theme with planets'}',
    aspectRatio: '${aspectRatio}'
  })
});
const result = await response.json();
console.log(result.imageUrl);`,
                        python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
}

json_data = {
    'songId': '${selectedSongId || 'SONG_ID'}',
    'prompt': '${userPrompt || 'A cosmic theme with planets'}',
    'aspectRatio': '${aspectRatio}',
}

response = requests.post(
    'https://api.lehermusic.com/api/v1/tools/banner-generator/generate', 
    headers=headers, 
    json=json_data
)
print(response.json())`
                    }}
                />
            </div>
        </div>
    );
};

export default BannerGeneratorView;