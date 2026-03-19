import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Music, ArrowDownCircle, Clock, Activity } from 'lucide-react';
import type { RecentActivity } from '../../types';

const typeInfo: Record<string, { icon: any, color: string, bg: string }> = {
    'New User': { icon: UserPlus, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    'New Release': { icon: Music, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    'Withdrawal': { icon: ArrowDownCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

const TimeAgo: React.FC<{ timestamp: string }> = ({ timestamp }) => {
    const time = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (seconds < 60) return <span>Just now</span>;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return <span>{minutes}m ago</span>;
    const hours = Math.floor(minutes / 60);
    return <span>{hours}h ago</span>;
};


const RecentActivityFeed: React.FC<{ activities: RecentActivity[] }> = ({ activities }) => {
    return (
        <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
                </div>
                <div className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Live Feed
                </div>
            </div>
            
            <ul className="space-y-6">
                {activities.map((activity, index) => {
                    const info = typeInfo[activity.type] || { icon: Activity, color: 'text-zinc-400', bg: 'bg-zinc-500/10' };
                    const Icon = info.icon;
                    return (
                        <motion.li 
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-4 group"
                        >
                            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl ${info.bg} border border-white/5 transition-transform group-hover:scale-110`}>
                                <Icon className={`w-5 h-5 ${info.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-zinc-300 leading-relaxed group-hover:text-white transition-colors" dangerouslySetInnerHTML={{ __html: activity.description }} />
                                <div className="flex items-center gap-2 mt-1.5">
                                    <Clock className="w-3 h-3 text-zinc-600" />
                                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                                        <TimeAgo timestamp={activity.timestamp} />
                                    </p>
                                </div>
                            </div>
                        </motion.li>
                    )
                })}
            </ul>
        </div>
    );
};

export default RecentActivityFeed;