import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { Notification } from '../../types';
import NotificationsIndicator from '../notifications/NotificationsIndicator';
import NotificationsDropdown from '../notifications/NotificationsDropdown';
import LeherIcon from './LeherIcon';
import LanguageSwitcher from '../LanguageSwitcher';



interface HeaderProps {
    title: string;
    notifications: Notification[];
    onMarkOneRead: (id: string) => void;
    onMarkAllRead: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, notifications, onMarkOneRead, onMarkAllRead }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = useMemo(() => {
        return notifications.filter(n => !n.isRead).length;
    }, [notifications]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <header className="flex-shrink-0 flex items-center justify-between h-20 px-6 md:px-10 sticky top-0 z-30 bg-black/40 backdrop-blur-xl border-b border-white/[0.05]">
            <div className="flex items-center gap-4">
                <LeherIcon className="w-8 h-8 text-primary transition-transform duration-300 hover:rotate-6 md:hidden"/>
                <h1 className="text-2xl font-bold text-white tracking-tight leading-none">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                 <LanguageSwitcher />
                 <div className="w-px h-4 bg-white/10"></div>
                 <div className="relative" ref={dropdownRef}>
                    <NotificationsIndicator 
                        unreadCount={unreadCount} 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    />
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 top-full mt-2"
                            >
                                <NotificationsDropdown
                                    notifications={notifications}
                                    onMarkOneRead={onMarkOneRead}
                                    onMarkAllRead={onMarkAllRead}
                                    onClose={() => setIsDropdownOpen(false)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;