
import React from 'react';
import type { TranslationKeys, AdminTool, AdminToolCategory, Tool, ToolCategory } from '../types';
import AnalyticsIcon from '../components/icons/AnalyticsIcon';
import AudioWaveIcon from '../components/icons/AudioWaveIcon';
import ArtistIcon from '../components/icons/ArtistIcon';
import CashIcon from '../components/icons/CashIcon';
import GlobeIcon from '../components/icons/GlobeIcon';
import ProcessingIcon from '../components/icons/ProcessingIcon';
import ToolkitIcon from '../components/icons/ToolkitIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import CopyrightIcon from '../components/icons/CopyrightIcon';
import LinkIcon from '../components/icons/LinkIcon';
import LocationMarkerIcon from '../components/icons/LocationMarkerIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import ChatAlt2Icon from '../components/icons/ChatAlt2Icon';
import FilmIcon from '../components/icons/FilmIcon';
import ColorSwatchIcon from '../components/icons/ColorSwatchIcon';
import TrendingUpIcon from '../components/icons/TrendingUpIcon';
import DocumentSearchIcon from '../components/icons/DocumentSearchIcon';
import UserGroupIcon from '../components/icons/UserGroupIcon';
import FolderIcon from '../components/icons/FolderIcon';
import TableIcon from '../components/icons/TableIcon';
import PencilAltIcon from '../components/icons/PencilAltIcon';
import TicketIcon from '../components/icons/TicketIcon';
import ImportIcon from '../components/icons/ImportIcon';
import RelocationIcon from '../components/icons/RelocationIcon';
import TakedownIcon from '../components/icons/TakedownIcon';
import WhitelistIcon from '../components/icons/WhitelistIcon';
import MegaphoneIcon from '../components/icons/MegaphoneIcon';
import BannerIcon from '../components/icons/BannerIcon';
import LyricsIcon from '../components/icons/LyricsIcon';
import MasteringIcon from '../components/icons/MasteringIcon';
import SmartLinkIcon from '../components/icons/SmartLinkIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import PlugIcon from '../components/icons/PlugIcon';
import SparklesIcon from '../components/layout/SparklesIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import KeyIcon from '../components/icons/KeyIcon';
import BuildingIcon from '../components/icons/BuildingIcon';
import UploadIcon from '../components/icons/UploadIcon';
import ChipIcon from '../components/icons/ChipIcon';
import SearchIcon from '../components/icons/SearchIcon';
import WarningIcon from '../components/icons/WarningIcon';
import LockClosedIcon from '../components/icons/LockClosedIcon';
import VideoCameraIcon from '../components/icons/VideoCameraIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import { 
    GavelIcon,
    ShieldVortexIcon,
    GlobePulseIcon,
    ShieldExclamationIcon,
    SonicDnaIcon,
    VectorIcon,
    RocketIcon,
    TagIcon,
    ClockIcon,
    HeartIcon,
    RadioIcon,
    ListIcon,
    UserRemoveIcon,
    CubeIcon
} from '../components/icons/AdminIcons';

export const TOOLS: Tool[] = [
    { id: 'audio-analysis', title: 'tool_audio_analysis_title', description: 'tool_audio_analysis_desc', category: 'Otomasi & AI', icon: AudioWaveIcon, isPro: false, ctaText: 'tool_audio_analysis_cta', link: '/distribution-tools/audio-analysis' },
    // --- MODUL 1: FINANCIAL SOVEREIGNTY ENGINE (Moved to Toolkit) ---
    { id: 'royalty-derivative-trading', title: 'tool_royalty_derivative_trading_title', description: 'tool_royalty_derivative_trading_desc', category: 'Royalti & Keuangan', icon: TrendingUpIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/royalty-derivative-trading' },
    { id: 'dynamic-advance-scoring', title: 'tool_dynamic_advance_scoring_title', description: 'tool_dynamic_advance_scoring_desc', category: 'Royalti & Keuangan', icon: AnalyticsIcon, isPro: true, ctaText: 'tool_cta_check', link: '/distribution-tools/dynamic-advance-scoring' },
    { id: 'cross-border-tax-optimization', title: 'tool_cross_border_tax_optimization_title', description: 'tool_cross_border_tax_optimization_desc', category: 'Royalti & Keuangan', icon: GlobeIcon, isPro: true, ctaText: 'tool_cta_optimize', link: '/distribution-tools/cross-border-tax-optimization' },
    { id: 'smart-split-pay-vesting', title: 'tool_smart_split_pay_vesting_title', description: 'tool_smart_split_pay_vesting_desc', category: 'Royalti & Keuangan', icon: FolderIcon, isPro: true, ctaText: 'tool_cta_setup', link: '/distribution-tools/smart-split-pay-vesting' },
    { id: 'fiat-crypto-settlement', title: 'tool_fiat_crypto_settlement_title', description: 'tool_fiat_crypto_settlement_desc', category: 'Royalti & Keuangan', icon: CashIcon, isPro: true, ctaText: 'tool_cta_withdraw', link: '/distribution-tools/fiat-crypto-settlement' },
    { id: 'expenditure-revenue-auditing', title: 'tool_expenditure_revenue_auditing_title', description: 'tool_expenditure_revenue_auditing_desc', category: 'Royalti & Keuangan', icon: TableIcon, isPro: true, ctaText: 'tool_cta_audit', link: '/distribution-tools/expenditure-revenue-auditing' },

    // --- MODUL 2: LEGAL & RIGHTS GUARDIAN (Moved to Toolkit) ---
    { id: 'algorithmic-dispute-tribunal', title: 'tool_algorithmic_dispute_tribunal_title', description: 'tool_algorithmic_dispute_tribunal_desc', category: 'Hak Cipta & Legal', icon: GavelIcon, isPro: true, ctaText: 'tool_cta_resolve', link: '/distribution-tools/algorithmic-dispute-tribunal' },
    { id: 'rights-reversion-automator', title: 'tool_rights_reversion_automator_title', description: 'tool_rights_reversion_automator_desc', category: 'Hak Cipta & Legal', icon: ClockIcon, isPro: true, ctaText: 'tool_cta_schedule', link: '/distribution-tools/rights-reversion-automator' },
    { id: 'forensic-audio-crawling', title: 'tool_forensic_audio_crawling_title', description: 'tool_forensic_audio_crawling_desc', category: 'Hak & Keamanan', icon: ShieldVortexIcon, isPro: true, ctaText: 'tool_cta_scan', link: '/distribution-tools/forensic-audio-crawling' },
    { id: 'global-mechanical-indexing', title: 'tool_global_mechanical_indexing_title', description: 'tool_global_mechanical_indexing_desc', category: 'Hak Cipta & Legal', icon: GlobePulseIcon, isPro: true, ctaText: 'tool_cta_sync', link: '/distribution-tools/global-mechanical-indexing' },
    { id: 'sampling-clearance-marketplace', title: 'tool_sampling_clearance_marketplace_title', description: 'tool_sampling_clearance_marketplace_desc', category: 'Hak Cipta & Legal', icon: SonicDnaIcon, isPro: true, ctaText: 'tool_cta_license', link: '/distribution-tools/sampling-clearance-marketplace' },
    { id: 'digital-estate-succession', title: 'tool_digital_estate_succession_title', description: 'tool_digital_estate_succession_desc', category: 'Hak Cipta & Legal', icon: LockClosedIcon, isPro: true, ctaText: 'tool_cta_configure', link: '/distribution-tools/digital-estate-succession' },

    // --- MODUL 3: HYPER-INTELLIGENCE HUB (Moved to Toolkit) ---
    { id: 'predictive-ltv-ai', title: 'tool_predictive_ltv_ai_title', description: 'tool_predictive_ltv_ai_desc', category: 'Otomasi & AI', icon: VectorIcon, isPro: true, ctaText: 'tool_cta_predict', link: '/distribution-tools/predictive-ltv-ai' },
    { id: 'sentiment-correlation', title: 'tool_sentiment_correlation_title', description: 'tool_sentiment_correlation_desc', category: 'Pemasaran & Jangkauan', icon: HeartIcon, isPro: true, ctaText: 'tool_cta_view', link: '/distribution-tools/sentiment-correlation' },
    { id: 'sonic-penetration-testing', title: 'tool_sonic_penetration_testing_title', description: 'tool_sonic_penetration_testing_desc', category: 'Otomasi & AI', icon: RadioIcon, isPro: true, ctaText: 'tool_cta_setup', link: '/distribution-tools/sonic-penetration-testing' },
    { id: 'playlist-reverse-engineering', title: 'tool_playlist_reverse_engineering_title', description: 'tool_playlist_reverse_engineering_desc', category: 'Pemasaran & Jangkauan', icon: ListIcon, isPro: true, ctaText: 'tool_cta_track', link: '/distribution-tools/playlist-reverse-engineering' },
    { id: 'audience-psychographics', title: 'tool_audience_psychographics_title', description: 'tool_audience_psychographics_desc', category: 'Pemasaran & Jangkauan', icon: UserGroupIcon, isPro: true, ctaText: 'tool_cta_analyze', link: '/distribution-tools/audience-psychographics' },
    { id: 'churn-prediction-trigger', title: 'tool_churn_prediction_trigger_title', description: 'tool_churn_prediction_trigger_desc', category: 'Pemasaran & Jangkauan', icon: UserRemoveIcon, isPro: true, ctaText: 'tool_cta_find', link: '/distribution-tools/churn-prediction-trigger' },

    // --- MODUL 4: ENTERPRISE INFRASTRUCTURE (Moved to Toolkit) ---
    { id: 'white-label-multitenant', title: 'tool_white_label_multitenant_title', description: 'tool_white_label_multitenant_desc', category: 'Manajemen Rilis', icon: BuildingIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/white-label-multitenant' },
    { id: 'universal-data-exchange-api', title: 'tool_universal_data_exchange_api_title', description: 'tool_universal_data_exchange_api_desc', category: 'Otomasi & AI', icon: PlugIcon, isPro: true, ctaText: 'tool_cta_connect', link: '/distribution-tools/universal-data-exchange-api' },
    { id: 'high-freq-metadata-validation', title: 'tool_high_freq_metadata_validation_title', description: 'tool_high_freq_metadata_validation_desc', category: 'Manajemen Rilis', icon: CheckCircleIcon, isPro: true, ctaText: 'tool_cta_check', link: '/distribution-tools/high-freq-metadata-validation' },
    { id: 'decentralized-cdn', title: 'tool_decentralized_cdn_title', description: 'tool_decentralized_cdn_desc', category: 'Hak & Keamanan', icon: GlobeIcon, isPro: true, ctaText: 'tool_cta_setup', link: '/distribution-tools/decentralized-cdn' },
    { id: 'physical-supply-chain', title: 'tool_physical_supply_chain_title', description: 'tool_physical_supply_chain_desc', category: 'Manajemen Rilis', icon: CubeIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/physical-supply-chain' },
    { id: 'granular-rbac', title: 'tool_granular_rbac_title', description: 'tool_granular_rbac_desc', category: 'Hak & Keamanan', icon: KeyIcon, isPro: true, ctaText: 'tool_cta_configure', link: '/distribution-tools/granular-rbac' },

    // --- MODUL 5: NEXT-GEN EXPERIENCE (Moved to Toolkit) ---
    { id: 'dynamic-audio-format', title: 'tool_dynamic_audio_format_title', description: 'tool_dynamic_audio_format_desc', category: 'Otomasi & AI', icon: CubeIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/dynamic-audio-format' },
    { id: 'geo-fenced-drop-zones', title: 'tool_geo_fenced_drop_zones_title', description: 'tool_geo_fenced_drop_zones_desc', category: 'Pemasaran & Jangkauan', icon: LocationMarkerIcon, isPro: true, ctaText: 'tool_cta_create', link: '/distribution-tools/geo-fenced-drop-zones' },
    { id: 'haptic-feedback-encoding', title: 'tool_haptic_feedback_encoding_title', description: 'tool_haptic_feedback_encoding_desc', category: 'Otomasi & AI', icon: ChipIcon, isPro: true, ctaText: 'tool_cta_find', link: '/distribution-tools/haptic-feedback-encoding' },
    { id: 'ai-music-video-gen-v2', title: 'tool_ai_music_video_gen_v2_title', description: 'tool_ai_music_video_gen_v2_desc', category: 'Otomasi & AI', icon: FilmIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/ai-music-video-gen-v2' },
    { id: 'livestream-royalty-monitor', title: 'tool_livestream_royalty_monitor_title', description: 'tool_livestream_royalty_monitor_desc', category: 'Royalti & Keuangan', icon: VideoCameraIcon, isPro: true, ctaText: 'tool_cta_monitor', link: '/distribution-tools/livestream-royalty-monitor' },
    { id: 'biometric-feedback-loop', title: 'tool_biometric_feedback_loop_title', description: 'tool_biometric_feedback_loop_desc', category: 'Otomasi & AI', icon: HeartIcon, isPro: true, ctaText: 'tool_cta_check', link: '/distribution-tools/biometric-feedback-loop' },

    // ... (Existing Tools) ...
    { id: 'lyric-translation', title: 'tool_lyric_translation_title', description: 'tool_lyric_translation_desc', category: 'Otomasi & AI', icon: GlobeIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/lyric-translation' },
    { id: 'brand-matchmaking', title: 'tool_brand_matchmaking_title', description: 'tool_brand_matchmaking_desc', category: 'Pemasaran & Jangkauan', icon: UserGroupIcon, isPro: true, ctaText: 'tool_cta_find', link: '/distribution-tools/brand-matchmaking' },
    { id: 'masterclass-portal', title: 'tool_masterclass_portal_title', description: 'tool_masterclass_portal_desc', category: 'Pemasaran & Jangkauan', icon: DocumentTextIcon, isPro: false, ctaText: 'tool_cta_view', link: '/distribution-tools/masterclass-portal' },
    { id: 'social-licensing', title: 'tool_social_licensing_title', description: 'tool_social_licensing_desc', category: 'Hak Cipta & Legal', icon: GlobeIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/social-licensing' },
    { id: 'micro-publishing', title: 'tool_micro_publishing_title', description: 'tool_micro_publishing_desc', category: 'Hak Cipta & Legal', icon: SearchIcon, isPro: true, ctaText: 'tool_cta_check', link: '/distribution-tools/micro-publishing' },
    { id: 'release-optimizer', title: 'tool_release_optimizer_title', description: 'tool_release_optimizer_desc', category: 'Manajemen Rilis', icon: ClockIcon, isPro: true, ctaText: 'tool_cta_analyze', link: '/distribution-tools/release-optimizer' },
    { id: 'merch-generator', title: 'tool_merch_generator_title', description: 'tool_merch_generator_desc', category: 'Pemasaran & Jangkauan', icon: TagIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/merch-generator' },
    { id: 'reputation-shield', title: 'tool_reputation_shield_title', description: 'tool_reputation_shield_desc', category: 'Hak & Keamanan', icon: ShieldCheckIcon, isPro: true, ctaText: 'tool_cta_activate', link: '/distribution-tools/reputation-shield' },

    { id: 'license-out-watermarking', title: 'tool_license_out_watermarking_title', description: 'tool_license_out_watermarking_desc', category: 'Manajemen Rilis', icon: ShieldCheckIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/license-out-watermarking' },
    { id: 'dsp-branding-optimizer', title: 'tool_dsp_branding_optimizer_title', description: 'tool_dsp_branding_optimizer_desc', category: 'Pemasaran & Jangkauan', icon: ArtistIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/dsp-branding-optimizer' },
    { id: 'venue-performance-aggregator', title: 'tool_venue_aggregator_title', description: 'tool_venue_aggregator_desc', category: 'Pemasaran & Jangkauan', icon: LocationMarkerIcon, isPro: true, ctaText: 'tool_cta_view', link: '/distribution-tools/venue-performance-aggregator' },
    
    { id: 'leher-ai-chat', title: 'tool_leher_ai_chat_title', description: 'tool_leher_ai_chat_desc', category: 'Otomasi & AI', icon: ChatAlt2Icon, isPro: true, ctaText: 'tool_leher_ai_chat_cta', link: '/leher-ai-chat' },
    { id: 'cover-art-ai-generator', title: 'tool_cover_art_ai_generator_title', description: 'tool_cover_art_ai_generator_desc', category: 'Otomasi & AI', icon: ToolkitIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/cover-art-ai-generator' },
    { id: 'ai-music-video-generator', title: 'tool_ai_music_video_generator_title', description: 'tool_ai_music_video_generator_desc', category: 'Otomasi & AI', icon: FilmIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/ai-music-video-generator' },
    { id: 'ai-cover-art-animator', title: 'tool_ai_cover_art_animator_title', description: 'tool_ai_cover_art_animator_desc', category: 'Otomasi & AI', icon: ColorSwatchIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/ai-cover-art-animator' },
    { id: 'quantum-hit-potential', title: 'tool_quantum_hit_potential_title', description: 'tool_quantum_hit_potential_desc', category: 'Otomasi & AI', icon: AnalyticsIcon, isPro: true, ctaText: 'tool_cta_analyze', link: '/distribution-tools/quantum-hit-potential' },
    { id: 'viral-trend-predictor', title: 'tool_viral_trend_predictor_title', description: 'tool_viral_trend_predictor_desc', category: 'Otomasi & AI', icon: TrendingUpIcon, isPro: true, ctaText: 'tool_cta_view', link: '/distribution-tools/viral-trend-predictor' },
    { id: 'sonic-twin-finder', title: 'tool_sonic_twin_finder_title', description: 'tool_sonic_twin_finder_desc', category: 'Otomasi & AI', icon: DocumentSearchIcon, isPro: false, ctaText: 'tool_cta_find', link: '/distribution-tools/sonic-twin-finder' },
    { id: 'ai-stem-splitter', title: 'tool_ai_stem_splitter_title', description: 'tool_ai_stem_splitter_desc', category: 'Otomasi & AI', icon: ProcessingIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/ai-stem-splitter' },
    
    { id: 'career-rpg', title: 'tool_career_rpg_title', description: 'tool_career_rpg_desc', category: 'Pemasaran & Jangkauan', icon: TrendingUpIcon, isPro: false, ctaText: 'tool_cta_play', link: '/distribution-tools/career-rpg' },
    { id: 'smart-links', title: 'title_smart_links', description: 'tool_smart_links_desc', category: 'Pemasaran & Jangkauan', icon: SmartLinkIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/smart-links' },
    { id: 'ai-mastering', title: 'title_ai_mastering', description: 'tool_mastering_studio_desc', category: 'Pemasaran & Jangkauan', icon: MasteringIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/ai-mastering' },
    { id: 'collab-hub', title: 'tool_collab_hub_title', description: 'tool_collab_hub_desc', category: 'Pemasaran & Jangkauan', icon: UserGroupIcon, isPro: false, ctaText: 'tool_cta_find', link: '/distribution-tools/collab-hub' },
    { id: 'market-opportunity-finder', title: 'tool_market_opportunity_finder_title', description: 'tool_market_opportunity_finder_desc', category: 'Pemasaran & Jangkauan', icon: LocationMarkerIcon, isPro: true, ctaText: 'tool_cta_discover', link: '/distribution-tools/market-opportunity-finder' },
    { id: 'fan-feedback-portal', title: 'tool_fan_feedback_portal_title', description: 'tool_fan_feedback_portal_desc', category: 'Pemasaran & Jangkauan', icon: ChatAlt2Icon, isPro: true, ctaText: 'tool_cta_view', link: '/distribution-tools/fan-feedback-portal' },
    { id: 'ai-press-kit-generator', title: 'tool_ai_press_kit_generator_title', description: 'tool_ai_press_kit_generator_desc', category: 'Pemasaran & Jangkauan', icon: BriefcaseIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/ai-press-kit-generator' },
    { id: 'banner-generator', title: 'tool_banner_generator_title', description: 'tool_banner_generator_desc', category: 'Pemasaran & Jangkauan', icon: BannerIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/banner-generator' },
    { id: 'playlist-pitcher', title: 'tool_playlist_pitcher_title', description: 'tool_playlist_pitcher_desc', category: 'Pemasaran & Jangkauan', icon: MegaphoneIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/playlist-pitcher' },
    { id: 'sync-licensing-marketplace', title: 'tool_sync_licensing_marketplace_title', description: 'tool_sync_licensing_marketplace_desc', category: 'Pemasaran & Jangkauan', icon: BriefcaseIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/sync-licensing-marketplace' },
    
    { id: 'royalty-advance-simulator', title: 'tool_royalty_advance_simulator_title', description: 'tool_royalty_advance_simulator_desc', category: 'Royalti & Keuangan', icon: CashIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/royalty-advance-simulator' },
    { id: 'automated-split-sheets', title: 'tool_automated_split_sheets_title', description: 'tool_automated_split_sheets_desc', category: 'Royalti & Keuangan', icon: FolderIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/automated-split-sheets' },
    { id: 'live-performance-rights-tracker', title: 'tool_live_performance_rights_tracker_title', description: 'tool_live_performance_rights_tracker_desc', category: 'Royalti & Keuangan', icon: TicketIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/live-performance-rights-tracker' },
    
    { id: 'leher-id', title: 'tool_leher_id_title', description: 'tool_leher_id_desc', category: 'Hak & Keamanan', icon: ShieldCheckIcon, isPro: false, ctaText: 'tool_cta_check', link: '/distribution-tools/leher-id' },
    { id: 'ugc-management', title: 'title_ugc_management', description: 'ugc_page_desc', category: 'Hak & Keamanan', icon: CopyrightIcon, isPro: false, ctaText: 'tool_cta_manage', link: '/ugc-management' },
    
    { id: 'garmi', title: 'tool_garmi_title', description: 'tool_garmi_desc', category: 'Hak Cipta & Legal', icon: ChipIcon, isPro: true, ctaText: 'tool_cta_activate', link: '/distribution-tools/garmi' },
    { id: 'smart-legal-dispute-resolver', title: 'tool_smart_legal_dispute_resolver_title', description: 'tool_smart_legal_dispute_resolver_desc', category: 'Hak Cipta & Legal', icon: GavelIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/smart-legal-dispute-resolver' },
    { id: 'proof-of-ownership-blockchain-timestamp', title: 'tool_proof_of_ownership_blockchain_timestamp_title', description: 'tool_proof_of_ownership_blockchain_timestamp_desc', category: 'Hak Cipta & Legal', icon: ShieldCheckIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/proof-of-ownership-blockchain-timestamp' },
    { id: 'sample-usage-detector', title: 'tool_sample_usage_detector_title', description: 'tool_sample_usage_detector_desc', category: 'Hak Cipta & Legal', icon: SonicDnaIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/sample-usage-detector' },
    { id: 'automated-dmca-issuer', title: 'tool_automated_dmca_issuer_title', description: 'tool_automated_dmca_issuer_desc', category: 'Hak Cipta & Legal', icon: DocumentTextIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/automated-dmca-issuer' },
    { id: 'cross-platform-copyright-watchdog', title: 'tool_cross_platform_copyright_watchdog_title', description: 'tool_cross_platform_copyright_watchdog_desc', category: 'Hak Cipta & Legal', icon: GlobePulseIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/cross-platform-copyright-watchdog' },

    { id: 'leher-live', title: 'tool_leher_live_title', description: 'tool_leher_live_desc', category: 'Pemasaran & Jangkauan', icon: TicketIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/leher-live' },
    { id: 'listening-parties', title: 'tool_listening_parties_title', description: 'tool_listening_parties_desc', category: 'Pemasaran & Jangkauan', icon: UserGroupIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/listening-parties' },

    { id: 'batch-uploader', title: 'tool_batch_uploader_title', description: 'tool_batch_uploader_desc', category: 'Manajemen Rilis', icon: UploadIcon, isPro: true, ctaText: 'tool_cta_manage', link: '/distribution-tools/batch-uploader' },
    { id: 'spotify-importer', title: 'tool_spotify_importer_title', description: 'tool_spotify_importer_desc', category: 'Manajemen Rilis', icon: ImportIcon, isPro: false, ctaText: 'tool_cta_manage', link: '/distribution-tools/spotify-importer' },
    { id: 'youtube-importer', title: 'tool_youtube_importer_title', description: 'tool_youtube_importer_desc', category: 'Manajemen Rilis', icon: ImportIcon, isPro: false, ctaText: 'tool_cta_manage', link: '/distribution-tools/youtube-importer' },
    { id: 'content-relocation', title: 'tool_content_relocation_title', description: 'tool_content_relocation_desc', category: 'Manajemen Rilis', icon: RelocationIcon, isPro: false, ctaText: 'tool_cta_manage', link: '/distribution-tools/content-relocation-form' },
    { id: 'takedown-request', title: 'tool_takedown_request_title', description: 'tool_takedown_request_desc', category: 'Manajemen Rilis', icon: TakedownIcon, isPro: false, ctaText: 'tool_cta_manage', link: '/distribution-tools/takedown-request-form' },
    { id: 'ugc-whitelist-form', title: 'tool_ugc_whitelist_form_title', description: 'tool_ugc_whitelist_form_desc', category: 'Hak & Keamanan', icon: WhitelistIcon, isPro: false, ctaText: 'tool_cta_manage', link: '/distribution-tools/ugc-whitelist-form' },
    { id: 'lyrics-generator', title: 'tool_lyrics_generator_title', description: 'tool_lyrics_generator_desc', category: 'Otomasi & AI', icon: LyricsIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/lyrics-generator' },
    { id: 'instant-vocal-translate', title: 'tool_instant_vocal_translate_title', description: 'tool_instant_vocal_translate_desc', category: 'Otomasi & AI', icon: GlobeIcon, isPro: true, ctaText: 'tool_cta_generate', link: '/distribution-tools/instant-vocal-translate' },
];

// Ensure FINANCIAL_TOOLS is empty to prevent duplication in other views
export const FINANCIAL_TOOLS: Tool[] = [];

export const TOOL_CATEGORIES_KEYS: { id: ToolCategory, key: TranslationKeys }[] = [
    { id: 'All', key: 'toolkit_category_all' },
    { id: 'Otomasi & AI', key: 'dist_tools_category_automation_ai' },
    { id: 'Manajemen Rilis', key: 'dist_tools_category_release_management' },
    { id: 'Royalti & Keuangan', key: 'dist_tools_category_royalties_finance' },
    { id: 'Hak & Keamanan', key: 'dist_tools_category_rights_security' },
    { id: 'Pemasaran & Jangkauan', key: 'dist_tools_category_marketing_reach' },
    { id: 'Hak Cipta & Legal', key: 'dist_tools_category_copyright_legal' },
];

export const ADMIN_TOOLS: AdminTool[] = [
    { id: 'smart-artist-verification', titleKey: 'admin_tool_smart_artist_verification_title', descKey: 'admin_tool_smart_artist_verification_desc', icon: ShieldCheckIcon, link: '/admin/smart-artist-verification', category: 'User & Platform' },
    { id: 'automated-royalty-disbursement', titleKey: 'admin_tool_automated_royalty_disbursement_title', descKey: 'admin_tool_automated_royalty_disbursement_desc', icon: CashIcon, link: '/admin/automated-royalty-disbursement', category: 'Financial & Revenue' },
    { id: 'real-time-release-monitoring', titleKey: 'admin_tool_real_time_release_monitoring_title', descKey: 'admin_tool_real_time_release_monitoring_desc', icon: ProcessingIcon, link: '/admin/real-time-release-monitoring', category: 'Analytics & Strategy' },
    { id: 'ai-content-violation-detector', titleKey: 'admin_tool_ai_content_violation_detector_title', descKey: 'admin_tool_ai_content_violation_detector_desc', icon: ShieldVortexIcon, link: '/admin/ai-content-violation-detector', category: 'Content & Rights' },
    { id: 'multi-label-account-management', titleKey: 'admin_tool_multi_label_account_management_title', descKey: 'admin_tool_multi_label_account_management_desc', icon: UserGroupIcon, link: '/admin/multi-label-account-management', category: 'User & Platform' },
    { id: 'dynamic-rights-ownership-editor', titleKey: 'admin_tool_dynamic_rights_ownership_editor_title', descKey: 'admin_tool_dynamic_rights_ownership_editor_desc', icon: CopyrightIcon, link: '/admin/dynamic-rights-ownership-editor', category: 'Content & Rights' },
    { id: 'royalty-dispute-resolution-manager', titleKey: 'admin_tool_royalty_dispute_resolution_manager_title', descKey: 'admin_tool_royalty_dispute_resolution_manager_desc', icon: GavelIcon, link: '/admin/royalty-dispute-resolution-manager', category: 'Financial & Revenue' },
    { id: 'geo-territory-licensing-control', titleKey: 'admin_tool_geo_territory_licensing_control_title', descKey: 'admin_tool_geo_territory_licensing_control_desc', icon: GlobeIcon, link: '/admin/geo-territory-licensing-control', category: 'Content & Rights' },
    { id: 'fraud-stream-detection-engine', titleKey: 'admin_tool_fraud_stream_detection_engine_title', descKey: 'admin_tool_fraud_stream_detection_engine_desc', icon: ShieldExclamationIcon, link: '/admin/fraud-stream-detection-engine', category: 'Analytics & Strategy' },
    { id: 'multi-platform-sync-health-checker', titleKey: 'admin_tool_multi_platform_sync_health_checker_title', descKey: 'admin_tool_multi_platform_sync_health_checker_desc', icon: GlobePulseIcon, link: '/admin/multi-platform-sync-health-checker', category: 'System & Infrastructure' },
    { id: 'custom-genre-tag-management', titleKey: 'admin_tool_custom_genre_tag_management_title', descKey: 'admin_tool_custom_genre_tag_management_desc', icon: TagIcon, link: '/admin/custom-genre-tag-management', category: 'Kustomisasi & Branding' },
    { id: 'ai-based-metadata-correction-tool', titleKey: 'admin_tool_ai_based_metadata_correction_tool_title', descKey: 'admin_tool_ai_based_metadata_correction_tool_desc', icon: PencilAltIcon, link: '/admin/ai-based-metadata-correction-tool', category: 'Kustomisasi & Branding' },
    { id: 'royalty-tax-compliance-integrator', titleKey: 'admin_tool_royalty_tax_compliance_integrator_title', descKey: 'admin_tool_royalty_tax_compliance_integrator_desc', icon: DocumentTextIcon, link: '/admin/royalty-tax-compliance-integrator', category: 'Financial & Revenue' },
    { id: 'content-strike-history-tracker', titleKey: 'admin_tool_content_strike_history_tracker_title', descKey: 'admin_tool_content_strike_history_tracker_desc', icon: WarningIcon, link: '/admin/content-strike-history-tracker', category: 'User & Platform' },
    { id: 'intelligent-chart-performance-analyzer', titleKey: 'admin_tool_intelligent_chart_performance_analyzer_title', descKey: 'admin_tool_intelligent_chart_performance_analyzer_desc', icon: TrendingUpIcon, link: '/admin/intelligent-chart-performance-analyzer', category: 'Analytics & Strategy' },
    { id: 'contributor-payment-approval-queue', titleKey: 'admin_tool_contributor_payment_approval_queue_title', descKey: 'admin_tool_contributor_payment_approval_queue_desc', icon: CashIcon, link: '/admin/contributor-payment-approval-queue', category: 'Financial & Revenue' },
    { id: 'release-version-history-audit-tool', titleKey: 'admin_tool_release_version_history_audit_tool_title', descKey: 'admin_tool_release_version_history_audit_tool_desc', icon: ClockIcon, link: '/admin/release-version-history-audit-tool', category: 'Content & Rights' },
    { id: 'revenue-share-simulation-module', titleKey: 'admin_tool_revenue_share_simulation_module_title', descKey: 'admin_tool_revenue_share_simulation_module_desc', icon: AnalyticsIcon, link: '/admin/revenue-share-simulation-module', category: 'Financial & Revenue' },
    { id: 'global-streaming-trend-watcher', titleKey: 'admin_tool_global_streaming_trend_watcher_title', descKey: 'admin_tool_global_streaming_trend_watcher_desc', icon: GlobePulseIcon, link: '/admin/global-streaming-trend-watcher', category: 'Analytics & Strategy' },
    { id: 'early-leak-piracy-alert-system', titleKey: 'admin_tool_early_leak_piracy_alert_system_title', descKey: 'admin_tool_early_leak_piracy_alert_system_desc', icon: ShieldVortexIcon, link: '/admin/early-leak-piracy-alert-system', category: 'Content & Rights' },
    { id: 'dynamic-contract-uploader-parser', titleKey: 'admin_tool_dynamic_contract_uploader_parser_title', descKey: 'admin_tool_dynamic_contract_uploader_parser_desc', icon: DocumentSearchIcon, link: '/admin/dynamic-contract-uploader-parser', category: 'Content & Rights' },
    { id: 'content-upload-limit-enforcer', titleKey: 'admin_tool_content_upload_limit_enforcer_title', descKey: 'admin_tool_content_upload_limit_enforcer_desc', icon: UploadIcon, link: '/admin/content-upload-limit-enforcer', category: 'User & Platform' },
    { id: 'secure-label-to-label-collaboration-portal', titleKey: 'admin_tool_secure_label_to_label_collaboration_portal_title', descKey: 'admin_tool_secure_label_to_label_collaboration_portal_desc', icon: ChatAlt2Icon, link: '/admin/secure-label-to-label-collaboration-portal', category: 'User & Platform' },
    { id: 'ai-based-release-scheduling-advisor', titleKey: 'admin_tool_ai_based_release_scheduling_advisor_title', descKey: 'admin_tool_ai_based_release_scheduling_advisor_desc', icon: CalendarIcon, link: '/admin/ai-based-release-scheduling-advisor', category: 'Analytics & Strategy' },
    { id: 'audio-fingerprint-conflict-checker', titleKey: 'admin_tool_audio_fingerprint_conflict_checker_title', descKey: 'admin_tool_audio_fingerprint_conflict_checker_desc', icon: SonicDnaIcon, link: '/admin/audio-fingerprint-conflict-checker', category: 'Content & Rights' },
    { id: 'bulk-release-template-generator', titleKey: 'admin_tool_bulk_release_template_generator_title', descKey: 'admin_tool_bulk_release_template_generator_desc', icon: TableIcon, link: '/admin/bulk-release-template-generator', category: 'System & Infrastructure' },
    { id: 'custom-royalty-rate-profile-manager', titleKey: 'admin_tool_custom_royalty_rate_profile_manager_title', descKey: 'admin_tool_custom_royalty_rate_profile_manager_desc', icon: KeyIcon, link: '/admin/custom-royalty-rate-profile-manager', category: 'Financial & Revenue' },
    { id: 'performance-based-promotion-budget-tool', titleKey: 'admin_tool_performance_based_promotion_budget_tool_title', descKey: 'admin_tool_performance_based_promotion_budget_tool_desc', icon: MegaphoneIcon, link: '/admin/performance-based-promotion-budget-tool', category: 'Analytics & Strategy' },
    { id: 'partner-platform-access-control-panel', titleKey: 'admin_tool_partner_platform_access_control_panel_title', descKey: 'admin_tool_partner_platform_access_control_panel_desc', icon: PlugIcon, link: '/admin/partner-platform-access-control-panel', category: 'User & Platform' },
    { id: 'stream-data-anomaly-predictor', titleKey: 'admin_tool_stream_data_anomaly_predictor_title', descKey: 'admin_tool_stream_data_anomaly_predictor_desc', icon: VectorIcon, link: '/admin/stream-data-anomaly-predictor', category: 'Analytics & Strategy' },
    { id: 'white-label-for-labels', titleKey: 'admin_tool_white_label_for_labels_title', descKey: 'admin_tool_white_label_for_labels_desc', icon: BuildingIcon, link: '/admin/white-label-for-labels', category: 'Kustomisasi & Branding' },
    { id: 'custom-dsp-destination-builder', titleKey: 'admin_tool_custom_dsp_destination_builder_title', descKey: 'admin_tool_custom_dsp_destination_builder_desc', icon: GlobeIcon, link: '/admin/custom-dsp-destination-builder', category: 'Kustomisasi & Branding' },
    { id: 'artist-page-generator', titleKey: 'admin_tool_artist_page_generator_title', descKey: 'admin_tool_artist_page_generator_desc', icon: LinkIcon, link: '/admin/artist-page-generator', category: 'Kustomisasi & Branding' },
    { id: 'fan-gated-release-portal', titleKey: 'admin_tool_fan_gated_release_portal_title', descKey: 'admin_tool_fan_gated_release_portal_desc', icon: LockClosedIcon, link: '/admin/fan-gated-release-portal', category: 'Kustomisasi & Branding' },
    { id: 'real-time-database', titleKey: 'admin_tool_real_time_database_title', descKey: 'admin_tool_real_time_database_desc', icon: CubeIcon, link: '/admin/real-time-database', category: 'System & Infrastructure' },
    { id: 'auto-platform-distributor', titleKey: 'admin_tool_auto_platform_distributor_title', descKey: 'admin_tool_auto_platform_distributor_desc', icon: RocketIcon, link: '/admin/auto-platform-distributor', category: 'System & Infrastructure' },
];
