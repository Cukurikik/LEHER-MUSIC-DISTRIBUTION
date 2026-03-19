import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song, MasteringStyle } from '../types';
import CustomSelector from '../components/ui/CustomSelector';
import AudioWaveIcon from '../components/icons/AudioWaveIcon';

// Icons
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const MASTERING_STYLES: { id: MasteringStyle, title: string, description: string }[] = [
    { id: 'Balanced', title: 'Balanced', description: 'The default all-purpose setting for great results.' },
    { id: 'Loud & Clear', title: 'Loud & Clear', description: 'For Pop & Electronic. Maximizes volume and clarity.' },
    { id: 'Warm & Open', title: 'Warm & Open', description: 'For Acoustic & Jazz. Retains natural dynamics.' },
    { id: 'Punchy & Driving', title: 'Punchy & Driving', description: 'For Rock & Hip-Hop. Emphasizes kick and snare.' },
];

interface CreateMasteringViewProps {
    songs: Song[];
    addMasteringProject: (projectData: { fileName: string, style: MasteringStyle, songId?: string }) => void;
}

const CreateMasteringView: React.FC<CreateMasteringViewProps> = ({ songs, addMasteringProject }) => {
    const navigate = useNavigate();
    const [selectedSongId, setSelectedSongId] = useState<string | undefined>();
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<MasteringStyle>('Balanced');
    const [isProcessing, setIsProcessing] = useState(false);

    const songOptions = useMemo(() => songs.map(s => ({
        value: s.id,
        label: s.title,
        artist: s.artistName,
        cover: s.coverArtUrl
    })), [songs]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAudioFile(file);
            const song = songs.find(s => s.fileName === file.name);
            if (song) {
                setSelectedSongId(song.id);
            }
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!audioFile) {
            alert("Please upload an audio file.");
            return;
        }

        setIsProcessing(true);
        
        // Simulate a short delay before calling the add function to give UI feedback
        setTimeout(() => {
            addMasteringProject({
                fileName: audioFile.name,
                style: selectedStyle,
                songId: selectedSongId,
            });
            navigate('/toolkit/ai-mastering');
        }, 1000);
    };

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] w-full text-center animate-fade-in">
                <div className="w-24 h-24 mx-auto border-4 border-dashed border-primary rounded-full animate-spin"></div>
                <h2 className="text-3xl font-bold mt-6 text-primary">Processing...</h2>
                <p className="text-ui-text">Your track is being sent to the AI Mastering engine.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/toolkit/ai-mastering')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Mastering Studio
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading">New Mastering Project</h1>
                <p className="text-lg text-ui-text mt-1">Upload your track and choose a style to begin.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <fieldset className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-6 space-y-6">
                    <legend className="text-2xl font-bold text-ui-text-heading">1. Upload Audio</legend>
                    <p className="text-sm text-ui-text">You can optionally link this master to an existing release in your catalog.</p>
                    <CustomSelector
                        value={selectedSongId}
                        onChange={setSelectedSongId}
                        options={songOptions}
                        placeholder="Link to an existing release (optional)..."
                        renderOption={(o) => (<div className="flex items-center gap-2"><img src={o.cover} className="w-6 h-6 rounded" alt={o.label} /><span>{o.label}</span></div>)}
                    />
                    <label htmlFor="audio-upload" className="cursor-pointer group flex flex-col justify-center items-center h-48 border-2 border-dashed border-ui-border hover:border-primary rounded-xl p-6 text-center transition-colors">
                        {audioFile ? (
                            <div className="text-green-500">
                                <AudioWaveIcon className="w-16 h-16 mx-auto mb-2" />
                                <p className="font-bold truncate max-w-xs">{audioFile.name}</p>
                            </div>
                        ) : (
                            <div className="text-ui-text">
                                <AudioWaveIcon className="w-16 h-16 mx-auto mb-2 transition-transform group-hover:scale-110" />
                                <p className="font-semibold">Upload Audio File</p>
                                <p className="text-xs">.WAV or .FLAC Recommended</p>
                            </div>
                        )}
                        <input id="audio-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".mp3,.wav,.flac" />
                    </label>
                </fieldset>
                
                <fieldset className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-6 space-y-6">
                     <legend className="text-2xl font-bold text-ui-text-heading">2. Choose Mastering Style</legend>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MASTERING_STYLES.map(style => (
                            <button key={style.id} type="button" onClick={() => setSelectedStyle(style.id)} className={`p-4 rounded-lg font-semibold border-2 text-left transition-colors ${selectedStyle === style.id ? 'bg-primary/20 border-primary' : 'border-ui-border bg-ui-surface hover:border-primary/50'}`}>
                                <h4 className="font-bold">{style.title}</h4>
                                <p className="text-sm font-normal text-ui-text">{style.description}</p>
                            </button>
                        ))}
                     </div>
                </fieldset>

                <div className="flex justify-end pt-4 border-t border-ui-border">
                    <button type="submit" disabled={!audioFile} className="px-8 py-3 rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed btn-glow-primary btn-border-glow">
                        Process My Track
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMasteringView;