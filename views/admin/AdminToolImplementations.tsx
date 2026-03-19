
import React, { useState, useMemo, useEffect, useRef } from 'react';
import AreaChart from '../../components/charts/AreaChart';
import { initialSongs } from '../../data/releases';
import { initialArtists } from '../../data/releases';
import WhiteLabelSettings from '../../components/admin/WhiteLabelSettings';
import WorldMapChart from '../../components/charts/WorldMapChart';
import { ALL_PLATFORMS } from '../../data/platforms';
import { getPlatformIcon } from '../../components/icons/PlatformIcons';
import { initialContracts } from '../../data/contracts';
import LeherIcon from '../../components/layout/LeherIcon';
import type { TranslationKeys } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';

// --- ICONS ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const CubeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>);

// Exported Icons for data/tools.ts compatibility
export const GavelIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20H4a1 1 0 01-1-1V5a1 1 0 011-1h6M10 20v-6m0 6h4m-4-6h4m0 6v-6m0 0l6-6m-6 6l6 6" /></svg>);
export const ShieldVortexIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-14.964z" /><path d="M12 12a3 3 0 100-6 3 3 0 000 6z M12 12a6 6 0 100-12 6 6 0 000 12z" /></svg>);
export const GlobePulseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 9.91l4.243 4.243a2 2 0 012.828 0l4.243-4.243M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
export const ShieldExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
export const SonicDnaIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 4.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM16 14.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM8 7.25c0 .34.03.67.08.99a5.25 5.25 0 004.84 4.84c.32.05.65.08.99.08s.67-.03.99-.08a5.25 5.25 0 004.84-4.84c.05-.32.08-.65.08-.99s-.03-.67-.08-.99a5.25 5.25 0 00-4.84-4.84c-.32-.05-.65-.08-.99-.08s-.67.03-.99.08a5.25 5.25 0 00-4.84 4.84c-.05.32-.08-.65-.08-.99z" /></svg>);
export const VectorIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l7-7-7-7" /></svg>);
export const TagIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" /></svg>);
export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const AdminToolWrapper: React.FC<{ children: React.ReactNode, title?: string, headerAction?: React.ReactNode }> = ({ children, title, headerAction }) => (
    <div className="admin-hud-card p-4 md:p-6 rounded-2xl animate-fade-in h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-4 shrink-0">
            {title && <h3 className="text-base md:text-lg font-bold text-ui-text-heading truncate">{title}</h3>}
            {headerAction}
        </div>
        <div className="flex-1 min-h-0 flex flex-col text-sm">
            {children}
        </div>
    </div>
);

export const ComingSoonTool: React.FC = () => {
    const { t } = useTranslation();
    return (
     <div className="glass-surface-quantum p-8 md:p-12 text-center rounded-2xl">
        <h3 className="text-2xl font-bold text-ui-text-heading">{t('coming_soon_title')}</h3>
        <p className="text-ui-text-body mt-2">{t('coming_soon_desc')}</p>
    </div>
)};

// --- MODULE 4: ENTERPRISE INFRASTRUCTURE ---

export const WhiteLabelSubDistView: React.FC = () => (
    <AdminToolWrapper title="White-Label Sub-Distribution" headerAction={<button className="btn-quantum-glow px-3 py-1 text-xs font-bold rounded-full text-white">Add Tenant</button>}>
        <div className="overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-ui-text-subtle text-xs uppercase border-b border-ui-border">
                        <th className="p-3">Tenant</th>
                        <th className="p-3">Domain</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-ui-border">
                    <tr><td className="p-3 font-bold text-white">IndieAsia</td><td className="p-3 font-mono text-xs">app.indieasia.com</td><td className="p-3"><span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Active</span></td></tr>
                    <tr><td className="p-3 font-bold text-white">AfroBeats Distro</td><td className="p-3 font-mono text-xs">portal.afrobeats.io</td><td className="p-3"><span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Active</span></td></tr>
                </tbody>
            </table>
        </div>
    </AdminToolWrapper>
);

export const UniversalDataExchangeView: React.FC = () => (
    <AdminToolWrapper title="UDX API Gateway" subtitle="Universal licensing API." icon={<CheckCircleIcon className="w-8 h-8 text-green-400"/>}>
        <div className="bg-black p-4 rounded-xl font-mono text-xs text-green-400">
            {`{ "status": "active", "endpoints": 14, "requests_24h": 14502 }`}
        </div>
    </AdminToolWrapper>
);

export const HighFreqMetadataValidationView: React.FC = () => (
    <AdminToolWrapper title="High-Freq Validation" subtitle="Instant metadata QC." icon={<CheckCircleIcon className="w-8 h-8 text-blue-400"/>}>
        <div className="flex items-center gap-4 p-6 bg-green-900/20 border border-green-500/30 rounded-2xl">
             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">OK</div>
             <div>
                 <h3 className="font-bold text-green-400">System Operational</h3>
                 <p className="text-xs text-green-200">0 Errors in last 500 uploads.</p>
             </div>
        </div>
    </AdminToolWrapper>
);

export const DecentralizedCdnView: React.FC = () => (
    <AdminToolWrapper title="Decentralized CDN" subtitle="IPFS & Arweave Storage." icon={<GlobePulseIcon className="w-8 h-8 text-purple-400"/>}>
         <div className="grid grid-cols-3 gap-4 text-center">
             <div className="p-4 bg-ui-surface rounded-xl border border-ui-border"><p className="text-xs text-ui-text-subtle">Nodes</p><p className="text-xl font-bold text-white">450</p></div>
             <div className="p-4 bg-ui-surface rounded-xl border border-ui-border"><p className="text-xs text-ui-text-subtle">Uptime</p><p className="text-xl font-bold text-green-400">100%</p></div>
             <div className="p-4 bg-ui-surface rounded-xl border border-ui-border"><p className="text-xs text-ui-text-subtle">Redundancy</p><p className="text-xl font-bold text-white">12x</p></div>
         </div>
    </AdminToolWrapper>
);

export const PhysicalSupplyChainView: React.FC = () => (
    <AdminToolWrapper title="Physical Supply Chain" subtitle="Vinyl & CD manufacturing sync." icon={<CubeIcon className="w-8 h-8 text-amber-400"/>}>
         <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
             <h3 className="font-bold text-white mb-2">Inventory Status</h3>
             <div className="flex justify-between items-center border-b border-ui-border py-2">
                 <span>Cosmic Drift (Vinyl)</span>
                 <span className="text-green-400 font-bold">In Stock (450)</span>
             </div>
         </div>
    </AdminToolWrapper>
);

export const GranularRbacView: React.FC = () => (
    <AdminToolWrapper title="Granular RBAC" subtitle="Advanced permission management." icon={<XCircleIcon className="w-8 h-8 text-white"/>}>
         <div className="space-y-2">
             {['Admin', 'Finance', 'A&R', 'Marketing'].map(role => (
                 <div key={role} className="p-4 bg-ui-surface border border-ui-border rounded-xl flex justify-between">
                     <span className="text-white font-bold">{role}</span>
                     <span className="text-ui-text-subtle text-sm">Edit Permissions</span>
                 </div>
             ))}
         </div>
    </AdminToolWrapper>
);

// --- RE-EXPORTS FOR OTHER VIEWS ---
export const RealTimeDatabaseView: React.FC<{ storage: { totalTB: number, usedTB: number }, onExpand: () => void }> = ({ storage, onExpand }) => {
    const usagePercentage = (storage.usedTB / storage.totalTB) * 100;
    return (
        <AdminToolWrapper title="Real-time Database Status">
            <div className="mb-4 shrink-0">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-ui-text-body">Storage Utilization</span>
                    <span className="text-sm font-mono text-ui-text-subtle">{storage.usedTB.toFixed(1)} TB / {storage.totalTB.toFixed(1)} TB</span>
                </div>
                <div className="w-full bg-singularity-black h-6 rounded-md overflow-hidden border border-singularity-purple-transparent p-1">
                    <div 
                        className="h-full rounded bg-gradient-to-r from-singularity-teal to-singularity-pink relative shimmer"
                        style={{ width: `${usagePercentage}%` }}
                    >
                         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-black mix-blend-screen">{usagePercentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>
             <div className="mt-4 pt-4 border-t border-singularity-purple-transparent flex items-center justify-between shrink-0">
                <p className="text-xs text-green-400">System Healthy</p>
                <button onClick={onExpand} className="px-3 py-1 text-xs font-semibold rounded-full bg-singularity-teal/20 text-singularity-teal hover:bg-singularity-teal/30 transition-colors">
                    Expand Storage
                </button>
            </div>
        </AdminToolWrapper>
    );
};

export const WhiteLabelForLabelsView: React.FC = () => (
    <AdminToolWrapper title="White Label Settings">
        <WhiteLabelSettings />
    </AdminToolWrapper>
);

export const CustomDspDestinationBuilderView: React.FC = () => (
    <AdminToolWrapper title="Custom DSP Builder">
        <div className="text-center p-8 text-ui-text-subtle">
            <p>Build custom delivery endpoints for niche platforms.</p>
             <button className="mt-4 btn-quantum-glow px-4 py-2 rounded-lg text-white text-sm font-bold">Add Destination</button>
        </div>
    </AdminToolWrapper>
);

export const ArtistPageGeneratorView: React.FC = () => (
    <AdminToolWrapper title="Artist Page Generator">
        <div className="text-center p-8 text-ui-text-subtle">
             <p>Generate landing pages for your artists.</p>
             <button className="mt-4 btn-quantum-glow px-4 py-2 rounded-lg text-white text-sm font-bold">Select Artist</button>
        </div>
    </AdminToolWrapper>
);

export const FanGatedReleasePortalView: React.FC = () => (
    <AdminToolWrapper title="Fan Gate Portal">
         <div className="text-center p-8 text-ui-text-subtle">
             <p>Create pre-save and follow gates for exclusive content.</p>
             <button className="mt-4 btn-quantum-glow px-4 py-2 rounded-lg text-white text-sm font-bold">Create Gate</button>
        </div>
    </AdminToolWrapper>
);

// Stubbed implementations for previously listed tools (to satisfy imports)
export const SmartArtistVerification: React.FC = () => <AdminToolWrapper title="Identity Verification Queue"><div className="text-center py-8 text-ui-text-subtle">Verification system active.</div></AdminToolWrapper>;
export const AutomatedRoyaltyDisbursement: React.FC = () => <AdminToolWrapper title="Disbursement Engine"><div className="text-center py-8 text-ui-text-subtle">Payout batch processing...</div></AdminToolWrapper>;
export const RealTimeReleaseMonitoring: React.FC = () => <AdminToolWrapper title="Global Delivery Pipeline"><div className="text-center py-8 text-ui-text-subtle">Monitoring active pipelines...</div></AdminToolWrapper>;
export const AiContentViolationDetector: React.FC = () => <AdminToolWrapper title="Content Safety Engine"><div className="text-center py-8 text-ui-text-subtle">Scanning for violations...</div></AdminToolWrapper>;
export const MultiLabelAccountManagement: React.FC = () => <AdminToolWrapper title="Sub-Label & Account Management"><div className="text-center py-8 text-ui-text-subtle">Managing sub-accounts...</div></AdminToolWrapper>;
export const DynamicRightsOwnershipEditor: React.FC = () => <AdminToolWrapper title="Split Visualizer"><div className="text-center py-8 text-ui-text-subtle">Rights editor loaded.</div></AdminToolWrapper>;
export const RoyaltyDisputeResolutionManager: React.FC = () => <AdminToolWrapper title="Dispute Center"><div className="text-center py-8 text-ui-text-subtle">No open disputes.</div></AdminToolWrapper>;
export const GeoTerritoryLicensingControl: React.FC = () => <AdminToolWrapper title="Global Licensing Map"><div className="text-center py-8 text-ui-text-subtle">Map loaded.</div></AdminToolWrapper>;
export const FraudStreamDetectionEngine: React.FC = () => <AdminToolWrapper title="Anomaly Detector"><div className="text-center py-8 text-ui-text-subtle">Fraud detection active.</div></AdminToolWrapper>;
export const AiReleaseSchedulingAdvisor: React.FC = () => <AdminToolWrapper title="Release Date Optimizer"><div className="text-center py-8 text-ui-text-subtle">AI advising schedule...</div></AdminToolWrapper>;
export const MultiPlatformSyncHealthChecker: React.FC = () => <AdminToolWrapper title="DSP Sync Health"><div className="text-center py-8 text-ui-text-subtle">Checking endpoints...</div></AdminToolWrapper>;
export const CustomGenreTagManagement: React.FC = () => <AdminToolWrapper title="Taxonomy Editor"><div className="text-center py-8 text-ui-text-subtle">Managing tags...</div></AdminToolWrapper>;
export const AiBasedMetadataCorrectionTool: React.FC = () => <AdminToolWrapper title="Metadata Issues"><div className="text-center py-8 text-ui-text-subtle">AI correcting metadata...</div></AdminToolWrapper>;
export const RoyaltyTaxComplianceIntegrator: React.FC = () => <AdminToolWrapper title="Tax Forms"><div className="text-center py-8 text-ui-text-subtle">Compliance check...</div></AdminToolWrapper>;
export const ContentStrikeHistoryTracker: React.FC = () => <AdminToolWrapper title="Strike Monitor"><div className="text-center py-8 text-ui-text-subtle">Tracking strikes...</div></AdminToolWrapper>;
export const IntelligentChartPerformanceAnalyzer: React.FC = () => <AdminToolWrapper title="Chart Trajectory"><div className="text-center py-8 text-ui-text-subtle">Analyzing charts...</div></AdminToolWrapper>;
export const ContributorPaymentApprovalQueue: React.FC = () => <AdminToolWrapper title="Payment Queue"><div className="text-center py-8 text-ui-text-subtle">Queue empty.</div></AdminToolWrapper>;
export const ReleaseVersionHistoryAuditTool: React.FC = () => <AdminToolWrapper title="Global Audit Log"><div className="text-center py-8 text-ui-text-subtle">Audit log active.</div></AdminToolWrapper>;
export const RevenueShareSimulationModule: React.FC = () => <AdminToolWrapper title="Split Simulator"><div className="text-center py-8 text-ui-text-subtle">Simulator ready.</div></AdminToolWrapper>;
export const GlobalStreamingTrendWatcher: React.FC = () => <AdminToolWrapper title="Trend Watcher"><div className="text-center py-8 text-ui-text-subtle">Watching global trends...</div></AdminToolWrapper>;
export const EarlyLeakPiracyAlertSystem: React.FC = () => <AdminToolWrapper title="Anti-Piracy Radar"><div className="text-center py-8 text-ui-text-subtle">Scanning for leaks...</div></AdminToolWrapper>;
export const DynamicContractUploaderParser: React.FC = () => <AdminToolWrapper title="Contract Parser"><div className="text-center py-8 text-ui-text-subtle">Ready to parse PDF.</div></AdminToolWrapper>;
export const ContentUploadLimitEnforcer: React.FC = () => <AdminToolWrapper title="Limit Settings"><div className="text-center py-8 text-ui-text-subtle">Limits enforced.</div></AdminToolWrapper>;
export const SecureLabelToLabelCollaborationPortal: React.FC = () => <AdminToolWrapper title="Collab Portal"><div className="text-center py-8 text-ui-text-subtle">Portal open.</div></AdminToolWrapper>;
export const AudioFingerprintConflictChecker: React.FC = () => <AdminToolWrapper title="Fingerprint Lab"><div className="text-center py-8 text-ui-text-subtle">Scanning audio...</div></AdminToolWrapper>;
export const BulkReleaseTemplateGenerator: React.FC = () => <AdminToolWrapper title="Bulk Tools"><div className="text-center py-8 text-ui-text-subtle">Template generator ready.</div></AdminToolWrapper>;
export const CustomRoyaltyRateProfileManager: React.FC = () => <AdminToolWrapper title="Rate Profiles"><div className="text-center py-8 text-ui-text-subtle">Managing rates...</div></AdminToolWrapper>;
export const PerformanceBasedPromotionBudgetTool: React.FC = () => <AdminToolWrapper title="Auto-Boost"><div className="text-center py-8 text-ui-text-subtle">Budget optimizer active.</div></AdminToolWrapper>;
export const PartnerPlatformAccessControlPanel: React.FC = () => <AdminToolWrapper title="Partner Permissions"><div className="text-center py-8 text-ui-text-subtle">Access control loaded.</div></AdminToolWrapper>;
export const StreamDataAnomalyPredictor: React.FC = () => <AdminToolWrapper title="Anomaly AI"><div className="text-center py-8 text-ui-text-subtle">Predicting anomalies...</div></AdminToolWrapper>;
