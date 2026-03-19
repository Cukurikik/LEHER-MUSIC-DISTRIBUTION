
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);

const CollabHubView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const collaborators = [
        { name: "Aria Synth", role: "Producer", rating: 4.9, avatar: "https://picsum.photos/seed/aria/200", genre: "Synthwave", price: "$200/track" },
        { name: "Vocalisa", role: "Vocalist", rating: 4.8, avatar: "https://picsum.photos/seed/vocalisa/200", genre: "Pop, R&B", price: "$150/track" },
        { name: "Beat Master Budi", role: "Producer", rating: 5.0, avatar: "https://picsum.photos/seed/budi/200", genre: "Hip-Hop", price: "$250/track" },
        { name: "Pixelated", role: "Cover Designer", rating: 4.9, avatar: "https://picsum.photos/seed/pixel/200", genre: "Digital Art", price: "$100/artwork" },
        { name: "Lyric Master", role: "Songwriter", rating: 4.7, avatar: "https://picsum.photos/seed/lyric/200", genre: "Pop, Ballad", price: "$100/song" },
        { name: "Mix Master Mike", role: "Mixing Engineer", rating: 5.0, avatar: "https://picsum.photos/seed/mike/200", genre: "All Genres", price: "$300/mix" },
    ];
    
    const inputStyles = "w-full p-3 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow";

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_collab_hub_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_collab_hub_desc')}</p>
            </div>

            <div className="bg-ui-surface p-4 rounded-xl border border-ui-border flex flex-col md:flex-row gap-4">
                <input type="search" placeholder="Search for producers, vocalists, designers..." className={inputStyles}/>
                <select className={inputStyles}><option>All Roles</option><option>Producer</option><option>Vocalist</option></select>
                <select className={inputStyles}><option>All Genres</option><option>Synthwave</option><option>Pop</option></select>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {collaborators.map(c => (
                     <div key={c.name} className="bg-ui-surface p-4 rounded-xl border border-ui-border card-interactive-glow flex flex-col">
                        <div className="text-center">
                            <img src={c.avatar} alt={c.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-ui-border"/>
                            <p className="font-bold text-ui-text-heading">{c.name}</p>
                            <p className="text-sm text-primary">{c.role}</p>
                            <div className="flex items-center justify-center gap-1 text-amber-400 mt-2">
                               <StarIcon className="w-4 h-4"/>
                               <span className="text-sm font-bold">{c.rating}</span>
                            </div>
                        </div>
                        <div className="flex-grow my-3 text-center">
                             <p className="text-xs text-ui-text-subtle">{c.genre}</p>
                             <p className="text-lg font-bold text-accent">{c.price}</p>
                        </div>
                         <button className="w-full mt-auto btn-glow-primary py-2 rounded-full font-semibold text-sm">Contact</button>
                     </div>
                 ))}
             </div>
        </div>
    );
};

export default CollabHubView;
