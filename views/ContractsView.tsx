
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { Contract } from '../types';
import ContractApprovalModal from '../components/admin/ContractApprovalModal';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const getStatusClasses = (status: Contract['status']) => {
    switch (status) {
        case 'Active': return 'bg-green-500/10 text-green-300 border border-green-500/30';
        case 'Pending Signature': return 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30';
        case 'Expired': return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
        case 'Rejected': return 'bg-red-500/10 text-red-300 border border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-300';
    }
};

interface ContractsViewProps {
    contracts: Contract[];
    onApprove: (contractId: string) => void;
}

const ContractsView: React.FC<ContractsViewProps> = ({ contracts: initialContractsProp, onApprove }) => {
    const navigate = useNavigate();
    // Local state to handle immediate UI updates within this view
    const [localContracts, setLocalContracts] = useState<Contract[]>(initialContractsProp);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState<'All' | Contract['status']>('All');

    const openApprovalModal = (contract: Contract) => {
        setSelectedContract(contract);
        setIsModalOpen(true);
    };

    const handleApproveContract = (contractId: string) => {
        // Call the parent handler if provided (for global state simulation)
        onApprove(contractId);
        
        // Update local state immediately for UI feedback
        setLocalContracts(prev => prev.map(c => 
            c.id === contractId ? { ...c, status: 'Active' as const } : c
        ));
    };
    
    const filteredContracts = useMemo(() => {
        if (filter === 'All') return localContracts;
        return localContracts.filter(c => c.status === filter);
    }, [localContracts, filter]);

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="admin-header">
                 <button onClick={() => navigate('/admin')} className="mb-4 inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Admin Dashboard
                </button>
                <h1 className="text-gradient-singularity text-4xl font-bold">Distribution Contracts</h1>
                <p className="text-ui-text-body mt-1">Manage and approve user and label distribution agreements.</p>
            </header>

            <div className="flex items-center gap-2 border border-ui-border rounded-full p-1 bg-ui-bg overflow-x-auto self-start">
                {(['All', 'Pending Signature', 'Active', 'Expired', 'Rejected'] as const).map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`filter-pill px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${filter === status ? 'active bg-primary text-black shadow-glow-primary' : 'text-ui-text-body hover:bg-ui-surface'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

             <div className="space-y-4">
                {filteredContracts.length > 0 ? (
                    filteredContracts.map(contract => (
                        <div key={contract.id} className="admin-hud-card p-5 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all hover:border-primary/50">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <p className="font-bold text-xl text-ui-text-heading">{contract.userName}</p>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${getStatusClasses(contract.status)}`}>
                                        {contract.status}
                                    </span>
                                </div>
                                <p className="text-sm text-ui-text-body font-medium">{contract.type}</p>
                                <p className="font-mono text-xs text-ui-text-subtle mt-2">{contract.id} &bull; Validity: {contract.startDate} — {contract.endDate}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                                {contract.status === 'Pending Signature' ? (
                                    <button 
                                        onClick={() => openApprovalModal(contract)} 
                                        className="w-full md:w-auto btn-quantum-glow px-6 py-3 text-sm font-bold rounded-full text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <span>Review & Approve</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </button>
                                ) : (
                                    <button className="w-full md:w-auto px-6 py-3 text-sm font-bold rounded-full border border-ui-border text-ui-text-subtle hover:text-white hover:border-white transition-colors">
                                        View Details
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-ui-surface/30 rounded-2xl border-2 border-dashed border-ui-border">
                        <p className="text-ui-text-subtle">No contracts found matching this filter.</p>
                    </div>
                )}
            </div>
            <ContractApprovalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                contract={selectedContract}
                onApprove={handleApproveContract}
            />
        </div>
    );
};

export default ContractsView;
