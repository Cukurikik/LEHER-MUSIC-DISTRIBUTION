
import React from 'react';

export enum DistributionStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  InReview = 'In Review',
  Processing = 'Processing',
  Approved = 'Approved',
  Delivered = 'Delivered',
  Live = 'Live',
  Rejected = 'Rejected',
  Error = 'Error',
  Takedown = 'Takedown',
  TakedownRequested = 'Takedown Requested',
  TakedownCompleted = 'Takedown Completed'
}

export enum UgcMonetizationPolicy {
  Monetize = 'Monetize',
  Block = 'Block',
  Track = 'Track'
}

export interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  spotifyId?: string;
  appleMusicId?: string;
}

export interface ArtistSearchResult {
  id: string;
  name: string;
  images?: { url: string; height: number; width: number }[];
  genres?: string[];
  popularity?: number;
  spotifyId?: string;
  avatarUrl?: string; // Added
  source?: string; // Added
  appleMusicId?: string; // Added
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  share: number;
}

export interface StoreDeliveryInfo {
  name: string; // Changed from storeName
  status: DistributionStatus;
  deliveryDate?: string;
  progress?: number; // Added
  lastUpdate?: string; // Added
}

export interface BaseRelease {
  id: string;
  title: string;
  coverArtUrl: string;
  description?: string;
  status: DistributionStatus;
  releaseDate?: string;
  createdDate?: string;
  upc?: string;
  genre?: string;
  price?: number;
}

export interface Song extends BaseRelease {
  assetType: 'Audio';
  artistId: string;
  artistName: string;
  fileName: string;
  isrc?: string;
  distribution?: Record<string, { status: DistributionStatus; link?: string }>;
  releaseType?: 'Single' | 'EP' | 'Album';
  cHolder?: string;
  pHolder?: string;
  contributors?: Contributor[];
  ugcMonetizationPolicy?: UgcMonetizationPolicy;
  bpm?: number;
  key?: string;
  moods?: string[];
  isInstrumental?: boolean;
  duplicateCheck?: {
    status: 'clean' | 'potential_duplicate' | 'confirmed_duplicate' | 'idle';
    matchDetails?: string;
  };
  aiValidationIssues?: string[];
  storeDelivery?: StoreDeliveryInfo[];
  releaseLanguage?: string;
  recordingVersion?: string;
  trackVersion?: string;
  isExplicit?: boolean;
  distributionMode?: string;
  lyricsLanguage?: string; // Added
  subGenre?: string; // Added
  label?: string; // Added
  deliveryProgress?: number; // Added
  deliveryStatusDetail?: string; // Added
  marketingStrategy?: string; // Added
}

export interface Ebook extends BaseRelease {
  assetType: 'Ebook';
  authorName: string;
  fileName: string;
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  language?: string;
}

export interface Video extends BaseRelease {
  assetType: 'Video';
  artistId: string;
  artistName?: string;
  fileName: string;
  videoType?: 'Music Video' | 'Lyric Video' | 'Visualizer';
  releaseType?: string;
  videoFileName?: string; // Added
  distribution?: any; // Added
  cHolder?: string; // Added
  pHolder?: string; // Added
  contributors?: Contributor[]; // Added
  videoDirector?: string; // Added
  videoProducer?: string; // Added
  ugcMonetizationPolicy?: UgcMonetizationPolicy; // Added
  aiValidationIssues?: string[]; // Added
  storeDelivery?: StoreDeliveryInfo[]; // Added
}

export type Release = Song | Ebook | Video;

export interface SmartLinkCampaign {
  id: string;
  title?: string; // Made optional
  name?: string;
  url?: string; // Made optional
  visits?: number; // Made optional
  clicks?: number; // Made optional
  status: SmartLinkCampaignStatus;
  type?: string; // Added
  releaseId?: string; // Added
  releaseTitle?: string; // Added
  artistName?: string; // Added
  coverArtUrl?: string; // Added
  customSlug?: string; // Added
  shortUrl?: string; // Added
  releaseDate?: string; // Added
  totalClicks?: number; // Added
  totalPreSaves?: number; // Added
  links?: any[]; // Added
}

export type SmartLinkCampaignStatus = 'Active' | 'Archived' | 'Live (Pre-Save Only)' | 'Draft' | 'Expired';

export interface MasteringProject {
  id: string;
  title?: string; // Made optional
  projectName?: string; // Added
  status: MasteringStatus;
  date?: string; // Made optional
  songId?: string;
  originalFileName?: string; // Added
  style?: string; // Added
  createdAt?: string; // Added
  coverArtUrl?: string; // Added
  artistName?: string; // Added
  originalAudioUrl?: string; // Added
  masteredAudioUrl?: string; // Added
  originalStats?: any; // Added
  masteredStats?: any; // Added
}

export type MasteringStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed' | 'Ready' | 'Downloaded';
export type MasteringStyle = 'Warm' | 'Bright' | 'Punchy' | 'Balanced' | 'Loud & Clear' | 'Warm & Open' | 'Punchy & Driving';

export enum NotificationType {
  Release = 'Release',
  Revenue = 'Revenue',
  Support = 'Support',
  SystemUpdate = 'SystemUpdate',
  Alert = 'Alert'
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: NotificationType;
  link: string;
}

export interface FinancialOverview {
  totalEarnings?: number;
  pendingPayout?: number;
  currency?: string;
  lifetime_income?: number;
  pending_balance?: number;
  current_balance?: number;
  revenue_trend_data?: any[];
  revenue_breakdown_by_type?: {
      streaming: number | Transaction;
      downloads: number | Transaction;
      licensing: number;
      performance: number;
      ugc_monetization: number | Transaction;
  };
}

export interface TierDetails {
  currentTier: RevenueTier;
  nextTier: RevenueTier | null;
  progressPercentage: number;
  lifetimeIncome: number;
  allTiers: RevenueTier[];
}

export interface RevenueTier {
  id?: string; // Made optional
  name: string;
  price?: number; // Made optional
  currency?: string; // Made optional
  features?: string[]; // Made optional
  benefits: Benefit[];
  recommended?: boolean;
  threshold?: number; // Added
}

export interface Benefit {
  id?: string; // Made optional
  text?: string; // Made optional
  available?: boolean; // Made optional
  title?: string; // Added
  description?: string; // Added
}

export interface Contract {
  id: string;
  title?: string; // Made optional
  status: 'Draft' | 'Pending' | 'Signed' | 'Terminated' | 'Active' | 'Pending Signature' | 'Expired' | 'Rejected';
  parties?: string[]; // Made optional
  effectiveDate?: string; // Made optional
  type?: string; // Added
  startDate?: string; // Added
  endDate?: string; // Added
  details?: string; // Added
  userName?: string; // Added
}

export interface SubDistributor {
  id: string;
  name: string;
  region: string;
  status: 'Active' | 'Inactive';
  contactPerson?: string;
  email?: string; // Added
  contractId?: string; // Added
  lastActivity?: string; // Added
}

export interface YouTubeMusicAlbumSimple {
  id: string;
  title?: string; // Made optional
  name?: string;
  artist?: string; // Made optional
  artists?: any[]; // Added
  thumbnailUrl?: string; // Made optional
  thumbnails?: any[];
  album_type?: string;
  release_date?: string;
}

export interface YouTubeMusicArtistSimple {
    id: string;
    name: string;
    thumbnails?: any[]; // Added
    genres?: string[]; // Added
}

export interface YouTubeMusicArtist {
    id?: string; // Made optional
    name: string;
    subscribers?: string; // Made optional
    thumbnails?: YouTubeThumbnail[]; // Made optional
}

export interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
}

export enum ActivityType {
  User = 'User',
  Revenue = 'Revenue',
  Release = 'Release',
  Copyright = 'Copyright',
  Analytics = 'Analytics',
  System = 'System',
  Communication = 'Communication',
  Security = 'Security',
  NewUser = 'New User', // Added
  NewRelease = 'New Release', // Added
  Withdrawal = 'Withdrawal' // Added
}

export interface Activity {
  id: string;
  type: ActivityType | string; // Allow string for flexibility
  title?: string; // Made optional
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatarUrl?: string;
  };
  link?: string;
  details?: Record<string, any>;
}

export type RecentActivity = Activity;

export interface PayoutRequest {
  id: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Processing' | 'Available'; // Added
  date: string;
  method?: string;
  recipient?: any; // Added
  transactionId?: string; // Added
}

export type TranslationKeys = string;

export type ToolCategory = 'Distribution' | 'Marketing' | 'Analytics' | 'Financial' | 'Legal' | 'Creative' | 'Admin' | 'Otomasi & AI' | 'Manajemen Rilis' | 'Royalti & Keuangan' | 'Hak & Keamanan' | 'Pemasaran & Jangkauan' | 'Hak Cipta & Legal' | 'Kustomisasi & Branding' | 'System & Infrastructure' | 'User & Platform' | 'Financial & Revenue' | 'Analytics & Strategy' | 'Content & Rights' | 'All';

export interface Tool {
  id: string;
  name?: string;
  title?: string; // Made optional
  description?: string; // Made optional
  icon: React.ComponentType<any>;
  path?: string;
  link: string;
  category: ToolCategory;
  isNew?: boolean;
  isBeta?: boolean;
  isPro?: boolean;
  ctaText?: string;
  titleKey?: string;
  descKey?: string;
}

export type AdminToolCategory = ToolCategory;

export interface AdminTool extends Tool {
  category: AdminToolCategory;
  titleKey: string;
  descKey: string;
  title?: string; // Made optional
  description?: string; // Made optional
}

export enum PlatformName {
  Spotify = 'Spotify',
  AppleMusic = 'Apple Music',
  YouTubeMusic = 'YouTube Music',
  AmazonMusic = 'Amazon Music',
  Tidal = 'Tidal',
  Deezer = 'Deezer',
  Pandora = 'Pandora',
  SoundCloud = 'SoundCloud',
  JioSaavn = 'JioSaavn',
  Gaana = 'Gaana',
  NetEase = 'NetEase',
  Tencent = 'Tencent',
  YandexMusic = 'Yandex Music',
  Anghami = 'Anghami',
  Boomplay = 'Boomplay',
  TikTok = 'TikTok',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Shazam = 'Shazam',
  KKBox = 'KKBox',
  Melon = 'Melon',
  Genie = 'Genie',
  Bugs = 'Bugs',
  FLO = 'FLO',
  QQMusic = 'QQ Music',
  Kugou = 'Kugou',
  Kuwo = 'Kuwo',
  AWA = 'AWA',
  LineMusic = 'Line Music',
  VKMusic = 'VK Music',
  SberZvuk = 'SberZvuk',
  Resso = 'Resso',
  Beatport = 'Beatport',
  Traxsource = 'Traxsource',
  JunoDownload = 'Juno Download',
  Qobuz = 'Qobuz',
  Slacker = 'Slacker',
  iHeartRadio = 'iHeartRadio',
  LiveXLive = 'LiveXLive',
  Napster = 'Napster',
  ClaroMusica = 'Claro Música',
  Hungama = 'Hungama',
  Wynk = 'Wynk',
  // Video Platforms
  VEVO = 'VEVO',
  AppleMusicVideo = 'Apple Music Video',
  TidalVideo = 'Tidal Video',
  FacebookPMV = 'Facebook PMV',
  AmazonMusicVideo = 'Amazon Music Video',
  Xite = 'Xite',
  Bandcamp = 'Bandcamp',
  Twitch = 'Twitch',
  Vimeo = 'Vimeo',
  Plex = 'Plex',
  Peloton = 'Peloton',
  Snapchat = 'Snapchat',
  Mixcloud = 'Mixcloud',
  Audius = 'Audius',
  Meta = 'Meta',
  Reddit = 'Reddit',
  SoundExchange = 'SoundExchange',
  LyricFind = 'LyricFind',
  Musixmatch = 'Musixmatch',
  Gracenote = 'Gracenote',
  IDAGIO = 'IDAGIO',
  SevenDigital = '7digital',
  KuackMedia = 'Kuack Media',
  iMusica = 'iMusica',
  Superplayer = 'Superplayer',
  Verizon = 'Verizon',
  SiriusXM = 'SiriusXM',
  Movistar = 'Movistar',
  Vivo = 'Vivo',
  Rogers = 'Rogers',
  Telus = 'Telus',
  Videotron = 'Videotron',
  SaskTel = 'SaskTel',
  Shaw = 'Shaw',
  Cricket = 'Cricket',
  Sprint = 'Sprint',
  LaMusica = 'LaMusica',
  Uforia = 'Uforia',
  Zvooq = 'Zvooq',
  Fnac = 'Fnac',
  Orange = 'Orange',
  SFR = 'SFR',
  Bouygues = 'Bouygues',
  DeutscheTelekom = 'Deutsche Telekom',
  Vodafone = 'Vodafone',
  O2 = 'O2',
  TIM = 'TIM',
  SKY = 'SKY',
  Telenor = 'Telenor',
  Telia = 'Telia',
  Swisscom = 'Swisscom',
  Proximus = 'Proximus',
  KPN = 'KPN',
  Ziggo = 'Ziggo',
  Empik = 'Empik',
  Plus = 'Plus',
  Cosmote = 'Cosmote',
  H3G = 'H3G',
  Iliad = 'Iliad',
  Salt = 'Salt',
  Sunrise = 'Sunrise',
  Telemach = 'Telemach',
  Tonspion = 'Tonspion',
  Turkcell = 'Turkcell',
  TurkTelekom = 'Turk Telekom',
  Viva = 'Viva',
  YouSee = 'YouSee',
  Zaycev = 'Zaycev',
  Vibe = 'Vibe',
  Joox = 'Joox',
  Migu = 'Migu',
  Rakuten = 'Rakuten',
  Singtel = 'Singtel',
  Telstra = 'Telstra',
  Optus = 'Optus',
  True = 'True',
  Zing = 'Zing',
  Patari = 'Patari',
  Douyin = 'Douyin',
  Bilibili = 'Bilibili',
  WeChat = 'WeChat',
  Xiaomi = 'Xiaomi',
  Huawei = 'Huawei',
  NMusic = 'NMusic',
  USEN = 'USEN',
  Yamaha = 'Yamaha',
  WeSing = 'WeSing',
  Kakaotalk = 'Kakaotalk',
  Audiomack = 'Audiomack',
  Mdundo = 'Mdundo',
  Ayoba = 'Ayoba',
  Eskimi = 'Eskimi',
  MTN = 'MTN',
  Vodacom = 'Vodacom',
  Etisalat = 'Etisalat',
  Ooredoo = 'Ooredoo',
  Watary = 'Watary',
  Yala = 'Yala',
  Fizy = 'Fizy',
  Zed = 'Zed',
  SABC = 'SABC'
}

export interface PlatformDefinition {
  id: string;
  name: PlatformName;
  icon?: React.ComponentType<any>; // Made optional
  type?: 'Streaming' | 'Social' | 'Download' | 'Video' | 'Radio' | 'Lyrics' | 'Metadata'; // Made optional
  regions?: string[]; // Made optional
  region?: string; // Added alias
  features?: string[]; // Made optional
  description?: string; // Added
  supportedAssetTypes?: string[]; // Added
}

export interface TopCountry {
  code: string;
  streams: number;
  name: string;
}

export interface GeographicData {
  [key: string]: {
    value: number;
    city: string;
  };
}

export interface Demographics {
  age: Record<string, number>;
  gender: Record<string, number>;
}

export interface StreamData {
  platform: PlatformName;
  streams: number;
}

export interface AnalyticsData {
  songId: string;
  totalStreams: number;
  totalListeners: number;
  monthlyListeners: number;
  totalRevenue: number;
  streamsByPlatform: StreamData[];
  demographics: Demographics;
  topCountries: TopCountry[];
  streamsByCountry: GeographicData;
  realtimeStreams: number;
  realtimeRevenue: number;
  streamsByCity: Record<string, number>;
  avgListenDuration: number;
  skipRate: number;
  playlistAdds: number;
}

export interface RoyaltyReport {
    id: string;
    period: string;
    generatedDate?: string; // Made optional
    totalAmount?: number; // Made optional
    status: 'Ready' | 'Processing' | 'Paid'; // Extended
    downloadUrl?: string; // Made optional
    grossRevenue?: number; // Added
    leherCut?: number; // Added
    netIncome?: number; // Added
}

export type DocumentType = 'Tax Form' | 'Contract' | 'Invoice' | 'Statement' | 'Tax Summary' | 'Payment Confirmation';

export interface GeneratedDocument {
    id: string;
    type: DocumentType;
    name: string;
    date?: string; // Made optional
    status: 'Ready' | 'Processing' | 'Failed' | 'Available'; // Extended
    url?: string;
    generatedDate?: string; // Added
    period?: string; // Added
    aiPowered?: boolean; // Added
    downloadUrl?: string; // Added
    aiSummary?: string; // Added
}

export interface PriceHistory {
    timestamp?: number; // Made optional
    price?: number; // Made optional
    date?: string; // Added
    close?: number; // Added
    high?: number; // Added
    low?: number; // Added
    open?: number; // Added
}

export interface TradableSong {
    id: string;
    title: string;
    artist?: string; // Made optional
    coverUrl?: string; // Made optional
    currentPrice: number;
    priceChange24h: number;
    marketCap: number;
    volume24h: number;
    availableShares?: number; // Made optional
    totalShares?: number; // Made optional
    priceHistory: PriceHistory[];
    dividendYield?: number; // Made optional
    artistName?: string; // Added
    coverArtUrl?: string; // Added
    aiPrediction?: { changePercent: number; direction: string; }; // Added
    recentTrades?: RecentTrade[]; // Added
    sharesOutstanding?: number; // Added
}

export interface UserWallet {
    balance?: number; // Made optional
    currency?: string; // Made optional
    portfolioValue: number;
    totalDividendsEarned?: number; // Made optional
    leherCoinBalance?: number; // Added
    portfolio?: any[]; // Added
}

export interface PortfolioItem {
    songId: string;
    sharesOwned: number;
    avgBuyPrice: number;
    currentValue: number;
    totalReturn: number;
}

export interface OrderBookEntry {
    price: number;
    amount?: number; // Made optional
    total?: number; // Made optional
    size?: number; // Added
}

export interface RecentTrade {
    id?: string; // Made optional
    songId?: string; // Made optional
    price: number;
    amount?: number; // Made optional
    timestamp?: number; // Made optional
    type: 'buy' | 'sell';
    size?: number; // Added
    time?: string | number; // Added
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit' | 'income' | 'withdrawal' | 'fee' | 'adjustment' | 'Leher Fee' | 'Platform Fee'; // Extended
    status: 'completed' | 'pending' | 'failed' | 'Completed' | 'Pending' | 'Failed' | 'Processing' | 'Paid' | 'Available' | 'Ready'; // Extended
    source?: string;
    currency?: string; // Added
    source_target?: string; // Added
    recipient_name?: string; // Added
    user?: any; // Added
    label?: string | { id: string; name: string; }; // Updated
    related_release_title?: string; // Added
    transaction_details?: any; // Added
}

export interface RevenueBreakdownData {
    source?: string; // Made optional
    amount?: number; // Made optional
    percentage?: number; // Made optional
    color?: string; // Made optional
    byPlatform?: any[]; // Added
    byTopReleases?: any[]; // Added
    byTerritory?: any[]; // Added
}

export interface Wallet {
    id: string;
    type: WalletType | 'E-Wallet'; // Extended
    balance: number;
    currency: string;
    address?: string;
    isDefault?: boolean;
    provider?: string; // Added
    icon?: any; // Added
}

export type WalletType = 'Fiat' | 'Crypto' | 'Bank';

export interface RightHolder {
    id: string;
    name: string;
    role: string;
    share: number;
    email: string;
    status: 'Active' | 'Pending';
}

export interface CatalogSong {
    id: string;
    title: string;
    isrc: string;
    releaseDate: string;
    rightsHolders: RightHolder[];
    artist?: string; // Added
    songwriter?: string; // Added
    composer?: string; // Added
    duration?: string; // Changed to string
    copyrightPLine?: string; // Added
    copyrightCLine?: string; // Added
    notes?: string; // Added
    genre?: string; // Added
}

export interface EnhancedCheckResult {
    score?: number; // Made optional
    matches?: {
        platform: string;
        similarity: number;
        url: string;
        timestamp: string;
    }[]; // Made optional
    issues?: string[]; // Made optional
    source?: string; // Added
    title?: string; // Added
    artist?: string; // Added
    album?: string; // Added
    coverArtUrl?: string; // Added
    isrc?: string; // Added
}
