import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Transaction } from '../types';
import { fetchGlobalTransactions, FetchParams } from '../services/transactionService';
import { getPlatformIcon } from '../components/icons/PlatformIcons';

// --- Icons ---
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const IncomeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>);
const WithdrawalIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const FeeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>);


const TRANSACTION_TYPES = ['All', 'income', 'withdrawal', 'fee', 'adjustment', 'Leher Fee', 'Platform Fee'];
const PLATFORMS = ['All', 'Spotify', 'Apple Music', 'YouTube', 'TikTok', 'Meta', 'Amazon Music', 'Tidal', 'Deezer', 'Pandora', 'SoundCloud', 'Bandcamp'];

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const formatDate = (dateString: string) => new Date(dateString).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const getTypeInfo = (type: Transaction['type']) => {
    switch (type) {
        case 'income': return { icon: IncomeIcon, color: 'text-green-400', bg: 'bg-green-500/10' };
        case 'withdrawal': return { icon: WithdrawalIcon, color: 'text-blue-400', bg: 'bg-blue-500/10' };
        case 'fee':
        case 'Leher Fee':
        case 'Platform Fee': return { icon: FeeIcon, color: 'text-red-400', bg: 'bg-red-500/10' };
        case 'adjustment': return { icon: FeeIcon, color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
        default: return { icon: FeeIcon, color: 'text-gray-400', bg: 'bg-gray-500/10' };
    }
};

const TransactionDetailModal: React.FC<{ transaction: Transaction | null, onClose: () => void }> = ({ transaction, onClose }) => {
    if (!transaction) return null;

    const { icon: TypeIcon, color } = getTypeInfo(transaction.type);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
            <div className="glass-surface-quantum modal-glow-border rounded-2xl shadow-2xl w-full max-w-2xl m-4 relative animate-drawer-slide-up" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-ui-text-subtle hover:text-white transition-colors p-2 rounded-full"><CloseIcon className="w-6 h-6"/></button>
                <div className="p-6 md:p-8 space-y-6">
                    <div className="border-b border-singularity-purple-transparent pb-4">
                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${color}`}>
                            <TypeIcon className="w-8 h-8"/>
                            Transaction Details
                        </h2>
                        <p className="text-sm text-ui-text-subtle font-mono mt-1">{transaction.id}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div className="lg:col-span-3">
                            <p className="font-semibold text-ui-text-subtle text-xs uppercase tracking-wider">Amount</p>
                            <p className={`text-4xl font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{formatCurrency(transaction.amount)}</p>
                        </div>
                        <div><p className="font-semibold text-ui-text-subtle text-xs uppercase">Description</p><p className="text-ui-text-heading">{transaction.description}</p></div>
                        <div><p className="font-semibold text-ui-text-subtle text-xs uppercase">Date</p><p className="text-ui-text-heading">{formatDate(transaction.date)}</p></div>
                        <div><p className="font-semibold text-ui-text-subtle text-xs uppercase">Status</p><p className="text-ui-text-heading">{transaction.status}</p></div>
                        <div><p className="font-semibold text-ui-text-subtle text-xs uppercase">User</p><p className="text-ui-text-heading">{transaction.user?.name ?? 'N/A'}</p></div>
                        {transaction.label && <div><p className="font-semibold text-ui-text-subtle text-xs uppercase">Label</p><p className="text-ui-text-heading">{transaction.label.name}</p></div>}
                        <div><p className="font-semibold text-ui-text-subtle text-xs uppercase">Source/Target</p><p className="text-ui-text-heading">{transaction.source_target}</p></div>
                    </div>
                     <div className="flex gap-4 pt-4 border-t border-singularity-purple-transparent">
                        <button className="flex-1 btn-quantum-glow py-2 px-4 rounded-full text-white font-bold">View User Profile</button>
                        <button className="flex-1 btn-quantum-glow py-2 px-4 rounded-full text-white font-bold">Export Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const GlobalTransactionsView: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<FetchParams['filters']>({});
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const limit = 20;

    const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

    const fetchData = useCallback(async (pageNum: number, currentFilters: FetchParams['filters']) => {
        setIsLoading(true);
        try {
            const data = await fetchGlobalTransactions({ page: pageNum, limit, filters: currentFilters });
            setTransactions(data.transactions);
            setTotal(data.total);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(page, {...filters, searchTerm: debouncedSearchTerm});
    }, [page, debouncedSearchTerm, filters.type, filters.platform, fetchData]);
    
    const handleFilterChange = <K extends keyof FetchParams['filters']>(key: K, value: FetchParams['filters'][K]) => {
        setPage(1);
        setFilters(prev => ({...prev, [key]: value}));
    }
    
    const totalPages = Math.ceil(total / limit);
    const inputStyles = "form-input-glow";

    return (
        <div className="space-y-6">
            <header className="admin-header">
                <h1 className="text-gradient-singularity">Global Transaction History</h1>
                <p>Monitor all revenue, withdrawals, and fees across the platform.</p>
            </header>

            <div className="bg-singularity-black/30 rounded-xl border border-singularity-purple/30 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2 relative">
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-text-subtle" />
                        <input type="text" placeholder="Search ID, Artist, Label..." onChange={e => handleFilterChange('searchTerm', e.target.value)} className={`${inputStyles} w-full pl-10`} />
                    </div>
                    <select onChange={e => handleFilterChange('type', e.target.value)} className={inputStyles}><option value="All">All Types</option>{TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select>
                    <select onChange={e => handleFilterChange('platform', e.target.value)} className={inputStyles}><option value="All">All Platforms</option>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select>
                </div>
            </div>

            <div className="admin-hud-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-singularity-black/50">
                            <tr>
                                <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Transaction</th>
                                <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider hidden md:table-cell">User / Label</th>
                                <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Amount</th>
                                <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider hidden sm:table-cell">Source</th>
                                <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider hidden lg:table-cell">Date</th>
                                <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-singularity-purple-transparent">
                            {isLoading ? (
                                <tr><td colSpan={6} className="text-center p-8 text-ui-text-subtle">Loading transactions...</td></tr>
                            ) : transactions.map(tx => {
                                const {icon: TypeIcon, color} = getTypeInfo(tx.type);
                                return (
                                    <tr key={tx.id} onClick={() => setSelectedTransaction(tx)} className="hover:bg-singularity-teal-transparent transition-colors cursor-pointer">
                                        <td className="p-3"><div className="flex items-center gap-3"><TypeIcon className={`w-6 h-6 flex-shrink-0 ${color}`} /><div><p className="font-semibold text-ui-text-heading capitalize">{tx.type}</p><p className="text-xs text-ui-text-subtle font-mono">{tx.id}</p></div></div></td>
                                        <td className="p-3 text-sm hidden md:table-cell">{tx.user?.name}{tx.label && <span className="text-xs text-ui-text-subtle"> ({tx.label.name})</span>}</td>
                                        <td className={`p-3 font-semibold font-mono ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{formatCurrency(tx.amount)}</td>
                                        <td className="p-3 text-sm hidden sm:table-cell"><div className="flex items-center gap-2">{getPlatformIcon(tx.source_target, 'w-5 h-5')}{tx.source_target}</div></td>
                                        <td className="p-3 text-sm text-ui-text-body hidden lg:table-cell">{formatDate(tx.date)}</td>
                                        <td className="p-3 text-sm">{tx.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                 <div className="p-4 flex justify-between items-center text-sm text-ui-text-subtle border-t border-singularity-purple-transparent">
                    <p>Showing {transactions.length} of {total.toLocaleString()} transactions</p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-quantum-glow px-3 py-1 rounded-md disabled:opacity-50 text-white text-xs">Previous</button>
                        <span>Page {page} of {totalPages}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-quantum-glow px-3 py-1 rounded-md disabled:opacity-50 text-white text-xs">Next</button>
                    </div>
                </div>
            </div>
            <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
        </div>
    );
};

export default GlobalTransactionsView;