import React, { useMemo, useState } from 'react';
import type { Artist, Release, Song } from '../types';
import ReleaseItem from '../components/SongItem';

interface ArtistsProps {
  artists: Artist[];
  songs: Release[];
}

const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
    </svg>
);

const TagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" />
    </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);


const ArtistCard: React.FC<{ artist: Artist; songs: Song[]; isExpanded: boolean }> = ({ artist, songs, isExpanded }) => {
    const stats = useMemo(() => {
        const artistSongs = songs.filter(s => s.artistId === artist.id);
        const releasesCount = artistSongs.length;

        const genreCounts = artistSongs.reduce((acc, song) => {
            acc[song.genre] = (acc[song.genre] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const mainGenre = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a])[0] || 'N/A';
        
        return { releasesCount, mainGenre };
    }, [artist, songs]);

    return (
        <div className="group relative bg-ui-surface rounded-2xl p-6 text-center transition-all duration-300 border border-ui-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-4 right-4 text-ui-text-subtle group-hover:text-primary transition-all duration-300">
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            <div className="relative z-10">
                <img 
                    src={artist.avatarUrl} 
                    alt={artist.name} 
                    className="w-28 h-28 rounded-full object-cover mb-4 mx-auto border-4 border-ui-surface shadow-lg group-hover:border-primary/30 transition-colors duration-300"
                />
                <h3 className="font-bold text-xl text-ui-text-heading truncate">{artist.name}</h3>

                <div className="my-4 h-px bg-ui-border w-3/4 mx-auto group-hover:bg-primary/30 transition-colors duration-300"></div>

                <div className="flex justify-around items-start text-left gap-4">
                    <div className="flex items-center gap-2">
                        <MusicNoteIcon className="w-5 h-5 text-quantum-flux opacity-80 flex-shrink-0" />
                        <div>
                           <p className="font-bold text-lg text-ui-text-heading">{stats.releasesCount}</p>
                           <p className="text-xs uppercase tracking-wider text-ui-text-subtle">Releases</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <TagIcon className="w-5 h-5 text-quantum-flux opacity-80 flex-shrink-0" />
                        <div>
                           <p className="font-bold text-lg text-ui-text-heading truncate max-w-[100px]">{stats.mainGenre}</p>
                           <p className="text-xs uppercase tracking-wider text-ui-text-subtle">Genre</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Artists: React.FC<ArtistsProps> = ({ artists, songs: releases }) => {
  const [expandedArtistId, setExpandedArtistId] = useState<string | null>(null);

  const songs = useMemo(() => releases.filter((r): r is Song => r.assetType === 'Audio'), [releases]);

  const handleToggleExpand = (artistId: string) => {
    setExpandedArtistId(prevId => (prevId === artistId ? null : artistId));
  };

  return (
    <div className="space-y-8">
        {artists.length > 0 ? (
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map(artist => {
                const isExpanded = expandedArtistId === artist.id;
                const artistSongs = songs.filter(s => s.artistId === artist.id);
                return (
                    <div key={artist.id}>
                        <div onClick={() => handleToggleExpand(artist.id)} className="cursor-pointer">
                            <ArtistCard artist={artist} songs={songs} isExpanded={isExpanded} />
                        </div>

                        <div className={`transition-[max-height,margin-top] duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] mt-4' : 'max-h-0 mt-0'}`}>
                            <div className="space-y-2 bg-ui-surface p-4 rounded-xl border border-ui-border">
                                <h4 className="font-bold text-ui-text-heading text-md">Releases ({artistSongs.length})</h4>
                                {artistSongs.length > 0 ? (
                                    <div className="space-y-2">
                                        {artistSongs.map(song => (
                                            <ReleaseItem key={song.id} release={song} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-ui-text-body text-center py-4">No releases found for this artist.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
          </main>
        ) : (
          <div className="col-span-full text-center py-16 bg-ui-surface border-2 border-dashed border-ui-border rounded-xl">
            <h3 className="text-xl font-semibold text-ui-text-heading">No Artists Found</h3>
            <p className="text-ui-text-subtle mt-2">Create a new release to add an artist.</p>
          </div>
        )}
      </div>
  );
};

export default Artists;