import React, { useMemo } from 'react';
import type { Song } from '../types';
import { Link, useParams } from 'react-router-dom';


interface PlayerViewProps {
  songs: Song[];
}

const platformThemes: Record<string, { accent: string, text: string, logoColor: string }> = {
  'spotify': { accent: 'text-green-400', text: 'text-white', logoColor: '#1DB954' },
  'apple-music': { accent: 'text-pink-400', text: 'text-white', logoColor: '#FC3C44' },
  'youtube-music': { accent: 'text-red-400', text: 'text-white', logoColor: '#FF0000' },
  'amazon-music': { accent: 'text-blue-400', text: 'text-white', logoColor: '#00A8E1' },
  'tidal': { accent: 'text-cyan-400', text: 'text-white', logoColor: '#00FFFF' },
  'default': { accent: 'text-violet-400', text: 'text-white', logoColor: '#A78BFA' }
};

const PlayerView: React.FC<PlayerViewProps> = ({ songs }) => {
  const { platformId, songId } = useParams() as { platformId: string, songId: string };

  const song = useMemo(() => songs.find(s => s.id === songId), [songs, songId]);

  if (!song) {
    return (
      <div className="min-h-screen bg-ui-bg text-ui-text-heading flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Song Not Found</h1>
        <Link to="/" className="mt-4 text-primary hover:underline">Return to Leher Music</Link>
      </div>
    );
  }

  const theme = platformThemes[platformId!] || platformThemes['default'];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-ui-bg text-white transition-colors duration-500 font-inter">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 blur-xl scale-110"
            style={{ backgroundImage: `url(${song.coverArtUrl})` }}
        ></div>
        <div className="relative w-full max-w-md mx-auto">
            <div className="bg-black/50 rounded-xl shadow-2xl p-8 border border-white/10">
                <img src={song.coverArtUrl} alt={`${song.title} cover art`} className="w-full h-auto rounded-lg object-cover shadow-lg aspect-square mb-6" />
                
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{song.title}</h1>
                    <h2 className={`text-xl ${theme.accent} opacity-80 mt-1`}>{song.artistName}</h2>
                </div>

                <div className="my-6">
                    <div className="bg-white/10 h-1.5 rounded-full">
                        <div style={{ background: 'var(--gradient-primary)' }} className="w-1/4 h-full rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 opacity-60">
                        <span>0:58</span>
                        <span>3:42</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-8 text-4xl">
                    <button className="opacity-70 hover:opacity-100 transition hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14.176V5.824a1 1 0 00-1.555-.832L4.22 8.332a1 1 0 000 1.664l4.225 3.836zM11 14.176V5.824a1 1 0 011.555-.832l4.224 3.344a1 1 0 010 1.664l-4.224 3.836A1 1 0 0111 14.176z"/></svg>
                    </button>
                    <button className="text-6xl hover:scale-105 transition drop-shadow-[0_0_8px_rgba(220,20,60,0.5)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>
                    </button>
                    <button className="opacity-70 hover:opacity-100 transition hover:scale-110">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 5.168A1 1 0 0010 5.824v8.352a1 1 0 001.555.832l-3.775-3.14a1 1 0 000-1.664l3.775-3.14zM4 5.824a1 1 0 011.555-.832l4.224 3.344a1 1 0 010 1.664l-4.224 3.836A1 1 0 014 14.176V5.824z" /></svg>
                    </button>
                </div>
            </div>

            <div className="text-center mt-6">
                <Link to="/" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                    Return to Leher Music
                </Link>
            </div>
        </div>
    </div>
  );
};

export default PlayerView;