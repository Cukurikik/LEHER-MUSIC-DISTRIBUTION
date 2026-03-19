
import React, { useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ADMIN_TOOLS } from '../../data/tools';
import { useTranslation } from '../../hooks/useTranslation';
import {
    SmartArtistVerification,
    AutomatedRoyaltyDisbursement,
    RealTimeReleaseMonitoring,
    AiContentViolationDetector,
    MultiLabelAccountManagement,
    DynamicRightsOwnershipEditor,
    RoyaltyDisputeResolutionManager,
    GeoTerritoryLicensingControl,
    FraudStreamDetectionEngine,
    AiReleaseSchedulingAdvisor,
    RealTimeDatabaseView as RealTimeDatabaseViewImpl,
    WhiteLabelForLabelsView,
    CustomDspDestinationBuilderView,
    ArtistPageGeneratorView,
    FanGatedReleasePortalView,
    MultiPlatformSyncHealthChecker,
    CustomGenreTagManagement,
    AiBasedMetadataCorrectionTool,
    RoyaltyTaxComplianceIntegrator,
    ContentStrikeHistoryTracker,
    IntelligentChartPerformanceAnalyzer,
    ContributorPaymentApprovalQueue,
    ReleaseVersionHistoryAuditTool,
    RevenueShareSimulationModule,
    GlobalStreamingTrendWatcher,
    EarlyLeakPiracyAlertSystem,
    DynamicContractUploaderParser,
    ContentUploadLimitEnforcer,
    SecureLabelToLabelCollaborationPortal,
    AudioFingerprintConflictChecker,
    BulkReleaseTemplateGenerator,
    CustomRoyaltyRateProfileManager,
    PerformanceBasedPromotionBudgetTool,
    PartnerPlatformAccessControlPanel,
    StreamDataAnomalyPredictor,
    ComingSoonTool
} from './AdminToolImplementations';
import { 
    GavelIcon,
    ShieldVortexIcon,
    GlobePulseIcon,
    ShieldExclamationIcon,
    SonicDnaIcon,
    VectorIcon,
} from '../../components/icons/AdminIcons';
import TagIcon from '../../components/icons/TagIcon';
import ClockIcon from '../../components/icons/ClockIcon';


const { useParams, useNavigate, Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

// --- ICONS (Defined and Exported for use in data/tools.ts) ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);


interface AdminToolComponentProps {
    toolId: string;
    dbStorage: { totalTB: number, usedTB: number };
    onExpandStorage: () => void;
}

// Main Router Component within the file
const AdminToolComponent: React.FC<AdminToolComponentProps> = ({ toolId, dbStorage, onExpandStorage }) => {
    switch (toolId) {
        case 'smart-artist-verification': return <SmartArtistVerification />;
        case 'automated-royalty-disbursement': return <AutomatedRoyaltyDisbursement />;
        case 'real-time-release-monitoring': return <RealTimeReleaseMonitoring />;
        case 'ai-content-violation-detector': return <AiContentViolationDetector />;
        case 'multi-label-account-management': return <MultiLabelAccountManagement />;
        case 'dynamic-rights-ownership-editor': return <DynamicRightsOwnershipEditor />;
        case 'royalty-dispute-resolution-manager': return <RoyaltyDisputeResolutionManager />;
        case 'geo-territory-licensing-control': return <GeoTerritoryLicensingControl />;
        case 'fraud-stream-detection-engine': return <FraudStreamDetectionEngine />;
        case 'ai-based-release-scheduling-advisor': return <AiReleaseSchedulingAdvisor />;
        case 'real-time-database': return <RealTimeDatabaseViewImpl storage={dbStorage} onExpand={onExpandStorage} />;
        
        // --- NEW BRANDING TOOLS ---
        case 'white-label-for-labels': return <WhiteLabelForLabelsView />;
        case 'custom-dsp-destination-builder': return <CustomDspDestinationBuilderView />;
        case 'artist-page-generator': return <ArtistPageGeneratorView />;
        case 'fan-gated-release-portal': return <FanGatedReleasePortalView />;
        
        // --- IMPLEMENTED TOOLS ---
        case 'multi-platform-sync-health-checker': return <MultiPlatformSyncHealthChecker />;
        case 'custom-genre-tag-management': return <CustomGenreTagManagement />;
        case 'ai-based-metadata-correction-tool': return <AiBasedMetadataCorrectionTool />;
        case 'royalty-tax-compliance-integrator': return <RoyaltyTaxComplianceIntegrator />;
        case 'content-strike-history-tracker': return <ContentStrikeHistoryTracker />;
        case 'intelligent-chart-performance-analyzer': return <IntelligentChartPerformanceAnalyzer />;
        case 'contributor-payment-approval-queue': return <ContributorPaymentApprovalQueue />;
        case 'release-version-history-audit-tool': return <ReleaseVersionHistoryAuditTool />;
        case 'revenue-share-simulation-module': return <RevenueShareSimulationModule />;
        case 'global-streaming-trend-watcher': return <GlobalStreamingTrendWatcher />;
        case 'early-leak-piracy-alert-system': return <EarlyLeakPiracyAlertSystem />;
        case 'dynamic-contract-uploader-parser': return <DynamicContractUploaderParser />;
        case 'content-upload-limit-enforcer': return <ContentUploadLimitEnforcer />;
        case 'secure-label-to-label-collaboration-portal': return <SecureLabelToLabelCollaborationPortal />;
        case 'audio-fingerprint-conflict-checker': return <AudioFingerprintConflictChecker />;
        case 'bulk-release-template-generator': return <BulkReleaseTemplateGenerator />;
        case 'custom-royalty-rate-profile-manager': return <CustomRoyaltyRateProfileManager />;
        case 'performance-based-promotion-budget-tool': return <PerformanceBasedPromotionBudgetTool />;
        case 'partner-platform-access-control-panel': return <PartnerPlatformAccessControlPanel />;
        case 'stream-data-anomaly-predictor': return <StreamDataAnomalyPredictor />;
        
        default:
            return <ComingSoonTool />;
    }
};

interface AdminToolDetailViewProps {
    dbStorage: { totalTB: number, usedTB: number };
    onExpandStorage: () => void;
}

const AdminToolDetailView: React.FC<AdminToolDetailViewProps> = ({ dbStorage, onExpandStorage }) => {
    const { toolId } = useParams() as { toolId: string };
    const navigate = useNavigate();
    const { t } = useTranslation();

    const tool = useMemo(() => ADMIN_TOOLS.find(t => t.id === toolId), [toolId]);

    if (!tool) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold">Tool not found</h2>
                <Link to="/admin" className="text-primary mt-4 inline-block">Back to Admin Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="admin-header">
                <button onClick={() => navigate('/admin')} className="mb-4 inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Admin Dashboard
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-singularity-purple/20 flex items-center justify-center">
                        <tool.icon className="w-8 h-8 text-singularity-purple" />
                    </div>
                    <div>
                        <h1 className="text-gradient-singularity">{t(tool.titleKey)}</h1>
                        <p className="text-ui-text-body mt-1">{t(tool.descKey)}</p>
                    </div>
                </div>
            </header>

            <div className="animate-page-fade-in-up">
                <AdminToolComponent toolId={toolId!} dbStorage={dbStorage} onExpandStorage={onExpandStorage} />
            </div>
        </div>
    );
};

export default AdminToolDetailView;
