import React from 'react';
import { Link } from 'react-router-dom';
import type { Notification } from '../../types';
import { NotificationType } from '../../types';
import ReleaseIcon from '../icons/ReleaseIcon';
import PaymentsIcon from '../icons/PaymentsIcon';
import SupportIcon from '../icons/SupportIcon';
import BellIcon from './BellIcon';

const typeInfo = {
    [NotificationType.Release]: { icon: ReleaseIcon, color: 'text-secondary' },
    [NotificationType.Revenue]: { icon: PaymentsIcon, color: 'text-green-400' },
    [NotificationType.Support]: { icon: SupportIcon, color: 'text-quantum-flux' },
    [NotificationType.SystemUpdate]: { icon: BellIcon, color: 'text-quantum-flux' },
    [NotificationType.Alert]: { icon: BellIcon, color: 'text-red-500' },
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

interface NotificationsDropdownProps {
  notifications: Notification[];
  onMarkOneRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ notifications, onMarkOneRead, onMarkAllRead, onClose }) => {
  const recentNotifications = notifications.slice(0, 7);

  return (
    <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-[#101223] border border-ui-border rounded-2xl shadow-2xl animate-page-fade-in-up z-50 overflow-hidden ring-1 ring-black/50">
      <header className="flex justify-between items-center p-4 border-b border-ui-border bg-[#0A0A1A]">
        <h3 className="font-bold text-lg text-white">Notifications</h3>
        <button onClick={onMarkAllRead} className="text-xs font-semibold text-quantum-flux hover:underline transition-colors">
          Mark all as read
        </button>
      </header>

      <div className="max-h-96 overflow-y-auto bg-ui-surface">
        {recentNotifications.length > 0 ? (
            recentNotifications.map(notification => {
                const { icon: Icon, color } = typeInfo[notification.type];
                return (
                    <Link
                        key={notification.id}
                        to={notification.link}
                        onClick={() => { onMarkOneRead(notification.id); onClose(); }}
                        className="relative flex items-start gap-4 p-4 hover:bg-white/5 transition-colors border-b border-ui-border/30 last:border-0"
                    >
                        {!notification.isRead && (
                             <div className="absolute left-1 top-4 bottom-4 w-0.5 bg-gradient-to-b from-secondary to-primary rounded-r-full"></div>
                        )}
                        <div className="relative flex-shrink-0 ml-2">
                             <Icon className={`w-6 h-6 mt-1 ${color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{notification.title}</p>
                            <p className="text-sm text-ui-text-body line-clamp-2 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-ui-text-subtle mt-1 font-mono"><TimeAgo timestamp={notification.timestamp} /></p>
                        </div>
                    </Link>
                );
            })
        ) : (
            <div className="p-8 text-center text-sm text-ui-text-subtle">
                <p>You have no new notifications.</p>
            </div>
        )}
      </div>

      <footer className="p-2 border-t border-ui-border bg-[#0A0A1A]">
        <Link 
            to="/notifications" 
            onClick={onClose}
            className="block w-full text-center font-bold text-sm py-2 rounded-lg text-quantum-flux hover:bg-white/5 transition-colors"
        >
          View All Notifications
        </Link>
      </footer>
    </div>
  );
};

export default NotificationsDropdown;