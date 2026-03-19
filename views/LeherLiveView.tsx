
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const LeherLiveView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const events = [
        { title: "Release Party 'DJ Pesta Gila'", date: "Oct 27, 2023", status: "Completed", tickets: 1500, revenue: "$7,500" },
        { title: "Exclusive Q&A Session", date: "Aug 15, 2024", status: "Upcoming", tickets: "Open", revenue: "-" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_leher_live_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_leher_live_desc')}</p>
            </div>
             <div className="flex justify-end">
                <button className="btn-glow-primary px-6 py-2 font-semibold rounded-full">Schedule New Livestream</button>
            </div>
             <div className="bg-ui-surface rounded-xl border border-ui-border overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                        <tr>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Event Title</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Date</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Status</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Tickets Sold</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Revenue</th>
                        </tr>
                    </thead>
                     <tbody className="divide-y divide-ui-border">
                        {events.map(e => (
                             <tr key={e.title}>
                                <td className="p-3 font-semibold text-ui-text-heading">{e.title}</td>
                                <td className="p-3 text-ui-text-body">{e.date}</td>
                                <td className="p-3"><span className={`px-2 py-0.5 text-xs rounded-full ${e.status === 'Completed' ? 'bg-slate-500/20 text-slate-300' : 'bg-accent/20 text-accent'}`}>{e.status}</span></td>
                                <td className="p-3 text-ui-text-body">{e.tickets}</td>
                                <td className="p-3 font-semibold text-green-400">{e.revenue}</td>
                             </tr>
                        ))}
                     </tbody>
                 </table>
             </div>
        </div>
    );
};

export default LeherLiveView;
