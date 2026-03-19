import type { Artist, ArtistSearchResult } from '../types';

const spotifyArtists: ArtistSearchResult[] = [
    { id: 'spotify-1', name: 'Ed Sheeran', avatarUrl: 'https://picsum.photos/seed/ed-sheeran/200', source: 'spotify' },
    { id: 'spotify-2', name: 'Dua Lipa', avatarUrl: 'https://picsum.photos/seed/dua-lipa-spotify/200', source: 'spotify' },
    { id: 'spotify-3', name: 'Bad Bunny', avatarUrl: 'https://picsum.photos/seed/bad-bunny/200', source: 'spotify' },
];

const youtubeArtists: ArtistSearchResult[] = [
    { id: 'youtube-1', name: 'Queen', avatarUrl: 'https://picsum.photos/seed/queen/200', source: 'youtube' },
    { id: 'youtube-2', name: 'BLACKPINK', avatarUrl: 'https://picsum.photos/seed/blackpink/200', source: 'youtube' },
];

export const searchArtists = async (query: string, existingArtists: Artist[]): Promise<ArtistSearchResult[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));

    const lowerCaseQuery = query.toLowerCase();

    const leherResults: ArtistSearchResult[] = existingArtists
        .filter(artist => artist.name.toLowerCase().includes(lowerCaseQuery))
        .map(artist => ({ ...artist, source: 'leher' }));

    const spotifyResults = spotifyArtists.filter(artist => artist.name.toLowerCase().includes(lowerCaseQuery));
    const youtubeResults = youtubeArtists.filter(artist => artist.name.toLowerCase().includes(lowerCaseQuery));

    // Combine and remove duplicates, giving priority to Leher artists
    const combinedResults = [...leherResults, ...spotifyResults, ...youtubeResults];
    
    const uniqueResults = combinedResults.reduce<ArtistSearchResult[]>((acc, current) => {
        if (!acc.some(item => item.name.toLowerCase() === current.name.toLowerCase())) {
            acc.push(current);
        }
        return acc;
    }, []);

    return uniqueResults.slice(0, 10); // Limit to 10 results
};
