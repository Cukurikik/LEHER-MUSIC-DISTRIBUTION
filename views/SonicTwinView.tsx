
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);

const SonicTwinView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // Mock data
    const userSongs = [
        { id: "song-1", title: "DJ Pesta Gila" },
        { id: "song-2", title: "DJ Lagu Santai" },
    ];

    const sonicTwins = [
        { name: "Com Truise", genre: "Synthwave", score: "95%", avatar: "https://picsum.photos/seed/comtruise/200" },
        { name: "The Midnight", genre: "Synthwave", score: "92%", avatar: "https://picsum.photos/seed/themidnight/200" },
        { name: "Tycho", genre: "Ambient", score: "88%", avatar: "https://picsum.photos/seed/tycho/200" },
        { name: "Boards of Canada", genre: "IDM", score: "85%", avatar: "https://picsum.photos/seed/boc/200" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_sonic_twin_finder_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_sonic_twin_finder_desc')}</p>
            </div>

            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <label htmlFor="song-select" className="block font-semibold text-ui-text-heading mb-2">{t('select_your_song_to')} find its twin:</label>
                <select id="song-select" className="w-full p-3 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow">
                    {userSongs.map(song => <option key={song.id} value={song.id}>{song.title}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sonicTwins.map(artist => (
                    <div key={artist.name} className="bg-ui-surface p-4 rounded-xl border border-ui-border text-center card-interactive-glow">
                        <img src={artist.avatar} alt={artist.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"/>
                        <p className="font-bold text-ui-text-heading">{artist.name}</p>
                        <p className="text-xs text-ui-text-subtle">{artist.genre}</p>
                        <p className="text-2xl font-bold text-accent mt-2">{artist.score}</p>
                        <p className="text-xs text-ui-text-subtle">Similarity</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SonicTwinView;
