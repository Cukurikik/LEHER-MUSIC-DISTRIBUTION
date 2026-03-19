

import React, { useMemo } from 'react';
import type { TierDetails, TranslationKeys } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import GeminiIcon from './icons/GeminiIcon';

// Icons need to be redefined here as they are no longer in TierIcons.tsx
const ArtisanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L4.5 6.5L12 11L19.5 6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 17.5L12 22L19.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
    <path d="M4.5 12L12 16.5L19.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);
const VirtuosoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L4.5 6.5L12 11L19.5 6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 12L12 16.5L19.5 12L12 7.5L4.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 17.5L12 22L19.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);
const MaestroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L4.5 6.5L12 11L19.5 6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 12L12 16.5L19.5 12L12 7.5L4.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 17.5L12 22L19.5 17.5L12 13L4.5 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const LegendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 6L9 7.732V11.268L12 13L15 11.268V7.732L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 16.268V12.732L6 11V14L9 16.268Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M15 16.268V12.732L18 11V14L15 16.268Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const TIER_ICONS = {
    'ARTISAN': ArtisanIcon,
    'VIRTUOSO': VirtuosoIcon,
    'MAESTRO': MaestroIcon,
    'LEGEND': LegendIcon,
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

const CircularProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            <defs>
                <linearGradient id="tierProgressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--quantum-blue)" />
                    <stop offset="50%" stopColor="var(--quantum-magenta)" />
                    <stop offset="100%" stopColor="var(--quantum-green)" />
                </linearGradient>
            </defs>
            <circle
                className="text-white/10"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke="url(#tierProgressGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                className="transition-all duration-700 ease-out"
            />
        </svg>
    );
};


interface RevenueTierWidgetProps {
    tierDetails: TierDetails;
    onBenefitsClick: () => void;
}

const RevenueTierWidget: React.FC<RevenueTierWidgetProps> = ({ tierDetails, onBenefitsClick }) => {
    const { t } = useTranslation();
    const { currentTier, nextTier, progressPercentage, lifetimeIncome } = tierDetails;
    const IconComponent = TIER_ICONS[currentTier.name];

    const newBenefitsCount = useMemo(() => {
        if (!nextTier) return 0;
        // The first benefit is often "Everything in X, plus:", so we exclude it from the count of "new" benefits.
        return nextTier.benefits.filter(b => !String(b.title).toLowerCase().includes('everything in')).length;
    }, [nextTier]);

    return (
        <div className="glass-surface-quantum p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-50"></div>
            
            <h3 className="text-sm text-green-200/70 uppercase tracking-wider mb-4">Your Revenue Tier</h3>

            <div className="relative mb-4">
                <CircularProgressBar progress={progressPercentage} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 holographic-glow" />
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gradient-income">{t(currentTier.name.toLowerCase() as TranslationKeys)}</h2>
            
            <div className="my-4 h-px w-3/4 bg-[var(--quantum-border-color)]"></div>

            {nextTier ? (
                 <p className="text-sm text-white/80">
                    {formatCurrency(nextTier.threshold - lifetimeIncome)} away from <span className="font-bold text-white">{t(nextTier.name.toLowerCase() as TranslationKeys)}</span>
                 </p>
            ) : (
                <p className="text-sm font-bold text-white">You've reached the highest tier!</p>
            )}

            <div className="flex items-center gap-2 text-xs text-purple-300 mt-3">
                <GeminiIcon className="w-4 h-4"/>
                <p>Projected to reach next tier in ~3 months.</p>
            </div>

            <button onClick={onBenefitsClick} className="mt-4 w-full text-sm bg-white/10 text-white font-bold py-2 px-4 rounded-full transition-colors hover:bg-white/20">
                 {nextTier && newBenefitsCount > 0 ? `View Benefits (+${newBenefitsCount} new)` : 'View All Benefits'}
            </button>
        </div>
    );
};

export default RevenueTierWidget;