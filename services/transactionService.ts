import type { Transaction } from '../types';

// Name databases for recipient generation
const indoFirstNames = ['Budi', 'Siti', 'Adi', 'Ayu', 'Rina', 'Rizky', 'Nurul', 'Iqbal', 'Dewi', 'Agung', 'Fitri', 'Rendy', 'Mira', 'Eko', 'Putri', 'Bayu', 'Lestari', 'Dian', 'Fajar', 'Gilang', 'Hana', 'Indra', 'Joko', 'Kartika', 'Lina'];
const indoLastNames = ['Santoso', 'Wijaya', 'Putri', 'Ramadhan', 'Saputra', 'Lestari', 'Pratama', 'Anwar', 'Siregar', 'Simanjuntak', 'Hidayat', 'Susanto', 'Kusuma', 'Nugroho', 'Prakoso', 'Utami', 'Wibowo', 'Yuliana', 'Zainal'];
const euroFirstNames = ['John', 'Mary', 'David', 'Sophie', 'Lucas', 'Emma', 'Liam', 'Olivia', 'Noah', 'Isabella', 'Max', 'Clara', 'Julian', 'Chloe', 'Benjamin', 'Mia', 'Oliver', 'Charlotte', 'Elijah', 'Amelia'];
const euroLastNames = ['Smith', 'Jones', 'Müller', 'Schmidt', 'Rossi', 'Dubois', 'García', 'Nowak', 'Jensen', 'Silva', 'Andersson', 'Ivanov', 'Taylor', 'Wilson', 'Martin', 'Brown', 'Davies', 'Evans'];

const incomeSources = ['Spotify', 'Apple Music', 'YouTube', 'Amazon Music', 'TikTok', 'Meta', 'Tidal', 'Deezer', 'Pandora', 'SoundCloud', 'Bandcamp'];
const withdrawalMethods = ['Bank Transfer', 'PayPal', 'Wise', 'Payoneer'];
const statuses: Transaction['status'][] = ['Completed', 'Completed', 'Completed', 'Pending', 'Failed', 'Processing'];
const transactionTypes: Transaction['type'][] = ['income', 'income', 'income', 'income', 'withdrawal', 'fee', 'adjustment', 'Leher Fee', 'Platform Fee'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const generateRandomName = () => {
    if (Math.random() > 0.5) {
        // Indonesian name
        return `${getRandomElement(indoFirstNames)} ${getRandomElement(indoLastNames)}`;
    } else {
        // European name
        return `${getRandomElement(euroFirstNames)} ${getRandomElement(euroLastNames)}`;
    }
};

const generateTxnId = () => `WTHDR${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
const generatePastDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    return date.toISOString();
};

// Generate a pool of 350 unique users to simulate the requested customer base
const userPool = Array.from({ length: 350 }, (_, i) => ({
    id: `user-${i + 100}`,
    name: generateRandomName()
}));

const generateMockTransactions = (count: number): Transaction[] => {
    const transactions: Transaction[] = [];
    const labelNames = ["Dream Beat Collective", "Pixel Groove Studios", "Echo Sound Labs", "Quantum Records", "Starlight Media", "Indie Vibes"];

    for (let i = 0; i < count; i++) {
        const type = getRandomElement(transactionTypes);
        const user = getRandomElement(userPool); // Pick from the 300+ user pool

        let description = '';
        let source_target = '';
        let recipient_name: string | undefined = undefined;
        let amount = 0;
        let payment_method: string | undefined = undefined;
        
        switch (type) {
            case 'income':
                source_target = getRandomElement(incomeSources);
                description = `${source_target} Royalties`;
                amount = Math.random() * 800 + 20;
                break;
            case 'withdrawal':
                recipient_name = user.name;
                payment_method = getRandomElement(withdrawalMethods);
                description = `Withdrawal to ${recipient_name}`;
                source_target = payment_method;
                amount = -(Math.random() * 1500 + 100);
                break;
            case 'fee':
                description = "Leher Pro Subscription Fee";
                source_target = "Leher Services";
                amount = -19.99;
                break;
            case 'Leher Fee':
                 source_target = 'Leher Music';
                 description = `Commission on ${getRandomElement(incomeSources)} earnings`;
                 amount = -(Math.random() * 100 + 10);
                 break;
            case 'Platform Fee':
                source_target = getRandomElement(incomeSources);
                description = `Marketing fee on ${source_target}`;
                amount = -(Math.random() * 50);
                break;
            case 'adjustment':
                description = "Royalty Correction";
                source_target = "Leher Admin";
                amount = (Math.random() * 100 - 50); // Can be positive or negative
                break;
        }

        transactions.push({
            id: `txn_${i}`,
            date: generatePastDate(i % 365), // Spread over a year
            description: description,
            type: type,
            amount: parseFloat(amount.toFixed(2)),
            currency: 'USD',
            status: getRandomElement(statuses),
            source_target: source_target,
            recipient_name: recipient_name,
            related_release_title: Math.random() > 0.7 ? 'Cosmic Drift' : undefined,
            transaction_details: {
                transaction_id: generateTxnId(),
                payment_method: payment_method,
                reporting_period: type === 'income' ? `Q${Math.floor(i / 90) + 1} 2024` : undefined,
                notes: type === 'adjustment' ? 'Manual adjustment by finance team.' : undefined,
            },
            user: user,
            label: Math.random() > 0.5 ? { id: `label-${i % 10}`, name: getRandomElement(labelNames) } : undefined
        });
    }
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const ALL_TRANSACTIONS = generateMockTransactions(1500); // Generate 1500 transactions for the 350 users

export interface FetchParams {
    page: number;
    limit: number;
    filters: {
        searchTerm?: string;
        type?: string;
        platform?: string;
    }
}

export const fetchGlobalTransactions = async ({ page, limit, filters }: FetchParams): Promise<{ transactions: Transaction[], total: number }> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    let filtered = ALL_TRANSACTIONS;

    if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(tx => 
            tx.id.toLowerCase().includes(term) ||
            tx.user?.name.toLowerCase().includes(term) ||
            (typeof tx.label === 'object' && tx.label?.name.toLowerCase().includes(term)) ||
            (typeof tx.label === 'string' && tx.label.toLowerCase().includes(term)) ||
            tx.description.toLowerCase().includes(term)
        );
    }
    
    if (filters.type && filters.type !== 'All') {
        filtered = filtered.filter(tx => tx.type === filters.type);
    }
    
    if (filters.platform && filters.platform !== 'All') {
        filtered = filtered.filter(tx => tx.source_target === filters.platform);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    
    return { transactions: paginated, total };
};