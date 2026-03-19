
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const ListeningPartiesView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const parties = [
        { title: "Listening Party 'DJ Lagu Santai'", release: "DJ Lagu Santai", date: "Aug 14, 2024, 19:00 WIB" },
        { title: "New Album Listening Party", release: "TBA", date: "Sep 25, 2024, 20:00 WIB" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_listening_parties_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_listening_parties_desc')}</p>
            </div>
             <div className="flex justify-end">
                <button className="btn-glow-primary px-6 py-2 font-semibold rounded-full">Host New Party</button>
            </div>
             <div className="bg-ui-surface rounded-xl border border-ui-border overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                        <tr>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Party Title</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Release</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Schedule</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ui-border">
                        {parties.map(p => (
                             <tr key={p.title}>
                                <td className="p-3 font-semibold text-ui-text-heading">{p.title}</td>
                                <td className="p-3 text-ui-text-body">{p.release}</td>
                                <td className="p-3 text-ui-text-body">{p.date}</td>
                                <td className="p-3"><button className="text-sm font-semibold text-primary hover:underline">{t('manage')}</button></td>
                             </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

export default ListeningPartiesView;
