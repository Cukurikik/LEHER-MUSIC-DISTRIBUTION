
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import type { TranslationKeys } from '../types';
import SparklesIcon from '../components/layout/SparklesIcon';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const TicketIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>);
const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>);

const TICKET_CATEGORIES: { key: TranslationKeys, value: string }[] = [
    { key: 'ticket_cat_dist', value: 'Distribution Issue' },
    { key: 'ticket_cat_payment', value: 'Payment Question' },
    { key: 'ticket_cat_technical', value: 'Technical Problem' },
    { key: 'ticket_cat_api', value: 'API Support' },
    { key: 'ticket_cat_onboarding', value: 'Onboarding Help' },
    { key: 'ticket_cat_general', value: 'General Inquiry' }
];

const LANGUAGES: { key: TranslationKeys, value: string }[] = [
    { key: 'lang_en', value: 'English' },
    { key: 'lang_id', value: 'Indonesian' },
    { key: 'lang_es', value: 'Spanish' },
    { key: 'lang_fr', value: 'French' },
    { key: 'lang_de', value: 'German' },
    { key: 'lang_ja', value: 'Japanese' }
];

interface SubmitTicketViewProps {
    showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const SubmitTicketView: React.FC<SubmitTicketViewProps> = ({ showToast }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('English');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!category || !subject || !description) {
            showToast(t('required_fields_error'), 'error');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            showToast(t('toast_ticket_submitted'), 'success');
            navigate('/support');
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-20 max-w-5xl mx-auto">
            <button onClick={() => navigate('/support')} className="inline-flex items-center gap-2 text-ui-text-subtle hover:text-white transition-colors font-semibold group">
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {t('back_to_support')}
            </button>

            {/* Futuristic Hero Header */}
            <div className="relative text-center mb-12">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl rounded-full pointer-events-none opacity-50"></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-ui-surface border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-500">
                        <TicketIcon className="w-10 h-10 text-quantum-flux" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white font-oxanium tracking-tight mb-4 drop-shadow-xl">
                        {t('submit_ticket_title')}
                    </h1>
                    <p className="text-lg text-ui-text-body max-w-xl mx-auto">
                        {t('submit_ticket_subtitle')} Our neural support network is standing by to resolve your quantum entanglements.
                    </p>
                 </div>
            </div>

            <div className="relative">
                {/* Decorative borders */}
                <div className="absolute -inset-1 bg-gradient-to-r from-singularity-purple via-singularity-teal to-singularity-purple rounded-3xl opacity-30 blur-sm"></div>
                
                <form onSubmit={handleSubmit} className="relative bg-ui-surface/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                        <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Secure Transmission</span>
                        </div>
                        <span className="text-xs text-ui-text-subtle font-mono">ID: TICKET-{Date.now().toString().slice(-6)}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-2 group">
                            <label htmlFor="category" className="text-xs font-bold text-ui-text-subtle uppercase tracking-wider group-focus-within:text-primary transition-colors">{t('form_label_category')} <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <select 
                                    id="category" 
                                    value={category} 
                                    onChange={e => setCategory(e.target.value)} 
                                    className="w-full bg-black/40 border border-ui-border rounded-xl p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-black/60"
                                    required
                                >
                                    <option value="" disabled>{t('form_placeholder_select_category')}</option>
                                    {TICKET_CATEGORIES.map(c => <option key={c.key} value={c.value}>{t(c.key)}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ui-text-subtle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 group">
                            <label htmlFor="language" className="text-xs font-bold text-ui-text-subtle uppercase tracking-wider group-focus-within:text-primary transition-colors">{t('form_label_language')} <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <select 
                                    id="language" 
                                    value={language} 
                                    onChange={e => setLanguage(e.target.value)} 
                                    className="w-full bg-black/40 border border-ui-border rounded-xl p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-black/60"
                                    required
                                >
                                    {LANGUAGES.map(l => <option key={l.key} value={l.value}>{t(l.key)}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ui-text-subtle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2 group mb-8">
                        <label htmlFor="subject" className="text-xs font-bold text-ui-text-subtle uppercase tracking-wider group-focus-within:text-primary transition-colors">{t('form_label_subject')} <span className="text-red-400">*</span></label>
                        <input 
                            id="subject" 
                            type="text" 
                            value={subject} 
                            onChange={e => setSubject(e.target.value)} 
                            className="w-full bg-black/40 border border-ui-border rounded-xl p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-ui-text-subtle/50" 
                            placeholder="Briefly summarize your issue..."
                            required 
                        />
                    </div>
                    
                    <div className="space-y-2 group mb-10">
                        <label htmlFor="description" className="text-xs font-bold text-ui-text-subtle uppercase tracking-wider group-focus-within:text-primary transition-colors">{t('form_label_description')} <span className="text-red-400">*</span></label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            rows={6} 
                            className="w-full bg-black/40 border border-ui-border rounded-xl p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-ui-text-subtle/50 resize-none" 
                            placeholder={t('form_placeholder_describe_issue')} 
                            required 
                        />
                    </div>
                    
                    <div className="pt-6 border-t border-white/10 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="relative overflow-hidden group w-full md:w-auto px-8 py-4 rounded-xl font-bold text-black bg-white hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                        >
                             <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        {t('button_submitting')}
                                    </>
                                ) : (
                                    <>
                                        <PaperAirplaneIcon className="w-5 h-5" />
                                        {t('button_submit_ticket')}
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitTicketView;
