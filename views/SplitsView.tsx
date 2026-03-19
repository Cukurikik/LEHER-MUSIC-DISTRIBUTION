
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const SplitsView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const splits = [
        { title: "DJ Pesta Gila", status: "Signed", collaborators: ["https://picsum.photos/seed/person1/40", "https://picsum.photos/seed/person2/40"], myShare: "50%" },
        { title: "DJ Lagu Santai", status: "Awaiting Signature", collaborators: ["https://picsum.photos/seed/person3/40"], myShare: "100%" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_automated_split_sheets_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_automated_split_sheets_desc')}</p>
            </div>
             <div className="flex justify-end">
                <button className="btn-glow-primary px-6 py-2 font-semibold rounded-full">Create New Split Sheet</button>
            </div>
            <div className="bg-ui-surface rounded-xl border border-ui-border overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                        <tr>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Song Title</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Collaborators</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">Status</th>
                           <th className="p-3 text-xs font-semibold text-ui-text-subtle uppercase tracking-wider">My Share</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ui-border">
                        {splits.map(s => (
                             <tr key={s.title}>
                                <td className="p-3 font-semibold text-ui-text-heading">{s.title}</td>
                                <td className="p-3 flex -space-x-2">{s.collaborators.map(c => <img key={c} src={c} className="w-8 h-8 rounded-full border-2 border-ui-surface"/>)}</td>
                                <td className="p-3"><span className={`px-2 py-0.5 text-xs rounded-full ${s.status === 'Signed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{s.status}</span></td>
                                <td className="p-3 font-semibold text-accent">{s.myShare}</td>
                             </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

export default SplitsView;
