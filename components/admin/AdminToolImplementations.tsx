
import React, { useState, useMemo, useEffect, useRef } from 'react';
import AreaChart from '../../components/charts/AreaChart';
import { initialSongs } from '../../data/releases';
import { initialArtists } from '../../data/releases';
import WhiteLabelSettings from '../../components/admin/WhiteLabelSettings';
import WorldMapChart from '../../components/charts/WorldMapChart';
import { ALL_PLATFORMS } from '../../data/platforms';
import { getPlatformIcon } from '../../components/icons/PlatformIcons';
import { initialContracts } from '../../data/contracts';
import LeherIcon from '../../components/layout/LeherIcon';
import type { TranslationKeys } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';

// --- ICONS ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

// Exported Icons for data/tools.ts compatibility
export const GavelIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20H4a1 1 0 01-1-1V5a1 1 0 011-1h6M10 20v-6m0 6h4m-4-6h4m0 6v-6m0 0l6-6m-6 6l6 6" /></svg>);
export const ShieldVortexIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-14.964z" /><path d="M12 12a3 3 0 100-6 3 3 0 000 6z M12 12a6 6 0 100-12 6 6 0 000 12z" /></svg>);
export const GlobePulseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 9.91l4.243 4.243a2 2 0 012.828 0l4.243-4.243M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
export const ShieldExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
export const SonicDnaIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 4.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM16 14.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM8 7.25c0 .34.03.67.08.99a5.25 5.25 0 004.84 4.84c.32.05.65.08.99.08s.67-.03.99-.08a5.25 5.25 0 004.84-4.84c.05-.32.08-.65.08-.99s-.03-.67-.08-.99a5.25 5.25 0 00-4.84-4.84c-.32-.05-.65-.08-.99-.08s-.67.03-.99.08a5.25 5.25 0 00-4.84 4.84c-.05.32-.08-.65-.08-.99z" /></svg>);
export const VectorIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l7-7-7-7" /></svg>);
export const TagIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" /></svg>);
export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const AdminToolWrapper: React.FC<{ children: React.ReactNode, title?: string, headerAction?: React.ReactNode }> = ({ children, title, headerAction }) => (
    <div className="admin-hud-card p-4 md:p-6 rounded-2xl animate-fade-in h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-4 shrink-0">
            {title && <h3 className="text-base md:text-lg font-bold text-ui-text-heading truncate">{title}</h3>}
            {headerAction}
        </div>
        <div className="flex-1 min-h-0 flex flex-col text-sm">
            {children}
        </div>
    </div>
);

export const ComingSoonTool: React.FC = () => {
    const { t } = useTranslation();
    return (
     <div className="glass-surface-quantum p-8 md:p-12 text-center rounded-2xl">
        <h3 className="text-2xl font-bold text-ui-text-heading">{t('coming_soon_title')}</h3>
        <p className="text-ui-text-body mt-2">{t('coming_soon_desc')}</p>
    </div>
)};

// --- MOCK DATA GENERATORS ---
const generateLabels = (count: number) => {
    const labels = [];
    const names = ["Neon Nights", "Deep Wave", "Retro Future", "Cosmic Sound", "Urban Beat", "Indie Soul", "Electric Dreams", "Solaris Records", "Lunar Tunes", "Vortex Music"];
    const statuses = ["Active", "Pending", "Suspended"];
    for (let i = 0; i < count; i++) {
        labels.push({
            id: `lbl-${i}`,
            name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
            artists: Math.floor(Math.random() * 50) + 1,
            revenue: Math.floor(Math.random() * 500000) + 1000,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            compliance: Math.floor(Math.random() * 20) + 80
        });
    }
    return labels;
};

const generateMetadataIssues = (count: number) => {
    const issues = [];
    const types = ["Capitalization", "Featuring Format", "Explicit Tag", "Duplicate Artist", "Invalid Char"];
    for (let i = 0; i < count; i++) {
        issues.push({
            id: `issue-${i}`,
            title: `Song Title ${i}`,
            artist: `Artist ${i}`,
            type: types[Math.floor(Math.random() * types.length)],
            suggestion: `Fixed Title ${i}`,
            confidence: Math.floor(Math.random() * 30) + 70
        });
    }
    return issues;
};

const generateAuditLogs = (count: number) => {
    const logs = [];
    const actions = ["Metadata Update", "Takedown Request", "Asset Replacement", "Rights Change", "ISRC Update"];
    const users = ["Admin User", "Label Manager", "System AI", "Artist Account"];
    for (let i = 0; i < count; i++) {
        logs.push({
            id: `log-${i}`,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleString(),
            action: actions[Math.floor(Math.random() * actions.length)],
            user: users[Math.floor(Math.random() * users.length)],
            target: `Release ${Math.floor(Math.random() * 1000)}`,
            details: "Changed genre from Pop to Electronic"
        });
    }
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};