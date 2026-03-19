import type { TradableSong, UserWallet, PortfolioItem, PriceHistory, OrderBookEntry, RecentTrade, Song } from '../types';
import { initialSongs } from '../data/releases';

const EXCHANGE_WALLET_KEY = 'leher_exchange_wallet';

// --- INITIALIZATION ---

export const getInitialTradableSongs = (): TradableSong[] => {
    return initialSongs.slice(0, 50).map(song => {
        const initialPrice = parseFloat((Math.random() * 20 + 5).toFixed(2));
        
        const priceHistory: PriceHistory[] = [];
        let lastClose = initialPrice;

        for (let i = 0; i < 90; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (89 - i));
            
            const open = lastClose;
            // More volatile change for candlestick
            const change = (Math.random() - 0.48) * open * 0.1;
            const close = Math.max(0.5, open + change);
            
            const high = Math.max(open, close) * (1 + Math.random() * 0.03);
            const low = Math.min(open, close) * (1 - Math.random() * 0.03);
            
            priceHistory.push({
                date: date.toISOString(),
                open: parseFloat(open.toFixed(4)),
                high: parseFloat(high.toFixed(4)),
                low: parseFloat(low.toFixed(4)),
                close: parseFloat(close.toFixed(4)),
            });

            lastClose = close;
        }

        const currentPrice = priceHistory[priceHistory.length - 1].close;
        const price24hAgo = priceHistory[priceHistory.length - 2]?.close || currentPrice;
        const priceChange24h = currentPrice - price24hAgo;
        const totalShares = 100000;

        // Generate mock order book
        const bids: OrderBookEntry[] = [];
        const asks: OrderBookEntry[] = [];
        let bidPrice = currentPrice * 0.995;
        let askPrice = currentPrice * 1.005;
        for (let i = 0; i < 15; i++) {
            bids.push({ price: parseFloat(bidPrice.toFixed(4)), size: Math.floor(Math.random() * 500) + 50 });
            asks.push({ price: parseFloat(askPrice.toFixed(4)), size: Math.floor(Math.random() * 500) + 50 });
            bidPrice *= (1 - Math.random() * 0.005);
            askPrice *= (1 + Math.random() * 0.005);
        }

        // Generate mock recent trades
        const recentTrades: RecentTrade[] = [];
        for (let i = 0; i < 20; i++) {
             const tradeTime = new Date();
             tradeTime.setSeconds(tradeTime.getSeconds() - i * (Math.floor(Math.random() * 10) + 5));
             recentTrades.push({
                price: currentPrice * (1 + (Math.random() - 0.5) * 0.01),
                size: Math.floor(Math.random() * 200) + 10,
                time: tradeTime.toLocaleTimeString(),
                type: Math.random() > 0.5 ? 'buy' : 'sell'
            });
        }

        return {
            id: song.id,
            title: song.title,
            artistName: song.artistName,
            coverArtUrl: song.coverArtUrl,
            currentPrice: currentPrice,
            priceHistory,
            aiPrediction: {
                changePercent: parseFloat(((Math.random() - 0.45) * 5).toFixed(2)),
                direction: Math.random() > 0.5 ? 'up' : 'down',
            },
            totalShares,
            sharesOutstanding: Math.floor(Math.random() * 50000) + 20000,
            priceChange24h: priceChange24h,
            volume24h: Math.floor(Math.random() * 5000) + 1000,
            marketCap: currentPrice * totalShares,
            allTimeHigh: Math.max(...priceHistory.map(p => p.high)),
            allTimeLow: Math.min(...priceHistory.map(p => p.low)),
            orderBook: { bids, asks },
            recentTrades
        };
    });
};

export const getInitialWallet = (): UserWallet => {
    const storedWallet = localStorage.getItem(EXCHANGE_WALLET_KEY);
    if (storedWallet) {
        try {
            return JSON.parse(storedWallet);
        } catch (e) {
            console.error("Failed to parse wallet from localStorage", e);
        }
    }
    return {
        leherCoinBalance: 100000.00,
        portfolioValue: 0,
        portfolio: [],
    };
};

export const saveWallet = (wallet: UserWallet) => {
    localStorage.setItem(EXCHANGE_WALLET_KEY, JSON.stringify(wallet));
};

// --- TRANSACTIONS ---

export const buyShares = (song: TradableSong, sharesToBuy: number, currentWallet: UserWallet): { success: boolean, wallet?: UserWallet, error?: string } => {
    const totalCost = song.currentPrice * sharesToBuy;
    if (currentWallet.leherCoinBalance < totalCost) {
        return { success: false, error: "insufficient_funds" };
    }
    if (song.sharesOutstanding < sharesToBuy) {
        return { success: false, error: "Not enough shares available." };
    }
    
    const newWallet = { ...currentWallet, leherCoinBalance: currentWallet.leherCoinBalance - totalCost };
    const existingHolding = newWallet.portfolio.find(item => item.songId === song.id);

    if (existingHolding) {
        const totalOldCost = existingHolding.avgBuyPrice * existingHolding.shares;
        const newTotalShares = existingHolding.shares + sharesToBuy;
        const newAvgPrice = (totalOldCost + totalCost) / newTotalShares;
        existingHolding.shares = newTotalShares;
        existingHolding.avgBuyPrice = newAvgPrice;
    } else {
        newWallet.portfolio.push({
            songId: song.id,
            shares: sharesToBuy,
            avgBuyPrice: song.currentPrice,
        });
    }

    saveWallet(newWallet);
    return { success: true, wallet: newWallet };
};

export const sellShares = (song: TradableSong, sharesToSell: number, currentWallet: UserWallet): { success: boolean, wallet?: UserWallet, error?: string } => {
    const existingHolding = currentWallet.portfolio.find(item => item.songId === song.id);
    if (!existingHolding || existingHolding.shares < sharesToSell) {
        return { success: false, error: "not_enough_shares" };
    }

    const totalProceeds = song.currentPrice * sharesToSell;
    const newWallet = { ...currentWallet, leherCoinBalance: currentWallet.leherCoinBalance + totalProceeds };

    existingHolding.shares -= sharesToSell;
    
    if (existingHolding.shares === 0) {
        newWallet.portfolio = newWallet.portfolio.filter(item => item.songId !== song.id);
    }
    
    saveWallet(newWallet);
    return { success: true, wallet: newWallet };
};