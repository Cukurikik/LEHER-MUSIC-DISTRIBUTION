
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import SparklesIcon from '../components/layout/SparklesIcon';
import LeherIcon from '../components/layout/LeherIcon';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const ChipIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>);
const CubeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>);
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019 9m-9-9a9 9 0 009-9" /></svg>);
const CashIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-14.964z" /></svg>);
const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>);
const WrenchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>);
const TagIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" /></svg>);
const MegaphoneIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.834 9.168-4.432" /></svg>);

interface ReleaseNote {
    version: string;
    date: string;
    title: string;
    icon: React.FC<{ className?: string }>;
    description: string;
    features: { type: 'New' | 'Improvement' | 'Fix' | 'Optimization', text: string }[];
}

const FULL_HISTORY: ReleaseNote[] = [
    {
        version: 'v6.0.0',
        date: '30 Nov 2025',
        title: 'Enterprise Singularity Update',
        icon: CubeIcon,
        description: 'Transformasi Leher menjadi platform institusi keuangan, hukum, dan operasional skala enterprise dengan 20 fitur kompleks baru.',
        features: [
            { type: 'New', text: 'FinTech Pillar: Sekuritisasi Royalti Dinamis, Mesin Pajak Multi-Yurisdiksi, Gateway Kripto-Fiat, dan Logika Vesting Otomatis.' },
            { type: 'New', text: 'LegalTech Pillar: Mesin Lisensi Karya Turunan, Arbitrase Sengketa Otomatis, Audit Publishing Global, dan Pewarisan Aset Digital.' },
            { type: 'New', text: 'Big Data Pillar: Analisis Retensi Kohort, Prediksi Viralitas AI, Pelacakan ROAS Iklan, dan Tagging Psikoakustik.' },
            { type: 'New', text: 'Enterprise Ops: Infrastruktur White-Label B2B2C, Sinkronisasi Rantai Pasok Fisik, dan Sandbox Developer Eksternal.' }
        ]
    },
    {
        version: 'v5.8.1',
        date: '29 Nov 2025',
        title: 'AI Localization & Stability Update',
        icon: SparklesIcon,
        description: 'Pembaruan fokus pada lokalisasi cerdas untuk output AI dan stabilitas sistem.',
        features: [
            { type: 'New', text: 'AI Language Sync: Seluruh output generator AI (Lirik, Strategi Rilis, Pitch Playlist, Nama Label) kini otomatis mengikuti pengaturan bahasa aplikasi (Bahasa Indonesia/Inggris).' },
            { type: 'Fix', text: 'Toolkit Simulation Data: Perbaikan pada data simulasi fitur Brand Matchmaking dan Lyric Translator agar konsisten dengan bahasa yang dipilih.' },
            { type: 'Optimization', text: 'Gemini Service Prompting: Peningkatan instruksi sistem (prompt engineering) untuk hasil teks Bahasa Indonesia yang lebih natural.' },
            { type: 'Fix', text: 'New Tools UI: Perbaikan layout dan rendering font pada fitur-fitur baru di Toolkit Distribusi.' }
        ]
    },
    {
        version: 'v5.8.0',
        date: '28 Nov 2025',
        title: 'Cultural Intelligence & Brand Ecosystem',
        icon: GlobeIcon,
        description: 'Empowering artists with cross-border tools, brand intelligence, and reputation protection.',
        features: [
            { type: 'New', text: 'Lyric Translation & Cultural Context Checker: Penerjemah lirik berbasis AI dengan pemeriksaan sensitivitas budaya.' },
            { type: 'New', text: 'Brand Collaboration "Fit Score": Pencocokan otomatis artis dengan brand berdasarkan data audiens.' },
            { type: 'New', text: 'Leher "Masterclass" & Certification Portal: Pelatihan bisnis musik profesional dan sertifikasi.' },
            { type: 'New', text: 'Global Licensing for Social Causes: Portal lisensi khusus untuk organisasi nirlaba.' },
            { type: 'New', text: 'Micro-Territory Publishing Audit: Pelacakan royalti yang hilang di pasar niche.' },
            { type: 'New', text: 'Time-to-Market "Optimization Score": Analisis alur kerja untuk menentukan tanggal rilis optimal.' },
            { type: 'New', text: 'Real-Time Merch Drop Generator: Desain dan jual merchandise instan saat momen viral.' },
            { type: 'New', text: 'Real-Time Content Moderation: Perlindungan reputasi artis dari konten negatif.' },
            { type: 'Fix', text: 'SmartLinks Builder: Perbaikan fungsionalitas tombol "Create New", masalah lag, dan pembaruan UI Header menjadi Floating Glass Bar.' },
            { type: 'Improvement', text: 'AI Audience Identifier: Redesain UI/UX dengan animasi radar, kartu holografik, dan perbaikan fungsi tombol simulasi.' },
            { type: 'Fix', text: 'Advanced Monetization: Perbaikan tombol fungsi (Smart Splits, Advances), penambahan tombol kembali, dan optimasi tampilan mobile.' },
            { type: 'Fix', text: 'Copyright Conflicts: Perbaikan fungsi tombol "Resolve" pada manajemen konflik.' },
            { type: 'Improvement', text: 'Toolkit Dashboard: Perbaikan bug z-index pada filter kategori dan peningkatan efek hover kartu alat.' },
            { type: 'Improvement', text: 'Admin Toolkit: Peningkatan interaksi menu radial agar lebih stabil.' },
            { type: 'Improvement', text: 'FAQ Support: Peningkatan visibilitas warna saat pertanyaan aktif.' }
        ]
    },
    {
        version: 'v5.5.0',
        date: '27 Nov 2025',
        title: 'Radical Monetization & Innovation',
        icon: SparklesIcon,
        description: 'Peluncuran 6 fitur radikal baru untuk mengubah cara artis mendistribusikan, memasarkan, dan memonetisasi karya mereka.',
        features: [
            { type: 'New', text: 'Royalty "Pre-emptive Strike" Guarantee: Jaminan pendapatan minimal di hari rilis.' },
            { type: 'New', text: 'Automated "License-Out" Watermarking: Sistem watermark otomatis untuk lisensi aman.' },
            { type: 'New', text: '"Halo Effect" Catalogue Manager: Optimasi traffic ke katalog lama dari rilis baru.' },
            { type: 'New', text: 'Fan-Created Content (FCC) Monetization: Insentif token untuk konten kreator penggemar.' },
            { type: 'New', text: 'DSP-Specific Branding Optimizer: Kustomisasi profil artis unik per platform streaming.' },
            { type: 'New', text: 'Venue Performance Data Aggregator: Data pemutaran lagu di venue fisik.' }
        ]
    },
    {
        version: 'v5.4.0',
        date: '15 Nov 2025',
        title: 'Growth Ecosystem & Monetization Mastery',
        icon: MegaphoneIcon,
        description: 'Peluncuran besar-besaran fitur Growth & Promo serta Advanced Monetization untuk mengakselerasi karir dan pendapatan artis.',
        features: [
            { type: 'New', text: 'AI Target Audience: Analisis cerdas untuk demografi, lokasi, dan rekomendasi platform iklan.' },
            { type: 'New', text: 'Generative Smart Links: Pembuatan halaman rilis estetis instan dengan integrasi TikTok & Pre-save.' },
            { type: 'New', text: 'Creator Marketplace: Hubungkan artis dengan influencer global untuk kampanye viral.' },
            { type: 'New', text: 'Cash Advances: Sistem uang muka royalti otomatis berbasis prediksi pendapatan AI.' }
        ]
    },
    {
        version: 'v5.3.0',
        date: '01 Nov 2025',
        title: 'Enterprise White Label & Admin Command',
        icon: ShieldCheckIcon,
        description: 'Ekspansi fitur untuk label rekaman besar dan kontrol admin mutakhir.',
        features: [
            { type: 'New', text: 'White Label System: Kustomisasi branding total (Domain, Logo, Warna) untuk akun Enterprise.' },
            { type: 'New', text: 'Admin Terminal: Log sistem real-time dan kontrol database langsung dari dashboard.' },
            { type: 'Improvement', text: 'Multi-Account Switching: Navigasi mulus antara akun artis dan label.' }
        ]
    },
    {
        version: 'v5.2.0',
        date: '15 Oct 2025',
        title: 'Financial Suite: Crypto & Splits',
        icon: CashIcon,
        description: 'Revolusi sistem pembayaran dengan integrasi Web3 dan pembagian royalti otomatis.',
        features: [
            { type: 'New', text: 'Real-time Crypto Payouts: Penarikan royalti via USDT/BTC/ETH.' },
            { type: 'New', text: 'Automated Split Sheets: Pembagian pendapatan kolaborator otomatis setiap bulan.' },
            { type: 'Optimization', text: 'Invoice Generator: Pembuatan faktur pajak otomatis yang lebih cepat.' }
        ]
    },
    {
        version: 'v5.1.0',
        date: '20 Sep 2025',
        title: 'AI Studio Expansion',
        icon: ChipIcon,
        description: 'Penambahan alat produksi berbasis kecerdasan buatan.',
        features: [
            { type: 'New', text: 'AI Mastering Studio: Mastering audio instan dengan preset genre (Loud, Warm, Punchy).' },
            { type: 'New', text: 'Stem Splitter: Pemisahan vokal dan instrumen presisi tinggi.' },
            { type: 'New', text: 'Lyrics Generator: Asisten penulisan lirik dengan rima dan struktur lagu.' }
        ]
    },
    {
        version: 'v5.0.0',
        date: '01 Sep 2025',
        title: 'Quantum Core Update',
        icon: CubeIcon,
        description: 'Pembaruan arsitektur besar-besaran untuk kecepatan dan stabilitas.',
        features: [
            { type: 'Optimization', text: 'Quantum Engine: Peningkatan kecepatan load dashboard hingga 300%.' },
            { type: 'Improvement', text: 'UI Overhaul: Desain antarmuka baru dengan tema "Singularity" dan "Nova Prime".' },
            { type: 'Fix', text: 'Mobile Responsiveness: Perbaikan tata letak pada perangkat tablet dan ponsel.' }
        ]
    },
    {
        version: 'v4.5.0',
        date: '10 Aug 2025',
        title: 'Rights & Protection',
        icon: ShieldCheckIcon,
        description: 'Perlindungan aset dan manajemen hak cipta yang lebih ketat.',
        features: [
            { type: 'New', text: 'Leher ID: Audio fingerprinting untuk mendeteksi penggunaan ilegal.' },
            { type: 'New', text: 'UGC Whitelist: Manajemen klaim Content ID YouTube dan Meta secara mandiri.' },
            { type: 'New', text: 'Copyright Watchdog: Pemindaian otomatis platform streaming untuk duplikat.' }
        ]
    },
    {
        version: 'v4.0.0',
        date: '15 Jul 2025',
        title: 'Global Expansion',
        icon: GlobeIcon,
        description: 'Menambah jangkauan distribusi ke wilayah baru.',
        features: [
            { type: 'New', text: 'New DSPs: Integrasi dengan 20+ toko baru di Asia & Afrika (Joox, Boomplay, Trebel).' },
            { type: 'New', text: 'Localization: Dukungan Bahasa Indonesia, Spanyol, dan Jepang.' }
        ]
    },
    {
        version: 'v3.0.0',
        date: '01 Jun 2025',
        title: 'Analytics 2.0',
        icon: MusicNoteIcon,
        description: 'Wawasan data yang lebih dalam dan real-time.',
        features: [
            { type: 'New', text: 'Real-time Pulse: Grafik streaming detik-demi-detik.' },
            { type: 'New', text: 'Audience Geography: Peta panas lokasi pendengar interaktif.' }
        ]
    },
    {
        version: 'v2.0.0',
        date: '15 Apr 2025',
        title: 'Collaboration Era',
        icon: WrenchIcon,
        description: 'Fitur untuk bekerja sama dengan tim.',
        features: [
            { type: 'New', text: 'Team Access: Undang manajer dan produser ke akun Anda.' },
            { type: 'New', text: 'Collab Hub: Temukan musisi lain untuk berkolaborasi.' }
        ]
    },
    {
        version: 'v1.0.0',
        date: '01 Jan 2025',
        title: 'Genesis Launch',
        icon: TagIcon,
        description: 'Peluncuran publik pertama platform Leher Music Distribution.',
        features: [
            { type: 'New', text: 'Core Distribution: Kirim musik ke Spotify, Apple Music, dan YouTube.' },
            { type: 'New', text: 'Basic Analytics: Laporan tren harian.' },
            { type: 'New', text: 'Royalty Withdrawal: Penarikan dana ke Bank Lokal.' }
        ]
    }
];

const ChangelogView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-24 px-2 md:px-0">
            {/* Header */}
            <header className="flex flex-col items-start gap-4 md:gap-6 pt-2">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group text-sm md:text-base">
                    <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Dasbor
                </button>
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-singularity flex items-center justify-center shadow-glow-primary animate-pulse-slow shrink-0">
                        <LeherIcon className="w-6 h-6 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-5xl font-black text-ui-text-heading font-oxanium tracking-tight leading-tight">
                            Platform Roadmap & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Logs</span>
                        </h1>
                        <p className="text-xs md:text-lg text-ui-text-body mt-1 md:mt-2 max-w-2xl">
                            Rekam jejak evolusi sistem Leher Music.
                        </p>
                    </div>
                </div>
            </header>

            {/* Timeline */}
            <div className="relative border-l-2 border-singularity-purple/30 ml-3 md:ml-8 space-y-10 md:space-y-16 pb-10">
                {FULL_HISTORY.map((release, index) => {
                    const Icon = release.icon;
                    const isLatest = index === 0;
                    
                    return (
                        <div key={release.version} className="relative pl-6 md:pl-12 group">
                            {/* Node Indicator */}
                            <div className={`absolute -left-[10px] md:-left-[11px] top-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-ui-bg flex items-center justify-center transition-all duration-500 ${isLatest ? 'bg-singularity-teal scale-110 md:scale-125 shadow-[0_0_20px_var(--singularity-glow-teal)]' : 'bg-singularity-purple group-hover:bg-primary'}`}>
                                {isLatest && <div className="absolute w-full h-full rounded-full bg-singularity-teal animate-ping opacity-50"></div>}
                            </div>

                            {/* Content Card */}
                            <div className={`relative bg-ui-surface border transition-all duration-300 rounded-xl md:rounded-2xl overflow-hidden ${isLatest ? 'border-singularity-teal shadow-glow-primary' : 'border-ui-border hover:border-primary/50 hover:shadow-lg'}`}>
                                {isLatest && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-l from-singularity-teal to-transparent px-3 py-1 text-[10px] md:text-xs font-bold text-black uppercase tracking-wider">
                                        Latest
                                    </div>
                                )}
                                
                                <div className="p-4 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className={`p-2 md:p-3 rounded-lg md:rounded-xl ${isLatest ? 'bg-singularity-teal/20 text-singularity-teal' : 'bg-ui-bg text-ui-text-subtle'}`}>
                                                <Icon className="w-5 h-5 md:w-8 md:h-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-lg md:text-2xl font-bold text-ui-text-heading flex flex-wrap items-center gap-2 md:gap-3">
                                                    {release.version}
                                                    <span className="text-[10px] md:text-sm font-normal text-ui-text-body bg-ui-bg px-2 py-0.5 rounded-full border border-ui-border whitespace-nowrap">
                                                        {release.date}
                                                    </span>
                                                </h2>
                                                <h3 className="text-sm md:text-xl font-semibold text-gradient-primary mt-0.5 md:mt-1">{release.title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs md:text-lg text-ui-text-body mb-4 md:mb-6 border-l-4 border-primary/30 pl-3 md:pl-4 italic">
                                        "{release.description}"
                                    </p>

                                    <div className="grid grid-cols-1 gap-2 md:gap-4">
                                        {release.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-start gap-2 md:gap-3 bg-ui-bg/50 p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-ui-bg transition-colors">
                                                <span className={`
                                                    flex-shrink-0 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded uppercase mt-0.5
                                                    ${feature.type === 'New' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                                                      feature.type === 'Improvement' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                                                      feature.type === 'Optimization' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                                      feature.type === 'Fix' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}
                                                `}>
                                                    {feature.type}
                                                </span>
                                                <span className="text-xs md:text-sm text-ui-text-heading leading-relaxed">{feature.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="text-center pt-8 md:pt-12 border-t border-singularity-purple/30">
                <p className="text-ui-text-subtle text-xs md:text-sm">© 2025 Leher Music Distribution. Quantum Core v6.0.0</p>
            </div>
        </div>
    );
};

export default ChangelogView;
