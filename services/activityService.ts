import type { Activity } from '../types';
import { ActivityType } from '../types';

const generateTimestamp = (minutesAgo: number): string => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutesAgo);
    return date.toISOString();
};

const userNames = ['Andikaa Saputraa', 'Siti Lestari', 'Budi Santoso', 'Rina Wijaya', 'John Smith', 'DJ Galaxy FVNKY', 'Indie Collective', 'Pixel Groove', 'Echo Sound Labs', 'Stellar Music'];
const releaseTitles = ['DJ Pesta Gila', 'DJ Lagu Santai', 'Cosmic Drift', 'Ocean Breath', 'Future Echoes', 'Neon Sunset', 'Digital Love', 'Midnight Run'];
const dsps = ['Spotify', 'Apple Music', 'TikTok', 'YouTube Music'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateMockActivities = (count: number): Activity[] => {
    const activities: Activity[] = [];
    for (let i = 0; i < count; i++) {
        const typeKey = Math.floor(Math.random() * 8);
        const user = { name: getRandomElement(userNames), avatarUrl: `https://picsum.photos/seed/user${i}/100` };
        const release = getRandomElement(releaseTitles);
        
        let activity: Omit<Activity, 'id' | 'timestamp'>;

        switch (typeKey) {
            case 0: // User
                activity = { type: ActivityType.User, title: 'User Registered', description: `<strong>${user.name}</strong> created a new account.`, user, details: { ipAddress: '103.45.12.98', userAgent: 'Chrome/125.0' } };
                break;
            case 1: // Revenue
                const amount = (Math.random() * 2000 + 50).toFixed(2);
                activity = { type: ActivityType.Revenue, title: 'Withdrawal Request', description: `<strong>${user.name}</strong> requested a withdrawal of <strong>$${amount}</strong>.`, user, link: '/transactions', details: { amount, method: 'PayPal' } };
                break;
            case 2: // Release
                const action = getRandomElement(['created a new release', 'updated metadata for', 'submitted a takedown for']);
                activity = { type: ActivityType.Release, title: 'Release Activity', description: `<strong>${user.name}</strong> ${action} '<strong>${release}</strong>'.`, user, link: '/releases', details: { releaseId: `song-${i}` } };
                break;
            case 3: // Copyright
                activity = { type: ActivityType.Copyright, title: 'Copyright Conflict', description: `Potential conflict detected for '<strong>${release}</strong>'.`, link: '/copyright-conflicts', details: { matchConfidence: `${Math.floor(Math.random() * 20) + 75}%` } };
                break;
            case 4: // Analytics
                const streams = Math.floor(Math.random() * 1000) * 1000;
                activity = { type: ActivityType.Analytics, title: 'Streaming Milestone', description: `'<strong>${release}</strong>' passed <strong>${streams.toLocaleString()}</strong> streams.`, link: '/analytics' };
                break;
            case 5: // System
                const task = getRandomElement(['processed 500 releases', 'completed analytics import', 'ran a database migration']);
                activity = { type: ActivityType.System, title: 'System Task Completed', description: `System task '<strong>${task}</strong>' completed successfully.`, details: { duration: `${Math.random() * 5000}ms` } };
                break;
            case 6: // Communication
                const ticketId = Math.floor(Math.random() * 9000) + 1000;
                activity = { type: ActivityType.Communication, title: 'Support Ticket Updated', description: `Support team replied to ticket <strong>#${ticketId}</strong> from <strong>${user.name}</strong>.`, user, link: '/support' };
                break;
            case 7: // Security
                const location = getRandomElement(['Jakarta, ID', 'New York, US', 'London, GB', 'Singapore, SG']);
                activity = { type: ActivityType.Security, title: 'New Location Login', description: `<strong>${user.name}</strong> logged in from a new location (<strong>${location}</strong>).`, user, link: '/settings', details: { ipAddress: '201.18.54.112' } };
                break;
            default:
                 activity = { type: ActivityType.User, title: 'User Logged In', description: `<strong>${user.name}</strong> logged in.`, user };
                break;
        }

        activities.push({
            ...activity,
            id: `act-${Date.now()}-${i}`,
            timestamp: generateTimestamp(i * (Math.random() * 15 + 5)), // 5 to 20 minutes apart
        });
    }
    return activities;
};

const ALL_ACTIVITIES = generateMockActivities(100);

export const fetchActivities = async (filters: { category?: ActivityType | 'All', searchTerm?: string }, page: number, limit: number): Promise<{ activities: Activity[], total: number }> => {
    await new Promise(res => setTimeout(res, 300));

    let filtered = ALL_ACTIVITIES;

    if (filters.category && filters.category !== 'All') {
        filtered = filtered.filter(act => act.type === filters.category);
    }
    
    if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(act => 
            act.title.toLowerCase().includes(term) ||
            act.description.toLowerCase().includes(term) ||
            act.user?.name.toLowerCase().includes(term)
        );
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    
    return { activities: paginated, total };
};