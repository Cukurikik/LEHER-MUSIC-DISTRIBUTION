
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate, Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { SubDistributor, Contract } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>);


type ContractStatus = Contract['status'] | 'Unknown';

const getStatusClasses = (status: 'Active' | 'Inactive'): string => {
    switch (status) {
        case 'Active': return 'bg-green-500/10 text-green-300';
        case 'Inactive': return 'bg-slate-500/20 text-slate-300';
        default: return 'bg-gray-500/20 text-gray-300';
    }
};

interface SubDistributorsViewProps {
    subDistributors: SubDistributor[];
    contracts: Contract[];
}

const SubDistributorsView: React.FC<SubDistributorsViewProps> = ({ subDistributors, contracts }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All');


    const getContractDetails = (contractId: string): Contract | undefined => {
        return contracts.find(c => c.id === contractId);
    };

    const filteredSubDistributors = useMemo(() => {
        if (filter === 'All') return subDistributors;
        return subDistributors.filter(sd => sd.status === filter);
    }, [subDistributors, filter]);


    return (
        <div className="space-y-6">
            <header className="admin-header">
                 <button onClick={() => navigate('/admin')} className="mb-4 inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back')} to {t('nav_admin_dashboard')}
                </button>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div>
                        <h1 className="text-gradient-singularity">{t('title_sub_distributors')}</h1>
                        <p>Monitor all contracted labels and sub-distributors.</p>
                    </div>
                    <Link to="/admin/sub-distributors/create" className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-singularity text-white font-bold px-5 py-2.5 rounded-full transition-all duration-300 hover:brightness-110">
                        <PlusIcon className="w-5 h-5" />
                        Create New
                    </Link>
                </div>
            </header>
            
            <div className="flex items-center gap-1 border border-ui-border rounded-full p-1 bg-ui-bg overflow-x-auto self-start">
                {(['All', 'Active', 'Inactive'] as const).map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`filter-pill px-3 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${filter === status ? 'active' : 'text-ui-text-body hover:bg-ui-surface'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredSubDistributors.map(sd => {
                    const contract = getContractDetails(sd.contractId);
                    return (
                        <div key={sd.id} className="admin-hud-card p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="flex-1">
                                <p className="font-bold text-lg text-ui-text-heading">{sd.name}</p>
                                <p className="text-sm text-ui-text-body">{sd.contactPerson} &bull; {sd.email}</p>
                                <p className="font-mono text-xs text-ui-text-subtle mt-1">Contract: {sd.contractId} (Status: {contract?.status || 'Unknown'})</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(sd.status)}`}>
                                    {sd.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubDistributorsView;