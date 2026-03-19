
import React, { useState, useMemo, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import CodeIcon from '../components/icons/CodeIcon';

// --- ICONS ---
const KeyIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-2h2v-2h2v-2h2l2.257-2.257A6 6 0 0115 7z" /></svg>);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const DotsVerticalIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>);

// --- TYPES & MOCK DATA ---
type ApiKeyStatus = 'Active' | 'Revoked';
interface ApiKey {
    id: string;
    name: string;
    status: ApiKeyStatus;
    key: string;
    scopes: string[];
    lastUsed: string;
    created: string;
}
interface IntegratedPartner {
    id: string;
    name: string;
    status: 'Active' | 'Inactive';
    region: 'Global' | 'EU' | 'NA' | 'APAC' | 'SEA';
    joinDate: string;
    artistsDistributed: number;
}
type ApiManagementTab = 'keys' | 'labels' | 'sub_distributors';
type StatusFilter = 'All' | 'Active' | 'Inactive';

const mockApiKeysData: ApiKey[] = [
  { id: 'key-1', name: 'White Label Records Prod', status: 'Active', key: 'leher_sk_prod_5a3f****************t7p9', scopes: ['read:releases', 'write:releases', 'distribute:releases'], lastUsed: '2024-10-26', created: '2023-01-15' },
  { id: 'key-2', name: 'Indie Collective Mobile App', status: 'Active', key: 'leher_sk_prod_9b1e****************w2r1', scopes: ['read:releases', 'read:analytics'], lastUsed: '2024-10-25', created: '2023-03-22' },
];
const integratedLabelNames = ["Dream Beat Collective", "Pixel Groove Studios", "Echo Sound Labs", "Stellar Music Group", "Quantum Rhythm Productions", "Horizon Audio Works", "Crimson Sync Records", "Vivid Flow Music", "Aura Digital Entertainment", "Phoenix Realm Records", "Grand Spectrum Music", "Melodic Core Studios", "Radiant Stream Records", "Sapphire Resonance Group", "Aura Beats Productions", "Crimson Horizon Records", "Digital Spark Music", "Dreamscape Sound Studios", "Echo Sphere Collective", "Elevate Rhythm Group", "Emerald Wave Records", "Enigma Core Music", "Flow Dynamics Studios", "Golden Vision Records", "Groove Pulse Entertainment", "Harmonic Realm Music", "Horizon Beat Collective", "Ignite Audio Works", "Infinite Resonance Records", "Luna Melodic Productions", "Majestic Sound Collective", "Neon Vibe Records", "Nexus Stream Music", "Nova Grand Records", "Obsidian Flow Studios", "Orion Music Group", "Phoenix Rising Records", "Pixel Core Music", "Platinum Beat Labs", "Quantum Groove Productions", "Radiant Echoes Music", "Royal Arts Records", "Sapphire Rhythm Studios", "Scarlet Vision Music", "Serene Sound Works", "Silent Bloom Records", "Sonic Spectrum Group", "Sparkle Wave Music", "Stellar Echo Collective", "Streamline Records", "Sync Beat Productions", "Urban Pulse Music", "Vibe Flow Records", "Vivid Horizon Studios", "Whispering Chord Music", "Zenith Sound Works", "Abyss Deep Records", "Bright Melody Group", "Cascade Beats", "Celestial Flow Records", "Divine Rhythm Studios", "Ethereal Soundscape", "Fusion Groove Records", "Galaxy Tunes Music"];
const subDistributorNames = ["Digital Connect Media", "Global Echo Distribution", "Indie Stream Partners", "Urban Beat Solutions", "Creative Sync Hub", "Regional Vibe Network", "Niche Sound Alliance", "Local Music Gateway", "Premier Digital Connect", "Ascend Media Partners", "Omni Flow Distribution", "Nexus Sound Collective", "Horizon Digital Hub", "Elite Beat Solutions", "Visionary Music Connect", "Amplify Distribution Group", "Echo Stream Network", "Harmony Media Partners", "Melody Distribution Hub", "Central Sound Alliance", "Unity Digital Solutions", "Synergy Beat Collective", "Platform Connect Media", "Dynamic Route Partners", "Channel Flow Distribution", "Axis Media Solutions", "Point Connect Network", "Core Distribution Hub", "Grand Scale Partners", "Infinite Link Solutions", "Pixel Bridge Distribution", "Aura Sync Media", "Celestial Flow Partners", "Cosmic Digital Hub", "Dreamwave Connect", "Ethereal Sound Solutions", "Frontier Music Alliance", "Galaxy Rhythm Network", "Genesis Beat Collective", "Hyperflow Distribution", "Lumina Media Hub", "Meridian Sound Partners", "Mystic Digital Connect", "Nova Rhythm Solutions", "Phoenix Bridge Media", "Quantum Stream Partners", "Radiant Flow Distribution", "Stellar Connect Network", "Summit Beat Hub", "Zenith Digital Solutions"];

// Generate 700+ partners
const generateMockData = (names: string[], count: number): IntegratedPartner[] => {
    const statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];
    const regions: ('Global' | 'EU' | 'NA' | 'APAC' | 'SEA')[] = ['Global', 'EU', 'NA', 'APAC', 'SEA'];
    const results: IntegratedPartner[] = [];
    for (let i = 0; i < count; i++) {
        const name = names[i % names.length];
        results.push({
            id: `partner-${name.replace(/\s+/g, '-')}-${i}`,
            name: `${name} ${i > names.length ? Math.floor(i / names.length) + 1 : ''}`.trim(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
            joinDate: new Date(Date.now() - Math.random() * 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            artistsDistributed: Math.floor(Math.random() * 500) + 10
        });
    }
    return results;
};
const integratedLabels = generateMockData(integratedLabelNames, 705);
const integratedSubDistributors = generateMockData(subDistributorNames, 712);


const getStatusClasses = (status: string) => {
    const baseClasses = 'px-2 py-0.5 text-xs font-semibold rounded-full inline-block border';
    if (status === 'Active') {
        return `${baseClasses} bg-green-500/10 text-green-300 border-green-500/20`;
    }
     if (status === 'Revoked') {
        return `${baseClasses} bg-red-500/10 text-red-400 border-red-500/20`;
    }
    return `${baseClasses} bg-slate-500/20 text-slate-400 border-slate-500/30`;
};

const TabButton: React.FC<{ name: string; tabId: ApiManagementTab; activeTab: ApiManagementTab; setActiveTab: (tab: ApiManagementTab) => void }> = ({ name, tabId, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(tabId)}
        className={`py-3 px-4 font-semibold text-base relative transition-colors ${activeTab === tabId ? 'text-ui-text-heading' : 'text-ui-text-body hover:text-ui-text-heading'}`}
    >
        {name}
        {activeTab === tabId && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-singularity rounded-full"></div>}
    </button>
);

const PartnerList: React.FC<{ partners: IntegratedPartner[], searchTerm: string, statusFilter: StatusFilter }> = ({ partners, searchTerm, statusFilter }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const filteredPartners = useMemo(() => {
        return partners.filter(partner => {
            const searchMatch = partner.name.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'All' || partner.status === statusFilter;
            return searchMatch && statusMatch;
        });
    }, [partners, searchTerm, statusFilter]);

    const paginatedPartners = useMemo(() => {
        return filteredPartners.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }, [filteredPartners, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredPartners.length / rowsPerPage);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedPartners.map(partner => (
                    <div key={partner.id} className="admin-hud-card p-4">
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="font-bold text-lg text-ui-text-heading">{partner.name}</p>
                                <p className="text-sm text-ui-text-subtle">{partner.region} &bull; Joined: {partner.joinDate}</p>
                            </div>
                            <span className={getStatusClasses(partner.status)}>{partner.status}</span>
                        </div>
                        <p className="mt-2 text-sm text-ui-text-body">Artists Distributed: <span className="font-bold text-singularity-teal">{partner.artistsDistributed}</span></p>
                    </div>
                ))}
            </div>
             <div className="p-4 flex justify-between items-center text-sm">
                <span className="text-ui-text-subtle">Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-quantum-glow px-3 py-1 rounded-md disabled:opacity-50 text-white">Previous</button>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-quantum-glow px-3 py-1 rounded-md disabled:opacity-50 text-white">Next</button>
                </div>
            </div>
        </div>
    );
};

const ApiKeysTab: React.FC<{showToast: (message: string, type?: 'success' | 'error' | 'warning') => void}> = ({ showToast }) => {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeysData);
    const handleRevokeKey = (keyId: string) => {
        setApiKeys(prev => prev.map(k => k.id === keyId ? {...k, status: 'Revoked'} : k));
        showToast('API Key has been revoked.', 'warning');
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button className="btn-quantum-glow flex-shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 text-white font-bold rounded-full">
                    <PlusIcon className="w-5 h-5"/> Create API Key
                </button>
            </div>
            <div className="space-y-4">
                {apiKeys.map(key => (
                    <div key={key.id} className="admin-hud-card p-4">
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="font-bold text-lg text-ui-text-heading">{key.name}</p>
                                <p className="font-mono text-xs text-ui-text-subtle mt-1">{key.key}</p>
                            </div>
                            <span className={getStatusClasses(key.status)}>{key.status}</span>
                        </div>
                        <div className="mt-3 border-t border-singularity-purple-transparent pt-3">
                            <p className="text-xs font-semibold text-ui-text-subtle mb-2 uppercase">Scopes</p>
                            <div className="flex flex-wrap gap-2">
                                {key.scopes.map(s => <span key={s} className="px-2 py-0.5 text-xs bg-ui-border rounded-md font-mono">{s}</span>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ApiUsersView: React.FC<{showToast: (message: string, type?: 'success' | 'error' | 'warning') => void}> = ({showToast}) => {
    const [activeTab, setActiveTab] = useState<ApiManagementTab>('keys');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

    return (
        <div className="space-y-8">
            <header className="admin-header">
                <h1 className="text-gradient-singularity">Developer & API Management</h1>
                <p>Manage API keys, integrations, and developer access.</p>
            </header>

            <div className="border-b border-singularity-purple/30">
                <div className="flex space-x-2 overflow-x-auto">
                    <TabButton name="Your API Keys" tabId="keys" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="Integrated Labels" tabId="labels" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="Sub-Distributors" tabId="sub_distributors" activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>

            <div className="animate-page-fade-in-up">
                 {activeTab !== 'keys' && (
                    <div className="bg-singularity-black/30 rounded-xl border border-singularity-purple/30 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative w-full md:flex-1">
                            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-text-subtle z-10" />
                            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full form-input-glow pl-10"/>
                        </div>
                        <div className="flex items-center gap-1 border border-singularity-purple/50 rounded-full p-1 self-start bg-singularity-black">
                            {(['All', 'Active', 'Inactive'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`filter-pill px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${statusFilter === status ? 'active' : 'text-ui-text-body hover:bg-ui-border/50'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'keys' && <ApiKeysTab showToast={showToast} />}
                {activeTab === 'labels' && <PartnerList partners={integratedLabels} searchTerm={searchTerm} statusFilter={statusFilter} />}
                {activeTab === 'sub_distributors' && <PartnerList partners={integratedSubDistributors} searchTerm={searchTerm} statusFilter={statusFilter} />}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-singularity-purple/30">
                <Link to="/developer/docs" className="admin-hud-card p-6">
                    <CodeIcon className="w-8 h-8 text-primary mb-2" />
                    <h3 className="text-xl font-bold text-ui-text-heading group-hover:text-primary transition-colors">API Documentation</h3>
                    <p className="text-ui-text-body mt-1">Explore endpoints, check guides, and find code examples.</p>
                </Link>
                <Link to="/support" className="admin-hud-card p-6">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="text-xl font-bold text-ui-text-heading group-hover:text-primary transition-colors">API Support</h3>
                    <p className="text-ui-text-body mt-1">Contact our developer support team for assistance.</p>
                </Link>
            </div>
        </div>
    );
};

export default ApiUsersView;