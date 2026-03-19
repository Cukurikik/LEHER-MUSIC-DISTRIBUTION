import React from 'react';
import type { Contract } from '../../types';

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

interface ContractApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    contract: Contract | null;
    onApprove: (contractId: string) => void;
}

const ContractApprovalModal: React.FC<ContractApprovalModalProps> = ({ isOpen, onClose, contract, onApprove }) => {
    if (!isOpen || !contract) return null;

    const handleApprove = () => {
        onApprove(contract.id);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={onClose}
        >
            <div
                className="glass-surface-quantum modal-glow-border rounded-2xl shadow-2xl w-full max-w-2xl m-4 transform transition-all relative"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-ui-text-subtle hover:text-primary transition-colors p-2 rounded-full z-10"><CloseIcon className="w-6 h-6"/></button>
                <div className="p-6 md:p-8 space-y-6">
                    <div className="text-center border-b border-ui-border pb-4">
                        <h2 className="text-2xl font-bold text-ui-text-heading">Review & Approve Contract</h2>
                        <p className="text-ui-text-body">{contract.id} - {contract.userName}</p>
                    </div>
                    
                    <div className="prose prose-sm prose-invert max-w-none text-ui-text-body max-h-80 overflow-y-auto p-4 bg-ui-surface/50 rounded-lg border border-ui-border">
                        <h4>{contract.type}</h4>
                        <p><strong>Start Date:</strong> {contract.startDate}</p>
                        <p><strong>End Date:</strong> {contract.endDate}</p>
                        <hr className="border-ui-border"/>
                        <p>{contract.details}</p>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4 border-t border-ui-border">
                        <button type="button" onClick={onClose} className="btn-quantum-glow px-6 py-2 rounded-full text-white font-bold transition">Cancel</button>
                        <button type="button" onClick={handleApprove} className="px-6 py-2 rounded-full bg-gradient-singularity text-white font-bold transition shadow-lg hover:brightness-110">Approve Contract</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractApprovalModal;