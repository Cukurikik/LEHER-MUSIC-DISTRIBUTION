
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song } from '../types';
import CustomSelector from '../components/ui/CustomSelector';
import { generateWhitelistJustification } from '../services/geminiService';
import SparklesIcon from '../components/layout/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface SocialWhitelistViewProps {
  songs: Song[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const PLATFORMS = ['Facebook/Instagram', 'TikTok', 'YouTube Content ID'];

const SocialWhitelistView: React.FC<SocialWhitelistViewProps> = ({ songs, showToast }) => {
    const navigate = useNavigate();
    const { language } = useTranslation();
    const [selectedSongId, setSelectedSongId] = useState<string | undefined>();
    const [platform, setPlatform] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [userReason, setUserReason] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const songOptions = songs.map(s => ({ value: s.id, label: s.title, artist: s.artistName, cover: s.coverArtUrl }));
    const platformOptions = PLATFORMS.map(p => ({ value: p, label: p }));
    const selectedSong = songs.find(s => s.id === selectedSongId);

    const handleGenerateJustification = async () => {
        if (!selectedSong || !platform || !userReason) {
            showToast('Please select a song, platform, and provide your reason first.', 'warning');
            return;
        }
        setIsGenerating(true);
        const trackInfo = `${selectedSong.title} by ${selectedSong.artistName} (ISRC: ${selectedSong.isrc || 'N/A'})`;
        try {
            const justification = await generateWhitelistJustification(trackInfo, platform, userReason, language);
            setUserReason(justification);
        } catch (error) {
            showToast('Failed to generate justification.', 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSongId || !platform || !profileUrl || !userReason) {
            showToast('Please fill out all required fields.', 'error');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            showToast('Whitelist request submitted successfully.', 'success');
            // Reset form
            setSelectedSongId(undefined);
            setPlatform('');
            setProfileUrl('');
            setUserReason('');
        }, 1500);
    };

    const inputStyles = "w-full bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-ui-text-heading focus:ring-2 focus:ring-primary focus:border-primary transition";

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div>
                 <button onClick={() => navigate('/toolkit')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading">Social Media Whitelisting</h1>
                <p className="text-lg text-ui-text mt-1">Request to clear your music for use on social platforms and avoid copyright claims.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border shadow-sm p-6 space-y-6">
                <div>
                    <label className="font-semibold mb-2 block text-ui-text">1. Select Release *</label>
                     <CustomSelector value={selectedSongId} onChange={setSelectedSongId} options={songOptions} placeholder="Choose a release to whitelist..." renderOption={(o) => (<div className="flex items-center gap-2"><img src={o.cover} className="w-6 h-6 rounded" alt={o.label}/><span>{o.label}</span></div>)} />
                </div>
                <div>
                    <label className="font-semibold mb-2 block text-ui-text">2. Select Platform *</label>
                     <CustomSelector value={platform} onChange={(val) => setPlatform(val || '')} options={platformOptions} placeholder="Choose a platform..." />
                </div>
                <div>
                    <label htmlFor="profile-url" className="font-semibold mb-2 block text-ui-text">3. Profile/Channel URL *</label>
                    <input id="profile-url" type="url" value={profileUrl} onChange={e => setProfileUrl(e.target.value)} className={inputStyles} placeholder="e.g., https://instagram.com/your-username" required />
                </div>
                <div>
                    <label htmlFor="user-reason" className="font-semibold mb-2 block text-ui-text">4. Reason for Whitelisting</label>
                    <textarea id="user-reason" value={userReason} onChange={e => setUserReason(e.target.value)} rows={4} className={inputStyles} placeholder="e.g., I am the rightsholder and this is my official channel. I want to use my music in my own videos without receiving claims." required />
                    <button type="button" onClick={handleGenerateJustification} disabled={isGenerating || !selectedSong || !platform || !userReason} className="mt-2 flex items-center gap-2 text-sm text-quantum-flux font-semibold hover:underline disabled:opacity-50">
                        <SparklesIcon className="w-4 h-4"/>
                        {isGenerating ? 'Generating...' : 'Help me write this with AI'}
                    </button>
                </div>
                <div className="pt-4 border-t border-ui-border">
                    <button type="submit" disabled={isSubmitting} className="w-full mt-4 flex items-center justify-center gap-3 bg-primary text-black font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow-primary btn-border-glow">
                        {isSubmitting ? 'Submitting...' : 'Submit Whitelist Request'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SocialWhitelistView;