import { initialSongs } from '../data/releases';
import type { RecentActivity } from '../types';

// types for admin dashboard
export interface PlatformStats {
    totalRevenue: number;
    revenueChangePercent: number;
    activeUsers: number;
    newUsers: number;
    totalReleases: number;
    releasesToday: number;
}

export interface PendingRelease {
    id: string;
    title: string;
    artistName: string;
    coverArtUrl: string;
    submissionDate: string;
}

export interface SupportTicket {
    id: string;
    subject: string;
    userName: string;
    priority: 'High' | 'Medium' | 'Low';
    lastUpdate: string;
}

export interface ServiceStatus {
    name: string;
    status: 'Operational' | 'Disrupted' | 'Maintenance';
}

export interface CopyrightConflict {
    songId: string;
    title: string;
    artistName: string;
    coverArtUrl: string;
    matchDetails: string;
    submissionDate: string;
}

// --- MOCK DATA GENERATION ---

const indoDJNames = ['Asep', 'Budi', 'Cahyo', 'Dedi', 'Eko', 'Fajar', 'Guntur', 'Hendra', 'Iwan', 'Joko', 'Kurniawan', 'Luki', 'Maman', 'Nana', 'Opick', 'Putra', 'Rizky', 'Sopan', 'Taufik', 'Ujang', 'Vicky', 'Wawan', 'Yudi', 'Zul', 'Andikaa', 'Tenxi', 'Manikci'];
const djSuffixes = ['FVNKY', 'YETE', 'SOPAN', 'PLAT KT'];
const djIndoNouns = ['Lagu Santai', 'Pesta Gila', 'Malam Minggu', 'Hujan Deras', 'Cinta Pertama', 'Putus Nyambung', 'Goyang Dumang', 'Viral TikTok', 'Terbaru 2024', 'Yang Lagi Dicari', 'Full Bass', 'Jedag Jedug Asik', 'Pargoy', 'Sound Kane', 'Nan Ko Paham', 'CLBK (Cinta Lama Bangkit Kembali)', 'Hate Sabe Merindu', 'Transaksi Dana', 'Mejikuhibiniu', 'Kasih Aba Aba', 'Slow Mengkane'];
const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];


const generateTimestamp = (minutesAgo: number): string => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutesAgo);
    return date.toISOString();
};

const mockStats: PlatformStats = {
    totalRevenue: 12540392.55,
    revenueChangePercent: 1.2,
    activeUsers: 84302,
    newUsers: 152,
    totalReleases: 700000,
    releasesToday: 234,
};

const mockActivities: RecentActivity[] = [
    { id: 'act1', type: 'New User', description: '<strong>Budi Santoso</strong> just signed up.', timestamp: generateTimestamp(2) },
    { id: 'act2', type: 'New Release', description: '<strong>DJ Pesta Gila</strong> by DJ Galaxy FVNKY was distributed.', timestamp: generateTimestamp(5) },
    { id: 'act3', type: 'Withdrawal', description: '<strong>$5,230.00</strong> withdrawal initiated by <strong>Ayu Lestari</strong>.', timestamp: generateTimestamp(15) },
    { id: 'act4', type: 'New Release', description: '<strong>DJ Lagu Santai</strong> by DJ Wave SOPAN was distributed.', timestamp: generateTimestamp(25) },
    { id: 'act5', type: 'New User', description: '<strong>John Smith</strong> just signed up.', timestamp: generateTimestamp(45) },
];

const generateLargePendingPool = (count: number): PendingRelease[] => {
    const pool: PendingRelease[] = [];
    for (let i = 0; i < count; i++) {
        const artistName = `DJ ${getRandomElement(indoDJNames)} ${getRandomElement(djSuffixes)}`;
        const title = `DJ ${getRandomElement(djIndoNouns)}`;
        
        pool.push({
            id: `rel-pool-${i}`,
            title: title,
            artistName: artistName,
            coverArtUrl: `https://picsum.photos/seed/pending-release-${i}/200`,
            submissionDate: generateTimestamp(Math.random() * 60 * 24), // Submitted within the last 24 hours
        });
    }
    return pool;
};

const largePendingPool = generateLargePendingPool(100);

const mockSupportTickets: SupportTicket[] = [
    { id: 'tck1', subject: 'Urgent: Payment not received', userName: 'Adi Wijaya', priority: 'High', lastUpdate: generateTimestamp(30) },
    { id: 'tck2', subject: 'Question about royalty splits', userName: 'Sophie Dubois', priority: 'Medium', lastUpdate: generateTimestamp(60 * 3) },
    { id: 'tck3', subject: 'API Integration Help', userName: 'TechWave Inc.', priority: 'Medium', lastUpdate: generateTimestamp(60 * 6) },
];

const mockServiceStatus: ServiceStatus[] = [
    { name: 'Platform API', status: 'Operational' },
    { name: 'Distribution Engine', status: 'Operational' },
    { name: 'Payment Gateway', status: 'Operational' },
    { name: 'Analytics Processing', status: 'Operational' },
    { name: 'AI Services (Gemini)', status: 'Operational' },
];


// --- MOCK SERVICE FUNCTIONS ---
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPlatformStats = async (): Promise<PlatformStats> => {
    await simulateDelay(500);
    return mockStats;
};

export const fetchRecentActivities = async (): Promise<RecentActivity[]> => {
    await simulateDelay(700);
    return mockActivities;
};

export const fetchPendingReleases = async (): Promise<PendingRelease[]> => {
    await simulateDelay(600); // Simulate network latency
    // Return a random slice of the large pool to simulate a live queue
    const shuffled = [...largePendingPool].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 8) + 5; // Return 5 to 12 releases
    return shuffled.slice(0, count);
};

export const fetchSupportTickets = async (): Promise<SupportTicket[]> => {
    await simulateDelay(600);
    return mockSupportTickets;
};

export const fetchServiceStatus = async (): Promise<ServiceStatus[]> => {
    await simulateDelay(400);
    return mockServiceStatus;
};

export const fetchCopyrightConflicts = async (): Promise<CopyrightConflict[]> => {
    await simulateDelay(800);
    return initialSongs
        .filter(s => s.duplicateCheck?.status === 'potential_duplicate')
        .map(s => ({
            songId: s.id,
            title: s.title,
            artistName: s.artistName,
            coverArtUrl: s.coverArtUrl,
            matchDetails: s.duplicateCheck?.matchDetails || 'No details provided.',
            submissionDate: s.releaseDate || new Date().toISOString(),
        }))
        .slice(0, 5); // Just show a few on the dashboard
};