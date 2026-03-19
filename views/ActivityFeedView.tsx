import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Activity } from '../types';
import { ActivityType } from '../types';
import { fetchActivities } from '../services/activityService';
import ArtistIcon from '../components/icons/ArtistIcon';
import CashIcon from '../components/icons/CashIcon';
import ReleaseIcon from '../components/icons/ReleaseIcon';
import CopyrightIcon from '../components/icons/CopyrightIcon';
import AnalyticsIcon from '../components/icons/AnalyticsIcon';
import CodeIcon from '../components/icons/CodeIcon';
import SupportIcon from '../components/icons/SupportIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';

const typeStyles: Record<ActivityType, { icon: React.FC<{ className?: string }>, color: string, glowVar: string }> = {
    [ActivityType.User]: { icon: ArtistIcon, color: 'var(--quantum-blue)', glowVar: 'var(--quantum-glow-primary)' },
    [ActivityType.Revenue]: { icon: CashIcon, color: 'var(--quantum-green)', glowVar: 'var(--quantum-glow-accent)' },
    [ActivityType.Release]: { icon: ReleaseIcon, color: 'var(--quantum-magenta)', glowVar: 'var(--quantum-glow-secondary)' },
    [ActivityType.Copyright]: { icon: CopyrightIcon, color: 'var(--quantum-yellow)', glowVar: 'var(--quantum-glow-yellow)' },
    [ActivityType.Analytics]: { icon: AnalyticsIcon, color: 'var(--quantum-cyan)', glowVar: 'var(--quantum-glow-primary)' },
    [ActivityType.System]: { icon: CodeIcon, color: 'var(--singularity-purple)', glowVar: 'var(--singularity-glow-purple)' },
    [ActivityType.Communication]: { icon: SupportIcon, color: 'var(--singularity-teal)', glowVar: 'var(--singularity-glow-teal)' },
    [ActivityType.Security]: { icon: ShieldCheckIcon, color: 'var(--color-danger)', glowVar: 'var(--color-danger-glow)' },
    [ActivityType.NewUser]: { icon: ArtistIcon, color: 'var(--quantum-blue)', glowVar: 'var(--quantum-glow-primary)' },
    [ActivityType.NewRelease]: { icon: ReleaseIcon, color: 'var(--quantum-magenta)', glowVar: 'var(--quantum-glow-secondary)' },
    [ActivityType.Withdrawal]: { icon: CashIcon, color: 'var(--quantum-green)', glowVar: 'var(--quantum-glow-accent)' },
};
const CATEGORIES = ['All', ...Object.values(ActivityType)];

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const TimeAgo: React.FC<{ timestamp: string }> = ({ timestamp }) => {
    const time = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return <span>{Math.floor(interval)}y ago</span>;
    interval = seconds / 2592000;
    if (interval > 1) return <span>{Math.floor(interval)}mo ago</span>;
    interval = seconds / 86400;
    if (interval > 1) return <span>{Math.floor(interval)}d ago</span>;
    interval = seconds / 3600;
    if (interval > 1) return <span>{Math.floor(interval)}h ago</span>;
    interval = seconds / 60;
    if (interval > 1) return <span>{Math.floor(interval)}m ago</span>;
    return <span>{Math.floor(seconds)}s ago</span>;
};

const ActivityDetailModal: React.FC<{ activity: Activity | null; onClose: () => void }> = ({ activity, onClose }) => {
    if (!activity) return null;

    const { icon: Icon, color } = typeStyles[activity.type];

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
            <div className="glass-surface-quantum modal-glow-border rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-ui-border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}>
                        <Icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ui-text-heading">{activity.title}</h3>
                        <p className="text-sm text-ui-text-subtle">{activity.type} Event</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-ui-text-body" dangerouslySetInnerHTML={{ __html: activity.description }} />
                    {activity.details && (
                        <div>
                            <h4 className="font-semibold text-ui-text-heading mb-2">Technical Details</h4>
                            <div className="bg-ui-surface p-3 rounded-lg border border-ui-border text-sm font-mono space-y-1">
                                {Object.entries(activity.details).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                        <span className="text-ui-text-subtle">{key}:</span>
                                        <span className="text-ui-text-body">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                 <div className="p-4 bg-ui-surface/50 rounded-b-2xl flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold bg-ui-border rounded-full hover:bg-opacity-70">Close</button>
                </div>
            </div>
        </div>
    );
};


const ActivityFeedView: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [totalActivities, setTotalActivities] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<ActivityType | 'All'>('All');
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const itemsPerPage = 15;

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const filters = {
            category: activeCategory,
            searchTerm: debouncedSearchTerm
        };
        const { activities: fetchedActivities, total } = await fetchActivities(filters, currentPage, itemsPerPage);
        setActivities(fetchedActivities);
        setTotalActivities(total);
        setIsLoading(false);
    }, [currentPage, debouncedSearchTerm, activeCategory]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalPages = Math.ceil(totalActivities / itemsPerPage);

    return (
        <div className="space-y-6">
            <header className="admin-header">
                <h1 className="text-gradient-singularity">Recent Activity Feed</h1>
                <p>A real-time log of all significant user and system events.</p>
            </header>

            <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-4 space-y-4 sticky top-[80px] z-20">
                <div className="flex flex-col md:flex-row gap-4">
                     <input type="text" placeholder="Search by user, release, ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full form-input-glow p-2 pl-4 rounded-full"/>
                </div>
                <div className="flex items-center gap-1 border border-ui-border rounded-full p-1 bg-ui-bg overflow-x-auto">
                    {CATEGORIES.map(cat => (
                         <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat as ActivityType | 'All'); setCurrentPage(1); }}
                            className={`filter-pill px-3 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${activeCategory === cat ? 'active' : 'text-ui-text-body hover:bg-ui-border/50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="activity-timeline">
                {isLoading ? (
                     <div className="text-center p-16 text-ui-text-subtle">Loading activity...</div>
                ) : activities.length > 0 ? (
                    activities.map(activity => {
                        const style = typeStyles[activity.type];
                        const Icon = style.icon;
                        return (
                            <div key={activity.id} className="timeline-item" style={{ '--glow-color': style.color } as React.CSSProperties}>
                                <div className="timeline-node" style={{ backgroundColor: style.color, boxShadow: `0 0 15px ${style.color}` }}>
                                    <Icon className="w-6 h-6 text-black" />
                                </div>
                                <div className="timeline-content" onClick={() => setSelectedActivity(activity)}>
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <p className="text-ui-text-body" dangerouslySetInnerHTML={{ __html: activity.description }}/>
                                        </div>
                                        <div className="flex-shrink-0 flex items-center gap-2">
                                            {activity.user && <img src={activity.user.avatarUrl} alt={activity.user.name} className="timeline-user-avatar" />}
                                            <span className="text-xs text-ui-text-subtle whitespace-nowrap"><TimeAgo timestamp={activity.timestamp} /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center p-16 text-ui-text-subtle">No activities found for the current filters.</div>
                )}
            </div>

            {totalPages > 1 && (
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-ui-text-subtle">Showing {activities.length} of {totalActivities} activities</span>
                     <div className="flex gap-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-ui-border disabled:opacity-50">&lt;</button>
                         {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-primary text-black font-bold' : 'hover:bg-ui-border'}`}>{page}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-ui-border disabled:opacity-50">&gt;</button>
                    </div>
                </div>
            )}
            
            <ActivityDetailModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
        </div>
    );
};

export default ActivityFeedView;