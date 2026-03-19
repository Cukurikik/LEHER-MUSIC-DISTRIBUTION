import type { SubDistributor } from '../types';

export const initialSubDistributors: SubDistributor[] = [
    { id: 'SD-001', name: 'Asia Pacific Music', contactPerson: 'Budi Santoso', email: 'budi@apmusic.com', contractId: 'CTR-001', status: 'Active', lastActivity: '2024-07-20', region: 'Asia Pacific' },
    { id: 'SD-002', name: 'Euro Digital Distribution', contactPerson: 'Sophie Dubois', email: 'sophie@eurodigital.com', contractId: 'CTR-002', status: 'Active', lastActivity: '2024-07-18', region: 'Europe' },
    { id: 'SD-003', name: 'LatAm Sounds', contactPerson: 'Carlos Rodriguez', email: 'carlos@latamsounds.com', contractId: 'CTR-003', status: 'Inactive', lastActivity: '2024-05-10', region: 'Latin America' },
];
