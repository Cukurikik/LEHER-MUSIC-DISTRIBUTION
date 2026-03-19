
import React, { useState, useMemo, useEffect } from 'react';

interface ExpandStorageModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSize: number;
    maxSize: number;
    balance: number;
    onConfirmUpgrade: (newSizeTB: number, cost: number) => void;
}

const COST_PER_TB = 25; // $25 per TB for this example

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

const ExpandStorageModal: React.FC<ExpandStorageModalProps> = ({ isOpen, onClose, currentSize, maxSize, balance, onConfirmUpgrade }) => {
    const [targetSize, setTargetSize] = useState(currentSize);

    useEffect(() => {
        if (isOpen) {
            setTargetSize(currentSize);
        }
    }, [isOpen, currentSize]);

    const { cost, sizeToAdd, hasSufficientFunds } = useMemo(() => {
        const sizeToAdd = Math.max(0, targetSize - currentSize);
        const cost = sizeToAdd * COST_PER_TB;
        const hasSufficientFunds = balance >= cost;
        return { cost, sizeToAdd, hasSufficientFunds };
    }, [targetSize, currentSize, balance]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (hasSufficientFunds) {
            onConfirmUpgrade(targetSize, cost);
        }
    };
    
    const storageTiers = [40, 60, 80, 100, 128, 256, 512, 700];
    const availableTiers = storageTiers.filter(tier => tier > currentSize && tier <= maxSize);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
            <div className="glass-surface-quantum modal-glow-border rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-4 right-4 text-ui-text-subtle hover:text-primary transition-colors p-2 rounded-full z-10"><CloseIcon className="w-6 h-6"/></button>
                 <div className="p-6 md:p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-ui-text-heading">Expand Database Storage</h2>
                        <p className="text-ui-text-body">Increase your real-time database capacity.</p>
                    </div>

                     <div className="text-center bg-singularity-black/50 border border-singularity-purple-transparent rounded-lg p-4 space-y-4">
                        <p className="text-lg font-semibold text-ui-text-body">New Total Capacity: <span className="text-3xl font-bold text-singularity-teal">{targetSize === currentSize ? '...' : `${targetSize} TB`}</span></p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {availableTiers.map(tier => (
                                <button 
                                    key={tier}
                                    onClick={() => setTargetSize(tier)}
                                    className={`p-3 border-2 rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105 ${targetSize === tier ? 'border-singularity-teal bg-singularity-teal/20 text-singularity-teal shadow-[0_0_10px_var(--singularity-glow-teal)]' : 'border-singularity-purple/50 bg-singularity-black hover:border-singularity-teal/70'}`}
                                >
                                    {tier} TB
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-singularity-black/50 border border-singularity-purple-transparent rounded-lg p-4 space-y-3 text-sm">
                        <div className="flex justify-between items-center"><span className="text-ui-text-body">Current Storage:</span><span className="font-mono text-ui-text-heading">{currentSize.toFixed(1)} TB</span></div>
                        <div className="flex justify-between items-center"><span className="text-ui-text-body">Storage to Add:</span><span className="font-mono text-green-400">+{sizeToAdd.toFixed(1)} TB</span></div>
                        <hr className="border-singularity-purple-transparent"/>
                        <div className="flex justify-between items-center"><span className="text-ui-text-body font-bold">Total Cost:</span><span className="font-mono font-bold text-lg text-singularity-pink">${cost.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center"><span className="text-ui-text-body">Your Balance:</span><span className={`font-mono ${hasSufficientFunds ? 'text-ui-text-heading' : 'text-danger'}`}>${balance.toFixed(2)}</span></div>
                    </div>
                    
                    {!hasSufficientFunds && cost > 0 && <p className="text-center text-sm text-danger">You do not have sufficient funds to complete this upgrade.</p>}

                     <div className="flex justify-end pt-4 border-t border-singularity-purple-transparent">
                        <button onClick={handleConfirm} disabled={!hasSufficientFunds || sizeToAdd === 0} className="w-full bg-gradient-singularity text-white font-bold py-3 px-6 rounded-full transition shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed">
                           {sizeToAdd === 0 ? 'Select a new size' : `Confirm & Pay $${cost.toFixed(2)}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandStorageModal;
