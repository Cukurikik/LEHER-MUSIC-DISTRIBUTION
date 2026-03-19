
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import AreaChart from '../components/charts/AreaChart';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const RoyaltyAdvanceSimulatorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [advanceAmount, setAdvanceAmount] = useState(5000);
    const [recoupRate, setRecoupRate] = useState(50);

    const trendData = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            { name: 'Past Earnings', data: [1200, 1300, 1500, 1400, 1600, 1800, 0, 0, 0, 0, 0, 0].map(v => v === 0 ? null : v) as (number|null)[] , color: 'var(--quantum-green)'},
            { name: 'Projected Earnings', data: [null, null, null, null, null, 1800, 2000, 2200, 2500, 2800, 3000, 3200], color: 'var(--quantum-cyan)'}
        ]
    };
    
    const monthlyProjection = 2500;
    const recoupAmountPerMonth = monthlyProjection * (recoupRate / 100);
    const monthsToRecoup = advanceAmount > 0 && recoupAmountPerMonth > 0 ? advanceAmount / recoupAmountPerMonth : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_royalty_advance_simulator_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_royalty_advance_simulator_desc')}</p>
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-ui-surface p-6 rounded-2xl border border-ui-border">
                    <h2 className="text-2xl font-bold text-ui-text-heading mb-4">Earnings Projection</h2>
                     <AreaChart 
                        series={trendData.series.map(s => ({...s, data: s.data.map(d => d === null ? 0 : d)}))}
                        categories={trendData.categories}
                        yAxisLabelFormatter={(val) => `$${val.toLocaleString()}`}
                    />
                </div>
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-4 flex flex-col">
                     <h2 className="text-2xl font-bold text-ui-text-heading">Estimation</h2>
                     <div>
                        <label className="text-sm font-medium text-ui-text-subtle">Advance Amount: <span className="font-bold text-primary">${advanceAmount.toLocaleString()}</span></label>
                        <input type="range" min="500" max="50000" step="500" value={advanceAmount} onChange={e => setAdvanceAmount(Number(e.target.value))} className="w-full h-2 bg-ui-border rounded-lg appearance-none cursor-pointer accent-primary"/>
                     </div>
                      <div>
                        <label className="text-sm font-medium text-ui-text-subtle">Recoupment Rate: <span className="font-bold text-primary">{recoupRate}%</span></label>
                        <input type="range" min="10" max="100" step="5" value={recoupRate} onChange={e => setRecoupRate(Number(e.target.value))} className="w-full h-2 bg-ui-border rounded-lg appearance-none cursor-pointer accent-primary"/>
                     </div>
                     <div className="flex-grow"></div>
                     <div className="pt-4 border-t border-ui-border text-center">
                        <p className="text-ui-text-subtle">Estimated Recoup Time</p>
                        <p className="text-3xl font-bold text-accent">{monthsToRecoup.toFixed(1)} Months</p>
                     </div>
                      <button className="w-full btn-glow-primary py-2.5 rounded-full font-bold">Apply for Advance</button>

                </div>
             </div>
        </div>
    );
};

export default RoyaltyAdvanceSimulatorView;
