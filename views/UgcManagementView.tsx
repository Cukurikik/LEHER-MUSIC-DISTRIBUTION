
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import { getPlatformIcon } from '../components/icons/PlatformIcons';
import CashIcon from '../components/icons/CashIcon';
import CopyrightIcon from '../components/icons/CopyrightIcon';
import VideoCameraIcon from '../components/icons/VideoCameraIcon';

// --- Icons ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z" clipRule="evenodd" /></svg>
);

const StatCard: React.FC<{ title: string, value: string, icon: any, color: string }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-ui-surface p-6 rounded-2xl border-l-4 card-interactive-glow" style={{ borderColor: color }}>
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-ui-text-heading">{title}</h3>
            <Icon className={`w-8 h-8`} style={{ color }}/>
        </div>
        <p className={`text-4xl md:text-5xl font-bold mt-2`} style={{ color }}>{value}</p>
    </div>
);

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${active ? 'bg-primary text-black shadow-glow-primary' : 'bg-ui-surface text-ui-text-body hover:bg-white/10 border border-ui-border'}`}
    >
        {label}
    </button>
);

const FccMonetizationTab: React.FC = () => {
    const [tokenReward, setTokenReward] = useState(50);
    
    const topCreators = [
        { name: "@dance_queen", platform: "TikTok", views: "1.2M", conversion: "High", reward: "Sent" },
        { name: "GamingPro_YT", platform: "YouTube", views: "850K", conversion: "Med", reward: "Pending" },
        { name: "@daily_vlogs", platform: "Instagram", views: "400K", conversion: "Low", reward: "None" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-6 rounded-2xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Fan-Created Content (FCC) Incentives</h3>
                    <p className="text-sm text-ui-text-body max-w-lg">Turn passive fans into active promoters. Configure automated token rewards for creators who use your official audio.</p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-center w-full md:w-auto">
                    <p className="text-xs text-ui-text-subtle uppercase font-bold mb-1">Token Balance</p>
                    <p className="text-3xl font-black text-indigo-400 flex items-center justify-center gap-2">
                        <CoinIcon className="w-6 h-6" /> 1,500 LHC
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Config Panel */}
                <div className="lg:col-span-1 bg-ui-surface p-6 rounded-2xl border border-ui-border h-fit">
                    <h4 className="font-bold text-ui-text-heading mb-4">Incentive Configuration</h4>
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs font-bold text-ui-text-subtle uppercase block mb-2">Reward per 10k Views</label>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="range" 
                                    min="10" max="500" step="10" 
                                    value={tokenReward} 
                                    onChange={(e) => setTokenReward(parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-ui-bg rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="font-bold text-primary w-16 text-right">{tokenReward} LHC</span>
                            </div>
                        </div>
                        <div>
                             <label className="text-xs font-bold text-ui-text-subtle uppercase block mb-2">Eligible Platforms</label>
                             <div className="flex gap-2 flex-wrap">
                                 <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">TikTok</span>
                                 <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30">YouTube Shorts</span>
                                 <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold border border-pink-500/30">Reels</span>
                             </div>
                        </div>
                        <button className="w-full btn-glow-primary py-2.5 rounded-xl font-bold text-sm">Update Rules</button>
                        <button className="w-full bg-ui-bg border border-ui-border py-2.5 rounded-xl font-bold text-sm text-ui-text-body hover:text-white hover:border-white/30">Upload Stems for Fans</button>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="lg:col-span-2 bg-ui-surface p-6 rounded-2xl border border-ui-border">
                    <h4 className="font-bold text-ui-text-heading mb-4">Top Promoting Creators</h4>
                    <div className="space-y-3">
                        {topCreators.map((c, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-ui-bg/50 rounded-xl border border-ui-border hover:border-primary/30 transition-colors gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-xs font-bold text-white">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-base">{c.name}</p>
                                        <div className="flex items-center gap-2 text-xs text-ui-text-subtle">
                                            <span>{c.platform}</span>
                                            <span>•</span>
                                            <span className="text-white font-semibold">{c.views} Views</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${c.reward === 'Sent' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : c.reward === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-ui-bg text-ui-text-subtle border border-ui-border'}`}>
                                        {c.reward}
                                    </span>
                                    {c.reward === 'Pending' && <button className="text-primary text-xs font-bold hover:underline">Approve</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UgcManagementView: React.FC<{ songs?: any[], showToast?: any }> = ({ songs, showToast }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'protection' | 'fcc'>('protection');

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <header>
                 <button onClick={() => navigate('/distribution-tools')} className="mb-4 inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('title_ugc_management')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('ugc_page_desc')}</p>
            </header>

            <div className="flex gap-3 border-b border-ui-border pb-4">
                <TabButton label="Protection & Claims" active={activeTab === 'protection'} onClick={() => setActiveTab('protection')} />
                <TabButton label="FCC Monetization" active={activeTab === 'fcc'} onClick={() => setActiveTab('fcc')} />
            </div>

            {activeTab === 'protection' ? (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <StatCard title={t('ugc_summary_revenue')} value={`$450.20`} icon={CashIcon} color="#22c55e" />
                         <StatCard title={t('ugc_summary_claims')} value="1,240" icon={CopyrightIcon} color="#f97316" />
                         <StatCard title={t('ugc_summary_videos')} value="54K" icon={VideoCameraIcon} color="#3b82f6" />
                    </div>
                    
                    <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                             <div>
                                <h2 className="text-xl font-bold text-ui-text-heading">Content ID Management</h2>
                                <p className="text-sm text-ui-text-subtle mt-1">Search and manage claims for your catalog.</p>
                             </div>
                             <div className="relative w-full md:w-72">
                                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-text-subtle z-10" />
                                <input type="text" placeholder="Search songs by ISRC or Title..." className="w-full bg-ui-bg border border-ui-border rounded-full p-2.5 pl-10 form-input-glow text-sm"/>
                            </div>
                         </div>
                        
                        <div className="text-center py-16 text-ui-text-subtle bg-ui-bg/30 rounded-xl border border-ui-border border-dashed">
                            <p>No active disputes requiring manual review.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <FccMonetizationTab />
            )}
        </div>
    );
};

export default UgcManagementView;
