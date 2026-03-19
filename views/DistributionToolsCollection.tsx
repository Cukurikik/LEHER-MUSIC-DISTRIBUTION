
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import {
    // LegalTech
    DerivativeWorksEngineView as DerivativeWorksEngineViewImpl,
    ConflictResolutionArbitrationView as ConflictResolutionArbitrationViewImpl,
    GlobalPublishingAuditView as GlobalPublishingAuditViewImpl,
    LegacyEstateSuccessionView as LegacyEstateSuccessionViewImpl,
    // Big Data
    CohortRetentionView as CohortRetentionViewImpl,
    PredictiveViralityView as PredictiveViralityViewImpl,
    RoasTrackerView as RoasTrackerViewImpl,
    PsychoacousticTaggingView as PsychoacousticTaggingViewImpl,
    CollaborationMatchmakingView as CollaborationMatchmakingViewImpl,
    // FinTech (Exported from NewToolsImplementations)
    RoyaltyDerivativeTradingView as RoyaltyDerivativeTradingViewImpl,
    DynamicAdvanceScoringView as DynamicAdvanceScoringViewImpl,
    CrossBorderTaxOptimizationView as CrossBorderTaxOptimizationViewImpl,
    SmartSplitPayVestingView as SmartSplitPayVestingViewImpl,
    FiatCryptoSettlementView as FiatCryptoSettlementViewImpl,
    ExpenditureRevenueAuditingView as ExpenditureRevenueAuditingViewImpl,
    // Next Gen
    DynamicAudioFormatView as DynamicAudioFormatViewImpl,
    GeoFencedDropZonesView as GeoFencedDropZonesViewImpl,
    HapticFeedbackEncodingView as HapticFeedbackEncodingViewImpl,
    AiMusicVideoGenV2View as AiMusicVideoGenV2ViewImpl,
    LivestreamRoyaltyMonitorView as LivestreamRoyaltyMonitorViewImpl,
    BiometricFeedbackLoopView as BiometricFeedbackLoopViewImpl,
    // Enterprise Ops
    WhiteLabelSubDistView as WhiteLabelSubDistViewImpl,
    UniversalDataExchangeView as UniversalDataExchangeViewImpl,
    HighFreqMetadataValidationView as HighFreqMetadataValidationViewImpl,
    DecentralizedCdnView as DecentralizedCdnViewImpl,
    PhysicalSupplyChainView as PhysicalSupplyChainViewImpl,
    GranularRbacView as GranularRbacViewImpl,
    // New Rights Tools
    RightsReversionAutomatorView as RightsReversionAutomatorViewImpl,
    ForensicAudioCrawlingView as ForensicAudioCrawlingViewImpl,
    GlobalMechanicalIndexingView as GlobalMechanicalIndexingViewImpl,
    SamplingClearanceMarketplaceView as SamplingClearanceMarketplaceViewImpl,
    DigitalEstateSuccessionView as DigitalEstateSuccessionViewImpl,
    // New Data Tools
    PredictiveLtvAiView as PredictiveLtvAiViewImpl,
    SentimentCorrelationView as SentimentCorrelationViewImpl,
    SonicPenetrationTestingView as SonicPenetrationTestingViewImpl,
    PlaylistReverseEngineeringView as PlaylistReverseEngineeringViewImpl,
    AudiencePsychographicsView as AudiencePsychographicsViewImpl,
    ChurnPredictionTriggerView as ChurnPredictionTriggerViewImpl,
    // Admin Tools (Re-exported for routing)
    AutomatedCorrectionWorkflowView as AutomatedCorrectionWorkflowViewImpl,
    DeveloperSandboxView as DeveloperSandboxViewImpl,

} from './NewToolsImplementations';
import {
    SmartLegalDisputeResolverView as SmartLegalDisputeResolverViewImpl,
    BatchUploaderView as BatchUploaderViewImpl,
    BrandMatchmakingView as BrandMatchmakingViewImpl,
    LyricTranslationView as LyricTranslationViewImpl,
    MasterclassPortalView as MasterclassPortalViewImpl,
    SocialLicensingView as SocialLicensingViewImpl,
    ProofOfOwnershipBlockchainTimestampView as ProofOfOwnershipBlockchainTimestampViewImpl,
    SampleUsageDetectorView as SampleUsageDetectorViewImpl,
    AutomatedDmcaIssuerView as AutomatedDmcaIssuerViewImpl,
    CrossPlatformCopyrightWatchdogView as CrossPlatformCopyrightWatchdogViewImpl,
    SyncLicensingMarketplaceView as SyncLicensingMarketplaceViewImpl,
    LivePerformanceRightsTrackerView as LivePerformanceRightsTrackerViewImpl,
    MicroPublishingView as MicroPublishingViewImpl,
    ReleaseOptimizerView as ReleaseOptimizerViewImpl,
    MerchGeneratorView as MerchGeneratorViewImpl,
    ReputationShieldView as ReputationShieldViewImpl
} from './MoreToolsImplementations';
import { ComingSoonTool } from './ComingSoonTools';
import DistributionToolsDashboardView from './DistributionToolsDashboardView';

// Re-export old tools
export { default as CoverArtAIGeneratorView } from './CoverArtAIGeneratorView';
export { default as RoyaltyAdvanceSimulatorView } from './RoyaltyAdvanceSimulatorView';
export { default as VideoGeneratorView } from './VideoGeneratorView';
export { default as ArtAnimatorView } from './ArtAnimatorView';
export { default as StemSplitterView } from './StemSplitterView';
export { default as SonicTwinView } from './SonicTwinView';
export { default as TrendPredictorView } from './TrendPredictorView';
export { default as MarketFinderView } from './MarketFinderView';
export { default as SplitsView } from './SplitsView';
export { default as LeherLiveView } from './LeherLiveView';
export { default as ListeningPartiesView } from './ListeningPartiesView';
export { default as EpkGeneratorView } from './EpkGeneratorView';
export { default as InstantVocalTranslateView } from './InstantVocalTranslateView';
export { default as CollabHubView } from './CollabHubView';
export { default as FanFeedbackView } from './FanFeedbackView';
export { default as ContentRelocationView } from './ContentRelocationView';
export { default as SpotifyImporterView } from './SpotifyImporterView';
export { default as YouTubeImporterView } from './YouTubeImporterView';
export { default as TakedownRequestView } from './TakedownRequestView';
export { default as SocialWhitelistView } from './SocialWhitelistView';
export { default as PlaylistPitcherView } from './PlaylistPitcherView';
export { default as BannerGeneratorView } from './BannerGeneratorView';
export { default as LyricsGeneratorView } from './LyricsGeneratorView';
export { default as HitPotentialView } from './HitPotentialView';
export { default as LeherIDView } from './LeherIDView';
export { default as SmartLinkDashboardView } from './SmartLinkDashboardView';
export { default as CreateSmartLinkView } from './CreateSmartLinkView';
export { default as AiMasteringView } from './AiMasteringView';
export { default as CreateMasteringView } from './CreateMasteringView';
export { default as MasteringDetailView } from './MasteringDetailView';
export { default as GarmiView } from './GarmiView';
export { default as CareerRpgView } from './CareerRpgView';

// New Export Wrappers for Tools
// FinTech
export const RoyaltyDerivativeTradingView: React.FC = () => <RoyaltyDerivativeTradingViewImpl />;
export const DynamicAdvanceScoringView: React.FC = () => <DynamicAdvanceScoringViewImpl />;
export const CrossBorderTaxOptimizationView: React.FC = () => <CrossBorderTaxOptimizationViewImpl />;
export const SmartSplitPayVestingView: React.FC = () => <SmartSplitPayVestingViewImpl />;
export const FiatCryptoSettlementView: React.FC = () => <FiatCryptoSettlementViewImpl />;
export const ExpenditureRevenueAuditingView: React.FC = () => <ExpenditureRevenueAuditingViewImpl />;

// LegalTech
export const DerivativeWorksEngineView: React.FC = () => <DerivativeWorksEngineViewImpl />;
export const ConflictResolutionArbitrationView: React.FC = () => <ConflictResolutionArbitrationViewImpl />;
export const GlobalPublishingAuditView: React.FC = () => <GlobalPublishingAuditViewImpl />;
export const LegacyEstateSuccessionView: React.FC = () => <LegacyEstateSuccessionViewImpl />;
export const AlgorithmicDisputeTribunalView: React.FC = () => <ConflictResolutionArbitrationViewImpl />; // Reuse implementation
export const RightsReversionAutomatorView: React.FC = () => <RightsReversionAutomatorViewImpl />;
export const ForensicAudioCrawlingView: React.FC = () => <ForensicAudioCrawlingViewImpl />;
export const GlobalMechanicalIndexingView: React.FC = () => <GlobalMechanicalIndexingViewImpl />;
export const SamplingClearanceMarketplaceView: React.FC = () => <SamplingClearanceMarketplaceViewImpl />;
export const DigitalEstateSuccessionView: React.FC = () => <DigitalEstateSuccessionViewImpl />;

// Big Data
export const CohortRetentionView: React.FC = () => <CohortRetentionViewImpl />;
export const PredictiveViralityView: React.FC = () => <PredictiveViralityViewImpl />;
export const RoasTrackerView: React.FC = () => <RoasTrackerViewImpl />;
export const PsychoacousticTaggingView: React.FC = () => <PsychoacousticTaggingViewImpl />;
export const CollaborationMatchmakingView: React.FC = () => <CollaborationMatchmakingViewImpl />;
export const PredictiveLtvAiView: React.FC = () => <PredictiveLtvAiViewImpl />;
export const SentimentCorrelationView: React.FC = () => <SentimentCorrelationViewImpl />;
export const SonicPenetrationTestingView: React.FC = () => <SonicPenetrationTestingViewImpl />;
export const PlaylistReverseEngineeringView: React.FC = () => <PlaylistReverseEngineeringViewImpl />;
export const AudiencePsychographicsView: React.FC = () => <AudiencePsychographicsViewImpl />;
export const ChurnPredictionTriggerView: React.FC = () => <ChurnPredictionTriggerViewImpl />;

// Next Gen
export const DynamicAudioFormatView: React.FC = () => <DynamicAudioFormatViewImpl />;
export const GeoFencedDropZonesView: React.FC = () => <GeoFencedDropZonesViewImpl />;
export const HapticFeedbackEncodingView: React.FC = () => <HapticFeedbackEncodingViewImpl />;
export const AiMusicVideoGenV2View: React.FC = () => <AiMusicVideoGenV2ViewImpl />;
export const LivestreamRoyaltyMonitorView: React.FC = () => <LivestreamRoyaltyMonitorViewImpl />;
export const BiometricFeedbackLoopView: React.FC = () => <BiometricFeedbackLoopViewImpl />;

// Enterprise Ops
export const WhiteLabelSubDistView: React.FC = () => <WhiteLabelSubDistViewImpl />;
export const UniversalDataExchangeView: React.FC = () => <UniversalDataExchangeViewImpl />;
export const HighFreqMetadataValidationView: React.FC = () => <HighFreqMetadataValidationViewImpl />;
export const DecentralizedCdnView: React.FC = () => <DecentralizedCdnViewImpl />;
export const PhysicalSupplyChainView: React.FC = () => <PhysicalSupplyChainViewImpl />;
export const GranularRbacView: React.FC = () => <GranularRbacViewImpl />;
export const AutomatedCorrectionWorkflowView: React.FC = () => <AutomatedCorrectionWorkflowViewImpl />;
export const DeveloperSandboxView: React.FC = () => <DeveloperSandboxViewImpl />;


export const SmartLegalDisputeResolverView: React.FC = () => <SmartLegalDisputeResolverViewImpl />;
export const ProofOfOwnershipBlockchainTimestampView: React.FC = () => <ProofOfOwnershipBlockchainTimestampViewImpl />;
export const SampleUsageDetectorView: React.FC = () => <SampleUsageDetectorViewImpl />;
export const AutomatedDmcaIssuerView: React.FC = () => <AutomatedDmcaIssuerViewImpl />;
export const CrossPlatformCopyrightWatchdogView: React.FC = () => <CrossPlatformCopyrightWatchdogViewImpl />;
export const BatchUploaderView: React.FC = () => <BatchUploaderViewImpl />;
export const SyncLicensingMarketplaceView: React.FC = () => <SyncLicensingMarketplaceViewImpl />;
export const LivePerformanceRightsTrackerView: React.FC = () => <LivePerformanceRightsTrackerViewImpl />;
export const LyricTranslationView: React.FC = () => <LyricTranslationViewImpl />;
export const BrandMatchmakingView: React.FC = () => <BrandMatchmakingViewImpl />;
export const MasterclassPortalView: React.FC = () => <MasterclassPortalViewImpl />;
export const SocialLicensingView: React.FC = () => <SocialLicensingViewImpl />;
export const MicroPublishingView: React.FC = () => <MicroPublishingViewImpl />;
export const ReleaseOptimizerView: React.FC = () => <ReleaseOptimizerViewImpl />;
export const MerchGeneratorView: React.FC = () => <MerchGeneratorViewImpl />;
export const ReputationShieldView: React.FC = () => <ReputationShieldViewImpl />;

export { default as LicenseOutWatermarkingView } from './LicenseOutWatermarkingView';
export { default as DspBrandingOptimizerView } from './DspBrandingOptimizerView';
export { default as VenueAggregatorView } from './VenueAggregatorView';

export const AutoPlatformDistributorView: React.FC = () => <ComingSoonTool titleKey={"tool_auto_platform_distributor_title" as any} descKey={"tool_auto_platform_distributor_desc" as any} />;

export const DistributionToolsCollection: React.FC = () => {
    return <DistributionToolsDashboardView />;
};
