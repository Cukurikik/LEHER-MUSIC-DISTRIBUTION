
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const FanFeedbackView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const campaigns = [
        { title: "Demo 'Future Echoes'", status: "Completed", feedback: 50, sentiment: "85%" },
        { title: "Unreleased Track 'Neon Night'", status: "Active", feedback: 25, sentiment: "90%" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_fan_feedback_portal_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_fan_feedback_portal_desc')}</p>
            </div>
            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-ui-text-heading">Feedback Campaigns</h2>
                    <button className="btn-glow-primary px-6 py-2 font-semibold rounded-full">Create New Campaign</button>
                </div>
                <div className="space-y-4">
                    {campaigns.map(c => (
                        <div key={c.title} className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border flex items-center justify-between">
                            <div>
                                <p className="font-bold text-ui-text-heading">{c.title}</p>
                                <p className="text-sm text-ui-text-subtle">Status: <span className={c.status === 'Active' ? 'text-green-400' : 'text-slate-400'}>{c.status}</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">{c.feedback} <span className="text-sm font-normal text-ui-text-subtle">Responses</span></p>
                                <p className="text-lg font-bold text-primary">{c.sentiment} <span className="text-sm font-normal text-ui-text-subtle">Positive</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FanFeedbackView;
