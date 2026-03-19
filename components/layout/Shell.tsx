import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from './Header';
import Sidebar from './Sidebar';
import QuickActionBar from './QuickActionBar';
import type { Notification } from '../../types';



interface ShellProps {
  children: React.ReactNode;
  title: string;
  notifications: Notification[];
  onMarkOneRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const Shell: React.FC<ShellProps> = ({ children, title, notifications, onMarkOneRead, onMarkAllRead }) => {
  const location = useLocation();

  return (
    <div className="h-screen w-screen flex bg-black text-zinc-400 overflow-hidden font-inter selection:bg-primary/30 selection:text-white">
        {/* Global Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-emerald-500/5 blur-[150px] rounded-full" />
        </div>

        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
            <Header 
              title={title} 
              notifications={notifications} 
              onMarkOneRead={onMarkOneRead}
              onMarkAllRead={onMarkAllRead}
            />
            <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="p-6 md:p-10"
                    >
                        <div className="max-w-7xl mx-auto w-full pb-24 md:pb-8">
                             {children}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
            <QuickActionBar />
        </div>
    </div>
  );
};

export default Shell;
