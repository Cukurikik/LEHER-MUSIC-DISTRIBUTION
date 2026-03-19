
import type { Contract } from '../types';

const baseContracts: Contract[] = [
    { id: 'CTR-001', type: 'Global Exclusive', startDate: '2023-01-01', endDate: '2025-01-01', status: 'Active', details: 'Global exclusive distribution rights for all works by DJ Galaxy FVNKY.', userName: 'DJ Galaxy FVNKY' },
    { id: 'CTR-002', type: 'Non-Exclusive - Digital', startDate: '2022-06-15', endDate: '2024-06-15', status: 'Active', details: 'Non-exclusive digital distribution for the catalog of DJ Wave SOPAN.', userName: 'DJ Wave SOPAN' },
    { id: 'CTR-003', type: 'Global Exclusive', startDate: '2024-07-01', endDate: '2026-07-01', status: 'Pending Signature', details: 'Global exclusive rights for all new recordings by Indie Collective.', userName: 'Indie Collective' },
    { id: 'CTR-004', type: 'Regional - SEA', startDate: '2021-11-20', endDate: '2023-11-20', status: 'Expired', details: 'Digital distribution rights for Southeast Asia region for artist Retro Future.', userName: 'Retro Future' },
];

// Generate backlog of pending contracts
const generatePendingContracts = (count: number): Contract[] => {
    const contracts: Contract[] = [];
    for(let i = 0; i < count; i++) {
        contracts.push({
            id: `CTR-PEND-${i+100}`,
            type: 'Standard Distribution',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
            status: 'Pending Signature',
            details: 'Standard terms for new artist registration.',
            userName: `New Artist ${i+1}`
        });
    }
    return contracts;
}

export const initialContracts: Contract[] = [...baseContracts, ...generatePendingContracts(140)];
