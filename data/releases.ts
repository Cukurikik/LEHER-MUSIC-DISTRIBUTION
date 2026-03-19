
import type { Song, Ebook, Artist, SmartLinkCampaign, MasteringProject, StoreDeliveryInfo, Release, Video } from '../types';
import { DistributionStatus, UgcMonetizationPolicy } from '../types';

// --- START OF DATA DEFINITION ---

// Simulated "YouTube Scrape" Data for Indonesian DJ Scene
const indoDJNames = [
    'Asep', 'Budi', 'Cahyo', 'Dedi', 'Eko', 'Fajar', 'Guntur', 'Hendra', 'Iwan', 'Joko', 
    'Kurniawan', 'Luki', 'Maman', 'Nana', 'Opick', 'Putra', 'Rizky', 'Sopan', 'Taufik', 'Ujang', 
    'Vicky', 'Wawan', 'Yudi', 'Zul', 'Andikaa', 'Tenxi', 'Manikci', 'Yoga', 'Arif', 'Bayu', 
    'Dimas', 'Gilang', 'Hadi', 'Indra', 'Kevin', 'Mahesa', 'Nanda', 'Pandu', 'Rama', 'Satria',
    'Tegar', 'Wahyu', 'Yoga', 'Zain', 'Acil', 'Bagus', 'Candra', 'Dani', 'Ferry', 'Galih',
    'Imam', 'Jamal', 'Kiki', 'Luthfi', 'Miko', 'Niko', 'Oki', 'Pasha', 'Qori', 'Rendi',
    'Sandi', 'Tomi', 'Usman', 'Vino', 'Wildan', 'Xavier', 'Yusuf', 'Zaki', 'Tessy', 'Komeng'
];

const djSuffixes = [
    'FVNKY', 'YETE', 'SOPAN', 'PLAT KT', 'REMIX', 'OFFICIAL', 'PROJECT', 'STYLE', 'TIKTOK', 
    'BREAKBEAT', 'JUNGLE', 'DUTCH', 'SLOW', 'BASS', 'NATION', 'INDO', 'CLUB', 'MIX', 'PRO',
    'EXIXT', 'BEAT', 'WAVE', 'VIBES', 'REVOLUTION', 'GANK', 'SQUAD', 'FAMILY', 'TEAM'
];

// Massive list of trending titles derived from YouTube Indonesia "DJ" search
const djIndoNouns = [
    // Viral / TikTok Trends
    'Lagu Santai', 'Pesta Gila', 'Malam Minggu', 'Hujan Deras', 'Cinta Pertama', 'Putus Nyambung', 
    'Goyang Dumang', 'Viral TikTok', 'Terbaru 2025', 'Yang Lagi Dicari', 'Full Bass', 'Jedag Jedug Asik', 
    'Pargoy', 'Sound Kane', 'Nan Ko Paham', 'CLBK (Cinta Lama Bangkit Kembali)', 'Hate Sabe Merindu', 
    'Transaksi Dana', 'Mejikuhibiniu', 'Kasih Aba Aba', 'Slow Mengkane', 'Cikini Gondangdia', 
    'Ikan Dalam Kolam', 'Sial', 'Komang', 'Rungkad', 'Care Bebek', 'Mangku Purel', 'Tiara', 
    'Ojo Dibandingke', 'Domba Kuring', 'Malihi', 'Nemen', 'Sanes', 'Dumes', 'Taman Jurug',
    'Alololo Sayang', 'Kisinan', 'Nemu', 'Wirang', 'Pambasilet', 'Cinderella', 'Kiwoyoowo',
    'Santri Pekok', 'Alay Gaya Kaya Artis', 'Sebab Kau Terlalu Indah', 'Malam Pagi', 'Karna Su Sayang',
    'Tanjung Mas Ninggal Janji', 'Kartonyono Medot Janji', 'Los Dol', 'Widodari', 'Satru',
    'Lemah Teles', 'Pingal', 'Top Topan', 'Madiun Ngawi', 'Kok Iso Yo', 'Ojo Nangis',
    'Lintang Sewengi', 'Dalan Liyane', 'Sugeng Dalu', 'Sampek Tuwek', 'Tulung', 'Gede Roso',
    'Crito Mustahil', 'Klebus', 'Teteg Ati', 'Rasa Bali', 'Satu Rasa Cinta', 'Kalih Welasku',
    'Ego', 'Cerito Loro', 'Kalah Materi', 'Raiso Dadi Siji', 'Nemen', 'Ginio', 'Jajalen Aku',
    'Kembang Wangi', 'Sadar Posisi', 'Cundamani', 'Dumes', 'Pelanggaran', 'Bojomu Sesok Tak Silihe',
    'LDR', 'Aku Ikhlas', 'Yowis Modaro', 'Menungso Ora Toto', 'Perlahan', 'Mendung Tanpo Udan',
    'Ambyar Mak Pyar', 'Satru 2', 'Wong Sepele', 'Angel', 'Cerito Mustahil', 'Lungamu Ninggal Kenangan',
    'Gubuk Asmoro', 'Layang Kangen', 'Stasiun Balapan', 'Sewu Kuto', 'Terminal Tirtonadi',
    'Bojo Loro', 'Pamer Bojo', 'Cidro', 'Kalung Emas', 'Suket Teki', 'Pantai Klayar',
    'Tatu', 'Banyu Langit', 'Dalan Anyar', 'Jambu Alas', 'Kandas', 'Pertemuan', 'Kereta Malam',
    'Oplosan', 'Madu Tuba', 'Secawan Madu', 'Sakit Gigi', 'Gelandangan', 'Begadang', 'Judi',
    'Mirasantika', 'Darah Muda', 'Bujangan', 'Penasaran', 'Ani', 'Gala Gala', 'Keramat',
    'Cuma Kamu', 'Malam Terakhir', 'Syahdu', 'Menunggu', 'Viva Dangdut', 'Terajana', 'Boneka India',
    'Pengobat Rindu', 'Benang Biru', 'Tanda Cinta', 'Tidak Semua Laki Laki', 'Termiskin Di Dunia',
    
    // Western/Pop Remix Titles
    'Mapopo', 'Stereo Love', 'Unstoppable', 'Dusk Till Dawn', 'Faded', 'Alone', 'Unity',
    'On My Way', 'Lily', 'Play', 'Spectre', 'Darkside', 'Ignite', 'Lost Control',
    'End of Time', 'Heading Home', 'Sing Me to Sleep', 'The Spectre', 'Diamond Heart',
    'Different World', 'Tired', 'All Falls Down', 'Hero', 'Live Fast', 'Are You Lonely',
    'Bad Liar', 'Believer', 'Thunder', 'Radioactive', 'Demons', 'Whatever It Takes',
    'Natural', 'Birds', 'Zero', 'Roots', 'Bones', 'Enemy', 'Sharks', 'Symphony',
    'Rockabye', 'Solo', '2002', 'Friends', 'Ciao Adios', 'Don\'t Leave Me Alone',
    
    // Descriptive Titles
    'Full Senyum', 'Bass Beton', 'Glerr', 'Horeg', 'Mantap Jiwa', 'Asyik', 'Goyang',
    'Goyang Nasi Padang', 'Goyang Dumang', 'Goyang Dua Jari', 'Goyang Itik', 'Goyang Gergaji',
    'Goyang Inul', 'Goyang Ngebor', 'Goyang Patah Patah', 'Goyang Caesar', 'Goyang Dribble',
    'Slow Bass', 'Reverb', 'Sped Up', 'Jedag Jedug', 'Old School', 'New Style'
];

const youtubeTags = [
    "Viral TikTok", "Full Bass", "Slow Remix", "Jedag Jedug", "Breakbeat", "Jungle Dutch", 
    "Koplo Remix", "Disco Tanah", "Funkot", "Mengkanem", "Kane Parah", "Bass Beton",
    "Subwoofer Test", "Mobil Legend", "Free Fire", "PUBG", "Cinematic", "Preset Alight Motion",
    "No Finisher", "Plat KT", "Style Jambi", "Style Palembang", "Style Lampung"
];


const generateMockCatalog = () => {
    const artists: Artist[] = [];
    const songs: Song[] = [];

    const genres = ['DJ Remix', 'Breakbeat', 'Jungle Dutch', 'Funkot', 'Dangdut Remix', 'Pop Remix', 'Slow Rock Remix', 'Electronic', 'House', 'Techno'];
    const statuses = Object.values(DistributionStatus);
    const releaseTypes: Song['releaseType'][] = ['Single', 'Single', 'Single', 'Single', 'Single', 'Single', 'EP', 'Album'];

    const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const generateRandomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
    
    // Generate ~1000 artists
    for (let i = 0; i < 1000; i++) {
        let name: string;
        const firstName = getRandomElement(indoDJNames);
        const suffix = getRandomElement(djSuffixes);
        let baseName = `DJ ${firstName} ${suffix}`;
        
        // Add variation
        if (Math.random() > 0.7) baseName = `DJ ${firstName} Official`;
        else if (Math.random() > 0.8) baseName = `${firstName} ${suffix}`;

        if (artists.some(a => a.name === baseName)) {
            baseName = `${baseName} ${Math.floor(i / 20)}`;
        }
        name = baseName;

        artists.push({
            id: `artist-gen-${i}`,
            name: name,
            avatarUrl: `https://picsum.photos/seed/artist-gen-${i}/200`
        });
    }

    // Generate ~5000 songs to make the catalog feel massive
    for (let i = 0; i < 5000; i++) {
        const artist = getRandomElement(artists);
        let title: string;
        let genre = getRandomElement(genres);

        const noun = getRandomElement(djIndoNouns);
        const tag = getRandomElement(youtubeTags);
        
        // Simulate YouTube Title Format
        const format = Math.floor(Math.random() * 4);
        if (format === 0) title = `DJ ${noun} ${tag}`;
        else if (format === 1) title = `DJ ${noun} Viral`;
        else if (format === 2) title = `${noun} - ${artist.name} Remix`;
        else title = `DJ ${noun} Full Bass`;
        
        if (songs.some(s => s.artistId === artist.id && s.title === title)) {
            title = `${title} V${Math.floor(Math.random() * 5) + 2}`;
        }
        
        const rand = Math.random();
        let status: DistributionStatus;
        let isCopyrightConflict = false;

        if (rand < 0.6) { // 60% Live
            status = DistributionStatus.Live;
        } else if (rand < 0.8) { // 20% In Process
            status = getRandomElement([DistributionStatus.Submitted, DistributionStatus.Processing, DistributionStatus.InReview, DistributionStatus.Approved, DistributionStatus.Delivered]);
        } else if (rand < 0.9) { // 10% Error
            status = getRandomElement([DistributionStatus.Error, DistributionStatus.Rejected]);
        } else { // 10% Copyright Conflict (will also be set to a normal status)
            status = getRandomElement([DistributionStatus.Live, DistributionStatus.Draft, DistributionStatus.Rejected]);
            isCopyrightConflict = true;
        }

        const hasLiveDistribution = status === DistributionStatus.Live;

        songs.push({
            id: `song-gen-${i}`,
            assetType: 'Audio',
            title: title,
            artistId: artist.id,
            artistName: artist.name,
            genre: genre,
            coverArtUrl: `https://picsum.photos/seed/cover-${i}-${title.replace(/\s/g, '')}/400`,
            description: `Official release for ${title}. Dapatkan musik terbaik hanya di saluran ini. Jangan lupa like, comment, dan subscribe!`,
            fileName: `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.wav`,
            upc: `19800${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
            isrc: `ID-A0${Math.floor(Math.random()*9)}-${new Date().getFullYear().toString().slice(-2)}-${String(Math.floor(Math.random() * 90000) + 10000)}`,
            status: status,
            distribution: { 
                ...(hasLiveDistribution && {
                  'spotify': { status: DistributionStatus.Live, link: `/player/spotify/song-gen-${i}` }, 
                  'apple-music': { status: DistributionStatus.Live, link: `/player/apple-music/song-gen-${i}` },
                  'youtube-music': { status: DistributionStatus.Live, link: `/player/youtube-music/song-gen-${i}` },
                  'tiktok': { status: DistributionStatus.Live }
                })
            },
            releaseType: getRandomElement(releaseTypes),
            releaseDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
            cHolder: `${new Date().getFullYear()} ${artist.name}`,
            pHolder: `${new Date().getFullYear()} ${artist.name} Records`,
            contributors: [{ id: `c-gen-${i}`, name: artist.name, role: 'Main Artist', share: 100 }],
            ugcMonetizationPolicy: getRandomElement(Object.values(UgcMonetizationPolicy)),
            bpm: Math.floor(Math.random() * 60) + 90, // 90-150 BPM typical for remix
            key: getRandomElement(['C Minor', 'A Minor', 'F Major', 'G Major', 'D Minor']),
            moods: ['Energetic', 'Party', 'Dance', 'Happy', 'Hype'],
            isInstrumental: Math.random() > 0.7,
            duplicateCheck: { 
                status: isCopyrightConflict ? 'potential_duplicate' : 'clean',
                ...(isCopyrightConflict && { matchDetails: `Matches content ID: ${Math.random().toString(36).substring(7)}` })
            },
            aiValidationIssues: [],
            storeDelivery: [],
        });
    }

    return { artists, songs };
};

const { artists: generatedArtists, songs: generatedSongs } = generateMockCatalog();

export const initialArtists: Artist[] = [
    { id: 'artist-1', name: 'DJ Galaxy FVNKY', avatarUrl: 'https://picsum.photos/seed/artist1/200' },
    { id: 'artist-2', name: 'DJ Wave SOPAN', avatarUrl: 'https://picsum.photos/seed/artist2/200' },
    { id: 'artist-maman-fvndy', name: 'DJ Maman FVNKY', avatarUrl: 'https://picsum.photos/seed/mamanfvndy/200' },
    { id: 'artist-dj-manikci', name: 'DJ Manikci YETE', avatarUrl: 'https://picsum.photos/seed/djmanikci/200' },
    { id: 'artist-hendra98', name: 'DJ Hendra PLAT KT', avatarUrl: 'https://picsum.photos/seed/hendra98/200' },
    { id: 'artist-andikaa-saputraa', name: 'DJ Andikaa YETE', avatarUrl: 'https://picsum.photos/seed/andikaasaputraa/200' },
    { id: 'artist-tenxi', name: 'DJ Tenxi SOPAN', avatarUrl: 'https://picsum.photos/seed/tenxi/200' },
    { id: 'artist-dj-sopan', name: 'DJ Sopan SOPAN', avatarUrl: 'https://picsum.photos/seed/djsopan/200' },
    { id: 'artist-dj-mahesa', name: 'DJ Mahesa', avatarUrl: 'https://picsum.photos/seed/djmahesa/200' },
    { id: 'artist-dj-aluna', name: 'DJ Aluna', avatarUrl: 'https://picsum.photos/seed/djaluna/200' },
    ...generatedArtists,
];

const sampleEbook: Ebook = {
    id: 'ebook-1',
    assetType: 'Ebook',
    title: 'Panduan Sukses Rilis Musik',
    authorName: 'Andikaa Saputraa',
    genre: 'Non-Fiction',
    coverArtUrl: 'https://picsum.photos/seed/ebook-cover-1/400',
    description: 'Buku panduan lengkap buat musisi independen yang mau sukses di era digital. Dari mulai produksi sampe promosi, semua dibahas tuntas!',
    fileName: 'panduan_sukses_rilis_musik.epub',
    isbn: '978-3-16-148410-0',
    status: DistributionStatus.Live,
    publisher: 'Leher Publishing',
    publicationDate: '2024-06-15',
    language: 'Indonesian',
    price: 9.99,
};

const ebookForApproval: Ebook = {
    id: 'ebook-2',
    assetType: 'Ebook',
    title: 'Strategi Pemasaran Musik Digital',
    authorName: 'Rina Wijaya',
    genre: 'Marketing',
    coverArtUrl: 'https://picsum.photos/seed/ebook-cover-2/400',
    description: 'Kupas tuntas strategi jitu untuk memasarkan musik di era digital.',
    fileName: 'strategi_pemasaran.epub',
    status: DistributionStatus.Submitted,
    price: 12.50,
};

const ebookForDistribution: Ebook = {
    id: 'ebook-3',
    assetType: 'Ebook',
    title: 'Menulis Lirik yang Menggugah',
    authorName: 'Eko Nugroho',
    genre: 'Music Theory',
    coverArtUrl: 'https://picsum.photos/seed/ebook-cover-3/400',
    description: 'Panduan praktis untuk para penulis lagu.',
    fileName: 'menulis_lirik.pdf',
    status: DistributionStatus.Approved,
    price: 7.99,
};


export const initialReleases: Release[] = [
    // --- SONGS ---
    {
        id: 'song-mahesa-1',
        assetType: 'Audio',
        title: 'DJ Gadis Bali Menggoda',
        artistId: 'artist-dj-mahesa',
        artistName: 'DJ Mahesa',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/dj-gadis-bali/400',
        description: 'A hot new drop from DJ Mahesa.',
        fileName: 'dj_gadis_bali.wav',
        status: DistributionStatus.Live,
        distribution: { 'spotify': { status: DistributionStatus.Live }, 'apple-music': { status: DistributionStatus.Live } },
        releaseType: 'Single',
        releaseDate: '2024-07-28',
        cHolder: '2024 DJ Mahesa',
        pHolder: '2024 Leher Music',
        contributors: [{ id: 'c-mahesa-1', name: 'DJ Mahesa', role: 'Producer', share: 100 }],
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        isInstrumental: true, duplicateCheck: { status: 'clean' }, aiValidationIssues: [], storeDelivery: [],
    },
    {
        id: 'song-mahesa-2',
        assetType: 'Audio',
        title: 'DJ Viral FYP 2024',
        artistId: 'artist-dj-mahesa',
        artistName: 'DJ Mahesa',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/dj-viral-fyp/400',
        description: 'Viral sound from DJ Mahesa.',
        fileName: 'dj_viral_fyp.wav',
        status: DistributionStatus.Live,
        distribution: { 'spotify': { status: DistributionStatus.Live }, 'apple-music': { status: DistributionStatus.Live } },
        releaseType: 'Single',
        releaseDate: '2024-07-25',
        cHolder: '2024 DJ Mahesa',
        pHolder: '2024 Leher Music',
        contributors: [{ id: 'c-mahesa-2', name: 'DJ Mahesa', role: 'Producer', share: 100 }],
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        isInstrumental: true, duplicateCheck: { status: 'clean' }, aiValidationIssues: [], storeDelivery: [],
    },
    {
        id: 'song-aluna-1',
        assetType: 'Audio',
        title: 'DJ Senja di Jakarta',
        artistId: 'artist-dj-aluna',
        artistName: 'DJ Aluna',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/dj-senja-jakarta/400',
        description: 'A romantic drop from DJ Aluna.',
        fileName: 'dj_senja_jakarta.wav',
        status: DistributionStatus.Processing,
        distribution: {},
        releaseType: 'Single',
        releaseDate: '2024-08-01',
        cHolder: '2024 DJ Aluna',
        pHolder: '2024 Leher Music',
        contributors: [{ id: 'c-aluna-1', name: 'DJ Aluna', role: 'Producer', share: 100 }],
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        isInstrumental: true, duplicateCheck: { status: 'clean' }, aiValidationIssues: [], storeDelivery: [],
    },
    {
        id: 'song-aluna-2',
        assetType: 'Audio',
        title: 'DJ Rindu Pagi',
        artistId: 'artist-dj-aluna',
        artistName: 'DJ Aluna',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/dj-rindu-pagi/400',
        description: 'A classic reborn by DJ Aluna.',
        fileName: 'dj_rindu_pagi.wav',
        status: DistributionStatus.Draft,
        distribution: {},
        releaseType: 'Single',
        releaseDate: '2024-08-10',
        cHolder: '2024 DJ Aluna',
        pHolder: '2024 Leher Music',
        contributors: [{ id: 'c-aluna-2', name: 'DJ Aluna', role: 'Producer', share: 100 }],
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        isInstrumental: true, duplicateCheck: { status: 'clean' }, aiValidationIssues: [], storeDelivery: [],
    },
    {
        id: 'song-1',
        assetType: 'Audio',
        title: 'DJ Pesta Gila',
        artistId: 'artist-1',
        artistName: 'DJ Galaxy FVNKY',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/dj-pesta-gila-cover/400',
        description: 'A synthwave journey through neon-lit cityscapes.',
        fileName: 'cosmic_drift.mp3',
        upc: '198003456789',
        isrc: 'US-S1Z-23-12345',
        status: DistributionStatus.Live,
        distribution: { 
          'spotify': { status: DistributionStatus.Live, link: `/player/spotify/song-1` }, 
          'apple-music': { status: DistributionStatus.Live, link: `/player/apple-music/song-1` },
          'youtube-music': { status: DistributionStatus.Live, link: `/player/youtube-music/song-1` }
        },
        marketingStrategy: `### 1. Target Audience
- **Primary:** Fans of synthwave, retrowave, and electronic music (ages 20-40). They enjoy nostalgic 80s aesthetics, cyberpunk themes, and artists like The Midnight, Com Truise, and Gunship.
- **Secondary:** Gamers, particularly those who play retro or sci-fi themed games.

### 2. Pre-Release Hype
- **IG/TikTok Reel:** A 15-second video clip showing a retro-futuristic car driving through a neon city, synced to the track's main hook. Caption: "New journey begins. 'Cosmic Drift' out Friday. #synthwave #retrowave #newmusic"
- **Cover Art Reveal:** Post the stunning cover art with a countdown. "3 DAYS. #cosmicdrift"
- **Audio Snippet:** Share a different 10-15 second clip focusing on a cool synth solo or atmospheric pad.

### 3. Release Day Push
- **Announcement:** "It's here! 'Cosmic Drift' is now streaming everywhere. Put on your headphones and take a ride." Post links to major platforms in bio/story.
- **Call-to-Action:** "Save 'Cosmic Drift' to your library and add it to your favorite playlists! Let me know what you think in the comments."

### 4. Post-Release Promotion
- **Playlist Pitching:** Submit to popular user-curated Spotify playlists like 'Synthwave From Space', 'Retrowave/Outrun', and 'Cyberpunk Dystopia'.
- **Visualizer Video:** Create a simple, looping visualizer video for the full track on YouTube.
- **Engage:** Actively respond to comments and thank fans for sharing the track.`,
        releaseType: 'Single',
        releaseDate: '2023-10-27',
        trackVersion: 'Radio Edit',
        label: 'Neon Nights Records',
        cHolder: '2023 DJ Galaxy FVNKY',
        pHolder: '2023 Neon Nights Records',
        contributors: [
          { id: 'c-1', name: 'Alex Wave', role: 'Composer', share: 50 },
          { id: 'c-2', name: 'Zara Grid', role: 'Producer', share: 50 },
        ],
        releaseLanguage: 'English',
        lyricsLanguage: 'English',
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        bpm: 125,
        key: 'C Minor',
        moods: ['Driving', 'Nostalgic', 'Energetic'],
        isInstrumental: false,
        duplicateCheck: { status: 'clean' },
        aiValidationIssues: [],
        deliveryProgress: 100,
        deliveryStatusDetail: "Terkirim Penuh",
        storeDelivery: [
            { name: 'Spotify', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2023-10-27T10:00:00Z' },
            { name: 'Apple Music', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2023-10-27T10:00:00Z' },
            { name: 'YouTube Music', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2023-10-27T10:00:00Z' },
            { name: 'TikTok', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2023-10-27T10:00:00Z' },
            { name: 'Deezer', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2023-10-27T10:00:00Z' },
            { name: 'Amazon Music', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2023-10-27T10:00:00Z' },
        ],
      },
      {
        id: 'song-2',
        assetType: 'Audio',
        title: 'DJ Lagu Santai',
        artistId: 'artist-2',
        artistName: 'DJ Wave SOPAN',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/white-mustang-beach/400',
        description: 'Calm and meditative ambient track.',
        fileName: 'ocean_breath.wav',
        status: DistributionStatus.Processing,
        distribution: {
          'spotify': { status: DistributionStatus.Delivered },
          'apple-music': { status: DistributionStatus.Processing },
        },
        releaseType: 'Single',
        releaseDate: '2024-08-15',
        cHolder: '2024 DJ Wave SOPAN',
        pHolder: '2024 Deep Wave',
        contributors: [
          { id: 'c-3', name: 'Marina Sound', role: 'Composer', share: 100 }
        ],
        releaseLanguage: 'Instrumental',
        lyricsLanguage: 'Instrumental',
        ugcMonetizationPolicy: UgcMonetizationPolicy.Track,
        bpm: 80,
        key: 'A Minor',
        moods: ['Calm', 'Meditative', 'Peaceful'],
        isInstrumental: true,
        duplicateCheck: { status: 'clean' },
        aiValidationIssues: [],
        deliveryProgress: 60,
        deliveryStatusDetail: "Memproses di YouTube & TikTok",
        storeDelivery: [
            { name: 'Spotify', status: DistributionStatus.Delivered, progress: 100, lastUpdate: '2024-08-15T10:00:00Z' },
            { name: 'Apple Music', status: DistributionStatus.Processing, progress: 90, lastUpdate: '2024-08-15T10:00:00Z' },
            { name: 'YouTube Music', status: DistributionStatus.Processing, progress: 40, lastUpdate: '2024-08-15T10:00:00Z' },
            { name: 'TikTok', status: DistributionStatus.Submitted, progress: 0, lastUpdate: '2024-08-15T10:00:00Z' },
        ],
    },
    {
        id: 'song-dj-nan-ko-paham',
        assetType: 'Audio',
        title: 'DJ NAN KO PAHAM',
        artistId: 'artist-maman-fvndy',
        artistName: 'DJ Maman FVNKY',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/mustang-nankopaham/400',
        description: 'DJ NAN KO PAHAM by DJ Maman FVNKY.',
        fileName: 'dj_nan_ko_paham.wav',
        status: DistributionStatus.Approved,
        distribution: { 'spotify': { status: DistributionStatus.Approved } },
        releaseType: 'Single',
        releaseDate: '2024-05-10',
        cHolder: '2024 DJ Maman FVNKY',
        pHolder: '2024 Leher Music',
        contributors: [{ id: `c-maman`, name: 'DJ Maman FVNKY', role: 'Producer', share: 100 }],
        releaseLanguage: 'Instrumental',
        lyricsLanguage: 'Instrumental',
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        bpm: 140, key: 'D Minor', moods: ['Energetic', 'Party'], isInstrumental: true, duplicateCheck: { status: 'clean' }, aiValidationIssues: [],
        deliveryProgress: 0,
        deliveryStatusDetail: 'Siap Untuk Distribusi',
        storeDelivery: [],
    },

    // --- VIDEO RELEASES ---
    {
        id: 'video-1',
        assetType: 'Video',
        title: 'DJ Gadis Bali Menggoda (Official Video)',
        artistId: 'artist-dj-mahesa',
        artistName: 'DJ Mahesa',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/video-thumb-1/400',
        description: 'Official Music Video for DJ Gadis Bali Menggoda. Directed by Rizky Cinema.',
        fileName: 'dj_gadis_bali_mv_1080p.mp4',
        videoFileName: 'dj_gadis_bali_mv_1080p.mp4',
        status: DistributionStatus.Live,
        distribution: { 'vevo': { status: DistributionStatus.Live }, 'apple-music-video': { status: DistributionStatus.Processing } },
        releaseType: 'Music Video',
        releaseDate: '2024-09-01',
        cHolder: '2024 DJ Mahesa',
        pHolder: '2024 Leher Music',
        contributors: [{ id: 'c-vid-1', name: 'Rizky Cinema', role: 'Video Director', share: 0 }],
        videoDirector: 'Rizky Cinema',
        videoProducer: 'Bali Beats Production',
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        aiValidationIssues: [],
        storeDelivery: []
    },
    {
        id: 'video-2',
        assetType: 'Video',
        title: 'Cosmic Drift (Visualizer 4K)',
        artistId: 'artist-1',
        artistName: 'DJ Galaxy FVNKY',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/video-thumb-2/400',
        description: 'Official Visualizer for Cosmic Drift. Neon vibes.',
        fileName: 'cosmic_drift_vis.mp4',
        videoFileName: 'cosmic_drift_vis.mp4',
        status: DistributionStatus.Live,
        distribution: { 'vevo': { status: DistributionStatus.Live } },
        releaseType: 'Visualizer',
        releaseDate: '2023-11-01',
        cHolder: '2023 DJ Galaxy FVNKY',
        pHolder: '2023 Neon Nights Records',
        contributors: [],
        videoDirector: 'AI Gen Pro',
        ugcMonetizationPolicy: UgcMonetizationPolicy.Track,
        aiValidationIssues: [],
        storeDelivery: []
    },
     {
        id: 'video-3',
        assetType: 'Video',
        title: 'Senja di Jakarta (Lyric Video)',
        artistId: 'artist-dj-aluna',
        artistName: 'DJ Aluna',
        genre: 'DJ Remix',
        coverArtUrl: 'https://picsum.photos/seed/video-thumb-3/400',
        description: 'Sing along to Senja di Jakarta.',
        fileName: 'senja_jakarta_lyrics.mov',
        videoFileName: 'senja_jakarta_lyrics.mov',
        status: DistributionStatus.Submitted,
        distribution: {},
        releaseType: 'Lyric Video',
        releaseDate: '2024-08-05',
        cHolder: '2024 DJ Aluna',
        pHolder: '2024 Leher Music',
        contributors: [{ id: 'c-vid-3', name: 'Text Motion Studio', role: 'Editor', share: 0 }],
        videoDirector: 'Text Motion Studio',
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        aiValidationIssues: [],
        storeDelivery: []
    },

    ...generatedSongs,
    sampleEbook,
    ebookForApproval,
    ebookForDistribution,
];
export const initialSongs = initialReleases.filter(r => r.assetType === 'Audio') as Song[];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generator for 700 SmartLink Campaigns
const generateSmartLinkCampaigns = (count: number): SmartLinkCampaign[] => {
    const campaigns: SmartLinkCampaign[] = [];
    
    const themeAdjectives = ["Neon", "Cyber", "Sunset", "Oceanic", "Dark", "Light", "Pastel", "Vibrant", "Retro", "Modern", "Minimal", "Bold", "Electric", "Golden", "Silver", "Crystal", "Velvet", "Urban", "Tropical", "Cosmic"];
    const themeNouns = ["Blue", "Red", "Noir", "Wave", "Glow", "Pulse", "Vibe", "Mode", "Theme", "Style", "Flow", "Beat", "Rhythm", "Soul", "Spirit", "Essence", "Aura", "Zone", "World", "Life"];
    
    const statuses: ('Active' | 'Draft' | 'Expired')[] = ['Active', 'Active', 'Active', 'Draft', 'Expired'];

    for(let i = 0; i < count; i++) {
        // Pick a random song to link to (from generated or initial)
        const song = i < initialSongs.length ? initialSongs[i] : getRandomElement(generatedSongs);
        
        const themeName = `${getRandomElement(themeAdjectives)} ${getRandomElement(themeNouns)}`;
        const campaignType = Math.random() > 0.3 ? 'SmartLink' : 'Pre-Save';
        
        campaigns.push({
            id: `campaign-gen-${i}`,
            name: `'${song.title}' ${campaignType} - ${themeName}`,
            type: campaignType,
            releaseId: song.id,
            releaseTitle: song.title,
            artistName: song.artistName,
            coverArtUrl: song.coverArtUrl,
            customSlug: `${song.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(Math.random()*1000)}`,
            shortUrl: `leher.link/${song.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            releaseDate: song.releaseDate || new Date().toISOString(),
            status: getRandomElement(statuses),
            totalClicks: Math.floor(Math.random() * 50000),
            totalPreSaves: campaignType === 'Pre-Save' ? Math.floor(Math.random() * 5000) : 0,
            links: [
                { id: `l-sp-${i}`, platform: 'Spotify', url: '#', enable_presave: true },
                { id: `l-am-${i}`, platform: 'Apple Music', url: '#', enable_presave: true },
                { id: `l-yt-${i}`, platform: 'YouTube Music', url: '#', enable_presave: false },
            ],
        });
    }
    
    return campaigns;
}

export const initialCampaigns: SmartLinkCampaign[] = [
    {
        id: 'campaign-1',
        name: "'DJ Pesta Gila' Pre-Save",
        type: 'Pre-Save',
        releaseId: 'song-1',
        releaseTitle: 'DJ Pesta Gila',
        artistName: 'DJ Galaxy FVNKY',
        coverArtUrl: 'https://picsum.photos/seed/dj-pesta-gila-cover/400',
        customSlug: 'pesta-gila-presave',
        shortUrl: 'leher.link/pesta-gila',
        releaseDate: '2023-10-27',
        status: 'Expired',
        totalClicks: 15230,
        totalPreSaves: 8450,
        links: [
            { id: 'l1', platform: 'Spotify', url: '#', enable_presave: true },
            { id: 'l2', platform: 'Apple Music', url: '#', enable_presave: true },
        ],
    },
     {
        id: 'campaign-2',
        name: "'Lagu Santai' SmartLink",
        type: 'SmartLink',
        releaseId: 'song-2',
        releaseTitle: 'DJ Lagu Santai',
        artistName: 'DJ Wave SOPAN',
        coverArtUrl: 'https://picsum.photos/seed/white-mustang-beach/400',
        customSlug: 'lagu-santai',
        shortUrl: 'leher.link/lagu-santai',
        releaseDate: '2024-08-15',
        status: 'Active',
        totalClicks: 184021,
        totalPreSaves: 0,
        links: [
            { id: 'l3', platform: 'Spotify', url: '#', enable_presave: false },
            { id: 'l4', platform: 'Apple Music', url: '#', enable_presave: false },
            { id: 'l5', platform: 'YouTube Music', url: '#', enable_presave: false },
        ],
    },
    ...generateSmartLinkCampaigns(700) // Generate 700 campaigns
];

export const initialMasteringProjects: MasteringProject[] = [
    {
        id: 'master-1',
        songId: 'song-1',
        projectName: 'DJ Pesta Gila',
        originalFileName: 'pesta_gila_mix_v1.wav',
        status: 'Ready',
        style: 'Loud & Clear',
        createdAt: '2023-10-20T10:00:00Z',
        coverArtUrl: 'https://picsum.photos/seed/dj-pesta-gila-cover/400',
        artistName: 'DJ Galaxy FVNKY',
        originalAudioUrl: '#',
        masteredAudioUrl: '#',
        originalStats: { lufs: -14.2, peak: -1.1, dr: 12 },
        masteredStats: { lufs: -9.5, peak: -0.2, dr: 8 },
    },
    {
        id: 'master-2',
        songId: 'song-2',
        projectName: 'DJ Lagu Santai',
        originalFileName: 'lagu_santai.wav',
        status: 'Processing',
        style: 'Warm & Open',
        createdAt: '2024-07-10T11:00:00Z',
        coverArtUrl: 'https://picsum.photos/seed/white-mustang-beach/400',
        artistName: 'DJ Wave SOPAN',
        originalAudioUrl: '#',
        masteredAudioUrl: '#',
        originalStats: { lufs: -16.5, peak: -2.0, dr: 14 },
        masteredStats: { lufs: -11.0, peak: -0.5, dr: 10 },
    },
];

export const generateMockSong = (existingArtists: Artist[]): { song: Omit<Song, 'id'>, newArtist?: Artist } => {
    let newArtist: Artist | undefined = undefined;
    let artistName = `DJ ${getRandomElement(indoDJNames)} ${getRandomElement(djSuffixes)}`;
    const artistId = `artist-gen-${Date.now()}`;

    // Ensure the generated artist name is unique among existing artists.
    if (existingArtists.some(a => a.name === artistName)) {
        artistName = `${artistName} Official`;
    }
    newArtist = { id: artistId, name: artistName, avatarUrl: `https://picsum.photos/seed/${artistId}/200` };

    const noun = getRandomElement(djIndoNouns);
    const tag = getRandomElement(youtubeTags);
    const title = `DJ ${noun} ${tag}`;
    
    const id = `song-gen-${Date.now()}`;

    const song: Omit<Song, 'id'> = {
        assetType: 'Audio',
        title,
        artistId: newArtist.id,
        artistName: newArtist.name,
        genre: 'DJ Remix',
        coverArtUrl: `https://picsum.photos/seed/${id}/400`,
        description: `An automatically generated track.`,
        fileName: `${title.toLowerCase().replace(/ /g, '_')}.wav`,
        status: DistributionStatus.Draft,
        distribution: {},
        releaseType: 'Single',
        releaseDate: new Date().toISOString().split('T')[0],
        cHolder: `${new Date().getFullYear()} ${newArtist.name}`,
        pHolder: `${new Date().getFullYear()} ${newArtist.name}`,
        contributors: [],
        ugcMonetizationPolicy: UgcMonetizationPolicy.Monetize,
        isInstrumental: true,
        duplicateCheck: { status: 'clean' },
        aiValidationIssues: [],
        storeDelivery: [],
    };

    return { song, newArtist };
};

// --- END OF DATA DEFINITION ---
