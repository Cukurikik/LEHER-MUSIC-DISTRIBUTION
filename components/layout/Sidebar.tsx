
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LeherIcon from './LeherIcon';
import DashboardIcon from '../icons/DashboardIcon';
import ReleaseIcon from '../icons/ReleaseIcon';
import SupportIcon from '../icons/SupportIcon';
import BellIcon from '../notifications/BellIcon';
import AdminIcon from '../icons/AdminIcon';
import AnalyticsIcon from '../icons/AnalyticsIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import BuildingIcon from '../icons/BuildingIcon';
import { useTranslation } from '../../hooks/useTranslation';
import BriefcaseIcon from '../icons/BriefcaseIcon';
import ActivityIcon from '../icons/ActivityIcon';
import SettingsIcon from '../icons/SettingsIcon';
import TrendingUpIcon from '../icons/TrendingUpIcon';
import FilmIcon from '../icons/FilmIcon';
import CashIcon from '../icons/CashIcon';
import MegaphoneIcon from '../icons/MegaphoneIcon';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



const NavItem: React.FC<{ to: string, name: string, icon: React.FC<{className?: string}> }> = ({ to, name, icon: Icon }) => (
    <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }: { isActive: boolean }) => 
            cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                isActive 
                ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
            )
        }
    >
        {({ isActive }: { isActive: boolean }) => (
            <>
                {isActive && (
                    <motion.div 
                        layoutId="nav-active"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
                <Icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                    isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                )} />
                <span className="text-sm font-medium tracking-tight">{name}</span>
            </>
        )}
    </NavLink>
);


const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const mainNavLinks = [
    { to: '/', name: t('nav_dashboard'), icon: DashboardIcon },
    { to: '/releases', name: t('nav_releases'), icon: ReleaseIcon },
    { to: '/videos', name: 'Music Videos', icon: FilmIcon },
    { to: '/analytics', name: t('title_analytics'), icon: AnalyticsIcon },
    { to: '/promotions', name: 'Growth & Promo', icon: MegaphoneIcon }, // New
    { to: '/monetization', name: 'Monetization', icon: CashIcon }, // New
    { to: '/distribution-tools', name: t('nav_toolkit'), icon: BriefcaseIcon },
    { to: '/payments', name: t('title_payments'), icon: CashIcon },
  ];

  const adminNavLinks = [
    { to: '/admin', name: t('nav_admin_dashboard'), icon: AdminIcon },
    { to: '/admin/activity', name: 'Activity Feed', icon: ActivityIcon },
    { to: '/admin/contracts', name: t('nav_contracts'), icon: DocumentTextIcon },
    { to: '/admin/sub-distributors', name: t('nav_sub_distributors'), icon: BuildingIcon },
  ];

  const secondaryNavLinks = [
    { to: '/notifications', name: t('nav_notifications'), icon: BellIcon },
    { to: '/support', name: t('nav_support'), icon: SupportIcon },
    { to: '/settings', name: t('nav_settings'), icon: SettingsIcon },
  ];

  return (
    <aside className="bg-zinc-950 w-64 p-4 flex flex-col justify-between hidden md:flex border-r border-white/5 overflow-y-auto custom-scrollbar">
        <div className="flex-grow">
            <div className="flex items-center gap-3 group px-2 py-6 mb-2">
                <div className="relative">
                    <LeherIcon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-white tracking-tighter leading-none">LEHER</h1>
                    <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mt-1">Quantum</span>
                </div>
            </div>

            <div className="px-2 mb-6">
                <NavLink 
                    to="/create-release"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-singularity text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 group"
                >
                    <div className="p-1 bg-white/20 rounded-full text-white group-hover:scale-110 transition-transform">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </div>
                    <span className="uppercase tracking-wider text-xs">Upload Rilis</span>
                </NavLink>
            </div>

            <nav className="flex flex-col gap-1">
                {mainNavLinks.map(link => (
                    <NavItem key={link.to} to={link.to} name={link.name} icon={link.icon} />
                ))}
            </nav>
            
            <div className="my-6 mx-2 h-px bg-white/5"></div>

             <nav className="flex flex-col gap-1">
                <p className="px-3 pb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.15em]">Admin Control</p>
                {adminNavLinks.map(link => (
                    <NavItem key={link.to} to={link.to} name={link.name} icon={link.icon} />
                ))}
            </nav>
        </div>
        <div className="flex-shrink-0 pt-6">
             <nav className="flex flex-col gap-1">
                {secondaryNavLinks.map(link => (
                    <NavItem key={link.to} to={link.to} name={link.name} icon={link.icon} />
                ))}
            </nav>
            <div className="p-4 mt-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] text-zinc-500 font-medium">&copy; 2025 Leher Music</p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="font-mono text-[9px] text-emerald-500/80 uppercase tracking-wider">Quantum Core v5.8.0</p>
                </div>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
