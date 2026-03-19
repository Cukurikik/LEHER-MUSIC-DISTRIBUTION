
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Contract, Song, Release, Ebook, RecentActivity } from '../types';
import { DistributionStatus } from '../types';
import type { PlatformStats, PendingRelease, SupportTicket, ServiceStatus, CopyrightConflict } from '../services/adminService';
import { fetchPlatformStats, fetchSupportTickets, fetchServiceStatus, fetchCopyrightConflicts, fetchPendingReleases } from '../services/adminService';
import { useTranslation } from '../hooks/useTranslation';
import InteractiveAdminToolkit from '../components/admin/InteractiveAdminToolkit';


import StatCard from '../components/admin/StatCard';
import RecentActivityFeed from '../components/admin/RecentActivityFeed';
import ReleaseApprovalQueue from '../components/admin/ReleaseApprovalQueue';
import SupportTicketOverview from '../components/admin/SupportTicketOverview';
import ServiceStatusWidget from '../components/admin/ServiceStatusWidget';
import CopyrightConflictManager from '../components/admin/CopyrightConflictManager';
import AdminTerminal from '../components/admin/AdminTerminal';
import ApprovedPaymentsWidget from '../components/admin/ApprovedPaymentsWidget';


// Icons
import CashIcon from '../components/icons/CashIcon';
import UsersIcon from '../components/icons/ArtistIcon';
import ReleaseIcon from '../components/icons/ReleaseIcon';
import UploadIcon from '../components/icons/UploadIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import SparklesIcon from '../components/layout/SparklesIcon';


const StartDistributionQueue: React.FC<{ releases: Release[], onStart: (id: string) => void }> = ({ releases, onStart }) => (
    <div className="bg-singularity-black/50 border border-singularity-purple/30 p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-ui-text-heading mb-4">Sistem Start Distribusi</h3>
        {releases.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {releases.map(release => {
                    const creatorName = release.assetType === 'Audio' ? (release as Song).artistName : (release as Ebook).authorName;
                    return (
                        <div key={release.id} className="bg-singularity-black/70 rounded-lg p-3 flex items-center gap-4">
                            <img src={release.coverArtUrl} alt={release.title} className="w-12 h-12 rounded-md object-cover"/>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-ui-text-heading truncate">{release.title}</p>
                                <p className="text-sm text-ui-text-body truncate">{creatorName}</p>
                            </div>
                            <button onClick={() => onStart(release.id)} className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors whitespace-nowrap">
                                Mulai Distribusi
                            </button>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="text-center py-10 text-ui-text-subtle">
                <p>Tidak ada rilis yang disetujui dan menunggu untuk didistribusikan.</p>
            </div>
        )}
    </div>
);

const DatabaseStatusWidget: React.FC<{ storage: { totalTB: number, usedTB: number }, onExpand: () => void }> = ({ storage, onExpand }) => {
    const usagePercentage = (storage.usedTB / storage.totalTB) * 100;
    const uptime = "99.999%";
    const avgQueryTime = "8ms";

    return (
        <div className="admin-hud-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-ui-text-heading mb-4">Real-time Database Status</h3>
            
            <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-ui-text-body">Storage Utilization</span>
                    <span className="text-sm font-mono text-ui-text-subtle">{storage.usedTB.toFixed(1)} TB / {storage.totalTB.toFixed(1)} TB</span>
                </div>
                <div className="w-full bg-singularity-black h-6 rounded-md overflow-hidden border border-singularity-purple-transparent p-1">
                    <div 
                        className="h-full rounded bg-gradient-to-r from-singularity-teal to-singularity-pink relative shimmer"
                        style={{ width: `${usagePercentage}%` }}
                    >
                         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-black mix-blend-screen">{usagePercentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <p className="text-xs text-ui-text-subtle uppercase tracking-wider">Uptime</p>
                    <p className="text-xl font-bold text-green-400">{uptime}</p>
                </div>
                <div>
                    <p className="text-xs text-ui-text-subtle uppercase tracking-wider">Avg. Query</p>
                    <p className="text-xl font-bold text-ui-text-heading">{avgQueryTime}</p>
                </div>
            </div>
            
             <div className="mt-4 pt-4 border-t border-singularity-purple-transparent flex items-center justify-between">
                <Link to="/admin/real-time-database" className="text-xs font-semibold text-primary hover:underline">
                    View Details
                </Link>
                <button onClick={onExpand} className="px-3 py-1 text-xs font-semibold rounded-full bg-singularity-teal/20 text-singularity-teal hover:bg-singularity-teal/30 transition-colors">
                    Expand Storage
                </button>
            </div>
        </div>
    );
};

interface AdminDashboardViewProps {
    activities: RecentActivity[];
    dbStorage: { totalTB: number, usedTB: number };
    onExpandStorage: () => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ activities, dbStorage, onExpandStorage }) => {
    const { t } = useTranslation();
    const [stats, setStats] = useState<PlatformStats | null>(null);
    const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus[]>([]);
    const [copyrightConflicts, setCopyrightConflicts] = useState<CopyrightConflict[]>([]);
    const [pendingReleases, setPendingReleases] = useState<PendingRelease[]>([]);
    const [approvedReleases, setApprovedReleases] = useState<Release[]>([]); // This would come from a real data source
    const [isLoading, setIsLoading] = useState(true);

    const loadInitialData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [statsData, ticketsData, statusData, conflictsData, pendingData] = await Promise.all([
                fetchPlatformStats(),
                fetchSupportTickets(),
                fetchServiceStatus(),
                fetchCopyrightConflicts(),
                fetchPendingReleases(),
            ]);
            setStats(statsData);
            setSupportTickets(ticketsData);
            setServiceStatus(statusData);
            setCopyrightConflicts(conflictsData);
            setPendingReleases(pendingData);
        } catch (error) {
            console.error("Failed to load admin dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    const handleReleaseAction = (releaseId: string, action: 'approve' | 'reject') => {
        if (action === 'approve') {
            const approved = pendingReleases.find(r => r.id === releaseId);
            if (approved) {
                // In a real app, this would be a proper Release object
                setApprovedReleases(prev => [...prev, approved as any]); 
            }
            setPendingReleases(prev => prev.filter(r => r.id !== releaseId));
        } else {
             setPendingReleases(prev => prev.filter(r => r.id !== releaseId));
        }
    };
    
    const handleConflictAction = (songId: string, action: 'dismiss' | 'notify' | 'takedown') => {
        console.log(`Conflict on song ${songId} action: ${action}`);
        setCopyrightConflicts(prev => prev.filter(c => c.songId !== songId));
    };

    const handleStartDistribution = (releaseId: string) => {
        console.log(`Starting distribution for ${releaseId}`);
        setApprovedReleases(prev => prev.filter(r => r.id !== releaseId));
    };
    
    const handleApproveAll = () => {
        console.log('Approving all releases with AI...');
        setApprovedReleases(prev => [...prev, ...pendingReleases as any[]]);
        setPendingReleases([]);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            </div>
        );
    }

    if (!stats) {
        return <div className="text-center text-ui-text-body">Failed to load platform statistics.</div>;
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gradient-singularity">Admin Command Center</h1>
                <p className="text-lg text-ui-text-body mt-1">Platform overview and management hub.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                 <StatCard 
                    title="Total Revenue" 
                    value={`$${(stats.totalRevenue / 1_000_000).toFixed(2)}M`} 
                    change={`+${stats.revenueChangePercent.toFixed(1)}%`}
                    icon={CashIcon}
                    changeType={stats.revenueChangePercent > 0 ? 'increase' : 'decrease'}
                />
                <StatCard 
                    title="Active Users" 
                    value={stats.activeUsers.toLocaleString()} 
                    change={`+${stats.newUsers.toLocaleString()}`}
                    icon={UsersIcon}
                    changeType='increase'
                />
                <StatCard 
                    title="Total Releases" 
                    value={stats.totalReleases.toLocaleString()}
                     change={`+${stats.releasesToday.toLocaleString()} today`}
                    icon={ReleaseIcon}
                    changeType='increase'
                />
                <StatCard 
                    title="Pending Approval" 
                    value={pendingReleases.length.toString()} 
                    change={`${supportTickets.length} open tickets`}
                    icon={UploadIcon}
                    changeType='neutral'
                />
                 <Link to="/admin/contracts">
                    <StatCard 
                        title="Contracts Pending" 
                        value={"142"} 
                        change={"Action Required"}
                        icon={DocumentTextIcon}
                        changeType='neutral'
                    />
                 </Link>
            </div>
            
            <div className="pt-8 border-t border-singularity-purple/30">
                <InteractiveAdminToolkit />
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-singularity-purple/30">
                <div className="lg:col-span-2 h-[400px] overflow-hidden rounded-2xl">
                    <AdminTerminal />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-singularity-purple/30">
                <div className="lg:col-span-2 space-y-8">
                    <ReleaseApprovalQueue 
                        releases={pendingReleases}
                        onAction={handleReleaseAction}
                        onApproveAll={handleApproveAll}
                        isLoading={false}
                    />
                    <StartDistributionQueue 
                        releases={approvedReleases} 
                        onStart={handleStartDistribution} 
                    />
                    <CopyrightConflictManager 
                        conflicts={copyrightConflicts}
                        onAction={handleConflictAction}
                        isLoading={false}
                    />
                </div>
                <div className="space-y-8">
                    <DatabaseStatusWidget storage={dbStorage} onExpand={onExpandStorage} />
                    <ApprovedPaymentsWidget />
                    <ServiceStatusWidget services={serviceStatus} />
                    <RecentActivityFeed activities={activities} />
                    <SupportTicketOverview tickets={supportTickets} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardView;
