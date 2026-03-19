import React from 'react';
import type { SupportTicket } from '../../services/adminService';
import SupportIcon from '../icons/SupportIcon';

// Icons
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>);


const getPriorityClasses = (priority: 'High' | 'Medium' | 'Low'): string => {
    switch (priority) {
        case 'High': return 'bg-red-500/20 text-red-300 border-red-500/30';
        case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        case 'Low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
}

const SupportTicketOverview: React.FC<{ tickets: SupportTicket[] }> = ({ tickets }) => {
    return (
        <div className="bg-singularity-black/50 border border-singularity-purple/30 p-6 rounded-2xl h-full">
            <h3 className="text-xl font-bold text-ui-text-heading mb-4">Support Tickets Overview</h3>
            {tickets.length > 0 ? (
                <div className="space-y-3">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="bg-singularity-black/70 rounded-lg p-3 flex items-center gap-4 transition-all hover:bg-white/5 cursor-pointer">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-ui-text-heading truncate">{ticket.subject}</p>
                                <p className="text-sm text-ui-text-body truncate">From: {ticket.userName}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                 <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getPriorityClasses(ticket.priority)}`}>
                                    {ticket.priority}
                                </span>
                                <ArrowRightIcon className="w-5 h-5 text-ui-text-subtle"/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-10 text-ui-text-subtle">
                    <SupportIcon className="w-12 h-12 mx-auto mb-2 text-green-500"/>
                    <p>No open support tickets. Inbox zero!</p>
                </div>
            )}
        </div>
    );
};

export default SupportTicketOverview;
