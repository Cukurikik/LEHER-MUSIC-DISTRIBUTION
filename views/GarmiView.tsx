
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import SparklesIcon from '../components/layout/SparklesIcon';
import ChipIcon from '../components/icons/ChipIcon';

// Icons
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>);
const CurrencyDollarIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const CubeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>);


const GarmiView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isOptedIn, setIsOptedIn] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [simulationStep, setSimulationStep] = useState<'idle' | 'generating' | 'matching' | 'minting' | 'complete'>('idle');
    const [simulatedPrompt, setSimulatedPrompt] = useState("80s Synthwave like DJ Galaxy");
    const [matchData, setMatchData] = useState<{ song: string, percent: number } | null>(null);
    const [ledger, setLedger] = useState<{ id: string, time: string, song: string, royalty: string }[]>([]);

    const toggleOptIn = () => {
        if (!isOptedIn) {
            setIsTraining(true);
            setTimeout(() => {
                setIsTraining(false);
                setIsOptedIn(true);
            }, 3000);
        } else {
            setIsOptedIn(false);
        }
    };

    const runSimulation = () => {
        if (!isOptedIn) return;
        setSimulationStep('generating');
        setMatchData(null);

        setTimeout(() => {
            setSimulationStep('matching');
            setTimeout(() => {
                setMatchData({ song: 'Cosmic Drift', percent: 85 });
                setSimulationStep('minting');
                setTimeout(() => {
                    const newTx = {
                        id: `0x${Math.random().toString(16).substr(2, 8)}...`,
                        time: new Date().toLocaleTimeString(),
                        song: 'Cosmic Drift',
                        royalty: '$0.045'
                    };
                    setLedger(prev => [newTx, ...prev]);
                    setSimulationStep('complete');
                    setTimeout(() => setSimulationStep('idle'), 3000);
                }, 2000);
            }, 2000);
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* Header */}
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-singularity-purple/20 flex items-center justify-center border border-singularity-purple/50 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                        <ChipIcon className="w-8 h-8 text-singularity-teal" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gradient-singularity tracking-tight">GARMI System</h1>
                        <p className="text-lg text-ui-text-body mt-1 max-w-2xl">Generative AI Asset Rights Management Interface. Monetize your sonic identity.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Status & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Status Card */}
                    <div className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${isOptedIn ? 'bg-singularity-black/80 border-singularity-teal shadow-[0_0_20px_rgba(20,184,166,0.2)]' : 'bg-ui-surface border-ui-border'}`}>
                        <h3 className="text-lg font-bold text-ui-text-heading mb-4">Training Status</h3>
                        
                        {isTraining ? (
                            <div className="flex flex-col items-center py-8">
                                <div className="w-16 h-16 border-4 border-singularity-purple border-t-singularity-teal rounded-full animate-spin mb-4"></div>
                                <p className="text-singularity-teal font-mono animate-pulse">Vectorizing Catalog...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${isOptedIn ? 'bg-singularity-teal/20 text-singularity-teal' : 'bg-ui-bg text-ui-text-subtle'}`}>
                                    <SparklesIcon className="w-10 h-10" />
                                </div>
                                <p className={`text-xl font-bold mb-6 ${isOptedIn ? 'text-singularity-teal' : 'text-ui-text-subtle'}`}>
                                    {isOptedIn ? 'AI Model Active' : 'Model Inactive'}
                                </p>
                                <button 
                                    onClick={toggleOptIn}
                                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${isOptedIn ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-gradient-singularity text-white hover:shadow-glow-primary'}`}
                                >
                                    {isOptedIn ? 'Deactivate Training' : 'Enable AI Training'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Stats Card */}
                    <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                         <h3 className="text-lg font-bold text-ui-text-heading mb-4 flex items-center gap-2">
                             <CurrencyDollarIcon className="w-5 h-5 text-green-400"/> Passive Income
                         </h3>
                         <div className="space-y-4">
                             <div className="bg-ui-bg/50 p-3 rounded-lg flex justify-between items-center">
                                 <span className="text-sm text-ui-text-subtle">Total Revenue</span>
                                 <span className="text-xl font-bold text-green-400">$1,240.50</span>
                             </div>
                             <div className="bg-ui-bg/50 p-3 rounded-lg flex justify-between items-center">
                                 <span className="text-sm text-ui-text-subtle">Tracks Generated</span>
                                 <span className="text-xl font-bold text-white">842</span>
                             </div>
                             <div className="bg-ui-bg/50 p-3 rounded-lg flex justify-between items-center">
                                 <span className="text-sm text-ui-text-subtle">Avg. Match</span>
                                 <span className="text-xl font-bold text-singularity-teal">76%</span>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Right Column: Simulation & Ledger */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Simulator */}
                    <div className="bg-singularity-black/50 border border-singularity-purple/30 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <CubeIcon className="w-32 h-32 text-singularity-purple" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-ui-text-heading mb-2 relative z-10">Generation Simulator</h3>
                        <p className="text-sm text-ui-text-body mb-6 relative z-10">Simulate a third-party creator using the AI model trained on your data.</p>

                        <div className="bg-black/40 p-4 rounded-xl border border-ui-border mb-4 relative z-10">
                            <label className="text-xs font-bold text-ui-text-subtle uppercase mb-2 block">Creator Prompt</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={simulatedPrompt}
                                    onChange={(e) => setSimulatedPrompt(e.target.value)}
                                    className="form-input-glow w-full bg-black/50"
                                    disabled={simulationStep !== 'idle'}
                                />
                                <button 
                                    onClick={runSimulation}
                                    disabled={!isOptedIn || simulationStep !== 'idle'}
                                    className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>

                        {/* Simulation Visualization */}
                        <div className="h-48 bg-black/60 rounded-xl border border-ui-border flex flex-col items-center justify-center relative z-10">
                            {simulationStep === 'idle' && (
                                <p className="text-ui-text-subtle">Ready for simulation...</p>
                            )}

                            {simulationStep === 'generating' && (
                                <div className="text-center">
                                    <div className="flex gap-1 justify-center mb-2">
                                        <div className="w-2 h-8 bg-primary animate-pulse" style={{animationDelay: '0ms'}}></div>
                                        <div className="w-2 h-8 bg-primary animate-pulse" style={{animationDelay: '100ms'}}></div>
                                        <div className="w-2 h-8 bg-primary animate-pulse" style={{animationDelay: '200ms'}}></div>
                                        <div className="w-2 h-8 bg-primary animate-pulse" style={{animationDelay: '300ms'}}></div>
                                    </div>
                                    <p className="text-primary font-mono text-sm">Synthesizing Audio...</p>
                                </div>
                            )}

                            {simulationStep === 'matching' && (
                                <div className="text-center w-full max-w-md px-8">
                                    <div className="flex justify-between text-xs text-singularity-teal mb-1">
                                        <span>Scanning Fingerprint...</span>
                                        <span>Processing</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-singularity-teal animate-progress-indeterminate"></div>
                                    </div>
                                </div>
                            )}

                             {['minting', 'complete'].includes(simulationStep) && matchData && (
                                <div className="text-center animate-fade-in">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-2">
                                        <LockClosedIcon className="w-8 h-8 text-green-400" />
                                    </div>
                                    <p className="text-white font-bold text-lg">Match Found: {matchData.percent}%</p>
                                    <p className="text-ui-text-subtle text-sm">Source: {matchData.song}</p>
                                    {simulationStep === 'minting' && <p className="text-singularity-purple text-xs mt-2 animate-pulse">Minting Smart Contract...</p>}
                                    {simulationStep === 'complete' && <p className="text-green-400 text-xs mt-2">Royalty Assigned via Blockchain</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ledger */}
                    <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                        <h3 className="text-lg font-bold text-ui-text-heading mb-4">Smart Contract Ledger</h3>
                        <div className="overflow-hidden">
                             <table className="w-full text-sm text-left">
                                <thead className="text-xs text-ui-text-subtle uppercase bg-ui-bg/50 border-b border-ui-border">
                                    <tr>
                                        <th className="p-3">Tx Hash</th>
                                        <th className="p-3">Time</th>
                                        <th className="p-3">Source Asset</th>
                                        <th className="p-3 text-right">Royalty</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-ui-border/30">
                                    {ledger.length > 0 ? ledger.map((tx, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors animate-fade-in">
                                            <td className="p-3 font-mono text-singularity-teal">{tx.id}</td>
                                            <td className="p-3 text-ui-text-body">{tx.time}</td>
                                            <td className="p-3 text-ui-text-heading font-medium">{tx.song}</td>
                                            <td className="p-3 text-right font-bold text-green-400">+{tx.royalty}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-ui-text-subtle">No recent transactions generated.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GarmiView;
