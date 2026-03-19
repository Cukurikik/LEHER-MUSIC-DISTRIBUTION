import type { EnhancedCheckResult, YouTubeMusicAlbumSimple } from '../types';
import {
    searchSpotifyArtists,
    getArtistAlbums,
    type SpotifyAlbumSimple
} from './spotifyService';
import {
    searchYouTubeMusicArtists,
    getYouTubeMusicArtistAlbums,
} from './youTubeService';


export const enhancedDuplicateCheck = async (
  title: string,
  artist: string
): Promise<{ status: 'unique' | 'duplicate'; results: EnhancedCheckResult[] }> => {
  // Simulate network delay for a more realistic feel
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const cleanTitle = title.trim().toLowerCase();
  const cleanArtist = artist.trim().toLowerCase();

  if (!cleanTitle || !cleanArtist) {
    return { status: 'unique', results: [] };
  }

  const allResults: EnhancedCheckResult[] = [];

  // --- Search Spotify ---
  const spotifyArtists = await searchSpotifyArtists(cleanArtist);
  if (spotifyArtists.length > 0) {
    const artistAlbumsPromises = spotifyArtists.map(a => getArtistAlbums(a.id));
    const spotifyArtistAlbums = (await Promise.all(artistAlbumsPromises)).flat();
    
    const spotifyMatches = spotifyArtistAlbums
      .filter(album => album.name.toLowerCase() === cleanTitle)
      .map((album: SpotifyAlbumSimple): EnhancedCheckResult => ({
        source: 'Spotify',
        title: album.name,
        artist: album.artists.map(a => a.name).join(', '),
        album: album.album_type !== 'single' ? album.name : `${album.name} - Single`,
        coverArtUrl: album.images[0]?.url || '',
        isrc: `GBAAW${album.release_date.substring(2,4)}${Math.floor(Math.random() * 90000) + 10000}`,
      }));
    allResults.push(...spotifyMatches);
  }

  // --- Search YouTube Music ---
  const youtubeArtists = await searchYouTubeMusicArtists(cleanArtist);
  if (youtubeArtists.length > 0) {
      const artistAlbumsPromises = youtubeArtists.map(a => getYouTubeMusicArtistAlbums(a.id));
      const youtubeArtistAlbums = (await Promise.all(artistAlbumsPromises)).flat();
      
      const youtubeMatches = youtubeArtistAlbums
          .filter(album => album.name.toLowerCase() === cleanTitle)
          .map((album: YouTubeMusicAlbumSimple): EnhancedCheckResult => ({
              source: 'YouTube Music',
              title: album.name,
              artist: album.artists.map(a => a.name).join(', '),
              album: album.album_type !== 'single' ? album.name : `${album.name} - Single`,
              coverArtUrl: album.thumbnails[0]?.url || '',
              isrc: `US-S1Z-${album.release_date.substring(2,4)}-${Math.floor(Math.random() * 90000) + 10000}`,
          }));
      allResults.push(...youtubeMatches);
  }

  // Remove potential duplicates between services
  const uniqueResults = allResults.reduce<EnhancedCheckResult[]>((acc, current) => {
    if (!acc.some(item => item.title.toLowerCase() === current.title.toLowerCase() && item.artist.toLowerCase() === current.artist.toLowerCase())) {
        acc.push(current);
    }
    return acc;
  }, []);

  if (uniqueResults.length > 0) {
    return { status: 'duplicate', results: uniqueResults };
  }

  return { status: 'unique', results: [] };
};