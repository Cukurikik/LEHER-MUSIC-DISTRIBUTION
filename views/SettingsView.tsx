import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme, Theme, themes } from '../hooks/useTheme';
import ArtistIcon from '../components/icons/ArtistIcon';
import LockClosedIcon from '../components/icons/LockClosedIcon';
import UserGroupIcon from '../components/icons/UserGroupIcon';
import PaletteIcon from '../components/icons/PaletteIcon';
import BillingIcon from '../components/icons/BillingIcon';
import CodeIcon from '../components/icons/CodeIcon';
import { getTierDetails } from '../services/paymentsService';
import type { TierDetails, TranslationKeys } from '../types';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

// Mock data
const mockTeamMembers = [
    { id: 'user-1', name: 'Andikaa Saputraa (You)', email: 'andikaa.s@leher.com', role: 'Owner' },
    { id: 'user-2', name: 'Siti Lestari', email: 'siti.l@leher.com', role: 'Content Editor' },
    { id: 'user-3', name: 'Adi Wijaya', email: 'adi.w@leher.com', role: 'Financial Analyst' },
];

const inputStyles = "form-input-modern w-full";
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const Tab: React.FC<{ icon: React.FC<{className?:string}>, label: TranslationKeys; isActive: boolean; onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => {
    const { t } = useTranslation();
    return (
        <button onClick={onClick} className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-colors font-medium text-base ${isActive ? 'bg-primary/20 text-primary' : 'hover:bg-ui-surface'}`}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{t(label)}</span>
        </button>
    );
};


const ProfileTab: React.FC<{ showToast: (message: string, type?: 'success' | 'error' | 'warning') => void }> = ({ showToast }) => {
    const { t } = useTranslation();
    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        showToast(t('toast_profile_updated'), 'success');
    };
    return (
        <form onSubmit={handleProfileSave} className="space-y-6">
            <h2 className="text-2xl font-bold text-ui-text-heading">{t('settings_profile_title')}</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="text-sm font-medium text-ui-text-body block mb-1">{t('settings_profile_name_label')}</label>
                    <input type="text" id="fullName" defaultValue="Andikaa Saputraa" className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-ui-text-body block mb-1">{t('settings_profile_email_label')}</label>
                    <input type="email" id="email" defaultValue="andikaa.s@leher.com" className={inputStyles} />
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-ui-border">
                <button type="submit" className="px-6 py-2 rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 btn-glow-primary">{t('save')} Changes</button>
            </div>
        </form>
    );
};

const SecurityTab: React.FC<{ showToast: (message: string, type?: 'success' | 'error' | 'warning') => void }> = ({ showToast }) => {
    const { t } = useTranslation();
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        showToast(t('toast_password_changed'), 'success');
    };
    return (
         <form onSubmit={handlePasswordChange} className="space-y-6">
             <h2 className="text-2xl font-bold text-ui-text-heading">{t('settings_security_title')}</h2>
             <div className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="text-sm font-medium text-ui-text-body block mb-1">{t('settings_security_current_password')}</label>
                    <input type="password" id="currentPassword" className={inputStyles} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="newPassword" className="text-sm font-medium text-ui-text-body block mb-1">{t('settings_security_new_password')}</label>
                        <input type="password" id="newPassword" className={inputStyles} />
                    </div>
                     <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-ui-text-body block mb-1">{t('settings_security_confirm_password')}</label>
                        <input type="password" id="confirmPassword" className={inputStyles} />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-ui-border">
                <button type="submit" className="px-6 py-2 rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 btn-glow-primary">{t('settings_button_change_password')}</button>
            </div>
        </form>
    );
};

const TeamTab: React.FC<{ showToast: (message: string, type?: 'success' | 'error' | 'warning') => void }> = ({ showToast }) => {
    const { t } = useTranslation();
    const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
    const [inviteEmail, setInviteEmail] = useState('');
    const handleInviteSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!inviteEmail.trim()) { showToast(t('toast_enter_email'), 'warning'); return; } showToast(t('toast_invitation_sent', { email: inviteEmail }), 'success'); setInviteEmail(''); };
    const handleRemoveMember = (memberId: string) => { setTeamMembers(prev => prev.filter(m => m.id !== memberId)); showToast(t('toast_member_removed'), 'warning'); };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ui-text-heading">{t('settings_team_title')}</h2>
             <div className="overflow-x-auto bg-ui-surface p-4 rounded-xl border border-ui-border">
                 <table className="w-full text-left">
                    <thead><tr><th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">{t('settings_team_table_member')}</th><th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">{t('settings_team_table_role')}</th><th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">{t('settings_team_table_actions')}</th></tr></thead>
                    <tbody className="divide-y divide-ui-border">{teamMembers.map(member => (<tr key={member.id}><td className="p-3"><p className="font-semibold text-ui-text-heading">{member.name}</p><p className="text-xs text-ui-text-subtle">{member.email}</p></td><td className="p-3 text-sm text-ui-text-body">{member.role}</td><td className="p-3">{member.name.includes('(You)') ? null : (<button onClick={() => handleRemoveMember(member.id)} className="text-sm text-danger hover:underline">{t('settings_team_action_remove')}</button>)}</td></tr>))}</tbody>
                </table>
            </div>
             <form onSubmit={handleInviteSubmit} className="pt-6 border-t border-ui-border">
                <h3 className="text-md font-semibold text-ui-text-heading mb-2">{t('settings_team_invite_title')}</h3>
                <div className="flex flex-col md:flex-row gap-4 items-center"><input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="member@email.com" className={`${inputStyles} flex-grow`} required /><button type="submit" className="px-6 py-3 w-full md:w-auto rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 btn-glow-primary whitespace-nowrap">{t('settings_team_invite_button')}</button></div>
            </form>
        </div>
    );
};

const AppearanceTab: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
             <h2 className="text-2xl font-bold text-ui-text-heading">{t('settings_appearance_title')}</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {themes.map(t_item => {
                    const isApplied = theme === t_item.id;
                    return (
                        <div key={t_item.id} onClick={() => setTheme(t_item.id)} className="cursor-pointer group relative">
                            <div className={`w-full aspect-square rounded-lg border-2 flex items-end p-2 transition-all relative ${isApplied ? 'border-primary ring-2 ring-primary/50' : 'border-ui-border group-hover:border-primary/70'}`} style={{ background: t_item.preview.bg, color: t_item.preview.text }}>
                                 <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full" style={{ background: t_item.preview.primary }}></div><div className="w-4 h-4 rounded-full" style={{ background: t_item.preview.secondary }}></div></div>
                                 {isApplied && (<div className={`absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-black rounded-full bg-primary`}>{t('theme_applied')}</div>)}
                            </div>
                            <p className={`mt-2 text-sm font-semibold text-center transition-colors ${isApplied ? 'text-primary' : 'text-ui-text-body group-hover:text-primary'}`}>{t_item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const PlanTab: React.FC<{ showToast: (message: string, type?: 'success' | 'error' | 'warning') => void }> = ({ showToast }) => {
    const { t } = useTranslation();
    const [currentPlan, setCurrentPlan] = useState<'starter' | 'pro' | 'legend'>('pro');

    const handlePlanChange = (planId: 'starter' | 'pro' | 'legend') => {
        setCurrentPlan(planId);
        showToast(`Successfully upgraded to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan!`, 'success');
    };

    const plans = [
        {
            id: 'starter',
            name: 'plan_starter' as TranslationKeys,
            price: 'price_free',
            priceDetails: 'price_forever',
            isPopular: false,
            benefits: [
                'benefit_starter_1', 'benefit_starter_2', 'benefit_starter_3', 'benefit_starter_4', 'benefit_starter_5'
            ]
        },
        {
            id: 'pro',
            name: 'plan_pro' as TranslationKeys,
            price: '$19',
            priceDetails: 'price_per_month',
            isPopular: true,
            benefits: [
                'benefit_pro_1', 'benefit_pro_2', 'benefit_pro_3', 'benefit_pro_4', 'benefit_pro_5', 'benefit_pro_6'
            ]
        },
        {
            id: 'legend',
            name: 'plan_legend' as TranslationKeys,
            price: '$49',
            priceDetails: 'price_per_month',
            isPopular: false,
            benefits: [
                'benefit_legend_1', 'benefit_legend_2', 'benefit_legend_3', 'benefit_legend_4', 'benefit_legend_5', 'benefit_legend_6'
            ]
        }
    ];

    const getPlanIndex = (planId: 'starter' | 'pro' | 'legend') => plans.findIndex(p => p.id === planId);
    const currentIndex = getPlanIndex(currentPlan);

    const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-ui-text-heading">{t('settings_billing_title')}</h2>
            <p className="text-ui-text-body -mt-4">{t('settings_billing_desc')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan, index) => {
                    const isCurrent = currentPlan === plan.id;
                    const isUpgrade = index > currentIndex;

                    return (
                        <div key={plan.id} className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${plan.isPopular ? 'border-glow-singularity lg:-translate-y-4' : 'bg-singularity-black/50 border border-singularity-purple/30'} ${isCurrent ? 'ring-2 ring-inset ring-singularity-teal' : ''}`}>
                            {plan.isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-singularity text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('badge_most_popular')}</div>}
                            
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-ui-text-heading">{t(plan.name)}</h3>
                                <p className="text-4xl font-black my-4 text-gradient-singularity">{plan.price.startsWith('price_') ? t(plan.price as TranslationKeys) : plan.price}</p>
                                <p className="text-sm text-ui-text-subtle -mt-2">{t(plan.priceDetails as TranslationKeys, { price: plan.price })}</p>
                            </div>
                            
                            <div className="my-6 h-px bg-singularity-purple/30"></div>

                            <ul className="space-y-3 flex-grow">
                                {plan.benefits.map(benefit => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <CheckIcon className="w-4 h-4 mt-1 text-singularity-teal flex-shrink-0" />
                                        <span className="text-sm text-ui-text-body">{t(benefit as TranslationKeys)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                {isCurrent ? (
                                    <button disabled className="w-full py-3 rounded-full font-bold bg-singularity-teal/50 text-black cursor-not-allowed">{t('btn_current_plan')}</button>
                                ) : isUpgrade ? (
                                    <button onClick={() => handlePlanChange(plan.id as any)} className="w-full py-3 rounded-full font-bold text-black transition-transform hover:scale-105 bg-gradient-singularity">{t('btn_upgrade_plan')}</button>
                                ) : (
                                    <button disabled className="w-full py-3 rounded-full font-bold bg-ui-surface text-ui-text-subtle cursor-not-allowed">{t('btn_downgrade')}</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


interface SettingsViewProps {
    showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ showToast }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    
    const tabs: { id: string; label: TranslationKeys; icon: React.FC<{className?: string;}> }[] = [
        { id: 'profile', label: 'settings_profile_title', icon: ArtistIcon },
        { id: 'security', label: 'settings_security_title', icon: LockClosedIcon },
        { id: 'team', label: 'settings_team_title', icon: UserGroupIcon },
        { id: 'appearance', label: 'settings_appearance_title', icon: PaletteIcon },
        { id: 'billing', label: 'nav_billing_subscription', icon: BillingIcon },
        { id: 'api', label: 'settings_api_title', icon: CodeIcon },
    ];
    
    const renderContent = () => {
        switch(activeTab) {
            case 'profile': return <ProfileTab showToast={showToast} />;
            case 'security': return <SecurityTab showToast={showToast} />;
            case 'team': return <TeamTab showToast={showToast} />;
            case 'appearance': return <AppearanceTab />;
            case 'billing': return <PlanTab showToast={showToast} />;
            case 'api': return <p>{t('coming_soon_desc')}</p>;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <button onClick={() => navigate('/')} className="mb-4 inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('title_settings')}</h1>
                <p className="text-lg text-ui-text-body mt-1">Manage your profile, security, and team settings.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-56 flex-shrink-0">
                    <nav className="flex flex-col gap-2">
                        {tabs.map(tab => (
                            <Tab key={tab.id} icon={tab.icon} label={tab.label} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
                        ))}
                    </nav>
                </aside>
                <main className="flex-1 min-w-0 bg-ui-surface/50 p-6 rounded-2xl border border-ui-border">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default SettingsView;