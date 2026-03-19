// services/youTubeService.ts

import type { YouTubeMusicArtistSimple, YouTubeMusicAlbumSimple, YouTubeMusicArtist, YouTubeThumbnail } from '../types';

// Mock Data
const mockArtists: YouTubeMusicArtistSimple[] = [
    { id: 'artist-yt-queen', name: 'Queen', thumbnails: [{ url: 'https://picsum.photos/seed/yt-queen/300', height: 300, width: 300 }], genres: ['Rock', 'Glam Rock'] },
    { id: 'artist-yt-lady-gaga', name: 'Lady Gaga', thumbnails: [{ url: 'https://picsum.photos/seed/yt-gaga/300', height: 300, width: 300 }], genres: ['Pop', 'Dance-pop'] },
    { id: 'artist-yt-the-weeknd', name: 'The Weeknd', thumbnails: [{ url: 'https://picsum.photos/seed/yt-theweeknd/300', height: 300, width: 300 }], genres: ['R&B', 'Synth-pop'] },
    { id: 'artist-yt-dewa-19', name: 'Dewa 19', thumbnails: [{ url: 'https://picsum.photos/seed/yt-dewa19/300', height: 300, width: 300 }], genres: ['Rock', 'Pop Rock'] },
    { id: 'artist-yt-noah', name: 'NOAH', thumbnails: [{ url: 'https://picsum.photos/seed/yt-noah/300', height: 300, width: 300 }], genres: ['Pop Rock', 'Alternative Rock'] },
    { id: 'artist-yt-raisa', name: 'Raisa', thumbnails: [{ url: 'https://picsum.photos/seed/yt-raisa/300', height: 300, width: 300 }], genres: ['Pop', 'R&B'] },
    { id: 'artist-yt-tulus', name: 'Tulus', thumbnails: [{ url: 'https://picsum.photos/seed/yt-tulus/300', height: 300, width: 300 }], genres: ['Pop', 'Jazz'] },
    { id: 'artist-yt-sheila-on-7', name: 'Sheila On 7', thumbnails: [{ url: 'https://picsum.photos/seed/yt-so7/300', height: 300, width: 300 }], genres: ['Pop Rock'] },
    { id: 'artist-yt-iwan-fals', name: 'Iwan Fals', thumbnails: [{ url: 'https://picsum.photos/seed/yt-iwanfals/300', height: 300, width: 300 }], genres: ['Folk', 'Rock'] },
    { id: 'artist-yt-rich-brian', name: 'Rich Brian', thumbnails: [{ url: 'https://picsum.photos/seed/yt-richbrian/300', height: 300, width: 300 }], genres: ['Hip-Hop'] },
    { id: 'artist-yt-niki', name: 'NIKI', thumbnails: [{ url: 'https://picsum.photos/seed/yt-niki/300', height: 300, width: 300 }], genres: ['R&B', 'Pop'] },
    { id: 'artist-yt-coldplay', name: 'Coldplay', thumbnails: [{ url: 'https://picsum.photos/seed/yt-coldplay/300', height: 300, width: 300 }], genres: ['Alternative Rock'] },
    { id: 'artist-yt-radiohead', name: 'Radiohead', thumbnails: [{ url: 'https://picsum.photos/seed/yt-radiohead/300', height: 300, width: 300 }], genres: ['Alternative Rock', 'Art Rock'] },
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateMockAlbums = (artist: YouTubeMusicArtist, count: number): YouTubeMusicAlbumSimple[] => {
    const albums: YouTubeMusicAlbumSimple[] = [];
    const albumTypes: ('album' | 'single' | 'ep')[] = ['album', 'single', 'ep', 'album', 'single'];
    const nameParts1 = ['Cosmic', 'Midnight', 'Electric', 'Lost', 'Future', 'Golden', 'Retro', 'Neon', 'Lunar', 'Acoustic', 'Street', 'Hujan', 'Senja'];
    const nameParts2 = ['Dreams', 'Echoes', 'Voyage', 'Tapes', 'Sunrise', 'Memories', 'Worlds', 'Heart', 'Blues', 'Sessions', 'Light', 'Pagi', 'Cerita'];
    for (let i = 0; i < count; i++) {
        const name = `${getRandomElement(nameParts1)} ${getRandomElement(nameParts2)} ${i > 3 ? i + 1 : ''}`.trim();
        const year = 2024 - Math.floor(Math.random() * 25);
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        albums.push({
            id: `album-yt-${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${i}`,
            name: name,
            album_type: getRandomElement(albumTypes),
            artists: [artist],
            thumbnails: [{ url: `https://picsum.photos/seed/${name.replace(/[^a-zA-Z0-9]/g, '')}/300`, height: 300, width: 300 }],
            release_date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        });
    }
    return albums;
}

const mockArtistAlbums: Record<string, YouTubeMusicAlbumSimple[]> = {
    'artist-yt-queen': generateMockAlbums({name: 'Queen'}, 25),
    'artist-yt-lady-gaga': generateMockAlbums({name: 'Lady Gaga'}, 30),
    'artist-yt-the-weeknd': generateMockAlbums({name: 'The Weeknd'}, 40),
    'artist-yt-dewa-19': generateMockAlbums({name: 'Dewa 19'}, 15),
    'artist-yt-noah': generateMockAlbums({name: 'NOAH'}, 12),
    'artist-yt-raisa': generateMockAlbums({name: 'Raisa'}, 18),
    'artist-yt-tulus': generateMockAlbums({name: 'Tulus'}, 10),
    'artist-yt-sheila-on-7': generateMockAlbums({name: 'Sheila On 7'}, 22),
    'artist-yt-iwan-fals': generateMockAlbums({name: 'Iwan Fals'}, 35),
    'artist-yt-rich-brian': generateMockAlbums({name: 'Rich Brian'}, 8),
    'artist-yt-niki': generateMockAlbums({name: 'NIKI'}, 11),
    'artist-yt-coldplay': generateMockAlbums({name: 'Coldplay'}, 28),
    'artist-yt-radiohead': generateMockAlbums({name: 'Radiohead'}, 26),
};

/**
 * Mocks searching for an artist on YouTube Music.
 * @param query The search term for the artist.
 * @returns A promise that resolves to an array of matching artists.
 */
export const searchYouTubeMusicArtists = async (query: string): Promise<YouTubeMusicArtistSimple[]> => {
    console.log(`Searching YouTube Music artists for: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    if (!query) return [];

    const lowerCaseQuery = query.toLowerCase();
    const results = mockArtists.filter(artist => artist.name.toLowerCase().includes(lowerCaseQuery));

    return results.length > 0 ? results : mockArtists.slice(0, 5); // Return some results even if none match
};

/**
 * Mocks fetching albums for a given artist ID from YouTube Music.
 * @param artistId The YouTube Music ID of the artist.
 * @returns A promise that resolves to an array of the artist's albums.
 */
export const getYouTubeMusicArtistAlbums = async (artistId: string): Promise<YouTubeMusicAlbumSimple[]> => {
    console.log(`Fetching albums for artist ID: ${artistId}`);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    
    if (mockArtistAlbums[artistId]) {
        return mockArtistAlbums[artistId];
    }
    
    // Fallback for artists not in the pre-generated map
    const artistInfo = mockArtists.find(a => a.id === artistId);
    if(artistInfo) {
        return generateMockAlbums({ name: artistInfo.name }, Math.floor(Math.random() * 15) + 5);
    }

    return [];
};