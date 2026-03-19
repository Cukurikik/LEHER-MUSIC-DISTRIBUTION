
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import FaqAccordion from '../components/FaqAccordion';
import ReleaseIcon from '../components/icons/ReleaseIcon';
import PaymentsIcon from '../components/icons/PaymentsIcon';
import ArtistIcon from '../components/icons/ArtistIcon';
import SparklesIcon from '../components/layout/SparklesIcon';
import PlugIcon from '../components/icons/PlugIcon';
import { useTranslation } from '../hooks/useTranslation';
import type { TranslationKeys } from '../types';

// Icons
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const faqData: Record<string, { q: string, a: string }[]> = {
    distribution: [
        { q: "Berapa lama proses distribusi ke Spotify & Apple Music?", a: "Biasanya 24-48 jam setelah persetujuan. Namun, kami sarankan upload 7-14 hari sebelum tanggal rilis untuk memastikan lagu tayang serentak di semua platform." },
        { q: "Apakah saya bisa mengunggah lagu cover?", a: "Ya, Anda bisa. Pastikan Anda mencentang opsi 'Cover Song' saat upload. Kami akan mengurus lisensi mekanikal untuk rilis cover yang didistribusikan ke platform streaming utama." },
        { q: "Format audio apa yang diterima?", a: "Kami menerima file WAV (16-bit/24-bit, 44.1kHz atau lebih tinggi) dan FLAC. MP3 tidak disarankan untuk kualitas terbaik." },
        { q: "Apa itu ISRC dan UPC?", a: "<strong>ISRC</strong> (International Standard Recording Code) adalah kode unik untuk setiap lagu. <strong>UPC</strong> (Universal Product Code) adalah kode unik untuk album/single Anda. Kami membuatnya secara GRATIS jika Anda belum memilikinya." },
        { q: "Bolehkah saya menggunakan nama artis yang sudah ada?", a: "Tidak boleh. Nama artis harus unik atau Anda harus memiliki hak sah untuk menggunakannya. Penipuan identitas akan menyebabkan akun diblokir." },
        { q: "Ke toko mana saja musik saya dikirim?", a: "Kami mendistribusikan ke lebih dari 150+ toko digital termasuk Spotify, Apple Music, YouTube Music, TikTok, Instagram, Amazon Music, Deezer, Tidal, dan banyak lagi." },
        { q: "Bagaimana cara melakukan takedown (hapus rilis)?", a: "Masuk ke menu 'Katalog Musik', pilih rilis, lalu klik tombol 'Takedown'. Proses ini memakan waktu 2-5 hari kerja hingga lagu hilang dari toko." },
        { q: "Apakah saya tetap memiliki hak cipta musik saya?", a: "<strong>YA, 100%.</strong> Leher Music tidak mengambil kepemilikan hak cipta. Kami hanya mendistribusikan atas nama Anda." },
        { q: "Bisakah saya merilis musik instrumental?", a: "Tentu. Pastikan kualitas audio prima. Untuk musik 'lo-fi' atau 'sleep music', pastikan tidak menggunakan loop sampel yang belum dibersihkan hak ciptanya." },
        { q: "Apa itu 'Content ID' YouTube?", a: "Sistem yang memindai video di YouTube untuk menemukan penggunaan lagu Anda. Jika ditemukan, iklan akan dipasang dan Anda mendapatkan uang darinya." },
        { q: "Kenapa rilis saya ditolak?", a: "Alasan umum: Artwork buram/mengandung teks promosi, audio kualitas rendah, atau metadata tidak sesuai (misal: nama artis di cover beda dengan di form input)." },
        { q: "Bisakah saya menentukan tanggal rilis di masa depan?", a: "Ya, fitur ini tersedia untuk semua pengguna. Menentukan tanggal rilis di masa depan sangat penting untuk strategi promosi dan playlist pitching." },
        { q: "Bagaimana dengan lirik lagu?", a: "Anda bisa memasukkan lirik saat upload. Kami akan mengirimkannya ke Apple Music, Spotify (via Musixmatch), dan layanan lirik lainnya." },
        { q: "Apakah ada batasan jumlah rilis?", a: "Tergantung paket Anda. Paket 'Legend' menawarkan rilis tanpa batas (Unlimited)." },
        { q: "Dapatkah saya mengedit rilis setelah live?", a: "Beberapa metadata bisa diedit (seperti nama penulis lagu). Namun audio dan jumlah track tidak bisa diubah. Anda harus melakukan takedown dan upload ulang untuk perubahan besar." }
    ],
    payments: [
        { q: "Kapan saya menerima pembayaran royalti?", a: "Royalti dibayarkan setiap bulan dengan jeda pelaporan 2-3 bulan dari toko (standar industri). Contoh: Pendapatan Januari biasanya masuk di April." },
        { q: "Berapa batas minimum penarikan?", a: "Minimum penarikan adalah $10 (sekitar Rp150.000) untuk PayPal/Bank Transfer lokal, dan $50 untuk Wire Transfer internasional." },
        { q: "Metode pembayaran apa yang tersedia?", a: "Transfer Bank Lokal (IDR), PayPal (USD), Wise, dan Crypto (USDT/BTC)." },
        { q: "Apakah ada potongan biaya saat penarikan?", a: "Leher tidak memotong biaya tambahan, namun penyedia layanan pembayaran (Bank/PayPal) mungkin mengenakan biaya transaksi standar." },
        { q: "Bagaimana cara kerja Smart Splits?", a: "Anda menentukan persentase untuk kolaborator. Saat royalti masuk, sistem otomatis membagi saldo ke akun masing-masing kolaborator. Mereka harus memiliki akun Leher." },
        { q: "Apa itu 'Cash Advance'?", a: "Fitur pinjaman modal di muka berdasarkan prediksi pendapatan streaming Anda di masa depan. Tersedia untuk artis yang memenuhi syarat streaming tertentu." },
        { q: "Kenapa royalti saya belum masuk?", a: "Toko digital membayar pada waktu yang berbeda-beda. Jika laporan belum ada, berarti toko belum mengirimkan data/dana untuk periode tersebut." },
        { q: "Apakah saya perlu membayar pajak?", a: "Anda bertanggung jawab atas pelaporan pajak di negara Anda. Kami menyediakan laporan pendapatan yang bisa digunakan untuk pelaporan pajak." },
        { q: "Bagaimana dengan royalti YouTube Content ID?", a: "Pendapatan ini masuk bersamaan dengan royalti streaming lainnya di laporan bulanan Anda." },
        { q: "Apakah saya dibayar untuk stream di akun gratis?", a: "Ya, stream yang didukung iklan (ad-supported) tetap menghasilkan uang, meskipun ratenya lebih rendah daripada stream premium." }
    ],
    tools: [
        { q: "Bagaimana cara kerja AI Mastering?", a: "AI kami menganalisis trek Anda dan menerapkan kompresi, EQ, dan limiting untuk mencapai standar kenyaringan industri secara instan." },
        { q: "Apa itu SmartLink?", a: "Satu tautan pendek yang berisi link ke semua platform musik (Spotify, Apple, dll). Gunakan ini di bio Instagram/TikTok Anda untuk memudahkan fans." },
        { q: "Bagaimana cara menggunakan fitur Pre-Save?", a: "Buat kampanye SmartLink sebelum tanggal rilis. Fans bisa 'Pre-Save' agar lagu otomatis masuk library mereka saat rilis." },
        { q: "Apakah AI Cover Art Generator gratis?", a: "Pengguna mendapatkan kuota kredit gratis setiap bulan. Paket berbayar mendapatkan akses unlimited." },
        { q: "Apa fungsi 'Lyric Translation'?", a: "Menerjemahkan lirik lagu Anda ke bahasa asing dengan tetap menjaga makna puitis, membantu menjangkau pendengar global." },
        { q: "Bagaimana cara kerja 'Brand Matchmaking'?", a: "AI menganalisis demografi pendengar Anda dan mencocokkannya dengan brand yang mencari audiens serupa untuk peluang sponsor." },
        { q: "Apa itu 'Leher Academy'?", a: "Platform e-learning di dalam aplikasi untuk belajar strategi rilis, hukum musik, dan marketing." },
        { q: "Bisakah saya membuat video lirik otomatis?", a: "Ya, gunakan tool 'AI Music Video Generator' kami. Upload audio dan lirik, pilih gaya visual, dan render." }
    ],
    account: [
        { q: "Bagaimana cara mengubah email akun?", a: "Masuk ke Pengaturan > Profil. Ubah email dan verifikasi melalui tautan yang dikirim ke email baru." },
        { q: "Saya lupa password, bagaimana ini?", a: "Gunakan fitur 'Lupa Password' di halaman login. Kami akan mengirim link reset." },
        { q: "Bisakah saya mengelola beberapa artis dalam satu akun?", a: "Ya! Akun standar bisa mengelola beberapa artis. Paket 'Label' memiliki fitur manajemen roster yang lebih canggih." },
        { q: "Bagaimana cara menghapus akun?", a: "Hubungi tim support kami. Pastikan semua rilis sudah di-takedown dan saldo sudah ditarik sebelum mengajukan penghapusan." },
        { q: "Apakah akun saya aman?", a: "Kami menggunakan enkripsi standar industri dan menyarankan Anda mengaktifkan 2FA (Two-Factor Authentication) di menu Keamanan." }
    ],
    platform: [
        { q: "Apa itu DSP?", a: "Digital Service Provider, yaitu toko musik digital seperti Spotify, Apple Music, Joox, dll." },
        { q: "Bagaimana cara klaim profil Spotify for Artists?", a: "Setelah rilis pertama live, Anda bisa klaim profil via dashboard Spotify for Artists atau melalui fitur 'Claim Profile' di menu Toolkit kami." },
        { q: "Apakah musik saya akan ada di TikTok?", a: "Ya, kami mengirim ke library TikTok sehingga user bisa memakai lagu Anda di video mereka." },
        { q: "Kapan lagu saya muncul di 'New Music Friday'?", a: "Itu adalah playlist editorial. Gunakan fitur 'Playlist Pitcher' kami untuk membantu mengirimkan pitch ke kurator." },
        { q: "Apakah ada biaya tersembunyi?", a: "Tidak. Struktur biaya kami transparan sesuai paket yang Anda pilih." }
    ],
    support: [
        { q: "Bagaimana cara menghubungi CS?", a: "Gunakan tombol 'Kirim Tiket' di halaman ini atau email ke support@leher.com." },
        { q: "Berapa lama respon support?", a: "Untuk user gratis: 24-48 jam. Untuk user Pro/Legend: Prioritas < 12 jam." },
        { q: "Apakah ada dukungan telepon?", a: "Saat ini dukungan telepon hanya tersedia untuk klien Enterprise/Label besar." },
        { q: "Bisakah saya meminta bantuan promosi?", a: "Kami menyediakan alat promosi mandiri. Untuk layanan agensi, silakan cek menu 'Services'." }
    ]
};

const supportCategories = [
    { name: 'support_cat_dist', key: 'distribution', icon: ReleaseIcon, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { name: 'support_cat_pay', key: 'payments', icon: PaymentsIcon, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    { name: 'support_cat_account', key: 'account', icon: ArtistIcon, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { name: 'support_cat_tools', key: 'tools', icon: SparklesIcon, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { name: 'support_cat_platform', key: 'platform', icon: PlugIcon, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { name: 'support_cat_api', key: 'support', icon: PlugIcon, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
];

const DistributionStatusGuide: React.FC = () => {
    const { t } = useTranslation();

    const pipelineSteps = [
        { title: 'Draft', desc: 'dist_status_cat1_item1_desc', color: 'bg-gray-600', glow: 'shadow-gray-500/50' },
        { title: 'Submitted', desc: 'dist_status_cat1_item2_desc', color: 'bg-blue-500', glow: 'shadow-blue-500/50' },
        { title: 'In Review', desc: 'dist_status_cat1_item3_desc', color: 'bg-yellow-500', glow: 'shadow-yellow-500/50' },
        { title: 'Approved', desc: 'dist_status_cat1_item4_desc', color: 'bg-teal-500', glow: 'shadow-teal-500/50' },
        { title: 'Delivered', desc: 'dist_status_cat1_item5_desc', color: 'bg-purple-500', glow: 'shadow-purple-500/50' },
        { title: 'Live', desc: 'dist_status_cat1_item6_desc', color: 'bg-green-500', glow: 'shadow-green-500/50' },
    ];

    return (
        <div className="space-y-12 animate-fade-in max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
                 {/* Connector Line (Desktop) */}
                <div className="hidden lg:block absolute top-6 left-10 right-10 h-1 bg-ui-border -z-10"></div>
                
                {pipelineSteps.map((step, index) => (
                    <div key={step.title} className="relative group p-4 rounded-2xl bg-ui-surface/40 border border-ui-border hover:border-ui-border/80 hover:bg-ui-surface transition-all duration-300 backdrop-blur-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full border-4 border-ui-bg flex items-center justify-center text-white font-bold text-lg shadow-lg mb-3 transition-transform group-hover:scale-110 ${step.color} ${step.glow}`}>
                                {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-ui-text-heading group-hover:text-white transition-colors">{step.title}</h3>
                            <p className="text-xs text-ui-text-body mt-2 leading-relaxed">{t(step.desc as TranslationKeys)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FaqContent: React.FC = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredFaqData = useMemo(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const newFilteredData: typeof faqData = {};
        let hasResults = false;

        for (const category in faqData) {
            // If a category is selected, only show that category (unless searching)
            if (activeCategory && activeCategory !== category && !searchTerm) continue;

            const items = faqData[category as keyof typeof faqData].filter(
                item => item.q.toLowerCase().includes(lowercasedFilter) || item.a.toLowerCase().includes(lowercasedFilter)
            );
            
            if (items.length > 0) {
                newFilteredData[category] = items;
                hasResults = true;
            }
        }
        
        return hasResults ? newFilteredData : null;
    }, [searchTerm, activeCategory]);

    return (
        <div className="flex flex-col gap-10 animate-fade-in max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full max-w-3xl mx-auto group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-30 group-focus-within:opacity-100 blur transition duration-500 animate-gradient-x"></div>
                <div className="relative flex items-center bg-ui-bg rounded-full shadow-2xl">
                     <div className="pl-6 text-ui-text-subtle group-focus-within:text-primary transition-colors">
                        <SearchIcon className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Knowledge Base..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none py-4 px-4 text-lg text-white placeholder-ui-text-subtle focus:ring-0 focus:outline-none"
                    />
                </div>
            </div>

            {/* Visual Category Grid */}
            {!searchTerm && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {supportCategories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                            className={`relative p-4 rounded-2xl border transition-all duration-300 group flex flex-col items-center gap-3 text-center overflow-hidden ${activeCategory === cat.key ? `${cat.bg} ${cat.border} ring-1 ring-offset-1 ring-offset-ui-bg ring-white/20` : 'bg-ui-surface/50 border-ui-border hover:border-ui-border/80 hover:bg-ui-surface'}`}
                        >
                            <div className={`p-3 rounded-full bg-ui-bg group-hover:scale-110 transition-transform duration-300 shadow-lg ${cat.color}`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <span className={`font-bold text-sm ${activeCategory === cat.key ? 'text-white' : 'text-ui-text-heading'}`}>
                                {t(cat.name as TranslationKeys)}
                            </span>
                            {/* Active Indicator */}
                            {activeCategory === cat.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Results Area */}
            <div className="min-h-[300px]">
                {filteredFaqData ? (
                    <div className="space-y-12">
                        {supportCategories.map(cat => {
                            const items = filteredFaqData[cat.key as keyof typeof faqData];
                            if (!items) return null;
                            return (
                                <section key={cat.key} className="animate-slide-up">
                                    <div className="flex items-center gap-3 mb-6 border-b border-ui-border/50 pb-4">
                                        <cat.icon className={`w-6 h-6 ${cat.color}`}/>
                                        <h2 className="text-2xl font-bold text-ui-text-heading capitalize">
                                            {t(cat.name as TranslationKeys)}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {items.map((item, index) => (
                                            <FaqAccordion key={index} title={item.q}>
                                                <div dangerouslySetInnerHTML={{ __html: item.a }} />
                                            </FaqAccordion>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                ) : (
                     <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <div className="w-20 h-20 bg-ui-surface rounded-full flex items-center justify-center mb-4 animate-pulse">
                             <SearchIcon className="w-8 h-8 text-ui-text-subtle" />
                        </div>
                        <p className="text-xl font-bold text-ui-text-heading">No matching answers found</p>
                        <p className="text-ui-text-body mt-2">Try adjusting your search or browse categories above.</p>
                        <button onClick={() => setSearchTerm('')} className="mt-6 text-primary hover:underline font-bold">Clear Search</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const SupportView: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'faq' | 'statuses'>('faq');
    const navigate = useNavigate();

    return (
        <div className="space-y-10 pb-20">
             <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-ui-text-subtle hover:text-white transition-colors font-semibold group">
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {t('back_to_dashboard')}
            </button>
            
            {/* Futuristic Hero */}
            <header className="relative bg-gradient-to-b from-ui-surface to-ui-bg rounded-3xl p-8 md:p-16 border border-white/5 overflow-hidden text-center shadow-2xl">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-white/80 uppercase tracking-wider">System Online</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white font-oxanium tracking-tight mb-6 drop-shadow-xl">
                        {t('support_title')}
                    </h1>
                    <p className="text-lg md:text-xl text-ui-text-body max-w-2xl mx-auto leading-relaxed">
                        {t('support_subtitle')} Access our neural knowledge base or track your distribution status in real-time.
                    </p>

                    {/* Tab Switcher */}
                    <div className="mt-10 p-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full inline-flex relative">
                        <button
                            onClick={() => setActiveTab('faq')}
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeTab === 'faq' 
                                ? 'text-black bg-white shadow-glow-white' 
                                : 'text-ui-text-subtle hover:text-white'
                            }`}
                        >
                            Knowledge Base
                        </button>
                         <button
                            onClick={() => setActiveTab('statuses')}
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeTab === 'statuses' 
                                ? 'text-black bg-white shadow-glow-white' 
                                : 'text-ui-text-subtle hover:text-white'
                            }`}
                        >
                            Status Pipeline
                        </button>
                    </div>
                </div>
            </header>
            
            <main>
                {activeTab === 'statuses' ? <DistributionStatusGuide /> : <FaqContent />}
            </main>
            
            <footer className="border-t border-ui-border/50 pt-10 mt-10 text-center">
                <p className="text-ui-text-subtle mb-4">Still need assistance?</p>
                <Link 
                    to="/support/submit-ticket" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-ui-surface border border-ui-border hover:border-primary hover:bg-ui-surface/80 transition-all group"
                >
                    <span className="font-bold text-white group-hover:text-primary transition-colors">Open Support Ticket</span>
                    <ArrowLeftIcon className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform text-ui-text-subtle group-hover:text-primary" />
                </Link>
            </footer>
        </div>
    );
};

export default SupportView;
