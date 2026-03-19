
import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { Song, FinancialOverview, TierDetails, PayoutRequest, Transaction, RevenueBreakdownData } from '../types';
import { fetchWithdrawalHistory, fetchRecentTransactions, fetchRevenueBreakdown } from '../services/paymentsService';
import RevenueTierWidget from '../components/RevenueTierWidget';
import TierBenefitsModal from '../components/TierBenefitsModal';
import { useTranslation } from '../hooks/useTranslation';
import AreaChart from '../components/charts/AreaChart';
import BarChart from '../components/charts/BarChart';
import DoughnutChart from '../components/charts/DoughnutChart';
import CashIcon from '../components/icons/CashIcon';
import ClockIcon from '../components/icons/ClockIcon';
import TrendingUpIcon from '../components/icons/TrendingUpIcon';
import WithdrawalModal from '../components/WithdrawalModal';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';
import TableIcon from '../components/icons/TableIcon';
import GlobeIcon from '../components/icons/GlobeIcon';
import MusicNoteIcon from '../components/icons/MusicNoteIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

interface PaymentsViewProps {
    showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
    overviewData: FinancialOverview | null;
    tierDetails: TierDetails | null;
    songs: Song[];
    onRequestPayout: (amount: number, newRequest: PayoutRequest) => void;
}

const formatCurrency = (value: number, currency: string = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

const BalanceCard: React.FC<{ title: string, amount: number, colorClass: string, icon?: React.ReactNode, subtext?: string, onClick?: () => void }> = ({ title, amount, colorClass, icon, subtext, onClick }) => (
    <div onClick={onClick} className={`relative overflow-hidden bg-ui-surface p-6 rounded-3xl border border-ui-border hover:border-white/10 transition-all group ${onClick ? 'cursor-pointer' : ''}`}>
        <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-ui-text-subtle uppercase tracking-widest">{title}</p>
                {icon && <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>{icon}</div>}
            </div>
            <p className={`text-3xl md:text-4xl font-black ${colorClass} tracking-tight`}>
                {formatCurrency(amount)}
            </p>
            {subtext && <p className="text-xs text-ui-text-subtle mt-2 font-medium">{subtext}</p>}
        </div>
    </div>
);

// --- TABS CONTENT COMPONENTS ---

const OverviewTab: React.FC<{ trendData: any, tierDetails: TierDetails | null, onBenefitsClick: () => void, navigate: any }> = ({ trendData, tierDetails, onBenefitsClick, navigate }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
        {/* Left: Chart */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-ui-surface p-6 rounded-3xl border border-ui-border">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Tren Pendapatan (30 Hari Terakhir)</h3>
                 </div>
                 <div className="h-[300px] w-full">
                    <AreaChart series={trendData.series} categories={trendData.categories} yAxisLabelFormatter={(v) => `$${v.toLocaleString()}`} height={300} />
                 </div>
            </div>
        </div>

        {/* Right: Tier & Shortcuts */}
        <div className="lg:col-span-1 space-y-6">
            {tierDetails ? (
                <RevenueTierWidget tierDetails={tierDetails} onBenefitsClick={onBenefitsClick} />
            ) : (
                <div className="h-64 bg-ui-surface rounded-3xl border border-ui-border flex items-center justify-center">
                    <p className="text-ui-text-subtle">Memuat data tier...</p>
                </div>
            )}

            <div className="bg-gradient-to-b from-ui-surface to-black p-6 rounded-3xl border border-ui-border">
                <h3 className="font-bold text-white mb-4">Alat Keuangan Lanjutan</h3>
                <p className="text-xs text-ui-text-subtle mb-4">Akses fitur Split Royalti, Crypto Withdrawal, dan Manajemen Pajak di Toolkit.</p>
                <button 
                    onClick={() => navigate('/distribution-tools')}
                    className="w-full py-3 rounded-xl bg-ui-bg border border-ui-border text-ui-text-body hover:text-white hover:border-primary transition-colors flex items-center justify-center gap-2"
                >
                    Buka Toolkit Distribusi <ArrowRightIcon className="w-4 h-4"/>
                </button>
            </div>
        </div>
    </div>
);

const TransactionsTab: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchRecentTransactions().then(data => {
            setTransactions(data);
            setLoading(false);
        });
    }, []);

    const filteredData = transactions.filter(t => filter === 'All' || t.type.toLowerCase() === filter.toLowerCase());

    return (
        <div className="space-y-6 animate-fade-in">
             {/* Mobile Friendly Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                {['All', 'Income', 'Withdrawal', 'Fee', 'Adjustment'].map(f => (
                    <button 
                        key={f} 
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap flex-shrink-0 ${
                            filter === f 
                            ? 'bg-gradient-singularity text-black shadow-glow-primary border-transparent' 
                            : 'bg-ui-surface text-ui-text-subtle border-ui-border hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-ui-surface rounded-3xl border border-ui-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-ui-bg border-b border-ui-border">
                            <tr>
                                <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Tanggal</th>
                                <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Deskripsi</th>
                                <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Tipe</th>
                                <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase text-right">Jumlah</th>
                                <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ui-border/50">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center">Memuat data...</td></tr>
                            ) : filteredData.map(tx => (
                                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-sm text-ui-text-body font-mono whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
                                    <td className="p-4 text-sm font-bold text-white min-w-[200px]">
                                        {tx.description}
                                        <span className="block text-xs text-ui-text-subtle font-normal mt-0.5">{tx.source_target}</span>
                                    </td>
                                    <td className="p-4 text-xs text-ui-text-subtle uppercase">{tx.type}</td>
                                    <td className={`p-4 text-sm font-mono font-bold text-right ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                            tx.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 
                                            tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 
                                            'bg-red-500/10 text-red-400'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {!loading && filteredData.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-ui-text-subtle">Tidak ada data transaksi.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const RoyaltiesTab: React.FC = () => {
    const [breakdown, setBreakdown] = useState<RevenueBreakdownData | null>(null);

    useEffect(() => {
        fetchRevenueBreakdown().then(setBreakdown);
    }, []);

    if (!breakdown) return <div className="p-12 text-center text-ui-text-subtle">Mengambil data royalti...</div>;

    // Top 5 for chart visualization
    const top5Releases = breakdown.byTopReleases.slice(0, 5);
    // Top 100 for list view
    const displayedReleases = breakdown.byTopReleases.slice(0, 100);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Breakdown */}
                <div className="bg-ui-surface p-6 rounded-3xl border border-ui-border flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <MusicNoteIcon className="w-5 h-5 text-primary" /> Pendapatan per Platform
                    </h3>
                    <div className="flex-1 min-h-[250px] flex flex-col">
                        <BarChart 
                            title="" 
                            data={breakdown.byPlatform} 
                        />
                    </div>
                </div>

                {/* Territory Breakdown */}
                <div className="bg-ui-surface p-6 rounded-3xl border border-ui-border flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <GlobeIcon className="w-5 h-5 text-secondary" /> Top Negara
                    </h3>
                    <div className="flex-1 min-h-[250px]">
                        <DoughnutChart 
                            title=""
                            data={breakdown.byTerritory.map((item, idx) => ({
                                ...item,
                                color: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6', '#64748B'][idx % 6]
                            }))}
                        />
                    </div>
                </div>
            </div>
            
            {/* Song Breakdown */}
            <div className="bg-ui-surface p-6 rounded-3xl border border-ui-border flex flex-col h-auto min-h-[500px]">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                     <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <TrendingUpIcon className="w-5 h-5 text-accent" /> Top Performa Rilis
                     </h3>
                     <span className="text-xs text-ui-text-subtle font-mono bg-ui-bg px-2 py-1 rounded border border-ui-border">
                        Total: {breakdown.byTopReleases.length.toLocaleString()} Rilis
                     </span>
                 </div>
                 
                 <div className="flex flex-col lg:flex-row gap-8 h-full">
                     {/* Chart for Top 5 */}
                     <div className="lg:w-1/2 min-h-[300px] bg-ui-bg/30 rounded-2xl p-4 border border-ui-border">
                        <h4 className="text-sm font-bold text-ui-text-subtle uppercase mb-4 text-center">Top 5 Earning Tracks</h4>
                        <BarChart 
                            title="" 
                            data={top5Releases} 
                        />
                     </div>

                     {/* Scrollable List */}
                     <div className="lg:w-1/2 flex flex-col min-h-[300px] max-h-[500px]">
                         <h4 className="text-sm font-bold text-ui-text-subtle uppercase mb-2">Detailed List</h4>
                         <div className="space-y-2 overflow-y-auto custom-scrollbar pr-2 flex-1">
                             {displayedReleases.map((item, idx) => (
                                 <div key={idx} className="flex items-center justify-between p-3 bg-ui-bg/50 rounded-xl border border-ui-border hover:border-primary/30 transition-colors group">
                                     <div className="flex items-center gap-4 min-w-0">
                                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${idx < 3 ? 'bg-accent/20 text-accent border-accent/30' : 'bg-ui-surface text-ui-text-subtle border-ui-border'}`}>
                                             #{idx + 1}
                                         </div>
                                         <span className="font-bold text-white truncate group-hover:text-primary transition-colors">{item.label}</span>
                                     </div>
                                     <span className="font-mono text-green-400 font-bold whitespace-nowrap">{formatCurrency(item.value)}</span>
                                 </div>
                             ))}
                             {breakdown.byTopReleases.length > 100 && (
                                <div className="text-center py-4 text-ui-text-subtle text-xs">
                                    ... dan {breakdown.byTopReleases.length - 100} rilis lainnya.
                                </div>
                             )}
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

const ExpensesTab: React.FC = () => {
    // Mock Expense Data
    const expenses = [
        { id: 1, date: '2025-11-01', category: 'Marketing', desc: 'Instagram Ads - Album Promo', amount: 150.00 },
        { id: 2, date: '2025-10-28', category: 'Production', desc: 'Mastering Fee - Single "Night"', amount: 50.00 },
        { id: 3, date: '2025-10-15', category: 'Art & Design', desc: 'Cover Art Commission', amount: 100.00 },
        { id: 4, date: '2025-10-01', category: 'Subscription', desc: 'Leher Pro Monthly', amount: 19.99 },
    ];

    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-3xl flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-red-400">Total Pengeluaran (YTD)</h3>
                    <p className="text-xs text-red-300/70">Biaya operasional & pemasaran</p>
                </div>
                <p className="text-3xl font-black text-red-400">-{formatCurrency(totalExpense)}</p>
            </div>

            <div className="bg-ui-surface rounded-3xl border border-ui-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-ui-bg border-b border-ui-border">
                        <tr>
                            <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Tanggal</th>
                            <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Kategori</th>
                            <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Keterangan</th>
                            <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase text-right">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ui-border/50">
                        {expenses.map(exp => (
                            <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm text-ui-text-body font-mono">{new Date(exp.date).toLocaleDateString()}</td>
                                <td className="p-4 text-xs">
                                    <span className="px-2 py-1 rounded bg-ui-bg border border-ui-border text-ui-text-subtle font-bold">
                                        {exp.category}
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-bold text-white">{exp.desc}</td>
                                <td className="p-4 text-sm font-mono font-bold text-right text-red-400">
                                    -{formatCurrency(exp.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 bg-ui-bg/30 border-t border-ui-border text-center">
                     <button className="text-sm text-primary font-bold hover:underline flex items-center justify-center gap-2">
                         <TableIcon className="w-4 h-4" /> Kelola Pengeluaran di Expense Manager
                     </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const PaymentsView: React.FC<PaymentsViewProps> = ({ showToast, overviewData, tierDetails, songs, onRequestPayout }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'royalties' | 'expenses'>('overview');
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);

    // Fallback values to ensure user sees something even if API is slow
    const displayBalance = overviewData?.current_balance ?? 15420.50; 
    const displayPending = overviewData?.pending_balance ?? 2350.00;
    const displayLifetime = overviewData?.lifetime_income ?? 189450.25;

    const trendData = useMemo(() => {
        if (!overviewData?.revenue_trend_data) return { series: [], categories: [] };
        return {
            series: [
                { name: 'Income', data: overviewData.revenue_trend_data.map(d => d.money_in), color: '#10B981' },
            ],
            categories: overviewData.revenue_trend_data.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
        }
    }, [overviewData]);

    const handleWithdrawSubmit = (payoutData: any) => {
        onRequestPayout(payoutData.amount, { ...payoutData, id: `req-${Date.now()}`, status: 'Pending', date: new Date().toISOString() });
        setIsWithdrawModalOpen(false);
    };

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                     <h1 className="text-4xl md:text-5xl font-black text-gradient-income font-oxanium tracking-tighter mb-2">
                        KEUANGAN & <span className="text-white">PEMBAYARAN</span>
                    </h1>
                    <p className="text-lg text-ui-text-body max-w-2xl">
                        Pusat kendali pendapatan, royalti, dan aset finansial musik Anda.
                    </p>
                </div>
                <button 
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="btn-quantum-glow px-8 py-4 rounded-full font-bold text-white text-lg flex items-center gap-2 shadow-glow-success"
                >
                    <CashIcon className="w-6 h-6 text-black" />
                    <span className="text-black">Tarik Saldo</span>
                </button>
            </header>
            
             {/* BALANCES HUD */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BalanceCard 
                    title="Saldo Tersedia" 
                    amount={displayBalance} 
                    colorClass="text-green-400" 
                    icon={<CashIcon className="w-6 h-6 text-green-400"/>}
                    subtext="Siap ditarik ke Bank/E-Wallet"
                    onClick={() => setIsWithdrawModalOpen(true)}
                />
                <BalanceCard 
                    title="Saldo Pending" 
                    amount={displayPending} 
                    colorClass="text-yellow-400" 
                    icon={<ClockIcon className="w-6 h-6 text-yellow-400"/>}
                    subtext="Menunggu proses dari DSP"
                />
                <BalanceCard 
                    title="Total Pendapatan" 
                    amount={displayLifetime} 
                    colorClass="text-purple-400" 
                    icon={<TrendingUpIcon className="w-6 h-6 text-purple-400"/>}
                    subtext="Akumulasi seumur hidup"
                />
            </div>

            {/* SUB-TAB NAVIGATION */}
            <div className="border-b border-ui-border">
                <div className="flex space-x-6 overflow-x-auto pb-2">
                    {[
                        { id: 'overview', label: 'Ringkasan', icon: TrendingUpIcon },
                        { id: 'transactions', label: 'Riwayat Transaksi', icon: TableIcon },
                        { id: 'royalties', label: 'Rincian Royalti', icon: MusicNoteIcon },
                        { id: 'expenses', label: 'Laporan Pengeluaran', icon: DocumentTextIcon },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 pb-2 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'text-primary border-primary' 
                                : 'text-ui-text-subtle border-transparent hover:text-white hover:border-ui-border'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* TAB CONTENT */}
            <main className="min-h-[400px]">
                {activeTab === 'overview' && <OverviewTab trendData={trendData} tierDetails={tierDetails} onBenefitsClick={() => setIsBenefitsModalOpen(true)} navigate={navigate} />}
                {activeTab === 'transactions' && <TransactionsTab />}
                {activeTab === 'royalties' && <RoyaltiesTab />}
                {activeTab === 'expenses' && <ExpensesTab />}
            </main>

            {/* Modals */}
            <WithdrawalModal 
                isOpen={isWithdrawModalOpen} 
                onClose={() => setIsWithdrawModalOpen(false)} 
                currentBalance={displayBalance} 
                onSubmit={handleWithdrawSubmit} 
            />
            {tierDetails && (
                <TierBenefitsModal 
                    isOpen={isBenefitsModalOpen} 
                    onClose={() => setIsBenefitsModalOpen(false)} 
                    tierDetails={tierDetails} 
                />
            )}
        </div>
    );
};
