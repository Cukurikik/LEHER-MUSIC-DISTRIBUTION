
import React, { useState, useEffect, useMemo } from 'react';
import type { TradableSong, UserWallet, OrderBookEntry, RecentTrade } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { getInitialTradableSongs, getInitialWallet, saveWallet, buyShares, sellShares } from '../services/exchangeService';
import { CandlestickChart } from '../components/charts/AreaChart';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const formatCoin = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const OrderBook: React.FC<{ bids: OrderBookEntry[], asks: OrderBookEntry[], price: number }> = ({ bids, asks, price }) => {
    const maxCumulativeSize = Math.max(
        bids.reduce((sum, b) => sum + b.size, 0),
        asks.reduce((sum, a) => sum + a.size, 0)
    );

    const renderRows = (orders: OrderBookEntry[], type: 'bid' | 'ask') => {
        let cumulative = 0;
        return orders.map((order, i) => {
            cumulative += order.size;
            const percentage = (cumulative / maxCumulativeSize) * 100;
            const color = type === 'bid' ? 'bg-green-500/20' : 'bg-red-500/20';
            return (
                 <div key={i} className="relative h-5 md:h-6 flex items-center justify-between text-[10px] md:text-xs font-mono px-2">
                    <div className={`absolute top-0 bottom-0 ${type === 'bid' ? 'right-0' : 'left-0'} ${color}`} style={{ width: `${percentage}%` }}></div>
                    <span className={`relative z-10 ${type === 'bid' ? 'text-green-400' : ''}`}>{order.price.toFixed(4)}</span>
                    <span className="relative z-10 hidden sm:inline">{order.size.toLocaleString()}</span>
                    <span className="relative z-10 text-ui-text-subtle">{cumulative.toLocaleString()}</span>
                </div>
            )
        })
    };
    
    return (
        <div className="text-xs w-full">
            <div className="grid grid-cols-3 text-[9px] md:text-xs text-ui-text-subtle px-2 mb-1 font-bold">
                <span>Price</span>
                <span className="text-center hidden sm:block">Size</span>
                <span className="text-right">Total</span>
            </div>
            <div className="space-y-px">{renderRows(asks.slice(0, 8).reverse(), 'ask')}</div>
            <div className="py-1 my-1 text-center font-bold text-sm md:text-base border-y border-singularity-purple/30" style={{ color: asks[0]?.price > bids[0]?.price ? 'var(--color-success)' : 'var(--color-danger)'}}>
                {price.toFixed(4)}
            </div>
            <div className="space-y-px">{renderRows(bids.slice(0, 8), 'bid')}</div>
        </div>
    );
};

const RecentTrades: React.FC<{ trades: RecentTrade[] }> = ({ trades }) => (
    <div className="text-xs w-full">
        <div className="grid grid-cols-3 text-[9px] md:text-xs text-ui-text-subtle px-2 mb-1 font-bold">
            <span>Time</span>
            <span className="text-center">Price</span>
            <span className="text-right">Size</span>
        </div>
        <div className="space-y-px">
            {trades.slice(0, 15).map((trade, i) => (
                 <div key={i} className={`grid grid-cols-3 text-[10px] md:text-xs font-mono px-2 py-0.5 ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{trade.time.split(' ')[0]}</span>
                    <span className="text-center">{trade.price.toFixed(4)}</span>
                    <span className="text-right">{trade.size.toLocaleString()}</span>
                </div>
            ))}
        </div>
    </div>
);

const TradePanel: React.FC<{ 
    song: TradableSong; 
    wallet: UserWallet; 
    onTransaction: (song: TradableSong, shares: number, mode: 'buy' | 'sell') => { success: boolean, error?: string };
    showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}> = ({ song, wallet, onTransaction, showToast }) => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<'buy' | 'sell'>('buy');
    const [shares, setShares] = useState('');
    
    const sharesOwned = wallet.portfolio.find(p => p.songId === song.id)?.shares || 0;
    const maxShares = mode === 'buy' ? Math.floor(wallet.leherCoinBalance / song.currentPrice) : sharesOwned;
    const numericShares = Number(shares);
    const totalValue = numericShares * song.currentPrice;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (numericShares <= 0) return;
        const result = onTransaction(song, numericShares, mode);
        if (result.success) {
            const successKey = mode === 'buy' ? 'shares_purchased' : 'shares_sold';
            showToast(t(successKey, { shares: numericShares, title: song.title }), 'success');
            setShares('');
        } else {
            showToast(t(result.error as any, { defaultValue: t('transaction_failed') }), 'error');
        }
    };

    return (
        <div className="bg-singularity-black/50 p-3 md:p-4 rounded-lg h-full flex flex-col border border-ui-border">
            <div className="flex border-b border-singularity-purple/30 mb-3">
                <button onClick={() => setMode('buy')} className={`flex-1 py-2 font-bold text-xs md:text-sm ${mode === 'buy' ? 'text-green-400 border-b-2 border-green-400' : 'text-ui-text-subtle'}`}>Buy</button>
                <button onClick={() => setMode('sell')} className={`flex-1 py-2 font-bold text-xs md:text-sm ${mode === 'sell' ? 'text-red-400 border-b-2 border-red-400' : 'text-ui-text-subtle'}`}>Sell</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 flex-grow flex flex-col">
                 <div>
                    <label className="text-[10px] text-ui-text-subtle block mb-1">Shares</label>
                    <input type="number" value={shares} onChange={e => setShares(e.target.value)} placeholder="0" min="1" max={maxShares} className="form-input-glow w-full text-right text-sm py-1.5" required />
                    <p className="text-[9px] text-ui-text-subtle text-right mt-1">Max: {maxShares.toLocaleString()}</p>
                </div>
                <div>
                    <label className="text-[10px] text-ui-text-subtle block mb-1">Total (LHC)</label>
                    <div className="form-input-glow text-right text-sm py-1.5 bg-ui-bg/50">{totalValue.toFixed(2)}</div>
                </div>
                <button type="submit" disabled={!numericShares || numericShares <= 0 || numericShares > maxShares} className={`w-full py-2.5 rounded-lg font-bold text-white transition disabled:opacity-50 text-sm ${mode === 'buy' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}>{mode === 'buy' ? 'BUY' : 'SELL'}</button>
            </form>
        </div>
    );
};

const TradingDetailView: React.FC<{ 
    song: TradableSong;
    wallet: UserWallet;
    onTransaction: (song: TradableSong, shares: number, mode: 'buy' | 'sell') => { success: boolean, error?: string };
    showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}> = ({ song, wallet, onTransaction, showToast }) => {
    const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('30D');
    const priceChangePercent = useMemo(() => {
        const prevPrice = song.currentPrice - song.priceChange24h;
        return prevPrice === 0 ? 0 : (song.priceChange24h / prevPrice) * 100;
    }, [song.currentPrice, song.priceChange24h]);
    const isUp = song.priceChange24h >= 0;

    const chartData = useMemo(() => {
        return song.priceHistory;
    }, [song.priceHistory, timeframe]);

    return (
        <div className="h-full flex flex-col gap-4 overflow-y-auto pb-20">
            <div className="admin-hud-card p-3 md:p-4 flex-shrink-0">
                <header className="flex items-start gap-3">
                    <img src={song.coverArtUrl} className="w-12 h-12 rounded-md flex-shrink-0 object-cover" alt={song.title} />
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg md:text-xl font-bold text-ui-text-heading truncate">{song.title}</h2>
                        <p className="text-xs text-ui-text-body truncate">{song.artistName}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className={`text-lg font-bold font-mono ${isUp ? 'text-green-400' : 'text-red-400'}`}>{song.currentPrice.toFixed(2)}</p>
                        <p className={`font-semibold text-[10px] md:text-xs ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                            {isUp ? '▲' : '▼'} {Math.abs(priceChangePercent).toFixed(2)}%
                        </p>
                    </div>
                </header>
            </div>
            
            <div className="flex-grow flex flex-col xl:grid xl:grid-cols-3 gap-4 min-h-0">
                <div className="xl:col-span-2 admin-hud-card p-2 md:p-4 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 overflow-x-auto scrollbar-hide">
                         {['1H', '24H', '7D', '30D'].map(tf => (
                            <button key={tf} onClick={() => setTimeframe(tf as any)} className={`px-2 py-0.5 text-[10px] rounded font-semibold ${timeframe === tf ? 'bg-primary text-black' : 'bg-ui-surface border border-ui-border'}`}>{tf}</button>
                        ))}
                    </div>
                    <div className="flex-grow min-h-[200px]">
                        <CandlestickChart data={chartData} height={200} />
                    </div>
                </div>
                <div className="xl:col-span-1 admin-hud-card p-0 overflow-hidden">
                    <TradePanel song={song} wallet={wallet} onTransaction={onTransaction} showToast={showToast} />
                </div>
            </div>
            
             <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="admin-hud-card p-2 overflow-y-auto h-56"><OrderBook bids={song.orderBook.bids} asks={song.orderBook.asks} price={song.currentPrice} /></div>
                <div className="admin-hud-card p-2 overflow-y-auto h-56"><RecentTrades trades={song.recentTrades} /></div>
            </div>
        </div>
    );
}

const LeherExchangeView: React.FC<any> = ({ songs, showToast }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [tradableSongs, setTradableSongs] = useState<TradableSong[]>(getInitialTradableSongs);
    const [wallet, setWallet] = useState<UserWallet>(getInitialWallet);
    const [selectedSong, setSelectedSong] = useState<TradableSong | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

    return (
        <div className="space-y-4 h-full animate-fade-in">
            {/* Navigation Header */}
            <div className="mb-2 flex items-center justify-between">
                 <button onClick={() => navigate('/distribution-tools')} className="flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group text-sm">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
            </div>

            {viewMode === 'list' && (
                <>
                    <header className="admin-header px-1">
                        <h1 className="text-gradient-singularity text-2xl md:text-3xl font-oxanium tracking-tight">Music Exchange</h1>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="bg-ui-surface p-3 rounded-xl border border-ui-border">
                                <p className="text-[10px] text-ui-text-subtle uppercase font-bold">Balance (LHC)</p>
                                <p className="text-xl font-black text-amber-400">{formatCoin(wallet.leherCoinBalance)}</p>
                            </div>
                            <div className="bg-ui-surface p-3 rounded-xl border border-ui-border">
                                <p className="text-[10px] text-ui-text-subtle uppercase font-bold">Portfolio Value</p>
                                <p className="text-xl font-black text-white">{formatCoin(wallet.portfolioValue)}</p>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 gap-3 pb-24">
                        {tradableSongs.map(song => (
                             <div key={song.id} onClick={() => { setSelectedSong(song); setViewMode('detail'); }} className="bg-ui-surface p-4 rounded-2xl border border-ui-border flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer hover:border-primary/50 hover:bg-white/5">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <img src={song.coverArtUrl} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-lg" alt={song.title}/>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm text-white truncate">{song.title}</p>
                                        <p className="text-xs text-ui-text-subtle truncate">{song.artistName}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-mono font-bold text-base">{song.currentPrice.toFixed(2)}</p>
                                    <p className={`text-xs font-bold ${song.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {song.priceChange24h >= 0 ? '+' : ''}{((song.priceChange24h / song.currentPrice) * 100).toFixed(2)}%
                                    </p>
                                </div>
                             </div>
                        ))}
                    </div>
                </>
            )}

            {viewMode === 'detail' && selectedSong && (
                <div className="h-full flex flex-col animate-slide-in-right">
                    <button onClick={() => setViewMode('list')} className="mb-4 flex items-center gap-2 text-sm font-bold text-ui-text-subtle hover:text-white px-2 py-2 bg-ui-surface rounded-lg w-fit">
                        <ArrowLeftIcon className="w-4 h-4" /> Back to Market
                    </button>
                    <TradingDetailView song={selectedSong} wallet={wallet} onTransaction={(s, amt, mode) => {
                        const func = mode === 'buy' ? buyShares : sellShares;
                        const result = func(s, amt, wallet);
                        if(result.success && result.wallet) setWallet(result.wallet);
                        return result;
                    }} showToast={showToast} />
                </div>
            )}
        </div>
    );
};

export default LeherExchangeView;
