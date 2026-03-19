import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Notification } from '../types';
import { NotificationType } from '../types';
import ReleaseIcon from '../components/icons/ReleaseIcon';
import PaymentsIcon from '../components/icons/PaymentsIcon';
import SupportIcon from '../components/icons/SupportIcon';
import BellIcon from '../components/notifications/BellIcon';

const typeInfo = {
    [NotificationType.Release]: { icon: ReleaseIcon, color: 'text-secondary', label: 'Releases' },
    [NotificationType.Revenue]: { icon: PaymentsIcon, color: 'text-green-400', label: 'Revenue' },
    [NotificationType.Support]: { icon: SupportIcon, color: 'text-quantum-flux', label: 'Support' },
    [NotificationType.SystemUpdate]: { icon: BellIcon, color: 'text-quantum-flux', label: 'System' },
    [NotificationType.Alert]: { icon: BellIcon, color: 'text-red-500', label: 'Alerts' },
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

interface NotificationsCenterViewProps {
  notifications: Notification[];
  onMarkOneRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const NotificationsCenterView: React.FC<NotificationsCenterViewProps> = ({ notifications, onMarkOneRead, onMarkAllRead }) => {
    const [filter, setFilter] = useState<NotificationType | 'All'>('All');

    const filteredNotifications = useMemo(() => {
        if (filter === 'All') {
            return notifications;
        }
        return notifications.filter(n => n.type === filter);
    }, [notifications, filter]);
    
    const sortedNotifications = useMemo(() => {
        return [...filteredNotifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [filteredNotifications]);
    
    const filters = ['All', ...Object.values(NotificationType)];

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-ui-text-heading">Notifications</h1>
                    <p className="text-lg text-ui-text-body mt-1">Stay updated with all activities on your account.</p>
                </div>
                <button onClick={onMarkAllRead} className="text-sm font-semibold text-quantum-flux hover:underline">
                    Mark all as read
                </button>
            </header>

            <div className="flex items-center gap-2 border-b border-ui-border pb-2 overflow-x-auto">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as NotificationType | 'All')}
                        className={`filter-pill px-3 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${filter === f ? 'active bg-primary text-white' : 'text-ui-text-body hover:bg-ui-surface'}`}
                    >
                        {f === 'All' ? 'All' : typeInfo[f as NotificationType].label}
                    </button>
                ))}
            </div>

            <main className="space-y-3">
                {sortedNotifications.length > 0 ? (
                    sortedNotifications.map(notification => {
                        const { icon: Icon, color } = typeInfo[notification.type];
                        return (
                            <Link
                                key={notification.id}
                                to={notification.link}
                                onClick={() => onMarkOneRead(notification.id)}
                                className={`relative flex items-start gap-4 p-4 rounded-xl transition-colors ${notification.isRead ? 'bg-ui-surface/50' : 'bg-ui-surface ring-2 ring-primary/50'}`}
                            >
                                {!notification.isRead && (
                                    <div className="absolute top-4 left-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                )}
                                <div className="relative flex-shrink-0 ml-4">
                                    <Icon className={`w-8 h-8 mt-1 ${color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-ui-text-heading">{notification.title}</p>
                                    <p className="text-sm text-ui-text-body">{notification.message}</p>
                                    <p className="text-xs text-ui-text-subtle mt-1"><TimeAgo timestamp={notification.timestamp} /></p>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-16 bg-ui-surface/50 rounded-xl border-2 border-dashed border-ui-border">
                        <h3 className="text-xl font-semibold text-ui-text-heading">All caught up!</h3>
                        <p className="text-ui-text-body mt-2">You have no notifications for this filter.</p>
                    </div>
                )}
            </main>
        </div>
    );
};
export default NotificationsCenterView;