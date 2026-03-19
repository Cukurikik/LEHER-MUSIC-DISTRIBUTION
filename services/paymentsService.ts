
import type { Transaction, FinancialOverview, RoyaltyReport, GeneratedDocument, DocumentType, RevenueTier, TierDetails, PayoutRequest, RevenueBreakdownData, Wallet, WalletType } from '../types';
import { generateFinancialSummary } from './geminiService';
import { ALL_TRANSACTIONS as mockTransactions } from './transactionService';

// --- TIER SYSTEM ---

// Thresholds in USD
const TIERS: RevenueTier[] = [
    { 
        name: 'ARTISAN', 
        threshold: 0, 
        benefits: [
            { title: "benefit_artisan_1_title", description: "benefit_artisan_1_desc" },
            { title: "benefit_artisan_2_title", description: "benefit_artisan_2_desc" },
            { title: "benefit_artisan_3_title", description: "benefit_artisan_3_desc" },
            { title: "benefit_artisan_4_title", description: "benefit_artisan_4_desc" }
        ] 
    },
    { 
        name: 'VIRTUOSO', 
        threshold: 500,
        benefits: [
            { title: "benefit_virtuoso_1_title", description: "benefit_virtuoso_1_desc" },
            { title: "benefit_virtuoso_2_title", description: "benefit_virtuoso_2_desc" },
            { title: "benefit_virtuoso_3_title", description: "benefit_virtuoso_3_desc" },
            { title: "benefit_virtuoso_4_title", description: "benefit_virtuoso_4_desc" },
            { title: "benefit_virtuoso_5_title", description: "benefit_virtuoso_5_desc" }
        ] 
    },
    { 
        name: 'MAESTRO', 
        threshold: 5000,
        benefits: [
            { title: "benefit_maestro_1_title", description: "benefit_maestro_1_desc" },
            { title: "benefit_maestro_2_title", description: "benefit_maestro_2_desc" },
            { title: "benefit_maestro_3_title", description: "benefit_maestro_3_desc" },
            { title: "benefit_maestro_4_title", description: "benefit_maestro_4_desc" },
            { title: "benefit_maestro_5_title", description: "benefit_maestro_5_desc" },
            { title: "benefit_maestro_6_title", description: "benefit_maestro_6_desc" }
        ] 
    },
    { 
        name: 'LEGEND', 
        threshold: 50000,
        benefits: [
            { title: "benefit_legend_1_title", description: "benefit_legend_1_desc" },
            { title: "benefit_legend_2_title", description: "benefit_legend_2_desc" },
            { title: "benefit_legend_3_title", description: "benefit_legend_3_desc" },
            { title: "benefit_legend_4_title", description: "benefit_legend_4_desc" },
            { title: "benefit_legend_5_title", description: "benefit_legend_5_desc" },
            { title: "benefit_legend_6_title", description: "benefit_legend_6_desc" }
        ] 
    },
];

export const getTierDetails = (lifetimeIncome: number): TierDetails => {
    const currentTier = TIERS.slice().reverse().find(tier => lifetimeIncome >= tier.threshold)!;
    const currentTierIndex = TIERS.findIndex(t => t.name === currentTier.name);
    const nextTier = currentTierIndex < TIERS.length - 1 ? TIERS[currentTierIndex + 1] : null;

    let progressPercentage = 100;
    if (nextTier) {
        const range = nextTier.threshold - currentTier.threshold;
        const progress = lifetimeIncome - currentTier.threshold;
        progressPercentage = (progress / range) * 100;
    }
    
    return { currentTier, nextTier, progressPercentage, lifetimeIncome, allTiers: TIERS };
};


// --- MOCK DATA GENERATION ---

const generateTrendData = () => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const dailyIn = mockTransactions.filter(t => t.type === 'income' && t.date.startsWith(dateString)).reduce((sum, t) => sum + t.amount, 0);
        const dailyOut = mockTransactions.filter(t => t.type === 'withdrawal' && t.date.startsWith(dateString)).reduce((sum, t) => sum + t.amount, 0);

        data.push({
            date: dateString,
            money_in: Math.max(0, parseFloat(dailyIn.toFixed(2))) || Math.random() * 50,
            money_out: Math.max(0, parseFloat(dailyOut.toFixed(2))) || Math.random() * 20,
        });
    }
    return data;
};

const trendData = generateTrendData();

const calculateOverview = () => {
    const totalIn = mockTransactions.filter(t => t.type === 'income' || (t.type === 'adjustment' && t.amount > 0)).reduce((sum, t) => sum + t.amount, 0);
    const totalOut = mockTransactions.filter(t => t.type === 'withdrawal' || t.type === 'fee' || (t.type === 'adjustment' && t.amount < 0)).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const streaming = mockTransactions.filter(t => t.type === 'income' && ['Spotify', 'Apple Music', 'Amazon Music', 'Tidal', 'Deezer', 'Pandora'].includes(t.source_target)).reduce((sum, t) => sum + t.amount, 0);
    const ugc_monetization = mockTransactions.filter(t => t.type === 'income' && ['YouTube', 'TikTok', 'Meta'].includes(t.source_target)).reduce((sum, t) => sum + t.amount, 0);
    const downloads = mockTransactions.filter(t => t.type === 'income' && ['Bandcamp', 'Beatport'].includes(t.source_target)).reduce((sum, t) => sum + t.amount, 0);
    
    const lifetime_income = totalIn + 5500.20;
    
    return {
        financials: {
            current_balance: totalIn - totalOut,
            pending_balance: mockTransactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0) + 300.50,
            lifetime_income: lifetime_income,
            revenue_trend_data: trendData,
            revenue_breakdown_by_type: {
                streaming: streaming,
                downloads: downloads,
                licensing: totalIn * 0.05,
                performance: totalIn * 0.02,
                ugc_monetization: ugc_monetization
            }
        },
        tierDetails: getTierDetails(lifetime_income)
    };
};

// Generate reports starting from Jan 2025 up to "now"
const generateReports = (): RoyaltyReport[] => {
    const reports: RoyaltyReport[] = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const today = new Date();
    // Ensure we are in 2025 context for the simulation, effectively
    const currentYear = 2025;
    const currentMonthIndex = 10; // October (0-indexed is 9, but let's say we have reports up to Oct)

    // Generate for 2025
    for (let monthIndex = 0; monthIndex <= currentMonthIndex; monthIndex++) {
         const gross = Math.random() * 1200 + 2500; // Increased revenue for 2025
         const isPending = monthIndex === currentMonthIndex; // Current month might be pending/processing
         reports.push({
            id: `rep-${currentYear}-${monthIndex + 1}`,
            period: `${months[monthIndex]} ${currentYear}`,
            grossRevenue: parseFloat(gross.toFixed(2)),
            leherCut: parseFloat((gross * 0.1).toFixed(2)),
            netIncome: parseFloat((gross * 0.9).toFixed(2)),
            status: isPending ? 'Processing' : 'Paid',
        });
    }

    return reports.sort((a,b) => new Date(b.period).getTime() - new Date(a.period).getTime());
}

const mockReports: RoyaltyReport[] = generateReports();

const mockPayouts: PayoutRequest[] = [
    { id: 'payout-1', date: '2025-09-15T10:00:00Z', amount: 3250.75, method: 'Bank Transfer', status: 'Completed', recipient: 'Andikaa S (*** 5678)', transactionId: 'bt_2025_sep' },
    { id: 'payout-2', date: '2025-08-20T14:30:00Z', amount: 1850.00, method: 'PayPal', status: 'Completed', recipient: 'andikaa.s@leher.com', transactionId: 'pp_2025_aug' },
    { id: 'payout-3', date: '2025-07-22T09:00:00Z', amount: 2500.00, method: 'Wise', status: 'Completed', recipient: 'andikaa.s@leher.com', transactionId: 'ws_2025_jul' },
    { id: 'payout-5', date: '2025-10-20T18:00:00Z', amount: 450.00, method: 'PayPal', status: 'Processing', recipient: 'andikaa.s@leher.com' },
];

const mockGeneratedDocuments: GeneratedDocument[] = [
    { id: 'doc1', name: 'Invoice - September 2025', type: 'Invoice', period: 'September 2025', generatedDate: '2025-10-05', status: 'Available', aiPowered: true, downloadUrl: '#', aiSummary: 'During September 2025, your total net income was $3,450.45. The majority of your earnings came from Streaming sources, showing significant growth in the Asian market.' },
    { id: 'doc2', name: 'Tax Summary - Q1-Q3 2025', type: 'Tax Summary', period: 'Q1-Q3 2025', generatedDate: '2025-10-01', status: 'Available', aiPowered: false, downloadUrl: '#' },
    { id: 'doc3', name: 'Royalty Statement - August 2025', type: 'Payment Confirmation', period: 'August 2025', generatedDate: '2025-09-05', status: 'Available', aiPowered: false, downloadUrl: '#' },
];

const mockWallets: Wallet[] = [
    { id: 'wallet-usd', type: 'Fiat', currency: 'USD', balance: 4250.75, provider: 'Main USD Balance', address: 'Bank Account **** 5678', icon: 'Usd' },
    { id: 'wallet-eur', type: 'Fiat', currency: 'EUR', balance: 1850.00, provider: 'European Payouts', address: 'Wise Account', icon: 'Eur' },
    { id: 'wallet-btc', type: 'Crypto', currency: 'BTC', balance: 0.15, provider: 'Bitcoin Wallet', address: 'bc1q...xyza', icon: 'Btc' },
    { id: 'wallet-gopay', type: 'E-Wallet', currency: 'IDR', balance: 15250000, provider: 'GoPay Indonesia', address: '0812****5678', icon: 'Gopay' },
];

// --- Mock Service Functions ---

export const fetchFinancialOverview = async (): Promise<{financials: FinancialOverview, tierDetails: TierDetails}> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return calculateOverview();
};

export const fetchRecentTransactions = async (): Promise<Transaction[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTransactions.filter(tx => tx.recipient_name === undefined); // Filter for user's own transactions, not global
};

export const fetchRoyaltyReports = async (): Promise<RoyaltyReport[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockReports;
};

export const fetchGeneratedDocuments = async (): Promise<GeneratedDocument[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockGeneratedDocuments].sort((a,b) => new Date(b.generatedDate).getTime() - new Date(a.generatedDate).getTime());
};

export const fetchWithdrawalHistory = async (): Promise<PayoutRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockPayouts;
};

export const fetchWallets = async (): Promise<Wallet[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockWallets;
};

const generateLargeScaleReleaseData = (count: number) => {
    const data = [];
    const titles = ['DJ Pesta Gila', 'Lagu Santai', 'Cinta Monyet', 'Rindu Berat', 'Malam Minggu', 'Goyang Dumang', 'Sakit Gigi', 'Putus Nyambung', 'Kopi Dangdut', 'Bintang Kehidupan'];
    
    for (let i = 0; i < count; i++) {
        const baseTitle = titles[i % titles.length];
        const variation = Math.floor(i / titles.length) + 1;
        const revenue = Math.random() * (100000 / Math.sqrt(i + 1)); // Diminishing returns for lower ranked songs
        
        data.push({
            label: `${baseTitle} ${variation > 1 ? '#' + variation : ''}`,
            value: parseFloat(revenue.toFixed(2))
        });
    }
    // Sort by value desc
    return data.sort((a, b) => b.value - a.value);
};

export const fetchRevenueBreakdown = async (): Promise<RevenueBreakdownData> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate 700,000 mock release entries
    const topReleases = generateLargeScaleReleaseData(700000);

    return {
        byPlatform: [
            { label: 'Spotify', value: 85000 },
            { label: 'Apple Music', value: 52000 },
            { label: 'YouTube Music', value: 45000 },
            { label: 'TikTok', value: 38500 },
            { label: 'Amazon Music', value: 16000 },
            { label: 'Other', value: 17500 },
        ],
        byTopReleases: topReleases,
        byTerritory: [
            { label: 'Indonesia', value: 68000 },
            { label: 'United States', value: 42000 },
            { label: 'Malaysia', value: 21000 },
            { label: 'Brazil', value: 18000 },
            { label: 'Germany', value: 15500 },
            { label: 'Other', value: 45500 },
        ],
    };
};

export const generateDocument = async (options: {
    docType: DocumentType;
    period: string;
    netIncome: number;
    includeAi: boolean;
}): Promise<GeneratedDocument> => {
    await new Promise(resolve => setTimeout(resolve, 2000 + (options.includeAi ? 2000 : 0))); // Simulate longer delay for AI

    let aiSummary: string | undefined = undefined;
    if (options.includeAi) {
        aiSummary = await generateFinancialSummary({
            period: options.period,
            totalIncome: options.netIncome,
            topIncomeSource: 'Streaming', // Mock data
        });
    }

    const newDoc: GeneratedDocument = {
        id: `doc-${Date.now()}`,
        name: `${options.docType} - ${options.period}`,
        type: options.docType,
        period: options.period,
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'Available',
        aiPowered: options.includeAi,
        downloadUrl: '#', // Mock URL
        aiSummary
    };
    
    mockGeneratedDocuments.push(newDoc);
    return newDoc;
};

// --- SIMULATION FUNCTION ---
export const incrementFinancialData = (currentOverview: FinancialOverview): { newOverview: FinancialOverview, newTierDetails: TierDetails } => {
    const newMoneyIn = Math.random() * 50; // Random income between $0 and $50
    const newPending = currentOverview.pending_balance > 0 && Math.random() > 0.7 
        ? currentOverview.pending_balance - (Math.random() * 100) // Clear some pending amount
        : currentOverview.pending_balance;

    const newOverview: FinancialOverview = {
        ...currentOverview,
        current_balance: currentOverview.current_balance + newMoneyIn,
        pending_balance: Math.max(0, newPending),
        lifetime_income: currentOverview.lifetime_income + newMoneyIn,
        // Keep trend and breakdown data static for simplicity in this simulation
        revenue_trend_data: currentOverview.revenue_trend_data,
        revenue_breakdown_by_type: currentOverview.revenue_breakdown_by_type
    };
    
    // Recalculate tier details with new lifetime income
    const newTierDetails = getTierDetails(newOverview.lifetime_income);

    return { newOverview, newTierDetails };
};
