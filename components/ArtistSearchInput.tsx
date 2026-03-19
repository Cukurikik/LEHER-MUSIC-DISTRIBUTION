import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Artist, ArtistSearchResult } from '../types';
import { searchArtists } from '../services/artistService';
import GeminiIcon from './icons/GeminiIcon';


const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const SpotifyIcon: React.FC<{className?: string}> = ({className}) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.839 17.334a.34.34 0 0 1-.491.132c-2.422-1.488-5.484-1.82-9.15-1.002a.34.34 0 0 1-.396-.33c-.02-.18.108-.348.288-.396 3.906-.888 7.248-.5 9.912 1.128a.34.34 0 0 1 .132.492zm1.488-2.664a.415.415 0 0 1-.58.192c-2.82-1.74-7.14-2.22-10.62-1.212a.415.415 0 0 1-.468-.408.415.415 0 0 1 .408-.468c3.84-.996 8.52-.468 11.64 1.452a.415.415 0 0 1 .192.58zm.132-2.856a.514.514 0 0 1-.684.252C14.773 9.42 8.34 8.808 4.92 9.876a.514.514 0 0 1-.576-.48.514.514 0 0 1 .48-.576c3.78-1.152 10.74-.48 14.58 1.944a.514.514 0 0 1 .252.684z"/></svg>);
const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24" ><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>);


const getSourceIcon = (source: 'leher' | 'spotify' | 'youtube') => {
    switch (source) {
        case 'spotify': return <SpotifyIcon className="w-4 h-4 text-green-500" />;
        case 'youtube': return <YouTubeIcon className="w-4 h-4 text-red-500" />;
        default: return null;
    }
}

interface ArtistSearchInputProps {
    onArtistSelected: (artist: ArtistSearchResult) => void;
    onAddNew: () => void;
    existingArtists: Artist[];
    placeholder: string;
    isMultiSelect?: boolean;
}

const ArtistSearchInput: React.FC<ArtistSearchInputProps> = ({ onArtistSelected, onAddNew, existingArtists, placeholder, isMultiSelect = false }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ArtistSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery) {
            setResults([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const artistResults = await searchArtists(searchQuery, existingArtists);
        setResults(artistResults);
        setIsLoading(false);
    }, [existingArtists]);

    useEffect(() => {
        if (!query) {
             setIsDropdownOpen(false);
             return;
        }
        setIsDropdownOpen(true);
        const handler = setTimeout(() => {
            handleSearch(query);
        }, 300); // Debounce
        return () => clearTimeout(handler);
    }, [query, handleSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (artist: ArtistSearchResult) => {
        onArtistSelected(artist);
        setQuery('');
        setIsDropdownOpen(false);
    };

    const handleAddNewClick = () => {
        onAddNew();
        setQuery('');
        setIsDropdownOpen(false);
    }
    
    return (
        <div className="relative" ref={containerRef}>
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-text-subtle z-10" />
                <GeminiIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary z-10 opacity-70" title="AI Suggestions" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setIsDropdownOpen(true)}
                    placeholder={placeholder}
                    className="w-full form-input-glow rounded-lg p-3 pl-10 pr-10"
                />
            </div>
            {isDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-ui-surface border border-ui-border rounded-lg shadow-2xl animate-page-fade-in-up max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-ui-text-subtle">Loading...</div>
                    ) : results.length === 0 && query ? (
                        <div className="p-4 text-center text-ui-text-subtle">No artists found.</div>
                    ) : (
                        <ul>
                            {results.map(artist => (
                                <li key={artist.id} onClick={() => handleSelect(artist)} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition-colors">
                                    <img src={artist.avatarUrl} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-ui-text-heading">{artist.name}</p>
                                    </div>
                                    {getSourceIcon(artist.source)}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="p-2 border-t border-ui-border">
                        <button type="button" onClick={handleAddNewClick} className="w-full text-center px-3 py-2 text-sm font-semibold text-quantum-flux hover:bg-ui-surface rounded-md">
                            + Add New Artist
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistSearchInput;
