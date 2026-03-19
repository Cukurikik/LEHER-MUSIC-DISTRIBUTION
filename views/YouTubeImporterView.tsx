
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { searchYouTubeMusicArtists, getYouTubeMusicArtistAlbums } from '../services/youTubeService';
import YouTubeIcon from '../components/icons/YouTubeIcon';
import type { YouTubeMusicArtistSimple, YouTubeMusicAlbumSimple } from '../types';

// Local Icons
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);


type ViewState = 'search_artist' | 'show_albums';

interface YouTubeImporterViewProps {
    addMultipleSongsFromImport: (albums: YouTubeMusicAlbumSimple[]) => void;
}

const YouTubeImporterView: React.FC<YouTubeImporterViewProps> = ({ addMultipleSongsFromImport }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewState, setViewState] = useState<ViewState>('search_artist');
    
    const [artists, setArtists] = useState<YouTubeMusicArtistSimple[]>([]);
    const [albums, setAlbums] = useState<YouTubeMusicAlbumSimple[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<YouTubeMusicArtistSimple | null>(null);
    const [selectedAlbums, setSelectedAlbums] = useState<Set<string>>(new Set());

    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm) return;

        setIsLoading(true);
        setHasSearched(true);
        setViewState('search_artist');
        const searchResults = await searchYouTubeMusicArtists(searchTerm);
        setArtists(searchResults);
        setIsLoading(false);
    };

    const handleSelectArtist = async (artist: YouTubeMusicArtistSimple) => {
        setIsLoading(true);
        setSelectedArtist(artist);
        const artistAlbums = await getYouTubeMusicArtistAlbums(artist.id);
        setAlbums(artistAlbums);
        setViewState('show_albums');
        setIsLoading(false);
    };

    const handleToggleAlbumSelection = (albumId: string) => {
        const newSelection = new Set(selectedAlbums);
        if (newSelection.has(albumId)) {
            newSelection.delete(albumId);
        } else {
            newSelection.add(albumId);
        }
        setSelectedAlbums(newSelection);
    };

    const handleSelectAll = () => {
        if (selectedAlbums.size === albums.length) {
            setSelectedAlbums(new Set());
        } else {
            setSelectedAlbums(new Set(albums.map(a => a.id)));
        }
    };

    const handleImportSelected = () => {
        const albumsToImport = albums.filter(album => selectedAlbums.has(album.id));
        if (albumsToImport.length > 0) {
            addMultipleSongsFromImport(albumsToImport);
            navigate('/releases');
        }
    };
    
    const goBackToArtistSearch = () => {
        setViewState('search_artist');
        setSelectedArtist(null);
        setAlbums([]);
        setSelectedAlbums(new Set());
    };

    const renderArtistResults = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artists.map(artist => (
                <div key={artist.id} onClick={() => handleSelectArtist(artist)} className="group relative bg-ui-surface rounded-2xl p-4 text-center cursor-pointer card-interactive-glow overflow-hidden">
                    <img src={artist.thumbnails[0]?.url || `https://picsum.photos/seed/${artist.id}/300`} alt={artist.name} className="w-32 h-32 rounded-full object-cover mb-4 mx-auto shadow-lg transition-transform duration-300 group-hover:scale-105" />
                    <h3 className="font-bold text-lg text-ui-text-heading truncate">{artist.name}</h3>
                    {artist.genres && <p className="text-sm text-ui-text-subtle truncate">{artist.genres.join(', ')}</p>}
                </div>
            ))}
        </div>
    );

    const renderAlbumResults = () => (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <button onClick={goBackToArtistSearch} className="flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Artist Search
                </button>
                <button onClick={handleImportSelected} disabled={selectedAlbums.size === 0} className="bg-primary text-black font-bold px-5 py-2 rounded-full transition-transform hover:scale-105 btn-glow-primary disabled:opacity-50 disabled:cursor-not-allowed">
                    Import {selectedAlbums.size} Selected
                </button>
            </div>
            <h2 className="text-2xl font-bold text-ui-text-heading mb-4">Releases by {selectedArtist?.name}</h2>
            
            <div className="flex items-center gap-3 bg-ui-surface p-2 rounded-lg border border-ui-border mb-3">
                <input
                    type="checkbox"
                    checked={selectedAlbums.size === albums.length && albums.length > 0}
                    onChange={handleSelectAll}
                    id="select-all-albums"
                    className="h-5 w-5 rounded text-primary focus:ring-primary bg-ui-bg border-ui-border"
                />
                <label htmlFor="select-all-albums" className="font-semibold text-ui-text-heading">Select All</label>
            </div>

            <div className="space-y-3">
                {albums.map(album => (
                    <div key={album.id} onClick={() => handleToggleAlbumSelection(album.id)} className={`bg-ui-surface rounded-xl border-2 p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer ${selectedAlbums.has(album.id) ? 'border-primary' : 'border-ui-border hover:border-primary/50'}`}>
                        <input
                            type="checkbox"
                            checked={selectedAlbums.has(album.id)}
                            onChange={() => handleToggleAlbumSelection(album.id)}
                            className="h-5 w-5 rounded text-primary focus:ring-primary bg-ui-bg border-ui-border"
                        />
                        <img src={album.thumbnails[0]?.url} alt={album.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-grow min-w-0">
                            <p className="font-bold text-lg text-ui-text-heading truncate">{album.name}</p>
                            <p className="text-sm text-ui-text-subtle">{album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)} &bull; {album.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                 <button onClick={() => navigate('/toolkit')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading flex items-center gap-3">
                    <YouTubeIcon className="w-10 h-10 text-red-600" />
                    YouTube Music Importer
                </h1>
                <p className="text-lg text-ui-text-body mt-1">Search for an artist to bulk-import release metadata and artwork.</p>
            </div>
            
            <form onSubmit={handleSearch} className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-4 flex gap-2 sticky top-24 z-20">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for an artist on YouTube Music..."
                    className="flex-grow bg-transparent focus:outline-none text-lg text-ui-text-heading p-2"
                />
                <button type="submit" disabled={isLoading || !searchTerm} className="px-6 py-2 btn-glow-primary flex items-center gap-2 disabled:opacity-50">
                    <SearchIcon className="w-5 h-5" />
                    {isLoading && viewState === 'search_artist' ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="min-h-[400px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                         <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin"></div>
                    </div>
                ) : hasSearched ? (
                    viewState === 'search_artist' ? (
                        artists.length > 0 ? renderArtistResults() : <div className="text-center py-16 text-ui-text-subtle"><p>No artists found for "{searchTerm}".</p></div>
                    ) : (
                        albums.length > 0 ? renderAlbumResults() : <div className="text-center py-16 text-ui-text-subtle"><p>No albums found for {selectedArtist?.name}.</p></div>
                    )
                ) : (
                    <div className="text-center py-16 text-ui-text-subtle">
                         <p>Search for an artist to begin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouTubeImporterView;