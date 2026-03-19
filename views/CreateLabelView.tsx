
import React, { useState, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { generateLabelNameSuggestions } from '../services/geminiService';
import type { SubDistributor, Contract } from '../types';
import SparklesIcon from '../components/layout/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

// Icons
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const STYLE_OPTIONS = ["Modern", "Vintage", "Minimalist", "Bold", "Corporate", "Indie"];

interface CreateLabelViewProps {
  addSubDistributor: (subData: Omit<SubDistributor, 'id'>) => void;
  contracts: Contract[];
}

const CreateLabelView: React.FC<CreateLabelViewProps> = ({ addSubDistributor, contracts }) => {
    const navigate = useNavigate();
    const { language } = useTranslation();
    const [formData, setFormData] = useState({ name: '', contactPerson: '', email: '', contractId: '' });
    const [aiKeywords, setAiKeywords] = useState('');
    const [aiStyle, setAiStyle] = useState('Modern');
    const [suggestions, setSuggestions] = useState<{ name: string; reason: string }[]>([]);
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    const handleGenerateNames = async () => {
        if (!aiKeywords) return;
        setIsLoadingAi(true);
        setSuggestions([]);
        try {
            const result = await generateLabelNameSuggestions(aiKeywords, aiStyle, 5, language);
            setSuggestions(result.suggestions);
        } catch (error) {
            console.error("Failed to generate names", error);
        } finally {
            setIsLoadingAi(false);
        }
    };

    const handleUseSuggestion = (name: string) => {
        setFormData(prev => ({ ...prev, name }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSubDistributor: Omit<SubDistributor, 'id'> = {
            ...formData,
            status: 'Active',
            lastActivity: new Date().toISOString().split('T')[0],
        };
        addSubDistributor(newSubDistributor);
        navigate('/admin/sub-distributors');
    };

    const inputStyles = "form-input-glow w-full";

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <header className="admin-header">
                <button onClick={() => navigate('/admin/sub-distributors')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Labels & Subs
                </button>
                <h1 className="text-gradient-singularity">Create New Label / Sub-Distributor</h1>
                <p className="text-ui-text-body mt-1">Set up a new partner on the Leher platform.</p>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Main Form */}
                    <div className="admin-hud-card p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-ui-text-heading">1. Label Details</h2>
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-ui-text-body block mb-1">Label Name *</label>
                            <input type="text" id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputStyles} required />
                        </div>
                        <div>
                            <label htmlFor="contactPerson" className="text-sm font-medium text-ui-text-body block mb-1">Contact Person *</label>
                            <input type="text" id="contactPerson" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} className={inputStyles} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-ui-text-body block mb-1">Contact Email *</label>
                            <input type="email" id="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputStyles} required />
                        </div>
                         <div>
                            <label htmlFor="contractId" className="text-sm font-medium text-ui-text-body block mb-1">Associate Contract *</label>
                            <select id="contractId" value={formData.contractId} onChange={e => setFormData({...formData, contractId: e.target.value})} className={inputStyles} required>
                                <option value="" disabled>Select a contract...</option>
                                {contracts.map(c => <option key={c.id} value={c.id}>{c.id} - {c.userName}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="admin-hud-card p-6 space-y-4">
                        <h2 className="text-2xl font-bold text-ui-text-heading flex items-center gap-2">
                            <SparklesIcon className="w-6 h-6 text-secondary" /> AI Name Suggestions
                        </h2>
                         <div>
                            <label htmlFor="aiKeywords" className="text-sm font-medium text-ui-text-body block mb-1">Keywords/Themes</label>
                            <input type="text" id="aiKeywords" value={aiKeywords} onChange={e => setAiKeywords(e.target.value)} className={inputStyles} placeholder="e.g., Cosmic, Retro, Lofi" />
                        </div>
                         <div>
                            <label htmlFor="aiStyle" className="text-sm font-medium text-ui-text-body block mb-1">Desired Style</label>
                            <select id="aiStyle" value={aiStyle} onChange={e => setAiStyle(e.target.value)} className={inputStyles}>
                                {STYLE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <button type="button" onClick={handleGenerateNames} disabled={isLoadingAi || !aiKeywords} className="w-full btn-quantum-glow flex items-center justify-center gap-2 text-sm font-semibold py-2 px-3 rounded-full text-white disabled:opacity-50">
                            {isLoadingAi ? 'Generating...' : 'Generate Names'}
                        </button>
                        
                        <div className="space-y-3 pt-2 max-h-60 overflow-y-auto pr-2">
                            {suggestions.map((s, i) => (
                                <div key={i} className="bg-singularity-black/70 p-3 rounded-lg border border-ui-border/50 animate-fade-in">
                                    <h4 className="font-bold text-ui-text-heading">{s.name}</h4>
                                    <p className="text-xs text-ui-text-subtle italic my-1">"{s.reason}"</p>
                                    <button type="button" onClick={() => handleUseSuggestion(s.name)} className="text-xs font-semibold text-primary hover:underline">Use this name</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-singularity-purple/30">
                    <button type="submit" className="btn-quantum-glow px-8 py-3 rounded-full text-white font-bold transition shadow-lg hover:brightness-110">
                        Create Label
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateLabelView;