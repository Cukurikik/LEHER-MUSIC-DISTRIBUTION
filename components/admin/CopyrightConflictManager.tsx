import React from 'react';
import type { CopyrightConflict } from '../../services/adminService';
import CopyrightIcon from '../icons/CopyrightIcon';

interface CopyrightConflictManagerProps {
    conflicts: CopyrightConflict[];
    onAction: (songId: string, action: 'dismiss' | 'notify' | 'takedown') => void;
    isLoading: boolean;
}

const CopyrightConflictManager: React.FC<CopyrightConflictManagerProps> = ({ conflicts, onAction, isLoading }) => {
    return (
        <div className="bg-singularity-black/50 border border-singularity-purple/30 p-6 rounded-2xl relative">
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-ui-text-heading flex items-center gap-2">
                    <CopyrightIcon className="w-6 h-6 text-secondary" />
                    Copyright Conflict Queue
                 </h3>
            </div>
            {conflicts.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {conflicts.map(conflict => (
                        <div key={conflict.songId} className="bg-singularity-black/70 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:bg-white/5">
                            <img src={conflict.coverArtUrl} alt={conflict.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0"/>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-ui-text-heading truncate">{conflict.title} - <span className="font-normal">{conflict.artistName}</span></p>
                                <p className="text-xs text-danger/80 truncate mt-1">{conflict.matchDetails}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                                <button onClick={() => onAction(conflict.songId, 'dismiss')} title="Dismiss" className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors">
                                    Dismiss
                                </button>
                                <button onClick={() => onAction(conflict.songId, 'takedown')} title="Takedown" className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                                    Takedown
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-ui-text-subtle">
                    <CopyrightIcon className="w-12 h-12 mx-auto mb-2 text-green-500"/>
                    <p>No copyright conflicts detected. Queue is clear!</p>
                </div>
            )}
        </div>
    );
};

export default CopyrightConflictManager;
