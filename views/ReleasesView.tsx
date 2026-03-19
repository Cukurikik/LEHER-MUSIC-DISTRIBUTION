
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Search, 
    Plus, 
    LayoutGrid, 
    List, 
    ArrowUpDown, 
    Filter, 
    ChevronLeft, 
    ChevronRight,
    Trash2,
    Edit3,
    Sparkles,
    CheckCircle2,
    Clock,
    AlertCircle,
    ShieldAlert
} from 'lucide-react';
import type { Song, Release, Ebook } from '../types';
import { DistributionStatus } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';
import ReleaseCard from '../components/ReleaseCard'; 
import { useTranslation } from '../hooks/useTranslation';



interface ReleasesViewProps {
  releases: Release[];
  onDeleteSong: (songId: string) => void;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'az' | 'za' | 'type';

export const ReleasesView: React.FC<ReleasesViewProps> = ({ releases, onDeleteSong }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [releaseToDelete, setReleaseToDelete] = useState<Release | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = viewMode === 'grid' ? 12 : 15;

  // Stats Calculation
  const stats = useMemo(() => {
      const baseTotal = 695000; 
      const total = releases.length + baseTotal;
      const live = releases.filter(r => r.status === DistributionStatus.Live).length + Math.floor(baseTotal * 0.9);
      const processing = releases.filter(r => ['Processing', 'Submitted', 'In Review'].includes(r.status)).length + Math.floor(baseTotal * 0.08);
      const issues = releases.filter(r => ['Error', 'Rejected', 'Takedown Requested'].includes(r.status)).length + Math.floor(baseTotal * 0.02);

      return { total, live, processing, issues };
  }, [releases]);
  
  const filteredReleases = useMemo(() => {
    let items = [...releases];
    
    // Filter by Status
    if (filterStatus !== 'All') {
      items = items.filter(s => s.status === filterStatus);
    }
    
    // Filter by Search
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        items = items.filter(s => {
            const artistName = s.assetType === 'Audio' ? (s as Song).artistName : (s as Ebook).authorName;
            const isrc = s.assetType === 'Audio' ? (s as Song).isrc : (s as Ebook).isbn;
            const upc = s.assetType === 'Audio' ? (s as Song).upc : '';
            return s.title.toLowerCase().includes(term) || 
                   artistName.toLowerCase().includes(term) ||
                   (isrc && isrc.toLowerCase().includes(term)) ||
                   (upc && upc.includes(term));
        });
    }

    // Sorting
    items.sort((a, b) => {
      const dateA = new Date(a.assetType === 'Audio' ? (a as Song).releaseDate || 0 : (a as Ebook).publicationDate || 0).getTime();
      const dateB = new Date(b.assetType === 'Audio' ? (b as Song).releaseDate || 0 : (b as Ebook).publicationDate || 0).getTime();
      
      switch (sortOption) {
          case 'newest': return dateB - dateA;
          case 'oldest': return dateA - dateB;
          case 'az': return a.title.localeCompare(b.title);
          case 'za': return b.title.localeCompare(a.title);
          case 'type': {
              const getTypePriority = (r: Release) => {
                  if (r.assetType !== 'Audio') return 4; // Group non-audio at the end
                  const s = r as Song;
                  if (s.releaseType === 'Single') return 1;
                  if (s.releaseType === 'EP') return 2;
                  if (s.releaseType === 'Album') return 3;
                  return 5;
              };
              return getTypePriority(a) - getTypePriority(b);
          }
          default: return 0;
      }
    });

    return items;
  }, [releases, filterStatus, searchTerm, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredReleases.length / itemsPerPage);
  const paginatedReleases = filteredReleases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteRequest = (release: Release) => setReleaseToDelete(release);
  const handleConfirmDelete = () => {
    if (releaseToDelete) {
      onDeleteSong(releaseToDelete.id);
      setReleaseToDelete(null);
    }
  };

  // Helper for Status Badge
  const getStatusBadge = (status: DistributionStatus) => {
      let colorClass = '';
      let dotColor = '';
      switch (status) {
        case DistributionStatus.Live: 
            colorClass = 'bg-green-500/10 text-green-400 border-green-500/20'; 
            dotColor = 'bg-green-400';
            break;
        case DistributionStatus.Submitted: 
        case DistributionStatus.Processing: 
        case DistributionStatus.InReview: 
            colorClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse-slow'; 
            dotColor = 'bg-blue-400';
            break;
        case DistributionStatus.Approved: 
            colorClass = 'bg-teal-500/10 text-teal-400 border-teal-500/20'; 
            dotColor = 'bg-teal-400';
            break;
        case DistributionStatus.Rejected: 
        case DistributionStatus.Error: 
            colorClass = 'bg-red-500/10 text-red-400 border-red-500/20'; 
            dotColor = 'bg-red-400';
            break;
        default: 
            colorClass = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            dotColor = 'bg-gray-400';
      }
      return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
            {status}
        </span>
      );
  };

  return (
    <div className="space-y-10 pb-32">
      
      {/* HEADER & HUD STATS */}
      <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                  <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                      Global <span className="text-zinc-500">Catalog</span>
                  </h1>
                  <p className="text-zinc-500 mt-2 text-lg font-medium">Master control for your distributed assets.</p>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create-release')}
                className="group bg-white text-black font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-white/5"
              >
                  <Plus className="w-5 h-5" />
                  <span className="tracking-tight uppercase">Upload Rilis</span>
              </motion.button>
          </div>

          {/* HUD Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Total Assets', value: stats.total, icon: LayoutGrid, color: 'text-white' },
                { label: 'Live', value: stats.live, icon: CheckCircle2, color: 'text-emerald-400', pulse: true },
                { label: 'Processing', value: stats.processing, icon: Clock, color: 'text-blue-400' },
                { label: 'Action Required', value: stats.issues, icon: AlertCircle, color: 'text-rose-400' }
              ].map((stat, idx) => (
                <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-2">
                            {stat.label} {stat.pulse && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                        </p>
                        <stat.icon className={`w-4 h-4 ${stat.color} opacity-50`} />
                    </div>
                    <p className={`text-3xl font-bold tracking-tight ${stat.color}`}>{stat.value.toLocaleString()}</p>
                </motion.div>
              ))}
          </div>
      </div>

      {/* COMMAND BAR */}
      <div className="sticky top-0 z-40 -mx-4 px-4 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between max-w-7xl mx-auto">
            
            {/* Search */}
            <div className="relative w-full lg:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-white/5 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-medium"
                    placeholder="Search catalog..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                {['All', 'Live', 'Processing', 'Draft', 'Error'].map(status => (
                    <button
                        key={status}
                        onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                            filterStatus === status 
                            ? 'bg-white text-black border-white' 
                            : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:text-white hover:bg-zinc-800'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* View & Sort */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                    <select 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="appearance-none bg-zinc-900/50 text-white font-bold text-xs py-2.5 pl-10 pr-8 rounded-xl focus:outline-none border border-white/5 hover:bg-zinc-800 cursor-pointer"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>

                <div className="flex bg-zinc-900/50 rounded-xl p-1 border border-white/5">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
      </div>


      {/* CONTENT GRID / LIST */}
      <main className="min-h-[500px] pt-8">
        <AnimatePresence mode="wait">
            {paginatedReleases.length > 0 ? (
                <motion.div
                    key={`${viewMode}-${filterStatus}-${searchTerm}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                          {paginatedReleases.map(release => (
                            <ReleaseCard key={release.id} song={release} onDeleteRequest={handleDeleteRequest} />
                          ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500 border-b border-white/5 font-bold">
                                        <th className="p-6 pl-8">Asset Details</th>
                                        <th className="p-6 hidden sm:table-cell">Identifiers</th>
                                        <th className="p-6 hidden md:table-cell">Release Date</th>
                                        <th className="p-6">Status</th>
                                        <th className="p-6 text-right pr-8">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {paginatedReleases.map(release => {
                                        const isSong = release.assetType === 'Audio';
                                        const artist = isSong ? (release as Song).artistName : (release as Ebook).authorName;
                                        const date = isSong ? (release as Song).releaseDate : (release as Ebook).publicationDate;
                                        const isrc = isSong ? (release as Song).isrc : (release as Ebook).isbn;
                                        const upc = isSong ? (release as Song).upc : '-';
                                        
                                        return (
                                            <tr key={release.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => isSong && navigate(`/release/${release.id}`)}>
                                                <td className="p-5 pl-8">
                                                    <div className="flex items-center gap-5">
                                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                                                            <img src={release.coverArtUrl} alt={release.title} className="w-full h-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-white text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">{release.title}</p>
                                                            <p className="text-xs text-zinc-500 mt-1 truncate font-medium">{artist}</p>
                                                            <div className="flex gap-2 mt-2">
                                                                <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-lg text-zinc-400 border border-white/5 font-bold uppercase tracking-wider">{release.assetType}</span>
                                                                {isSong && <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-lg text-zinc-400 border border-white/5 font-bold uppercase tracking-wider">{(release as Song).releaseType}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5 hidden sm:table-cell">
                                                    <div className="text-[10px] font-mono text-zinc-500 space-y-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                                                        <p><span className="text-zinc-400 font-bold">UPC:</span> {upc || '---'}</p>
                                                        <p><span className="text-zinc-400 font-bold">ISRC:</span> {isrc || '---'}</p>
                                                    </div>
                                                </td>
                                                <td className="p-5 hidden md:table-cell text-sm text-zinc-400 font-medium">
                                                    {date ? new Date(date).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) : 'TBA'}
                                                </td>
                                                <td className="p-5">
                                                    {getStatusBadge(release.status)}
                                                </td>
                                                <td className="p-5 pr-8 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all transform lg:translate-x-2 lg:group-hover:translate-x-0">
                                                        {isSong && (
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); navigate(`/release/${release.id}`); }}
                                                                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                                                                title="Edit"
                                                            >
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteRequest(release); }}
                                                            className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 flex flex-col items-center justify-center"
                >
                  <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
                      <Sparkles className="w-10 h-10 text-zinc-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{t('no_releases_found_title')}</h3>
                  <p className="text-zinc-500 mt-3 max-w-md leading-relaxed font-medium">{t('no_releases_found_desc')}</p>
                  {filterStatus !== 'All' || searchTerm ? (
                      <button onClick={() => { setFilterStatus('All'); setSearchTerm(''); }} className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors uppercase text-xs tracking-widest">
                          Reset Filters
                      </button>
                  ) : (
                      <button onClick={() => navigate('/create-release')} className="mt-8 px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/80 transition-colors uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
                          <Plus className="w-4 h-4" />
                          Upload Rilis
                      </button>
                  )}
                </motion.div>
            )}
        </AnimatePresence>
      </main>
        
      {/* PAGINATION */}
      {totalPages > 1 && (
         <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-6 bg-zinc-900/40 rounded-3xl border border-white/5 backdrop-blur-xl">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {t('pagination_showing', {count: paginatedReleases.length, total: stats.total.toLocaleString()})}
            </span>
            <div className="flex gap-3 items-center">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1} 
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft className="w-4 h-4"/>
                </button>
                 
                 <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => {
                        const isActive = currentPage === page;
                        return (
                            <button 
                                key={page} 
                                onClick={() => setCurrentPage(page)} 
                                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                                    isActive 
                                    ? 'bg-white text-black shadow-xl shadow-white/5' 
                                    : 'bg-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-700'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    })}
                    {totalPages > 5 && <span className="w-10 h-10 flex items-center justify-center text-zinc-700 font-bold">...</span>}
                 </div>

                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages} 
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight className="w-4 h-4"/>
                </button>
            </div>
        </div>
      )}
      
      <ConfirmationModal
        isOpen={!!releaseToDelete}
        onClose={() => setReleaseToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={t('confirm_delete_title')}
        message={t('confirm_delete_message', { title: releaseToDelete?.title || '' })}
      />
    </div>
  );
};

export default ReleasesView;
