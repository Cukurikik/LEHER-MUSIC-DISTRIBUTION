
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song } from '../types';
import { ComingSoonTool } from './ComingSoonTools';

import AreaChart from '../components/charts/AreaChart';
import DoughnutChart from '../components/charts/DoughnutChart';
import { useTranslation } from '../hooks/useTranslation';

import { 
    Banknote as CashIcon, 
    TrendingUp as TrendingUpIcon, 
    FileText as DocumentTextIcon, 
    Globe as GlobeIcon, 
    Lock as LockClosedIcon, 
    ArrowLeft as ArrowLeftIcon, 
    Table as TableIcon, 
    Clock as ClockIcon, 
    Plus as PlusIcon, 
    ShieldCheck as ShieldCheckIcon, 
    Cpu as ChipIcon, 
    Users as UserGroupIcon 
} from 'lucide-react';


// --- Shared Layout for Financial Tools ---
const FinancialToolLayout: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, icon, children }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20 px-4 pt-6">
            <div>
                <button onClick={() => navigate('/payments')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group text-sm">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Financials
                </button>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-900/50 to-black rounded-2xl flex items-center justify-center border border-green-500/30 shadow-glow-success shrink-0">
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 font-oxanium tracking-tight">{title}</h1>
                        <p className="text-lg text-ui-text-body mt-2 max-w-2xl">{subtitle}</p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

// --- 1. SMART ROYALTY SPLITTER ---
export const SmartRoyaltySplitterView: React.FC<{ songs: Song[], showToast: any }> = ({ showToast }) => {
    const [collaborators, setCollaborators] = useState([
        { id: 1, name: 'Me (Owner)', share: 60, role: 'Primary' },
        { id: 2, name: 'Producer X', share: 40, role: 'Producer' }
    ]);
    const [newName, setNewName] = useState('');
    const [newShare, setNewShare] = useState(0);

    const totalShare = collaborators.reduce((acc, c) => acc + c.share, 0);

    const addCollaborator = () => {
        if (newName && newShare > 0) {
            setCollaborators([...collaborators, { id: Date.now(), name: newName, share: newShare, role: 'Collaborator' }]);
            setNewName('');
            setNewShare(0);
        }
    };

    return (
        <FinancialToolLayout title="Smart Royalty Splitter" subtitle="Automated revenue sharing for your team." icon={<UserGroupIcon className="w-8 h-8 text-green-400"/>}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-6">Configure Splits</h3>
                    <div className="space-y-4 mb-6">
                        {collaborators.map(c => (
                            <div key={c.id} className="flex justify-between items-center bg-ui-bg/50 p-4 rounded-xl border border-ui-border">
                                <div>
                                    <p className="font-bold text-white">{c.name}</p>
                                    <p className="text-xs text-ui-text-subtle">{c.role}</p>
                                </div>
                                <div className="font-mono text-xl font-bold text-green-400">{c.share}%</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="p-4 bg-black/20 rounded-xl border border-ui-border mb-6">
                        <h4 className="text-sm font-bold text-ui-text-subtle mb-3 uppercase">Add Collaborator</h4>
                        <div className="flex gap-3">
                            <input type="text" placeholder="Name / Email" className="flex-1 form-input-modern" value={newName} onChange={e => setNewName(e.target.value)} />
                            <input type="number" placeholder="%" className="w-20 form-input-modern" value={newShare} onChange={e => setNewShare(Number(e.target.value))} />
                            <button onClick={addCollaborator} className="bg-white text-black p-3 rounded-lg font-bold"><PlusIcon className="w-5 h-5"/></button>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl text-center font-bold mb-6 ${totalShare === 100 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        Total Allocation: {totalShare}%
                    </div>

                    <button disabled={totalShare !== 100} className="w-full btn-glow-primary py-4 rounded-xl font-bold text-lg disabled:opacity-50" onClick={() => showToast("Splits saved!", "success")}>
                        Save & Activate Contract
                    </button>
                </div>
                <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border flex items-center justify-center">
                    <div className="w-full max-w-xs">
                         <DoughnutChart 
                            data={collaborators.map((c, i) => ({ label: c.name, value: c.share, color: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899'][i % 4] }))} 
                            title="Equity Distribution" 
                        />
                    </div>
                </div>
            </div>
        </FinancialToolLayout>
    );
};

// --- 2. REAL-TIME CRYPTO PAYMENT ---
export const RealTimeCryptoPaymentView: React.FC<{ showToast: any }> = ({ showToast }) => {
    const [wallet, setWallet] = useState('');
    return (
        <FinancialToolLayout title="Crypto Payout Gateway" subtitle="Instant withdrawals via USDT, BTC, or ETH." icon={<GlobeIcon className="w-8 h-8 text-indigo-400"/>}>
             <div className="max-w-xl mx-auto bg-ui-surface p-8 rounded-3xl border border-ui-border shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-ui-text-subtle uppercase">Available Balance</span>
                    <span className="text-white font-mono text-2xl">$4,250.00</span>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-ui-text-subtle block mb-2">Select Network</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['TRC20 (USDT)', 'ERC20 (USDT)', 'Bitcoin'].map(net => (
                                <button key={net} className="py-3 border border-ui-border rounded-xl text-sm font-bold hover:bg-white/5 focus:bg-indigo-500/20 focus:border-indigo-500 transition-colors">
                                    {net}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <label className="text-sm font-bold text-ui-text-subtle block mb-2">Wallet Address</label>
                        <input type="text" value={wallet} onChange={e => setWallet(e.target.value)} className="form-input-modern w-full font-mono text-sm" placeholder="0x..." />
                    </div>

                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm">
                        <p><strong>Exchange Rate:</strong> 1 USD = 1.00 USDT</p>
                        <p><strong>Network Fee:</strong> $1.00</p>
                    </div>

                    <button onClick={() => showToast("Withdrawal initiated!", "success")} className="w-full btn-glow-primary py-4 rounded-xl font-bold text-lg">
                        Withdraw to Crypto
                    </button>
                </div>
             </div>
        </FinancialToolLayout>
    );
};

// --- 3. GEO-BASED PRICING ---
export const GeoBasedPricingEngineView: React.FC = () => (
    <FinancialToolLayout title="Geo-Pricing Engine" subtitle="Dynamic pricing optimization per territory." icon={<GlobeIcon className="w-8 h-8 text-blue-400"/>}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <h3 className="font-bold text-white mb-4">Global Price Map</h3>
                <div className="h-[400px] bg-black/50 rounded-xl border border-white/5 flex items-center justify-center text-ui-text-subtle">
                    [Interactive World Map Visualization Placeholder]
                </div>
            </div>
            <div className="space-y-4">
                {['United States ($1.29)', 'Indonesia ($0.49)', 'India ($0.19)', 'Germany ($1.49)'].map((p, i) => (
                    <div key={i} className="bg-ui-surface p-4 rounded-xl border border-ui-border flex justify-between items-center">
                        <span className="text-white font-medium">{p.split(' (')[0]}</span>
                        <span className="text-green-400 font-bold">{p.split(' (')[1].replace(')', '')}</span>
                    </div>
                ))}
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500">Optimize All Regions</button>
            </div>
        </div>
    </FinancialToolLayout>
);

// --- 4. LISTENER TIP INTEGRATION ---
export const ListenerTipIntegrationView: React.FC = () => (
    <FinancialToolLayout title="Listener Tips" subtitle="Direct support from your fanbase." icon={<CashIcon className="w-8 h-8 text-yellow-400"/>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border text-center">
                 <p className="text-sm text-ui-text-subtle uppercase font-bold">Total Tips</p>
                 <p className="text-4xl font-black text-yellow-400 mt-2">$1,240</p>
             </div>
             <div className="md:col-span-2 bg-ui-surface p-6 rounded-2xl border border-ui-border">
                 <h3 className="font-bold text-white mb-4">Recent Supporters</h3>
                 <div className="space-y-3">
                     {[1,2,3].map(i => (
                         <div key={i} className="flex items-center gap-4 p-3 bg-ui-bg/50 rounded-xl">
                             <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                             <div className="flex-1">
                                 <p className="font-bold text-white">Fan #{i}</p>
                                 <p className="text-xs text-ui-text-subtle">"Love your new track!"</p>
                             </div>
                             <span className="font-bold text-green-400">+$5.00</span>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    </FinancialToolLayout>
);

// --- 5. AI EARNINGS FORECAST ---
export const AIPoweredEarningsForecastView: React.FC = () => (
    <FinancialToolLayout title="AI Earnings Forecast" subtitle="Predictive financial modeling." icon={<TrendingUpIcon className="w-8 h-8 text-purple-400"/>}>
        <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
             <div className="flex justify-between items-end mb-6">
                 <div>
                     <h3 className="text-xl font-bold text-white">12-Month Projection</h3>
                     <p className="text-sm text-ui-text-subtle">Based on current growth trajectory.</p>
                 </div>
                 <div className="text-right">
                     <p className="text-3xl font-black text-purple-400">$14,500</p>
                     <p className="text-xs text-ui-text-subtle uppercase">Est. Annual</p>
                 </div>
             </div>
             <div className="h-64 w-full bg-black/30 rounded-xl border border-white/5 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-4 pb-4 gap-2">
                      {[30, 35, 40, 45, 50, 60, 65, 70, 80, 85, 90, 100].map((h, i) => (
                          <div key={i} className="w-full bg-purple-500/30 rounded-t-sm relative group">
                              <div className="absolute bottom-0 left-0 right-0 bg-purple-500" style={{height: `${h}%`}}></div>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">${h*120}</div>
                          </div>
                      ))}
                  </div>
             </div>
        </div>
    </FinancialToolLayout>
);

// --- 6. BLOCKCHAIN LEDGER ---
export const BlockchainTransparencyLedgerView: React.FC = () => (
    <FinancialToolLayout title="Blockchain Ledger" subtitle="Immutable royalty transaction records." icon={<ShieldCheckIcon className="w-8 h-8 text-cyan-400"/>}>
        <div className="bg-ui-surface rounded-3xl border border-ui-border overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-ui-bg text-ui-text-subtle uppercase text-xs">
                    <tr><th className="p-4">Tx Hash</th><th className="p-4">Asset</th><th className="p-4">Amount</th><th className="p-4">Time</th></tr>
                </thead>
                <tbody className="divide-y divide-ui-border text-white">
                    {[1,2,3,4,5].map(i => (
                        <tr key={i} className="hover:bg-white/5">
                            <td className="p-4 font-mono text-cyan-400">0x{Math.random().toString(16).substr(2, 8)}...</td>
                            <td className="p-4">Cosmic Drift</td>
                            <td className="p-4 text-green-400">+0.045 ETH</td>
                            <td className="p-4 text-ui-text-subtle">2 mins ago</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </FinancialToolLayout>
);

// --- 7. PERFORMANCE BONUS ---
export const PerformanceBasedBonusView: React.FC = () => (
    <FinancialToolLayout title="Performance Bonuses" subtitle="Unlock rewards for streaming milestones." icon={<TrendingUpIcon className="w-8 h-8 text-orange-400"/>}>
         <div className="space-y-4">
             <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-6 rounded-2xl border border-orange-500/30 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20">🏆</div>
                 <div className="flex-1">
                     <h3 className="text-xl font-bold text-white">100k Streams Bonus</h3>
                     <div className="w-full bg-black/50 h-3 rounded-full mt-2 overflow-hidden">
                         <div className="h-full bg-orange-500 w-[85%]"></div>
                     </div>
                     <p className="text-xs text-orange-300 mt-1 font-bold">85,240 / 100,000 Streams</p>
                 </div>
                 <div className="text-right">
                     <p className="text-xs text-ui-text-subtle uppercase">Reward</p>
                     <p className="text-2xl font-black text-white">$100</p>
                 </div>
             </div>
             
             <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border opacity-60">
                 <div className="flex justify-between items-center">
                     <div>
                        <h4 className="font-bold text-white">Millionaire Club</h4>
                        <p className="text-sm text-ui-text-subtle">Reach 1M Streams</p>
                     </div>
                     <div className="text-right">
                         <p className="text-xs text-ui-text-subtle uppercase">Reward</p>
                         <p className="text-xl font-black text-white">$1,000</p>
                     </div>
                 </div>
             </div>
         </div>
    </FinancialToolLayout>
);

// --- 8. ROYALTY PREEMPTIVE STRIKE ---
export const RoyaltyPreemptiveStrikeView: React.FC = () => (
    <FinancialToolLayout title="Pre-emptive Strike" subtitle="Claim projected royalties before DSP payout." icon={<ChipIcon className="w-8 h-8 text-red-400"/>}>
        <div className="text-center bg-ui-surface p-12 rounded-3xl border border-ui-border">
             <h3 className="text-2xl font-bold text-white mb-2">Early Access Available</h3>
             <p className="text-ui-text-body mb-8">Based on your Day 1 streaming velocity for "New Release", you are eligible for an instant payout.</p>
             <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl inline-block mb-8">
                 <p className="text-sm text-green-300 uppercase font-bold">Instant Offer</p>
                 <p className="text-4xl font-black text-green-400">$250.00</p>
             </div>
             <br/>
             <button className="btn-quantum-glow px-8 py-4 rounded-full font-bold text-white text-lg">Claim Now (Fee: 2%)</button>
        </div>
    </FinancialToolLayout>
);


// --- NEW V6.0.0 ENTERPRISE FINANCIAL TOOLS IMPLEMENTATION ---

// --- 1. Dynamic Royalty Securitization ---
export const DynamicRoyaltySecuritizationView: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(5000);
    const [term, setTerm] = useState(12);
    
    const predictedRevenue = 12500;
    const interestRate = 6.5; // Dynamic based on risk
    const monthlyPayment = (loanAmount * (1 + interestRate/100)) / term;

    return (
        <FinancialToolLayout title="Dynamic Royalty Securitization" subtitle="Convert projected future earnings into liquid capital." icon={<TrendingUpIcon className="w-8 h-8 text-green-400"/>}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-ui-surface p-8 rounded-3xl border border-ui-border">
                    <h3 className="text-xl font-bold text-white mb-6">Securitization Configurator</h3>
                    
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-ui-text-subtle">Advance Amount</label>
                                <span className="text-2xl font-black text-green-400">${loanAmount.toLocaleString()}</span>
                            </div>
                            <input type="range" min="1000" max={predictedRevenue * 0.8} step="500" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full h-3 bg-ui-bg rounded-lg appearance-none cursor-pointer accent-green-500"/>
                            <div className="flex justify-between text-xs text-ui-text-subtle mt-1">
                                <span>$1,000</span>
                                <span>Max: ${(predictedRevenue * 0.8).toLocaleString()} (80% of Projection)</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-ui-text-subtle mb-2 block">Term Length</label>
                            <div className="grid grid-cols-3 gap-4">
                                {[12, 18, 24].map(t => (
                                    <button key={t} onClick={() => setTerm(t)} className={`py-3 rounded-xl font-bold border-2 transition-all ${term === t ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-ui-border bg-ui-bg hover:border-white/20'}`}>
                                        {t} Months
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                            <h4 className="text-sm font-bold text-white mb-4">Risk Assessment (AI)</h4>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 w-[20%]"></div>
                                </div>
                                <span className="font-bold text-green-400">Low Risk (AAA)</span>
                            </div>
                            <p className="text-xs text-ui-text-subtle mt-2">Based on stable streaming history from "Cosmic Drift" & "Lagu Santai".</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-gradient-to-b from-ui-surface to-black p-8 rounded-3xl border border-ui-border flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-ui-text-heading mb-6">Offer Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm"><span className="text-ui-text-subtle">Principal</span><span className="text-white font-mono">${loanAmount.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-ui-text-subtle">Dynamic Fee ({interestRate}%)</span><span className="text-white font-mono">${(loanAmount * (interestRate/100)).toFixed(2)}</span></div>
                            <div className="h-px bg-ui-border my-2"></div>
                            <div className="flex justify-between text-sm"><span className="text-ui-text-subtle">Recoup Rate</span><span className="text-green-400 font-bold">100% of Royalties</span></div>
                            <div className="flex justify-between text-sm"><span className="text-ui-text-subtle">Est. Payoff</span><span className="text-white font-bold">{monthlyPayment.toFixed(2)} / mo</span></div>
                        </div>
                    </div>
                    <button className="w-full btn-glow-primary py-4 rounded-xl font-black text-lg mt-8">
                        Mint Securities & Withdraw
                    </button>
                </div>
            </div>
        </FinancialToolLayout>
    );
};

// --- 2. Tax Withholding Engine ---
export const TaxWithholdingEngineView: React.FC = () => {
    const [country, setCountry] = useState('Indonesia');
    
    const treatyData: Record<string, { rate: string, treaty: boolean }> = {
        'Indonesia': { rate: '10%', treaty: true },
        'United States': { rate: '30%', treaty: false },
        'United Kingdom': { rate: '0%', treaty: true },
        'Japan': { rate: '10%', treaty: true },
    };

    return (
        <FinancialToolLayout title="Multi-Jurisdictional Tax Engine" subtitle="Automated withholding calculation based on tax treaties." icon={<DocumentTextIcon className="w-8 h-8 text-blue-400"/>}>
             <div className="bg-ui-surface p-8 rounded-3xl border border-ui-border">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div>
                            <label className="text-sm font-bold text-ui-text-subtle block mb-2">Beneficiary Domicile</label>
                            <select className="form-input-modern w-full" value={country} onChange={e => setCountry(e.target.value)}>
                                {Object.keys(treatyData).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                            <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-2"><GlobeIcon className="w-4 h-4"/> Treaty Status: {treatyData[country].treaty ? 'Active' : 'None'}</h4>
                            <p className="text-sm text-ui-text-body">
                                Applying US-ID Tax Treaty Article 12 (Royalties). Standard rate reduced from 30% to {treatyData[country].rate}.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/30 rounded-2xl p-6 border border-ui-border">
                         <h4 className="text-sm font-bold text-ui-text-subtle uppercase mb-4">Simulation (Gross $1,000)</h4>
                         <div className="space-y-3">
                             <div className="flex justify-between"><span className="text-white">Gross Royalty</span><span className="font-mono text-white">$1,000.00</span></div>
                             <div className="flex justify-between text-red-400"><span className="">Withholding Tax ({treatyData[country].rate})</span><span className="font-mono">-${(1000 * parseFloat(treatyData[country].rate)/100).toFixed(2)}</span></div>
                             <div className="h-px bg-white/10"></div>
                             <div className="flex justify-between text-xl font-bold"><span className="text-green-400">Net Payout</span><span className="font-mono text-green-400">${(1000 * (1 - parseFloat(treatyData[country].rate)/100)).toFixed(2)}</span></div>
                         </div>
                    </div>
                </div>
             </div>
        </FinancialToolLayout>
    );
};

// --- 3. Smart Vesting Logic ---
export const SmartVestingLogicView: React.FC = () => {
    const [rules, setRules] = useState([
        { id: 1, condition: 'Until $5,000 Recouped', split: 'Investor: 100%', status: 'Active' },
        { id: 2, condition: 'After $5,000', split: 'Investor: 10%, Artist: 90%', status: 'Pending' },
        { id: 3, condition: 'After 2 Years (Time)', split: 'Producer Rights Revert', status: 'Scheduled' },
    ]);

    return (
        <FinancialToolLayout title="Smart Contract Vesting" subtitle="Programmable royalty logic based on time or revenue milestones." icon={<ClockIcon className="w-8 h-8 text-purple-400"/>}>
            <div className="bg-ui-surface rounded-3xl border border-ui-border overflow-hidden">
                 <table className="w-full text-left">
                     <thead className="bg-ui-bg border-b border-ui-border">
                         <tr>
                             <th className="p-6 text-ui-text-subtle font-bold uppercase text-xs">Trigger Condition</th>
                             <th className="p-6 text-ui-text-subtle font-bold uppercase text-xs">Distribution Rule</th>
                             <th className="p-6 text-ui-text-subtle font-bold uppercase text-xs">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-ui-border">
                         {rules.map(r => (
                             <tr key={r.id} className="hover:bg-white/5 transition-colors">
                                 <td className="p-6 font-mono text-white">{r.condition}</td>
                                 <td className="p-6 text-ui-text-body">{r.split}</td>
                                 <td className="p-6">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${r.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-ui-bg border border-ui-border text-ui-text-subtle'}`}>
                                         {r.status}
                                     </span>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                 <div className="p-6 border-t border-ui-border bg-black/20">
                     <button className="w-full py-3 border-2 border-dashed border-ui-border rounded-xl text-ui-text-subtle hover:text-white hover:border-primary transition-colors font-bold flex items-center justify-center gap-2">
                         + Add Vesting Rule
                     </button>
                 </div>
            </div>
        </FinancialToolLayout>
    );
};

// --- 4. Crypto-Fiat Gateway ---
export const CryptoFiatGatewayView: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [currency, setCurrency] = useState('USDT');
    
    return (
        <FinancialToolLayout title="Cross-Border Crypto Gateway" subtitle="Instant settlement in Stablecoins or Fiat." icon={<GlobeIcon className="w-8 h-8 text-indigo-400"/>}>
            <div className="max-w-lg mx-auto bg-ui-surface p-8 rounded-3xl border border-ui-border shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-ui-text-subtle uppercase">From Balance</span>
                    <span className="text-white font-mono">$4,250.00 Available</span>
                </div>
                
                <div className="relative mb-4">
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-black border border-ui-border rounded-2xl p-4 text-3xl font-black text-white text-right pr-20 focus:border-indigo-500 outline-none" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-ui-text-subtle">USD</div>
                </div>
                
                <div className="flex justify-center -my-3 relative z-10">
                    <div className="bg-ui-surface border border-ui-border p-2 rounded-full shadow-lg">
                        <ArrowLeftIcon className="w-5 h-5 rotate-[-90deg] text-indigo-400" />
                    </div>
                </div>

                <div className="relative mt-4 mb-8">
                    <div className="w-full bg-black/50 border border-ui-border rounded-2xl p-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-indigo-400">≈ {amount}</span>
                         </div>
                         <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-transparent text-white font-bold outline-none cursor-pointer">
                             <option value="USDT">USDT (TRC20)</option>
                             <option value="USDC">USDC (ERC20)</option>
                             <option value="BTC">BTC</option>
                             <option value="IDR">IDR (Bank)</option>
                         </select>
                    </div>
                    <p className="text-xs text-ui-text-subtle mt-2 text-right">Rate: 1 USD = 1.00 USDT (0 Fee)</p>
                </div>
                
                <button className="w-full btn-glow-primary py-4 rounded-xl font-black text-lg shadow-lg">
                    Execute Swap & Send
                </button>
            </div>
        </FinancialToolLayout>
    );
};

// --- 5. Expense Management ---
export const ExpenseManagementView: React.FC = () => {
    const expenses = [
        { id: 1, date: '2025-11-01', desc: 'Facebook Ads - Promo Campaign', amount: 500.00 },
        { id: 2, date: '2025-11-05', desc: 'Mastering Engineer Fee', amount: 150.00 },
        { id: 3, date: '2025-11-10', desc: 'Cover Art Design', amount: 200.00 },
    ];
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
    const grossRevenue = 5200.00;

    return (
        <FinancialToolLayout title="Expense Management & Net Profit" subtitle="Double-entry accounting for transparent net-profit splits." icon={<TableIcon className="w-8 h-8 text-orange-400"/>}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-ui-surface rounded-3xl border border-ui-border overflow-hidden">
                     <div className="p-6 border-b border-ui-border flex justify-between items-center">
                         <h3 className="font-bold text-white text-lg">Expense Ledger</h3>
                         <button className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-gray-200">+ Add Expense</button>
                     </div>
                     <table className="w-full text-left">
                         <thead className="bg-ui-bg">
                             <tr>
                                 <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Date</th>
                                 <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase">Description</th>
                                 <th className="p-4 text-xs font-bold text-ui-text-subtle uppercase text-right">Amount</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-ui-border">
                             {expenses.map(e => (
                                 <tr key={e.id}>
                                     <td className="p-4 text-ui-text-body font-mono text-sm">{e.date}</td>
                                     <td className="p-4 text-white font-medium">{e.desc}</td>
                                     <td className="p-4 text-right font-mono text-red-400">-${e.amount.toFixed(2)}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-b from-ui-surface to-black p-6 rounded-3xl border border-ui-border">
                        <h3 className="font-bold text-ui-text-heading mb-6 border-b border-white/10 pb-4">Profit Calculation</h3>
                        <div className="space-y-3">
                             <div className="flex justify-between"><span className="text-ui-text-subtle">Gross Revenue</span><span className="text-white font-mono">${grossRevenue.toFixed(2)}</span></div>
                             <div className="flex justify-between"><span className="text-ui-text-subtle">Total Expenses</span><span className="text-red-400 font-mono">-${totalExpenses.toFixed(2)}</span></div>
                             <div className="h-px bg-white/20 my-2"></div>
                             <div className="flex justify-between text-xl font-black"><span className="text-white">Net Profit</span><span className="text-green-400 font-mono">${(grossRevenue - totalExpenses).toFixed(2)}</span></div>
                        </div>
                    </div>
                    <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
                        <p className="text-xs text-blue-200 leading-relaxed">
                            <strong>Note:</strong> Royalty splits will be calculated based on the Net Profit amount automatically at the end of the billing cycle.
                        </p>
                    </div>
                </div>
            </div>
        </FinancialToolLayout>
    );
};

export const FinancialToolsCollection: React.FC = () => <div>Financial Tools Hub</div>;
