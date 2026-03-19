


import type { Song, AnalyticsData, PlatformName, TopCountry, Demographics, StreamData, GeographicData } from '../types';
import { PlatformName as PNameEnum, DistributionStatus } from '../types';

const PLATFORMS: PlatformName[] = [
    PNameEnum.Spotify, PNameEnum.AppleMusic, PNameEnum.YouTubeMusic, 
    PNameEnum.AmazonMusic, PNameEnum.Tidal, PNameEnum.Deezer, PNameEnum.Pandora,
    PNameEnum.SoundCloud, PNameEnum.JioSaavn, PNameEnum.Gaana, PNameEnum.NetEase,
    PNameEnum.Tencent, PNameEnum.YandexMusic, PNameEnum.Anghami, PNameEnum.Boomplay,
    PNameEnum.TikTok, PNameEnum.Facebook, PNameEnum.Instagram, PNameEnum.Shazam,
    PNameEnum.KKBox, PNameEnum.Melon, PNameEnum.Genie, PNameEnum.Bugs, PNameEnum.FLO,
    PNameEnum.QQMusic, PNameEnum.Kugou, PNameEnum.Kuwo, PNameEnum.AWA, PNameEnum.LineMusic,
    PNameEnum.VKMusic, PNameEnum.SberZvuk, PNameEnum.Resso, PNameEnum.Beatport,
    PNameEnum.Traxsource, PNameEnum.JunoDownload, PNameEnum.Qobuz, PNameEnum.Slacker,
    PNameEnum.iHeartRadio, PNameEnum.LiveXLive, PNameEnum.Napster, PNameEnum.ClaroMusica,
    PNameEnum.Hungama, PNameEnum.Wynk
];

const WORLD_COUNTRIES = [
    { name: 'United States', code: 'us', weight: 1.0, city: 'Los Angeles' }, { name: 'Brazil', code: 'br', weight: 0.8, city: 'São Paulo' },
    { name: 'United Kingdom', code: 'gb', weight: 0.7, city: 'London' }, { name: 'Germany', code: 'de', weight: 0.6, city: 'Berlin' },
    { name: 'Mexico', code: 'mx', weight: 0.75, city: 'Mexico City' }, { name: 'Canada', code: 'ca', weight: 0.65, city: 'Toronto' },
    { name: 'Australia', code: 'au', weight: 0.55, city: 'Sydney' }, { name: 'France', code: 'fr', weight: 0.6, city: 'Paris' },
    { name: 'India', code: 'in', weight: 0.9, city: 'Mumbai' }, { name: 'Japan', code: 'jp', weight: 0.5, city: 'Tokyo' },
    { name: 'Russia', code: 'ru', weight: 0.45, city: 'Moscow' }, { name: 'South Korea', code: 'kr', weight: 0.4, city: 'Seoul' },
    { name: 'Indonesia', code: 'id', weight: 0.85, city: 'Jakarta' }, { name: 'Nigeria', code: 'ng', weight: 0.7, city: 'Lagos' },
    { name: 'South Africa', code: 'za', weight: 0.5, city: 'Johannesburg' }, { name: 'Argentina', code: 'ar', weight: 0.6, city: 'Buenos Aires' },
    { name: 'Colombia', code: 'co', weight: 0.65, city: 'Bogotá' }, { name: 'Spain', code: 'es', weight: 0.55, city: 'Madrid' },
    { name: 'Italy', code: 'it', weight: 0.5, city: 'Rome' }, { name: 'Turkey', code: 'tr', weight: 0.45, city: 'Istanbul' },
    { name: 'China', code: 'cn', weight: 0.8, city: 'Shanghai' }, { name: 'Egypt', code: 'eg', weight: 0.4, city: 'Cairo' },
    { name: 'Saudi Arabia', code: 'sa', weight: 0.35, city: 'Riyadh' }, { name: 'United Arab Emirates', code: 'ae', weight: 0.4, city: 'Dubai' },
    { name: 'Philippines', code: 'ph', weight: 0.7, city: 'Manila' }, { name: 'Vietnam', code: 'vn', weight: 0.6, city: 'Ho Chi Minh City' },
    { name: 'Thailand', code: 'th', weight: 0.55, city: 'Bangkok' }, { name: 'Malaysia', code: 'my', weight: 0.5, city: 'Kuala Lumpur' },
    { name: 'Poland', code: 'pl', weight: 0.4, city: 'Warsaw' }, { name: 'Netherlands', code: 'nl', weight: 0.45, city: 'Amsterdam' },
    { name: 'Sweden', code: 'se', weight: 0.35, city: 'Stockholm' }, { name: 'Norway', code: 'no', weight: 0.3, city: 'Oslo' },
    { name: 'Chile', code: 'cl', weight: 0.5, city: 'Santiago' }, { name: 'Peru', code: 'pe', weight: 0.45, city: 'Lima' }
];


// Helper to create a seeded random number generator for consistency
const seededRandom = (seed: number) => {
  let s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
};

const generateGeographicData = (seed: number, totalStreams: number): { topCountries: TopCountry[], streamsByCountry: GeographicData } => {
    let remainingStreams = totalStreams;
    const streamsByCountry: GeographicData = {};

    const shuffledCountries = [...WORLD_COUNTRIES].sort((a, b) => seededRandom(seed + a.code.charCodeAt(0)) - 0.5);

    shuffledCountries.forEach((country, index) => {
        const share = (remainingStreams * (seededRandom(seed + country.code.charCodeAt(1) + index) * 0.15 + 0.01) * country.weight);
        const countryStreams = Math.floor(share);
        if (countryStreams > 0) {
            streamsByCountry[country.code] = { value: countryStreams, city: country.city };
            remainingStreams -= countryStreams;
        }
    });

    const topCountries: TopCountry[] = Object.entries(streamsByCountry)
        .map(([code, data]) => ({
            code,
            streams: data.value,
            name: WORLD_COUNTRIES.find(c => c.code === code)?.name || 'Unknown'
        }))
        .sort((a, b) => b.streams - a.streams)
        .slice(0, 5);
        
    return { topCountries, streamsByCountry };
};


const generateDemographics = (seed: number): Demographics => {
  const age = {
    '13-17': Math.floor(seededRandom(seed + 10) * 15 + 5),
    '18-24': Math.floor(seededRandom(seed + 11) * 30 + 15),
    '25-34': Math.floor(seededRandom(seed + 12) * 25 + 10),
    '35-44': Math.floor(seededRandom(seed + 13) * 15 + 5),
    '45+': Math.floor(seededRandom(seed + 14) * 10),
  };
  const gender = {
    'Female': Math.floor(seededRandom(seed + 15) * 45 + 30),
    'Male': Math.floor(seededRandom(seed + 16) * 40 + 30),
    'Non-binary': Math.floor(seededRandom(seed + 17) * 5 + 1),
  };
  return { age, gender };
};


export const fetchAnalyticsForSong = (song: Song): AnalyticsData | null => {
    if (song.status !== DistributionStatus.Live) return null;

    // Use song id for a consistent random seed
    const seed = song.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const totalStreams = Math.floor(seededRandom(seed) * 500000) + 10000;
    const totalListeners = Math.floor(totalStreams * (seededRandom(seed + 1) * 0.4 + 0.3));
    const monthlyListeners = Math.floor(totalListeners * (seededRandom(seed + 2) * 0.2 + 0.7));
    const totalRevenue = parseFloat((totalStreams * (seededRandom(seed + 3) * 0.003 + 0.001)).toFixed(2));

    let remainingStreams = totalStreams;
    const streamsByPlatform: StreamData[] = PLATFORMS.map((platform, index) => {
        const platformWeight = platform === PNameEnum.Spotify ? 0.3 : (platform === PNameEnum.AppleMusic ? 0.2 : 0.05);
        const share = (index === PLATFORMS.length - 1) 
            ? remainingStreams 
            : Math.floor(totalStreams * (platformWeight + (seededRandom(seed + index + 4) * 0.05)));
        
        const finalShare = Math.min(share, remainingStreams);
        remainingStreams -= finalShare;
        return { platform, streams: finalShare };
    }).sort((a,b) => b.streams - a.streams);
    
    // Ensure total adds up
    if (remainingStreams > 0 && streamsByPlatform.length > 0) {
        streamsByPlatform[0].streams += remainingStreams;
    }
    
    const geographicData = generateGeographicData(seed, totalStreams);

    const streamsByCity: Record<string, number> = {};
    Object.values(geographicData.streamsByCountry).forEach(data => {
        if(data.city) {
            streamsByCity[data.city] = Math.floor(data.value * (0.2 + seededRandom(seed + data.city.length) * 0.2));
        }
    });

    return {
        songId: song.id,
        totalStreams,
        totalListeners,
        monthlyListeners,
        totalRevenue,
        streamsByPlatform,
        demographics: generateDemographics(seed),
        topCountries: geographicData.topCountries,
        streamsByCountry: geographicData.streamsByCountry,
        realtimeStreams: Math.floor(totalStreams / 30 / 24 / 60) + Math.floor(seededRandom(seed+5)*5),
        realtimeRevenue: parseFloat(((totalRevenue / 30 / 24 / 60) + seededRandom(seed+6)*0.01).toFixed(4)),
        streamsByCity,
        avgListenDuration: Math.floor(seededRandom(seed+7) * 120) + 60, // 60s to 180s
        skipRate: parseFloat((seededRandom(seed+8) * 30 + 5).toFixed(1)), // 5% to 35%
        playlistAdds: Math.floor(seededRandom(seed+9) * (totalListeners * 0.01) + 10)
    };
};

export const fetchAllAnalytics = (songs: Song[]): AnalyticsData[] => {
    return songs
        .filter(song => song.status === DistributionStatus.Live)
        .map(song => fetchAnalyticsForSong(song))
        .filter((data): data is AnalyticsData => data !== null);
};

export const fetchIncomeData = async (songs: Song[]) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async fetch
    const allAnalytics = fetchAllAnalytics(songs);

    const totalRevenue = allAnalytics.reduce((sum, data) => sum + data.totalRevenue, 0);

    const revenueBySong = allAnalytics.map(data => {
        const song = songs.find(s => s.id === data.songId);
        return {
            ...data,
            title: song?.title || 'Unknown Song',
            artistName: song?.artistName || 'Unknown Artist',
            coverArtUrl: song?.coverArtUrl || '',
        };
    }).sort((a, b) => b.totalRevenue - a.totalRevenue);

    // Generate monthly trend data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const revenueTrend = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - 5 + i + 12) % 12;
        const monthName = months[monthIndex];
        const seed = i + monthIndex + totalRevenue;
        const randomFactor = seededRandom(seed) * 0.4 + 0.8; 
        const monthlyRevenue = (totalRevenue / 6) * randomFactor;
        return {
            name: monthName,
            revenue: parseFloat(monthlyRevenue.toFixed(2)),
        };
    });
    
    const revenueThisMonth = revenueTrend.length > 0 ? revenueTrend[revenueTrend.length - 1].revenue : 0;

    return {
        totalRevenue,
        revenueBySong,
        revenueTrend,
        revenueThisMonth,
    };
};