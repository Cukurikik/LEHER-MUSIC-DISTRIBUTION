// services/spotifyService.ts

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyArtist {
    name: string;
}

// New interfaces
export interface SpotifyArtistSimple {
    id: string;
    name: string;
    images: SpotifyImage[];
    genres?: string[];
}

export interface SpotifyAlbumSimple {
    id: string;
    name: string;
    album_type: 'album' | 'single' | 'compilation';
    artists: SpotifyArtist[];
    images: SpotifyImage[];
    release_date: string;
}


// Mock Data
const mockArtists: SpotifyArtistSimple[] = [
    { id: 'artist-ed-sheeran', name: 'Ed Sheeran', images: [{ url: 'https://picsum.photos/seed/edsheeran/300', height: 300, width: 300 }], genres: ['Pop', 'Folk-pop'] },
    { id: 'artist-dua-lipa', name: 'Dua Lipa', images: [{ url: 'https://picsum.photos/seed/dualipa-artist/300', height: 300, width: 300 }], genres: ['Pop', 'Nu-disco'] },
    { id: 'artist-the-weeknd', name: 'The Weeknd', images: [{ url: 'https://picsum.photos/seed/theweeknd-artist/300', height: 300, width: 300 }], genres: ['R&B', 'Synth-pop'] },
    { id: 'artist-dewa-19', name: 'Dewa 19', images: [{ url: 'https://picsum.photos/seed/dewa19-artist/300', height: 300, width: 300 }], genres: ['Rock', 'Pop Rock'] },
    { id: 'artist-noah', name: 'NOAH', images: [{ url: 'https://picsum.photos/seed/noah-artist/300', height: 300, width: 300 }], genres: ['Pop Rock', 'Alternative Rock'] },
    { id: 'artist-raisa', name: 'Raisa', images: [{ url: 'https://picsum.photos/seed/raisa-artist/300', height: 300, width: 300 }], genres: ['Pop', 'R&B'] },
];

const mockArtistAlbums: Record<string, SpotifyAlbumSimple[]> = {
    'artist-ed-sheeran': [
        { id: 'album-divide', name: '÷ (Divide)', album_type: 'album', artists: [{ name: 'Ed Sheeran' }], images: [{ url: 'https://picsum.photos/seed/mustang-divide/300', height: 300, width: 300 }], release_date: '2017-03-03' },
        { id: 'album-equals', name: '= (Equals)', album_type: 'album', artists: [{ name: 'Ed Sheeran' }], images: [{ url: 'https://picsum.photos/seed/mustang-equals/300', height: 300, width: 300 }], release_date: '2021-10-29' },
        { id: 'album-shape-of-you', name: 'Shape of You', album_type: 'single', artists: [{ name: 'Ed Sheeran' }], images: [{ url: 'https://picsum.photos/seed/mustang-shapeofyou/300', height: 300, width: 300 }], release_date: '2017-01-06' },
    ],
    'artist-dua-lipa': [
        { id: 'album-future-nostalgia', name: 'Future Nostalgia', album_type: 'album', artists: [{ name: 'Dua Lipa' }], images: [{ url: 'https://picsum.photos/seed/mustang-future-nostalgia/300', height: 300, width: 300 }], release_date: '2020-03-27' },
        { id: 'album-dont-start-now', name: "Don't Start Now", album_type: 'single', artists: [{ name: 'Dua Lipa' }], images: [{ url: 'https://picsum.photos/seed/mustang-dontstartnow/300', height: 300, width: 300 }], release_date: '2019-10-31' },
    ],
    'artist-the-weeknd': [
         { id: 'album-after-hours', name: 'After Hours', album_type: 'album', artists: [{ name: 'The Weeknd' }], images: [{ url: 'https://picsum.photos/seed/mustang-afterhours/300', height: 300, width: 300 }], release_date: '2020-03-20' },
         { id: 'album-blinding-lights', name: 'Blinding Lights', album_type: 'single', artists: [{ name: 'The Weeknd' }], images: [{ url: 'https://picsum.photos/seed/mustang-blindinglights/300', height: 300, width: 300 }], release_date: '2019-11-29' },
    ],
    'artist-dewa-19': [
        { id: 'album-bintang-lima', name: 'Bintang Lima', album_type: 'album', artists: [{ name: 'Dewa 19' }], images: [{ url: 'https://picsum.photos/seed/mustang-bintanglima/300', height: 300, width: 300 }], release_date: '2000-04-30' },
        { id: 'album-cintailah-cinta', name: 'Cintailah Cinta', album_type: 'album', artists: [{ name: 'Dewa 19' }], images: [{ url: 'https://picsum.photos/seed/mustang-cintailahcinta/300', height: 300, width: 300 }], release_date: '2002-04-05' },
    ],
    'artist-noah': [
        { id: 'album-seperti-seharusnya', name: 'Seperti Seharusnya', album_type: 'album', artists: [{ name: 'NOAH' }], images: [{ url: 'https://picsum.photos/seed/mustang-sepertiseharusnya/300', height: 300, width: 300 }], release_date: '2012-09-16' },
        { id: 'album-keterkaitan-keterikatan', name: 'Keterkaitan Keterikatan', album_type: 'album', artists: [{ name: 'NOAH' }], images: [{ url: 'https://picsum.photos/seed/mustang-keterkaitan/300', height: 300, width: 300 }], release_date: '2019-08-14' },
    ],
     'artist-raisa': [
        { id: 'album-handmade', name: 'Handmade', album_type: 'album', artists: [{ name: 'Raisa' }], images: [{ url: 'https://picsum.photos/seed/mustang-handmade/300', height: 300, width: 300 }], release_date: '2016-04-27' },
        { id: 'album-kali-kedua', name: 'Kali Kedua', album_type: 'single', artists: [{ name: 'Raisa' }], images: [{ url: 'https://picsum.photos/seed/mustang-kalikedua/300', height: 300, width: 300 }], release_date: '2016-03-31' },
    ]
};

/**
 * Mocks searching for an artist on Spotify.
 * @param query The search term for the artist.
 * @returns A promise that resolves to an array of matching artists.
 */
export const searchSpotifyArtists = async (query: string): Promise<SpotifyArtistSimple[]> => {
    console.log(`Searching Spotify artists for: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    if (!query) return [];

    const lowerCaseQuery = query.toLowerCase();
    const results = mockArtists.filter(artist => artist.name.toLowerCase().includes(lowerCaseQuery));

    return results.length > 0 ? results : [mockArtists[Math.floor(Math.random() * mockArtists.length)]];
};

/**
 * Mocks fetching albums for a given artist ID from Spotify.
 * @param artistId The Spotify ID of the artist.
 * @returns A promise that resolves to an array of the artist's albums.
 */
export const getArtistAlbums = async (artistId: string): Promise<SpotifyAlbumSimple[]> => {
    console.log(`Fetching albums for artist ID: ${artistId}`);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    
    return mockArtistAlbums[artistId] || [];
};