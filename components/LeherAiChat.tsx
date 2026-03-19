import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const LeherAiChatToolView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_leher_ai_chat_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_leher_ai_chat_desc')}</p>
            </div>
            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border text-center">
                <h2 className="text-2xl font-bold text-ui-text-heading">Leher AI Chat has a dedicated page now!</h2>
                <p className="text-ui-text-body mt-2">Click the button below to open the full chat experience.</p>
                 <button onClick={() => navigate('/leher-ai-chat')} className="mt-4 btn-glow-primary px-6 py-2 rounded-full font-semibold">
                    Open Leher AI Chat
                </button>
            </div>
        </div>
    );
};

export default LeherAiChatToolView;