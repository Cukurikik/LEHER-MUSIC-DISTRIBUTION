import React from 'react';

// Icons
const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>);
const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>);

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: React.FC<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon: Icon }) => {
    const changeColor = changeType === 'increase' ? 'text-green-400' : changeType === 'decrease' ? 'text-red-400' : 'text-ui-text-subtle';
    
    return (
        <div className="group relative bg-singularity-black/50 p-4 rounded-xl overflow-hidden border border-singularity-purple/30 transition-all duration-300 hover:border-singularity-pink hover:shadow-2xl hover:shadow-singularity-pink/20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-singularity-purple/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between text-singularity-teal">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
                    <Icon className="w-5 h-5" />
                </div>
                <p className="text-4xl font-bold text-white mt-2">{value}</p>
                 <div className={`flex items-center gap-1 mt-1 text-sm font-semibold ${changeColor}`}>
                    {changeType === 'increase' && <ArrowUpIcon className="w-3 h-3" />}
                    {changeType === 'decrease' && <ArrowDownIcon className="w-3 h-3" />}
                    <span>{change}</span>
                </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-singularity-pink rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
        </div>
    );
};

export default StatCard;
