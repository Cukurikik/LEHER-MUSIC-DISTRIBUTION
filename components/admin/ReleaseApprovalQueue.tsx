import React from 'react';
import type { PendingRelease } from '../../services/adminService';
import SparklesIcon from '../layout/SparklesIcon';

// Icons
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);
const XIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);


interface ReleaseApprovalQueueProps {
    releases: PendingRelease[];
    onAction: (releaseId: string, action: 'approve' | 'reject') => void;
    onApproveAll: () => void;
    isLoading: boolean;
}

const ReleaseApprovalQueue: React.FC<ReleaseApprovalQueueProps> = ({ releases, onAction, onApproveAll, isLoading }) => {
    return (
        <div className="bg-singularity-black/50 border border-singularity-purple/30 p-6 rounded-2xl relative">
            {isLoading && (
                <div className="absolute inset-0 bg-ui-surface/50 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in rounded-2xl">
                    <p className="text-primary font-semibold">Refreshing Queue...</p>
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-ui-text-heading">Antrian Persetujuan Rilis</h3>
                 <button onClick={onApproveAll} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-primary rounded-full btn-glow-primary btn-border-glow">
                    <SparklesIcon className="w-5 h-5" />
                     Approve All with AI
                </button>
            </div>
            {releases.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {releases.map(release => (
                        <div key={release.id} className="bg-singularity-black/70 rounded-lg p-3 flex items-center gap-4 transition-all hover:bg-white/5">
                            <img src={release.coverArtUrl} alt={release.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0"/>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-ui-text-heading truncate">{release.title}</p>
                                <p className="text-sm text-ui-text-body truncate">{release.artistName}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => onAction(release.id, 'reject')} title="Reject" className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                                    <XIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => onAction(release.id, 'approve')} title="Approve" className="p-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                                    <CheckIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-ui-text-subtle">
                    <CheckIcon className="w-12 h-12 mx-auto mb-2 text-green-500"/>
                    <p>No releases pending approval. Great job!</p>
                </div>
            )}
        </div>
    );
};

export default ReleaseApprovalQueue;
