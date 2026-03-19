import React, { useMemo } from 'react';
import type { TierDetails, RevenueTier, Benefit, TranslationKeys } from '../types';
import { useTranslation } from '../hooks/useTranslation';

// Icons defined locally as new files cannot be created.
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

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);
const LockIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>);


const TierCard: React.FC<{ tier: RevenueTier, isCurrent: boolean, isUnlocked: boolean }> = ({ tier, isCurrent, isUnlocked }) => {
    const { t } = useTranslation();
    const IconComponent = TIER_ICONS[tier.name];
    
    const cardClasses = useMemo(() => {
        if (isCurrent) return 'border-primary shadow-glow-primary ring-2 ring-primary/50';
        if (isUnlocked) return 'border-green-500/30';
        return 'border-ui-border opacity-70';
    }, [isCurrent, isUnlocked]);

    return (
        <div className={`bg-ui-surface p-6 rounded-2xl border transition-all duration-300 ${cardClasses}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <IconComponent className={`w-12 h-12 ${isUnlocked ? 'text-primary' : 'text-ui-text-subtle'}`} />
                    <div>
                        <h3 className="text-2xl font-bold text-ui-text-heading">{t(tier.name.toLowerCase() as TranslationKeys)}</h3>
                        <p className="text-sm text-ui-text-subtle">{t('tier_benefit_requires', { threshold: tier.threshold.toLocaleString() })}</p>
                    </div>
                </div>
                {isCurrent && <div className="px-3 py-1 text-xs font-bold bg-primary text-black rounded-full uppercase tracking-wider self-start sm:self-center">Current</div>}
                {!isUnlocked && <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold bg-ui-surface text-ui-text-subtle rounded-full uppercase tracking-wider self-start sm:self-center"><LockIcon className="w-4 h-4" /> Locked</div>}
            </div>

            <ul className="space-y-3 text-sm">
                {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-green-500/20' : 'bg-ui-border'}`}>
                             <CheckIcon className={`w-3 h-3 ${isUnlocked ? 'text-green-400' : 'text-ui-text-subtle'}`} />
                        </div>
                        <div>
                            <p className="font-semibold text-ui-text-heading">{t(benefit.title as TranslationKeys)}</p>
                            <p className="text-xs text-ui-text-body">{t(benefit.description as TranslationKeys)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


interface TierBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierDetails: TierDetails;
}

const TierBenefitsModal: React.FC<TierBenefitsModalProps> = ({ isOpen, onClose, tierDetails }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="glass-surface-quantum rounded-2xl shadow-2xl w-full max-w-4xl m-4 transform transition-all relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 rounded-full z-10"><CloseIcon className="w-6 h-6"/></button>
        <div className="p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
          <div className="text-center">
             <h2 className="text-3xl font-bold text-white">{t('tier_benefits_modal_title')}</h2>
             <p className="text-white/80">{t('tier_benefits_modal_desc')}</p>
          </div>
          <div className="space-y-6">
            {tierDetails.allTiers.map(tier => (
                <TierCard 
                    key={tier.name}
                    tier={tier}
                    isCurrent={tier.name === tierDetails.currentTier.name}
                    isUnlocked={tierDetails.lifetimeIncome >= tier.threshold}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierBenefitsModal;