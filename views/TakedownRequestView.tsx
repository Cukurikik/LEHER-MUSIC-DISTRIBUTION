
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Song } from '../types';
import { DistributionStatus } from '../types';
import CustomSelector from '../components/ui/CustomSelector';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

interface TakedownRequestViewProps {
  songs: Song[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
  // In a real app, we'd have a function like:
  // onTakedownRequest: (songId: string, reason: string) => void;
}

const TAKEDOWN_REASONS = [
    "I no longer hold the rights to this music.",
    "This was an accidental upload.",
    "The audio/artwork quality is poor.",
    "This release is being replaced with a new version.",
    "Copyright/Legal issue.",
    "Other (please specify)."
];

const TakedownRequestView: React.FC<TakedownRequestViewProps> = ({ songs, showToast }) => {
    const navigate = useNavigate();
    const [selectedSongId, setSelectedSongId] = useState<string | undefined>();
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const songOptions = songs.filter(s => s.status !== DistributionStatus.Draft && s.status !== DistributionStatus.TakedownCompleted).map(s => ({ value: s.id, label: s.title, artist: s.artistName, cover: s.coverArtUrl }));
    const selectedSong = songs.find(s => s.id === selectedSongId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const finalReason = reason === 'Other (please specify).' ? otherReason : reason;

        if (!selectedSongId || !finalReason) {
            showToast('Please fill out all required fields.', 'error');
            return;
        }

        if (confirmText.toLowerCase() !== 'takedown') {
            showToast('Please type "TAKEDOWN" to confirm.', 'error');
            return;
        }
        
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            showToast(`Takedown request for "${selectedSong?.title}" has been submitted.`, 'success');
            navigate('/toolkit');
        }, 1500);
    };

    const inputStyles = "w-full bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-ui-text-heading focus:ring-2 focus:ring-primary focus:border-primary transition";

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/toolkit')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Toolkit
                </button>
                <h1 className="text-4xl font-bold text-ui-text-heading">Takedown Request</h1>
                <p className="text-lg text-ui-text mt-1">Request to remove a release from all streaming platforms.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border shadow-sm p-6 space-y-6">
                <div>
                    <label className="font-semibold mb-2 block text-ui-text">Select Release *</label>
                    <CustomSelector value={selectedSongId} onChange={setSelectedSongId} options={songOptions} placeholder="Choose a release to take down..." renderOption={(o) => (<div className="flex items-center gap-2"><img src={o.cover} className="w-6 h-6 rounded" alt={o.label}/><span>{o.label}</span></div>)} />
                </div>
                
                <div>
                  <label htmlFor="reason" className="font-semibold mb-2 block text-ui-text">Reason for Takedown *</label>
                  <select id="reason" value={reason} onChange={e => setReason(e.target.value)} className={inputStyles} required>
                    <option value="" disabled>Select a reason</option>
                    {TAKEDOWN_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                
                {reason === 'Other (please specify).' && (
                    <div className="animate-fade-in">
                        <label htmlFor="other-reason" className="font-semibold mb-2 block text-ui-text">Please specify your reason *</label>
                        <textarea id="other-reason" value={otherReason} onChange={e => setOtherReason(e.target.value)} rows={3} className={inputStyles} required />
                    </div>
                )}
                
                <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 space-y-3">
                    <h3 className="font-bold text-red-300">Please Confirm</h3>
                    <p className="text-sm text-red-300/80">This action is permanent and cannot be undone. It may take several weeks for the release to be removed from all stores. To proceed, please type "TAKEDOWN" in the box below.</p>
                    <input 
                        type="text" 
                        value={confirmText}
                        onChange={e => setConfirmText(e.target.value)}
                        className={`${inputStyles} border-red-500/50 focus:border-red-500 focus:ring-red-500`}
                        placeholder='Type "TAKEDOWN" here'
                    />
                </div>
                
                <div className="pt-4 border-t border-ui-border">
                    <button type="submit" disabled={isSubmitting || confirmText.toLowerCase() !== 'takedown'} className="w-full mt-4 flex items-center justify-center gap-3 bg-danger text-white font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow-danger">
                        {isSubmitting ? 'Submitting Request...' : 'Request Takedown'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TakedownRequestView;
