
import React, { useMemo, useState } from 'react';
import type { Song } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

// --- Icons ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const CopyrightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.354a4 4 0 100 5.292" />
    </svg>
);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);

// Memoized Item Component to prevent unnecessary re-renders
const CopyrightConflictItem = React.memo(({ song, onResolve }: { song: Song, onResolve: (id: string) => void }) => {
    return (
        <div className="bg-ui-surface rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 border border-ui-border shadow-sm transition-all duration-300 hover:border-danger/50 hover:shadow-lg hover:shadow-danger/10 animate-fade-in">
            <img src={song.coverArtUrl} alt={`${song.title} cover art`} className="w-24 h-24 rounded-lg object-cover flex-shrink-0 bg-ui-bg" loading="lazy" />
            <div className="flex-1 text-center md:text-left min-w-0">
                <h3 className="font-bold text-xl text-ui-text-heading truncate">{song.title}</h3>
                <p className="text-ui-text-body text-md truncate">{song.artistName}</p>
                <div className="mt-2 p-2 bg-danger/10 rounded-md border border-danger/20 inline-block md:block">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                         <div className="w-2 h-2 bg-danger rounded-full animate-pulse"></div>
                         <p className="text-sm font-semibold text-danger">Potential Duplicate Found</p>
                    </div>
                    <p className="text-xs text-danger/80 mt-1 break-all">{song.duplicateCheck?.matchDetails || 'Fingerprint match detected in database.'}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 flex-shrink-0 w-full md:w-auto">
                <Link to={`/release/${song.id}`} className="px-4 py-2 text-sm text-center font-semibold bg-ui-border rounded-full hover:bg-opacity-70 transition-colors">
                    View Release
                </Link>
                <button 
                    onClick={() => onResolve(song.id)}
                    className="px-4 py-2 text-sm text-center font-semibold text-white bg-primary rounded-full hover:brightness-110 btn-glow-primary transition-transform hover:scale-105"
                >
                    Resolve
                </button>
            </div>
        </div>
    );
});

export const CopyrightConflictsView: React.FC<{ songs: Song[] }> = ({ songs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
    const itemsPerPage = 10;

    const handleResolve = (id: string) => {
        // In a real app, this would open a modal or make an API call
        if (window.confirm("Mark this conflict as resolved? This will clear the flag.")) {
            setResolvedIds(prev => new Set(prev).add(id));
            alert("Conflict resolved. The track status will update shortly.");
        }
    };

    // Filter Logic
    const conflictSongs = useMemo(() => {
        if (!songs) return [];
        
        // First filter for conflicts, excluding locally resolved ones
        let conflicts = songs.filter(s => s.duplicateCheck?.status === 'potential_duplicate' && !resolvedIds.has(s.id));
        
        // Then apply search filter
        if (searchTerm.trim()) {
            const lowerTerm = searchTerm.toLowerCase();
            conflicts = conflicts.filter(s => 
                (s.title && s.title.toLowerCase().includes(lowerTerm)) || 
                (s.artistName && s.artistName.toLowerCase().includes(lowerTerm)) ||
                (s.id && s.id.toLowerCase().includes(lowerTerm))
            );
        }
        
        return conflicts;
    }, [songs, searchTerm, resolvedIds]);

    // Pagination Logic
    const totalPages = Math.ceil(conflictSongs.length / itemsPerPage);
    const paginatedSongs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return conflictSongs.slice(startIndex, startIndex + itemsPerPage);
    }, [conflictSongs, currentPage, itemsPerPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="flex flex-col gap-4">
                <Link to="/" className="inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group w-fit">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gradient-primary">Copyright Conflicts</h1>
                        <p className="text-lg text-ui-text-body mt-1">
                            Review releases flagged for copyright issues. 
                            <span className="ml-2 bg-danger/20 text-danger px-2 py-0.5 rounded-md text-sm font-bold border border-danger/30">
                                {conflictSongs.length} Found
                            </span>
                        </p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-text-subtle pointer-events-none" />
                        <input 
                            type="text" 
                            placeholder="Search conflicts..." 
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full bg-ui-surface border border-ui-border rounded-full py-2.5 pl-10 pr-4 text-ui-text-heading focus:ring-2 focus:ring-primary transition form-input-glow"
                        />
                    </div>
                </div>
            </header>

            <div className="space-y-4 min-h-[400px]">
                {paginatedSongs.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {paginatedSongs.map(song => (
                                <CopyrightConflictItem key={song.id} song={song} onResolve={handleResolve} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 pt-6 border-t border-ui-border/50">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full bg-ui-surface border border-ui-border hover:bg-ui-border/50 disabled:opacity-50 disabled:hover:bg-ui-surface transition-colors"
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                <span className="text-sm font-semibold text-ui-text-subtle">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-full bg-ui-surface border border-ui-border hover:bg-ui-border/50 disabled:opacity-50 disabled:hover:bg-ui-surface transition-colors"
                                >
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24 bg-ui-surface border-2 border-dashed border-ui-border rounded-xl flex flex-col items-center justify-center">
                        <CopyrightIcon className="w-16 h-16 text-ui-text-subtle mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold text-ui-text-heading">
                            {searchTerm ? 'No Matches Found' : 'No Conflicts Found'}
                        </h3>
                        <p className="text-ui-text-subtle mt-2 max-w-md">
                            {searchTerm 
                                ? `We couldn't find any conflicts matching "${searchTerm}".` 
                                : 'All clear! No releases are currently flagged for copyright conflicts.'}
                        </p>
                        {searchTerm && (
                            <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="mt-4 text-primary font-bold hover:underline">
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
