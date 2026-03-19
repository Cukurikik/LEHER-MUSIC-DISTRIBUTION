import React from 'react';
import BellIcon from './BellIcon';

interface NotificationsIndicatorProps {
  unreadCount: number;
  onClick: () => void;
}

const NotificationsIndicator: React.FC<NotificationsIndicatorProps> = ({ unreadCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-ui-text-body hover:text-white transition-colors rounded-full hover:bg-white/10"
      aria-label={`View notifications (${unreadCount} unread)`}
    >
      <BellIcon className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--quantum-magenta)] opacity-75"></span>
           <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--quantum-magenta)] items-center justify-center text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
           </span>
        </span>
      )}
    </button>
  );
};

export default NotificationsIndicator;