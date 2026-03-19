
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import DashboardIcon from '../icons/DashboardIcon';
import AnalyticsIcon from '../icons/AnalyticsIcon';
import UploadIcon from '../icons/UploadIcon';
import ReleaseIcon from '../icons/ReleaseIcon';
import AdminIcon from '../icons/AdminIcon';



const ActionItem: React.FC<{ to: string; name: string; icon: React.FC<{ className?: string }>; isCentral?: boolean }> = ({ to, name, icon: Icon, isCentral }) => (
    <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }: { isActive: boolean }) => `
            flex flex-col items-center justify-center gap-1 w-full h-full
            transition-all duration-300 transform group relative
            ${isCentral ? 'text-white' : isActive ? 'text-primary' : 'text-ui-text-subtle hover:text-white'}
            ${isActive && !isCentral ? 'scale-110' : ''}
        `}
    >
        {({ isActive }: { isActive: boolean }) => (
            <>
                <div className={`
                    w-16 h-16 flex items-center justify-center rounded-full
                    transition-all duration-300
                    ${isCentral ? 'bg-gradient-singularity shadow-lg group-hover:scale-110' : ''}
                    ${isActive && !isCentral ? 'bg-primary/10' : ''}
                `}>
                    <Icon className={isCentral ? 'w-8 h-8' : 'w-6 h-6'} />
                </div>
                {!isCentral && <span className="text-[10px] font-medium mt-1">{name}</span>}
                {isActive && !isCentral && <div className="absolute bottom-0 h-1 w-8 bg-gradient-to-r from-secondary to-primary rounded-full" />}
            </>
        )}
    </NavLink>
);

const QuickActionBar: React.FC = () => {
    const { t } = useTranslation();
    
    const actions = [
        { to: '/', name: t('nav_dashboard'), icon: DashboardIcon },
        { to: '/releases', name: t('nav_releases'), icon: ReleaseIcon },
        { to: '/create-release', name: 'Upload Rilis', icon: UploadIcon, isCentral: true },
        { to: '/analytics', name: 'Stats', icon: AnalyticsIcon },
        { to: '/admin', name: 'Admin', icon: AdminIcon },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 h-24 z-40 md:hidden">
            <div className="absolute inset-0 bg-ui-surface/95 backdrop-blur-xl border-t border-white/5"></div>
            <div className="relative h-full flex justify-around items-center px-2">
                {actions.map(action => (
                    <div key={action.to} className={`flex justify-center ${action.isCentral ? 'w-20 -mt-12 flex-shrink-0' : 'flex-1'}`}>
                        <ActionItem {...action} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickActionBar;
