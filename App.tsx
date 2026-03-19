
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { Release, Song, Artist, SmartLinkCampaign, MasteringProject, Notification, FinancialOverview, TierDetails, Contract, SubDistributor, Ebook, YouTubeMusicAlbumSimple, RecentActivity, PayoutRequest, TranslationKeys } from './types';
import { DistributionStatus } from './types';
import Toast from './components/Toast';
import Shell from './components/layout/Shell';
import { DashboardView } from './views/DashboardView';
import { ReleasesView } from './views/ReleasesView';
import VideosView from './views/VideosView';
import { Analytics } from './views/AnalyticsView';
import Artists from './views/Artists';
import PlayerView from './views/PlayerView';
import { CreateReleaseView } from './views/CreateReleaseView';
import { ReleaseManagerView } from './views/ReleaseManagerView';
import SupportView from './views/SupportView';
import SubmitTicketView from './views/SubmitTicketView';
import ApiDocsView from './views/ApiDocsView';
import { PaymentsView } from './views/PaymentsView';
import DistributionToolsDashboardView from './views/DistributionToolsDashboardView';
import IntegrationsView from './views/IntegrationsView';
import ApiUsersView from './views/ApiUsersView';
import AdminDashboardView from './views/AdminDashboardView';
import { startSimulation, stopSimulation } from './services/simulationService';
import { fetchFinancialOverview, getTierDetails } from './services/paymentsService';
import { useTranslation } from './hooks/useTranslation';
import ContractsView from './views/ContractsView';
import SubDistributorsView from './views/SubDistributorsView';
import SettingsView from './views/SettingsView';
import { translations } from './translations';
import RightHoldersView from './views/RightHoldersView';
import CreateLabelView from './views/CreateLabelView';
import NotificationsCenterView from './views/NotificationsCenterView';
import GlobalTransactionsView from './views/GlobalTransactionsView';
import { fetchNotifications } from './services/notificationsService';
import { fetchRecentActivities } from './services/adminService';
import { initialArtists, initialReleases, initialCampaigns, initialMasteringProjects } from './data/releases';
import { initialContracts } from './data/contracts';
import { initialSubDistributors } from './data/subDistributors';
import { ALL_PLATFORMS } from './data/platforms';
import LeherAiChatView from './views/LeherAiChatView';
import { QuantumInsightsView } from './views/QuantumInsightsView';
import { UgcManagementView } from './views/UgcManagementView';
import { CopyrightConflictsView } from './views/CopyrightConflictsView';
import AdminToolDetailView from './views/admin/AdminToolDetailView';
import { generateReleaseStrategy } from './services/geminiService';
import ActivityFeedView from './views/ActivityFeedView';
import AudioAnalysisView from './views/AudioAnalysisView';
import ChangelogView from './views/ChangelogView';
import PromotionsView from './views/PromotionsView';
import MonetizationView from './views/MonetizationView';
import {
    SmartRoyaltySplitterView,
    RealTimeCryptoPaymentView,
    GeoBasedPricingEngineView,
    ListenerTipIntegrationView,
    AIPoweredEarningsForecastView,
    BlockchainTransparencyLedgerView,
    PerformanceBasedBonusView,
    FinancialToolsCollection,
    RoyaltyPreemptiveStrikeView
} from './views/FinancialToolsCollection';
import * as DistTools from './views/DistributionToolsCollection';
import ExpandStorageModal from './components/admin/ExpandStorageModal';
import SuccessModal from './components/SuccessModal';
import LeherExchangeView from './views/LeherExchangeView';

const { HashRouter, Routes, Route, useLocation, Outlet, useNavigate, Navigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const formatCurrency = (value: number, currency: string = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

const INITIAL_RELEASE_IDS = new Set(initialReleases.map(r => r.id));

const AppContent: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>(() => {
      try {
        const storedReleases = localStorage.getItem('leherReleases');
        if (storedReleases) {
            const parsedUserReleases: Release[] = JSON.parse(storedReleases);
            const validUserReleases = parsedUserReleases.filter(r => !INITIAL_RELEASE_IDS.has(r.id));
            return [...validUserReleases, ...initialReleases];
        }
        return initialReleases;
    } catch (error) {
        console.error("Could not load releases from localStorage", error);
        return initialReleases;
    }
  });
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'warning' } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [financials, setFinancials] = useState<FinancialOverview | null>(null);
  const [tierDetails, setTierDetails] = useState<TierDetails | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [dbStorage, setDbStorage] = useState({ totalTB: 32, usedTB: 19.8 });
  const [isExpandModalOpen, setIsExpandModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
      navigate('/');
  }, []);
  
  useEffect(() => {
      const saveToStorage = () => {
          try {
              const releasesToSave = releases.filter(r => !INITIAL_RELEASE_IDS.has(r.id));
              localStorage.setItem('leherReleases', JSON.stringify(releasesToSave));
          } catch (error) {
              console.warn("LocalStorage limit reached. Unable to save new releases.");
          }
      };
      const timeoutId = setTimeout(saveToStorage, 500);
      return () => clearTimeout(timeoutId);
  }, [releases]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message, type });
  }, []);

  const updateSong = useCallback((songId: string, updatedData: Partial<Song>) => {
      setReleases(prev => prev.map(r => r.id === songId ? { ...r, ...updatedData } : r) as Release[]);
  }, []);
  
  const addRelease = useCallback((releaseData: Omit<Song, 'id' | 'status'>) => {
    const newRelease: Song = {
      ...releaseData,
      id: `song-${Date.now()}`, 
      status: DistributionStatus.Draft,
    };
    setReleases(prev => [newRelease, ...prev]);
    showToast(`Draft for "${newRelease.title}" has been created!`, 'success');
    return newRelease.id;
  }, [showToast]);

  const addMultipleSongsFromImport = useCallback((albums: YouTubeMusicAlbumSimple[]) => {
      const newSongs: Song[] = albums.map((album, index) => {
          const artistName = album.artists.map(a => a.name).join(', ');
          return {
            id: `song-import-${Date.now()}-${index}`,
            assetType: 'Audio',
            title: album.name,
            artistId: `artist-import-${artistName.replace(/\s+/g, '-').toLowerCase()}`,
            artistName: artistName,
            genre: 'Imported',
            coverArtUrl: album.thumbnails[0]?.url,
            description: `Imported from external service on ${new Date().toLocaleDateString()}`,
            fileName: `${album.name.replace(/\s+/g, '_')}.wav`,
            status: DistributionStatus.Draft,
            distribution: {},
            releaseType: album.album_type === 'ep' ? 'EP' : album.album_type === 'single' ? 'Single' : 'Album',
            releaseDate: album.release_date,
            cHolder: `${new Date(album.release_date).getFullYear()} ${artistName}`,
            pHolder: `${new Date(album.release_date).getFullYear()} ${artistName}`,
            contributors: album.artists.map(a => ({ id: crypto.randomUUID(), name: a.name, role: 'Main Artist', share: 100 / album.artists.length })),
          } as Song;
      });
      setReleases(prev => [...newSongs, ...prev]);
      showToast(`${newSongs.length} releases imported as drafts successfully!`, 'success');
  }, [showToast]);

  const onDeleteSong = useCallback((songId: string) => {
      setReleases(prev => prev.filter(r => r.id !== songId));
      showToast('Release deleted successfully.', 'warning');
  }, [showToast]);
  
  const onDistribute = useCallback((songId: string, platformIds: string[]) => {
      updateSong(songId, { status: DistributionStatus.Submitted });
      setIsSuccessModalOpen(true);
  }, [updateSong]);

  const onTakedown = useCallback((songId: string, platformId: string) => {
      setReleases(prev => prev.map(r => {
          if (r.id === songId && r.assetType === 'Audio') {
              const updatedSong = { ...r } as Song;
              if (updatedSong.distribution[platformId]) {
                  updatedSong.distribution[platformId]!.status = DistributionStatus.TakedownRequested;
              }
              return updatedSong;
          }
          return r;
      }));
      showToast(`Takedown request for ${platformId} has been submitted.`, 'warning');
  }, [showToast]);
  
  const onGenerateStrategy = useCallback(async (songId: string) => {
    const song = releases.find(r => r.id === songId && r.assetType === 'Audio') as Song | undefined;
    if (song) {
        showToast('Generating marketing strategy with AI...', 'warning');
        const strategy = await generateReleaseStrategy(song.title, song.artistName, song.genre);
        updateSong(songId, { marketingStrategy: strategy });
        showToast('Marketing strategy generated successfully!', 'success');
    }
  }, [releases, updateSong, showToast]);
  
    const handleUpgradeStorage = useCallback((newSizeTB: number, cost: number) => {
        if (!financials || financials.current_balance < cost) {
            showToast("Insufficient balance to upgrade storage.", 'error');
            return;
        }

        const newFinancials: FinancialOverview = {
            ...financials,
            current_balance: financials.current_balance - cost,
        };
        
        setFinancials(newFinancials);
        setTierDetails(getTierDetails(newFinancials.lifetime_income));
        setDbStorage(prev => ({ ...prev, totalTB: newSizeTB }));

        showToast(`Database upgraded to ${newSizeTB}TB. $${cost.toFixed(2)} deducted from your balance.`, 'success');
        setIsExpandModalOpen(false);
    }, [financials, showToast]);

    const handleRequestPayout = useCallback((amount: number, newRequest: PayoutRequest) => {
        if (!financials || financials.current_balance < amount) {
            showToast("Insufficient balance for this payout.", 'error');
            return;
        }

        const newFinancials: FinancialOverview = {
            ...financials,
            current_balance: financials.current_balance - amount,
            pending_balance: financials.pending_balance + amount,
        };
        
        setFinancials(newFinancials);
        
        const newActivity: RecentActivity = {
            id: `act-payout-${Date.now()}`,
            type: 'Withdrawal',
            description: `Payout request of <strong>${formatCurrency(amount)}</strong> via ${newRequest.method} submitted.`,
            timestamp: new Date().toISOString()
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 15));

        showToast(`Payout request for ${formatCurrency(amount)} submitted.`, 'success');
    }, [financials, showToast]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const loadInitialData = async () => {
        const [fetchedNotifications, financialData, fetchedActivities] = await Promise.all([
            fetchNotifications(),
            fetchFinancialOverview(),
            fetchRecentActivities(),
        ]);
        setNotifications(fetchedNotifications);
        setActivities(fetchedActivities);
        setFinancials(financialData.financials);
        setTierDetails(financialData.tierDetails);
    };
    loadInitialData();

    const simulationCallbacks = {
        addSong: addRelease,
        addArtist: (artist: Artist) => setArtists(prev => [artist, ...prev]),
        updateSongStatus: (songId: string, status: Song['status'], distribution?: Song['distribution']) => {
            updateSong(songId, { status, ...(distribution && { distribution }) });
        },
        addNotification: (notification: Notification) => setNotifications(prev => [notification, ...prev]),
        addActivity: (activity: RecentActivity) => {
            setActivities(prev => [activity, ...prev].slice(0, 15));
        },
        updateFinancials: (newOverview: FinancialOverview) => {
            setFinancials(newOverview);
            setTierDetails(getTierDetails(newOverview.lifetime_income));
        },
        getArtists: () => artists,
        getFinancials: () => financials,
    };
    startSimulation(simulationCallbacks);
    return () => stopSimulation();
  }, []);

  const handleMarkOneRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

  const songs = useMemo(() => releases.filter((r): r is Song => r.assetType === 'Audio'), [releases]);
  
  const currentTitle = useMemo(() => {
    const path = location.pathname;
    const routeTitles: { [key: string]: TranslationKeys } = {
      '/': 'title_dashboard', '/releases': 'title_releases', '/videos': 'Music Videos' as any, '/analytics': 'title_analytics',
      '/payments': 'title_payments', '/artists': 'title_artists', '/settings': 'title_settings',
      '/distribution-tools': 'dist_tools_page_title', '/integrations': 'title_integrations',
      '/developer/docs': 'title_api_documentation', '/admin': 'title_admin_dashboard',
      '/leher-ai-chat': 'tool_leher_ai_chat_title', '/quantum-insights': 'title_quantum_insights',
      '/ugc-management': 'title_ugc_management', '/exchange': 'title_exchange', '/changelog': 'Platform Roadmap & Changelog' as any,
      '/promotions': 'Growth & Promotion' as any, '/monetization': 'Advanced Monetization' as any,
    };
    if (path.startsWith('/release/')) return t('title_release_manager');
    const titleKey = routeTitles[path];
    return titleKey ? (typeof titleKey === 'string' && !translations.id[titleKey] && !translations.en[titleKey as keyof typeof translations['en']] ? titleKey : t(titleKey)) : "Leher Music";
  }, [location, t]);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
       <ExpandStorageModal 
            isOpen={isExpandModalOpen}
            onClose={() => setIsExpandModalOpen(false)}
            currentSize={dbStorage.totalTB}
            maxSize={700}
            balance={financials?.current_balance || 0}
            onConfirmUpgrade={handleUpgradeStorage}
        />
        <SuccessModal 
            isOpen={isSuccessModalOpen} 
            onClose={() => setIsSuccessModalOpen(false)} 
        />
      <Routes>
          <Route path="/" element={
            <Shell title={currentTitle} notifications={notifications} onMarkOneRead={handleMarkOneRead} onMarkAllRead={handleMarkAllRead}>
              <Outlet />
            </Shell>
          }>
              <Route index element={<DashboardView songs={releases} showToast={showToast} />} />
              <Route path="artists" element={<Artists artists={artists} songs={releases} />} />
              <Route path="payments" element={<PaymentsView showToast={showToast} overviewData={financials} tierDetails={tierDetails} songs={songs} onRequestPayout={handleRequestPayout} />} />
              <Route path="promotions" element={<PromotionsView />} />
              <Route path="monetization" element={<MonetizationView />} />
              <Route path="exchange" element={<LeherExchangeView songs={songs} showToast={showToast} />} />
              <Route path="integrations" element={<IntegrationsView songs={songs} />} />
              <Route path="support" element={<SupportView />} />
              <Route path="settings" element={<SettingsView showToast={showToast}/>} />
              <Route path="right-holders" element={<RightHoldersView />} />
              <Route path="releases" element={<ReleasesView releases={releases} onDeleteSong={onDeleteSong} />} />
              <Route path="videos" element={<VideosView releases={releases} onDeleteSong={onDeleteSong} />} />
              <Route path="analytics" element={<Analytics songs={releases} />} />
              <Route path="create-release" element={<CreateReleaseView artists={artists} addRelease={addRelease} />} />
              <Route path="release/:songId" element={<ReleaseManagerView songs={releases} onDeleteSong={onDeleteSong} onDistribute={onDistribute} onTakedown={onTakedown} onUpdateSong={updateSong} showToast={showToast} onGenerateStrategy={onGenerateStrategy} />} />
              <Route path="support/submit-ticket" element={<SubmitTicketView showToast={showToast} />} />
              <Route path="developer/docs" element={<ApiDocsView />} />
              <Route path="admin" element={<AdminDashboardView activities={activities} dbStorage={dbStorage} onExpandStorage={() => setIsExpandModalOpen(true)} />} />
              <Route path="admin/activity" element={<ActivityFeedView />} />
              <Route path="admin/:toolId" element={<AdminToolDetailView dbStorage={dbStorage} onExpandStorage={() => setIsExpandModalOpen(true)}/>} />
              <Route path="admin/contracts" element={<ContractsView contracts={initialContracts} onApprove={() => {}} />} />
              <Route path="admin/sub-distributors" element={<SubDistributorsView subDistributors={initialSubDistributors} contracts={initialContracts} />} />
              <Route path="admin/sub-distributors/create" element={<CreateLabelView addSubDistributor={() => {}} contracts={initialContracts} />} />
              <Route path="notifications" element={<NotificationsCenterView notifications={notifications} onMarkOneRead={handleMarkOneRead} onMarkAllRead={handleMarkAllRead} />} />
              <Route path="transactions" element={<GlobalTransactionsView />} />
              <Route path="leher-ai-chat" element={<LeherAiChatView />} />
              <Route path="quantum-insights" element={<QuantumInsightsView />} />
              <Route path="ugc-management" element={<UgcManagementView songs={songs} showToast={showToast} />} />
              <Route path="copyright-conflicts" element={<CopyrightConflictsView songs={songs} />} />
              <Route path="distribution-tools" element={<DistributionToolsDashboardView />} />
              <Route path="changelog" element={<ChangelogView />} />

              {/* --- TOOLKIT ROUTES (All 30 Features + Legacy) --- */}
              
              {/* FinTech */}
              <Route path="distribution-tools/royalty-derivative-trading" element={<DistTools.RoyaltyDerivativeTradingView />} />
              <Route path="distribution-tools/dynamic-advance-scoring" element={<DistTools.DynamicAdvanceScoringView />} />
              <Route path="distribution-tools/cross-border-tax-optimization" element={<DistTools.CrossBorderTaxOptimizationView />} />
              <Route path="distribution-tools/smart-split-pay-vesting" element={<DistTools.SmartSplitPayVestingView />} />
              <Route path="distribution-tools/fiat-crypto-settlement" element={<DistTools.FiatCryptoSettlementView />} />
              <Route path="distribution-tools/expenditure-revenue-auditing" element={<DistTools.ExpenditureRevenueAuditingView />} />

              {/* LegalTech */}
              <Route path="distribution-tools/algorithmic-dispute-tribunal" element={<DistTools.AlgorithmicDisputeTribunalView />} />
              <Route path="distribution-tools/rights-reversion-automator" element={<DistTools.RightsReversionAutomatorView />} />
              <Route path="distribution-tools/forensic-audio-crawling" element={<DistTools.ForensicAudioCrawlingView />} />
              <Route path="distribution-tools/global-mechanical-indexing" element={<DistTools.GlobalMechanicalIndexingView />} />
              <Route path="distribution-tools/sampling-clearance-marketplace" element={<DistTools.SamplingClearanceMarketplaceView />} />
              <Route path="distribution-tools/digital-estate-succession" element={<DistTools.DigitalEstateSuccessionView />} />

              {/* Big Data */}
              <Route path="distribution-tools/predictive-ltv-ai" element={<DistTools.PredictiveLtvAiView />} />
              <Route path="distribution-tools/sentiment-correlation" element={<DistTools.SentimentCorrelationView />} />
              <Route path="distribution-tools/sonic-penetration-testing" element={<DistTools.SonicPenetrationTestingView />} />
              <Route path="distribution-tools/playlist-reverse-engineering" element={<DistTools.PlaylistReverseEngineeringView />} />
              <Route path="distribution-tools/audience-psychographics" element={<DistTools.AudiencePsychographicsView />} />
              <Route path="distribution-tools/churn-prediction-trigger" element={<DistTools.ChurnPredictionTriggerView />} />

              {/* Enterprise Ops */}
              <Route path="distribution-tools/white-label-multitenant" element={<DistTools.WhiteLabelSubDistView />} />
              <Route path="distribution-tools/universal-data-exchange-api" element={<DistTools.UniversalDataExchangeView />} />
              <Route path="distribution-tools/high-freq-metadata-validation" element={<DistTools.HighFreqMetadataValidationView />} />
              <Route path="distribution-tools/decentralized-cdn" element={<DistTools.DecentralizedCdnView />} />
              <Route path="distribution-tools/physical-supply-chain" element={<DistTools.PhysicalSupplyChainView />} />
              <Route path="distribution-tools/granular-rbac" element={<DistTools.GranularRbacView />} />

              {/* Next Gen */}
              <Route path="distribution-tools/dynamic-audio-format" element={<DistTools.DynamicAudioFormatView />} />
              <Route path="distribution-tools/geo-fenced-drop-zones" element={<DistTools.GeoFencedDropZonesView />} />
              <Route path="distribution-tools/haptic-feedback-encoding" element={<DistTools.HapticFeedbackEncodingView />} />
              <Route path="distribution-tools/ai-music-video-gen-v2" element={<DistTools.AiMusicVideoGenV2View />} />
              <Route path="distribution-tools/livestream-royalty-monitor" element={<DistTools.LivestreamRoyaltyMonitorView />} />
              <Route path="distribution-tools/biometric-feedback-loop" element={<DistTools.BiometricFeedbackLoopView />} />

              {/* Legacy & Existing */}
              <Route path="distribution-tools/batch-uploader" element={<DistTools.BatchUploaderView />} />
              <Route path="distribution-tools/sync-licensing-marketplace" element={<DistTools.SyncLicensingMarketplaceView />} />
              <Route path="distribution-tools/live-performance-rights-tracker" element={<DistTools.LivePerformanceRightsTrackerView />} />
              <Route path="distribution-tools/leher-id" element={<DistTools.LeherIDView />} />
              <Route path="distribution-tools/ai-music-video-generator" element={<DistTools.VideoGeneratorView />} />
              <Route path="distribution-tools/ai-cover-art-animator" element={<DistTools.ArtAnimatorView />} />
              <Route path="distribution-tools/ai-stem-splitter" element={<DistTools.StemSplitterView />} />
              <Route path="distribution-tools/audio-analysis" element={<AudioAnalysisView />} />
              <Route path="distribution-tools/sonic-twin-finder" element={<DistTools.SonicTwinView />} />
              <Route path="distribution-tools/viral-trend-predictor" element={<DistTools.TrendPredictorView />} />
              <Route path="distribution-tools/market-opportunity-finder" element={<DistTools.MarketFinderView />} />
              <Route path="distribution-tools/royalty-advance-simulator" element={<DistTools.RoyaltyAdvanceSimulatorView />} />
              <Route path="distribution-tools/automated-split-sheets" element={<DistTools.SplitsView />} />
              <Route path="distribution-tools/leher-live" element={<DistTools.LeherLiveView />} />
              <Route path="distribution-tools/listening-parties" element={<DistTools.ListeningPartiesView />} />
              <Route path="distribution-tools/ai-press-kit-generator" element={<DistTools.EpkGeneratorView />} />
              <Route path="distribution-tools/instant-vocal-translate" element={<DistTools.InstantVocalTranslateView />} />
              <Route path="distribution-tools/collab-hub" element={<DistTools.CollabHubView />} />
              <Route path="distribution-tools/fan-feedback-portal" element={<DistTools.FanFeedbackView />} />
              <Route path="distribution-tools/content-relocation-form" element={<DistTools.ContentRelocationView showToast={showToast}/>} />
              <Route path="distribution-tools/spotify-importer" element={<DistTools.SpotifyImporterView addMultipleSongsFromImport={addMultipleSongsFromImport} />} />
              <Route path="distribution-tools/youtube-importer" element={<DistTools.YouTubeImporterView addMultipleSongsFromImport={addMultipleSongsFromImport} />} />
              <Route path="distribution-tools/takedown-request-form" element={<DistTools.TakedownRequestView songs={songs} showToast={showToast}/>} />
              <Route path="distribution-tools/ugc-whitelist-form" element={<DistTools.SocialWhitelistView songs={songs} showToast={showToast}/>} />
              <Route path="distribution-tools/playlist-pitcher" element={<DistTools.PlaylistPitcherView songs={songs} showToast={showToast}/>} />
              <Route path="distribution-tools/banner-generator" element={<DistTools.BannerGeneratorView songs={songs} showToast={showToast}/>} />
              <Route path="distribution-tools/lyrics-generator" element={<DistTools.LyricsGeneratorView showToast={showToast}/>} />
              <Route path="distribution-tools/quantum-hit-potential" element={<DistTools.HitPotentialView />} />
              <Route path="distribution-tools/cover-art-ai-generator" element={<DistTools.CoverArtAIGeneratorView />} />
              <Route path="distribution-tools/smart-links" element={<DistTools.SmartLinkDashboardView campaigns={initialCampaigns} />} />
              <Route path="distribution-tools/smart-links/create" element={<DistTools.CreateSmartLinkView songs={songs} addCampaign={() => {}} />} />
              <Route path="distribution-tools/ai-mastering" element={<DistTools.AiMasteringView projects={initialMasteringProjects} />} />
              <Route path="distribution-tools/ai-mastering/new" element={<DistTools.CreateMasteringView songs={songs} addMasteringProject={() => {}} />} />
              <Route path="distribution-tools/ai-mastering/:projectId" element={<DistTools.MasteringDetailView projects={initialMasteringProjects} />} />
              <Route path="distribution-tools/smart-legal-dispute-resolver" element={<DistTools.SmartLegalDisputeResolverView />} />
              <Route path="distribution-tools/proof-of-ownership-blockchain-timestamp" element={<DistTools.ProofOfOwnershipBlockchainTimestampView />} />
              <Route path="distribution-tools/sample-usage-detector" element={<DistTools.SampleUsageDetectorView />} />
              <Route path="distribution-tools/automated-dmca-issuer" element={<DistTools.AutomatedDmcaIssuerView />} />
              <Route path="distribution-tools/cross-platform-copyright-watchdog" element={<DistTools.CrossPlatformCopyrightWatchdogView />} />
              <Route path="distribution-tools/garmi" element={<DistTools.GarmiView />} />
              <Route path="distribution-tools/career-rpg" element={<DistTools.CareerRpgView />} />
             
             <Route path="distribution-tools/license-out-watermarking" element={<DistTools.LicenseOutWatermarkingView />} />
             <Route path="distribution-tools/dsp-branding-optimizer" element={<DistTools.DspBrandingOptimizerView />} />
             <Route path="distribution-tools/venue-performance-aggregator" element={<DistTools.VenueAggregatorView />} />

             <Route path="distribution-tools/lyric-translation" element={<DistTools.LyricTranslationView />} />
             <Route path="distribution-tools/brand-matchmaking" element={<DistTools.BrandMatchmakingView />} />
             <Route path="distribution-tools/masterclass-portal" element={<DistTools.MasterclassPortalView />} />
             <Route path="distribution-tools/social-licensing" element={<DistTools.SocialLicensingView />} />
             <Route path="distribution-tools/micro-publishing" element={<DistTools.MicroPublishingView />} />
             <Route path="distribution-tools/release-optimizer" element={<DistTools.ReleaseOptimizerView />} />
             <Route path="distribution-tools/merch-generator" element={<DistTools.MerchGeneratorView />} />
             <Route path="distribution-tools/reputation-shield" element={<DistTools.ReputationShieldView />} />

              {/* --- Financial Views (Legacy Routes kept) --- */}
              <Route path="payments/smart-royalty-splitter" element={<SmartRoyaltySplitterView songs={songs} showToast={showToast} />} />
              <Route path="payments/real-time-crypto-payment" element={<RealTimeCryptoPaymentView songs={songs} showToast={showToast} />} />
              <Route path="payments/geo-based-pricing-engine" element={<GeoBasedPricingEngineView songs={songs} showToast={showToast} />} />
              <Route path="payments/listener-tip-integration" element={<ListenerTipIntegrationView songs={songs} showToast={showToast} />} />
              <Route path="payments/ai-powered-earnings-forecast" element={<AIPoweredEarningsForecastView songs={songs} showToast={showToast} />} />
              <Route path="payments/blockchain-transparency-ledger" element={<BlockchainTransparencyLedgerView songs={songs} showToast={showToast} />} />
              <Route path="payments/performance-based-bonus" element={<PerformanceBasedBonusView songs={songs} showToast={showToast} />} />
              <Route path="payments/royalty-preemptive-strike" element={<RoyaltyPreemptiveStrikeView songs={songs} showToast={showToast} />} />
               
              <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/player/:platformId/:songId" element={<PlayerView songs={songs} />} />
      </Routes>
    </>
  );
};

export const App: React.FC = () => {
    return (
        <HashRouter>
            <AppContent />
        </HashRouter>
    );
};
export default App;
