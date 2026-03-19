import { generateMockSong } from '../data/releases';
import { generateSingleNotification } from './notificationsService';
import { incrementFinancialData } from './paymentsService';
import type { Song, Artist, Notification, FinancialOverview, TierDetails, RecentActivity } from '../types';
import { DistributionStatus } from '../types';


interface SimulationCallbacks {
    addSong: (song: Omit<Song, 'id' | 'status'>) => string;
    addArtist: (artist: Artist) => void;
    updateSongStatus: (songId: string, status: Song['status'], distribution?: Song['distribution']) => void;
    addNotification: (notification: Notification) => void;
    updateFinancials: (newOverview: FinancialOverview) => void;
    addActivity: (activity: RecentActivity) => void;
    getArtists: () => Artist[];
    getFinancials: () => FinancialOverview | null;
}

let songInterval: ReturnType<typeof setInterval> | null = null;
let notificationInterval: ReturnType<typeof setInterval> | null = null;
let revenueInterval: ReturnType<typeof setInterval> | null = null;

const pendingSongs: { songId: string; title: string, step: number }[] = [];

export const startSimulation = (callbacks: SimulationCallbacks) => {
    // Stop any existing simulation
    stopSimulation();

    // --- Revenue Simulation ---
    revenueInterval = setInterval(() => {
        const currentFinancials = callbacks.getFinancials();
        if (currentFinancials) {
            const { newOverview } = incrementFinancialData(currentFinancials);
            callbacks.updateFinancials(newOverview);
        }
    }, 8000); // Every 8 seconds

    // --- Notification Simulation ---
    notificationInterval = setInterval(() => {
        const newNotification = generateSingleNotification();
        callbacks.addNotification(newNotification);
    }, 12000); // Every 12 seconds

    // --- Release Simulation ---
    songInterval = setInterval(() => {
        // Create a new song with a certain probability
        if (Math.random() > 0.8 && pendingSongs.length < 10) { // 20% chance to create a new song
            const artists = callbacks.getArtists();
            const { song, newArtist } = generateMockSong(artists);
            if (newArtist) {
                callbacks.addArtist(newArtist);
                 const newUserActivity: RecentActivity = { id: `act-sim-${Date.now()}`, type: 'New User', description: `<strong>${newArtist.name}</strong> baru saja mendaftar.`, timestamp: new Date().toISOString() };
                callbacks.addActivity(newUserActivity);
            }
            const newSongId = callbacks.addSong(song);
            callbacks.updateSongStatus(newSongId, DistributionStatus.Submitted);
            pendingSongs.push({ songId: newSongId, title: song.title, step: 0 });
            
            const newReleaseActivity: RecentActivity = { id: `act-sim-${Date.now()}-release`, type: 'New Release', description: `<strong>${song.artistName}</strong> membuat rilis baru '<strong>${song.title}</strong>'.`, timestamp: new Date().toISOString() };
            callbacks.addActivity(newReleaseActivity);
        }

        // Process a pending song's lifecycle
        if (pendingSongs.length > 0) {
            const songToProcess = pendingSongs[0];
            songToProcess.step++;
            
            let newStatus: Song['status'] | null = null;
            let distribution;
            switch(songToProcess.step) {
                case 1: newStatus = DistributionStatus.Processing; break;
                case 2: newStatus = DistributionStatus.InReview; break;
                case 3: 
                    newStatus = DistributionStatus.Delivered;
                    distribution = { 'spotify': { status: DistributionStatus.Delivered }, 'apple-music': { status: DistributionStatus.Delivered } };
                    break;
                case 4: 
                    newStatus = DistributionStatus.Live;
                    distribution = { 
                        'spotify': { status: DistributionStatus.Live, link: `/player/spotify/${songToProcess.songId}` },
                        'apple-music': { status: DistributionStatus.Live, link: `/player/apple-music/${songToProcess.songId}` }
                    };
                    pendingSongs.shift(); // Remove from queue
                    break;
            }

            if (newStatus) {
                callbacks.updateSongStatus(songToProcess.songId, newStatus, distribution);
            }
        }
        
        // Add a withdrawal activity sometimes
        if (Math.random() > 0.4) { // Increased to 60% chance
            const users = ['Andikaa Saputraa', 'Siti Lestari', 'Budi Santoso', 'Rina Wijaya', 'Indie Collective', 'Pixel Groove'];
            const user = users[Math.floor(Math.random() * users.length)];
            const amount = (Math.random() * 5000 + 100).toFixed(2);
            const withdrawalActivity: RecentActivity = { 
                id: `act-sim-${Date.now()}-withdrawal`, 
                type: 'Withdrawal', 
                description: `Penarikan <strong>$${amount}</strong> oleh <strong>${user}</strong> telah dimulai.`, 
                timestamp: new Date().toISOString() 
            };
            callbacks.addActivity(withdrawalActivity);
        }

    }, 5000); // Shortened interval to 5 seconds for more activity
};

export const stopSimulation = () => {
    if (songInterval) clearInterval(songInterval);
    if (notificationInterval) clearInterval(notificationInterval);
    if (revenueInterval) clearInterval(revenueInterval);
    songInterval = null;
    notificationInterval = null;
    revenueInterval = null;
    pendingSongs.length = 0; // Clear queue
};