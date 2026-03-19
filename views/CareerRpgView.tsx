
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import SparklesIcon from '../components/layout/SparklesIcon';
import TrendingUpIcon from '../components/icons/TrendingUpIcon';

// Icons
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>);
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-14.964z" /></svg>);

// --- GAME LOGIC CONSTANTS ---
const MAX_LEVEL = 1000;
const XP_BASE = 500;

interface Mission {
    id: string;
    title: string;
    xpReward: number;
    type: 'dist' | 'social' | 'money' | 'tools';
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
    isCompleted: boolean;
}

interface Reward {
    levelReq: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
}

const CareerRpgView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // --- STATE ---
    const [level, setLevel] = useState(5);
    const [currentXP, setCurrentXP] = useState(2500);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [showLevelUp, setShowLevelUp] = useState(false);

    // --- LEVELING LOGIC ---
    const xpToNextLevel = useMemo(() => {
        // Formula: XP needed grows slightly with each level
        return Math.floor(XP_BASE * Math.pow(level, 1.1));
    }, [level]);

    const progressPercent = Math.min(100, (currentXP / xpToNextLevel) * 100);

    const rankTitle = useMemo(() => {
        if (level < 10) return "Bedroom Producer";
        if (level < 50) return "Local Hero";
        if (level < 100) return "Rising Star";
        if (level < 250) return "Chart Topper";
        if (level < 500) return "Global Icon";
        if (level < 800) return "Industry Mogul";
        return "Musical Legend";
    }, [level]);

    // --- PROCEDURAL MISSION GENERATOR ---
    useEffect(() => {
        const newMissions: Mission[] = [];
        const count = 5 + Math.floor(level / 50); // More missions as you level up
        
        const verbs = ["Distribute", "Reach", "Earn", "Create", "Collaboration", "Analyze"];
        const nouns = ["Single", "Album", "Streams", "Royalty", "SmartLink", "Audience"];
        
        for (let i = 0; i < count; i++) {
            // Scale difficulty based on level
            const scale = level * (i + 1);
            const streamTarget = 1000 * scale;
            const moneyTarget = 10 * scale;
            
            let title = "";
            let type: Mission['type'] = 'dist';
            let xp = 100;

            const seed = Math.random();
            
            if (seed < 0.2) {
                title = `Distribute ${Math.max(1, Math.floor(level/10))} New Single(s)`;
                type = 'dist';
                xp = 500 * (level * 0.5);
            } else if (seed < 0.4) {
                title = `Reach ${streamTarget.toLocaleString()} Total Streams`;
                type = 'social';
                xp = 200 * level;
            } else if (seed < 0.6) {
                title = `Accumulate $${moneyTarget.toLocaleString()} in Revenue`;
                type = 'money';
                xp = 1000 * level;
            } else if (seed < 0.8) {
                title = `Create ${Math.max(1, Math.floor(level/20))} SmartLinks`;
                type = 'tools';
                xp = 150 * level;
            } else {
                title = `Analyze Audience Data for ${Math.max(1, Math.floor(level/5))} Tracks`;
                type = 'tools';
                xp = 300 * level;
            }

            newMissions.push({
                id: `mission-${level}-${i}`,
                title,
                xpReward: Math.floor(xp),
                type,
                difficulty: level > 500 ? 'Legendary' : level > 100 ? 'Hard' : level > 20 ? 'Medium' : 'Easy',
                isCompleted: false
            });
        }
        setMissions(newMissions);
    }, [level]);

    // --- REWARD GENERATOR ---
    const rewards: Reward[] = useMemo(() => {
        const list: Reward[] = [];
        const milestones = [10, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        
        milestones.forEach(m => {
            list.push({
                levelReq: m,
                title: `Level ${m} Unlocks`,
                description: m === 1000 ? "Ultimate Studio Access & Lifetime 0% Fee" : `Unlock ${m === 10 ? "Advanced Analytics" : m === 50 ? "Instant Payouts" : m === 100 ? "VIP Support" : "Exclusive Merch Drops"}`,
                icon: m === 1000 ? <SparklesIcon className="w-6 h-6 text-yellow-400"/> : <LockClosedIcon className="w-5 h-5"/>,
                unlocked: level >= m
            });
        });
        return list;
    }, [level]);

    // --- HANDLERS ---
    const handleClaimMission = (id: string, xp: number) => {
        setMissions(prev => prev.map(m => m.id === id ? { ...m, isCompleted: true } : m));
        
        // Add XP and Check Level Up
        let newXP = currentXP + xp;
        let newLevel = level;
        let required = xpToNextLevel;

        // Simple level up logic loop
        if (newXP >= required && newLevel < MAX_LEVEL) {
            newXP -= required;
            newLevel += 1;
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
        }

        setCurrentXP(newXP);
        setLevel(newLevel);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-32 relative">
            {/* Level Up Overlay */}
            {showLevelUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 rounded-3xl shadow-[0_0_100px_rgba(255,165,0,0.5)] animate-bounce-in">
                        <div className="bg-black rounded-[22px] p-12 text-center">
                            <SparklesIcon className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
                            <h2 className="text-5xl font-black text-white mb-2">LEVEL UP!</h2>
                            <p className="text-2xl text-orange-400 font-bold">You are now Level {level}</p>
                            <p className="text-white/70 mt-4">New missions and rewards unlocked.</p>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-4 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group text-sm">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <div className="flex items-center gap-3">
                     <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <TrendingUpIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-gradient-primary font-oxanium uppercase">{t('tool_career_rpg_title')}</h1>
                        <p className="text-sm md:text-lg text-ui-text-body mt-0.5">Gamify your music career. Reach Level {MAX_LEVEL}.</p>
                    </div>
                </div>
            </div>

            {/* Hero Section: Player Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Level Card */}
                <div className="md:col-span-2 bg-ui-surface p-6 md:p-8 rounded-3xl border-2 border-primary/30 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest mb-1">Current Rank</p>
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">{rankTitle}</h2>
                                <p className="text-xl text-white/60 mt-1">Level <span className="text-white font-mono">{level}</span> <span className="text-sm text-white/30">/ {MAX_LEVEL}</span></p>
                            </div>
                            <div className="text-right bg-black/30 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                <p className="text-xs text-ui-text-subtle uppercase font-bold mb-1">Experience</p>
                                <p className="text-2xl md:text-3xl font-mono font-bold text-white">{currentXP.toLocaleString()} <span className="text-sm text-ui-text-subtle">XP</span></p>
                                <p className="text-xs text-ui-text-subtle mt-1">Next Level: {xpToNextLevel.toLocaleString()} XP</p>
                            </div>
                        </div>
                        
                        {/* XP Bar */}
                        <div className="relative h-6 md:h-8 bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-inner">
                             <div 
                                className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden transition-all duration-1000 ease-out" 
                                style={{ width: `${progressPercent}%` }}
                             >
                                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                 <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50 shadow-[0_0_10px_white]"></div>
                             </div>
                             <p className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs font-bold text-white shadow-sm mix-blend-overlay tracking-widest">
                                 {progressPercent.toFixed(1)}% TO NEXT LEVEL
                             </p>
                        </div>
                    </div>
                </div>

                {/* Stats / Buffs */}
                <div className="bg-gradient-to-b from-ui-surface to-black p-6 rounded-3xl border border-ui-border flex flex-col justify-between">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldCheckIcon className="w-5 h-5 text-green-400"/> Active Buffs
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-sm font-bold text-ui-text-subtle">Royalty Rate</span>
                            <span className="text-green-400 font-mono font-bold">+{(level * 0.1).toFixed(1)}%</span>
                        </div>
                         <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-sm font-bold text-ui-text-subtle">Upload Speed</span>
                            <span className="text-blue-400 font-mono font-bold">+{(level * 0.5).toFixed(0)}%</span>
                        </div>
                         <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-sm font-bold text-ui-text-subtle">Support Priority</span>
                            <span className="text-purple-400 font-mono font-bold">Tier {Math.min(5, Math.ceil(level/200))}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Missions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-white font-oxanium">Active Missions <span className="text-sm text-ui-text-subtle ml-2 font-sans">({missions.filter(m => !m.isCompleted).length} Available)</span></h3>
                    </div>
                    
                    <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                        {missions.map((m, i) => (
                            <div 
                                key={m.id} 
                                className={`relative group flex items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                                    m.isCompleted 
                                    ? 'bg-green-900/10 border-green-500/20 opacity-50 order-last grayscale' 
                                    : 'bg-ui-surface border-ui-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 font-bold text-lg flex-shrink-0 ${
                                    m.isCompleted 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : m.difficulty === 'Legendary' ? 'bg-gradient-singularity text-white shadow-glow-secondary'
                                    : m.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400'
                                    : 'bg-ui-bg text-ui-text-subtle'
                                }`}>
                                    {m.isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : <span>{i+1}</span>}
                                </div>
                                
                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                                            m.difficulty === 'Legendary' ? 'bg-purple-500/20 text-purple-300' : 
                                            m.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                                            'bg-blue-500/20 text-blue-300'
                                        }`}>
                                            {m.difficulty}
                                        </span>
                                        <span className="text-[10px] text-ui-text-subtle uppercase">{m.type}</span>
                                    </div>
                                    <p className={`text-base font-bold truncate ${m.isCompleted ? 'text-green-400 line-through' : 'text-white'}`}>{m.title}</p>
                                </div>
                                
                                <div className="text-right flex flex-col items-end gap-2">
                                    <p className="text-sm text-amber-400 font-black font-mono">+{m.xpReward.toLocaleString()} XP</p>
                                    {!m.isCompleted && (
                                        <button 
                                            onClick={() => handleClaimMission(m.id, m.xpReward)}
                                            className="px-4 py-1.5 rounded-full bg-ui-border hover:bg-green-500 hover:text-black text-white text-xs font-bold transition-colors"
                                        >
                                            Claim
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rewards Tree */}
                <div className="bg-ui-surface rounded-3xl border border-ui-border p-6 flex flex-col max-h-[700px]">
                     <h3 className="text-xl font-bold text-white font-oxanium mb-4 flex items-center gap-2">
                        <StarIcon className="w-6 h-6 text-yellow-400"/> Rewards Tree
                     </h3>
                     
                     <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                        {rewards.map((r, i) => (
                            <div key={i} className={`relative p-4 rounded-2xl border flex items-start gap-4 ${
                                r.unlocked 
                                ? 'bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-yellow-500/30' 
                                : 'bg-ui-bg/30 border-ui-border opacity-60'
                            }`}>
                                <div className={`p-3 rounded-xl flex-shrink-0 ${r.unlocked ? 'bg-yellow-400 text-black shadow-glow-accent' : 'bg-black border border-white/10 text-white/30'}`}>
                                    {r.icon}
                                </div>
                                <div>
                                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${r.unlocked ? 'text-yellow-400' : 'text-ui-text-subtle'}`}>
                                        Level {r.levelReq} {r.unlocked ? 'UNLOCKED' : 'LOCKED'}
                                    </p>
                                    <p className={`font-bold text-sm ${r.unlocked ? 'text-white' : 'text-ui-text-subtle'}`}>{r.title}</p>
                                    <p className="text-xs text-ui-text-subtle mt-1 leading-relaxed">{r.description}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default CareerRpgView;
