
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Release, Video } from '../types';
import { DistributionStatus } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';
import ReleaseCard from '../components/ReleaseCard'; 
import { useTranslation } from '../hooks/useTranslation';
import SparklesIcon from '../components/layout/SparklesIcon';
import FilmIcon from '../components/icons/FilmIcon';



// --- Local Icons ---
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>);
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>);

interface VideosViewProps {
  releases: Release[];
  onDeleteSong: (songId: string) => void;
}

const VideosView: React.FC<VideosViewProps> = ({ releases, onDeleteSong }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [releaseToDelete, setReleaseToDelete] = useState<Release | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 12;

  // Filter only Video releases
  const videoReleases = useMemo(() => releases.filter((r): r is Video => r.assetType === 'Video'), [releases]);

  // Stats Calculation
  const stats = useMemo(() => {
      return {
          total: videoReleases.length,
          live: videoReleases.filter(r => r.status === DistributionStatus.Live).length,
          processing: videoReleases.filter(r => ['Processing', 'Submitted', 'In Review'].includes(r.status)).length,
          issues: videoReleases.filter(r => ['Error', 'Rejected', 'Takedown Requested'].includes(r.status)).length
      };
  }, [videoReleases]);
  
  const filteredReleases = useMemo(() => {
    let items = [...videoReleases];
    
    // Filter by Status
    if (filterStatus !== 'All') {
      items = items.filter(s => s.status === filterStatus);
    }
    
    // Filter by Search
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        items = items.filter(s => {
            return s.title.toLowerCase().includes(term) || 
                   s.artistName.toLowerCase().includes(term) ||
                   (s.isrc && s.isrc.toLowerCase().includes(term)) ||
                   (s.upc && s.upc.includes(term));
        });
    }

    // Sorting (Default Newest)
    items.sort((a, b) => new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime());

    return items;
  }, [videoReleases, filterStatus, searchTerm]);

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

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                  <div className="flex items-center gap-3">
                      <FilmIcon className="w-10 h-10 text-secondary" />
                      <h1 className="text-4xl font-black text-ui-text-heading font-oxanium">Music Videos</h1>
                  </div>
                  <p className="text-ui-text-body mt-1">Manage your official music videos, visualizers, and lyric videos.</p>
              </div>
              <button 
                onClick={() => navigate('/create-release', { state: { initialAssetType: 'Video' } })}
                className="group bg-gradient-singularity text-white font-bold px-6 py-3 rounded-full transition-all shadow-glow-primary hover:scale-105 flex items-center gap-2"
              >
                  <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-90" />
                  <span>Create Video</span>
              </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                  <p className="text-xs text-ui-text-subtle uppercase tracking-wider font-bold">Total Videos</p>
                  <p className="text-2xl font-bold text-ui-text-heading mt-1">{stats.total}</p>
              </div>
              <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                  <p className="text-xs text-ui-text-subtle uppercase tracking-wider font-bold">Live</p>
                  <p className="text-2xl font-bold text-green-400 mt-1">{stats.live}</p>
              </div>
              <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                  <p className="text-xs text-ui-text-subtle uppercase tracking-wider font-bold">Processing</p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">{stats.processing}</p>
              </div>
              <div className="bg-ui-surface p-4 rounded-xl border border-ui-border">
                  <p className="text-xs text-ui-text-subtle uppercase tracking-wider font-bold">Issues</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">{stats.issues}</p>
              </div>
          </div>
      </div>

      {/* CONTROL BAR */}
      <div className="bg-ui-surface p-4 rounded-2xl border border-ui-border flex flex-col md:flex-row gap-4 items-center justify-between transition-all">
        {/* Left: Search */}
        <div className="relative w-full md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-ui-text-subtle group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-ui-bg/50 text-ui-text-heading placeholder-ui-text-subtle focus:ring-2 focus:ring-primary transition-all form-input-glow"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Middle: Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
            <FilterIcon className="w-5 h-5 text-ui-text-subtle hidden md:block" />
            {['All', 'Live', 'Processing', 'Draft', 'Error'].map(status => (
                <button
                    key={status}
                    onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                        filterStatus === status 
                        ? 'bg-secondary text-white shadow-glow-secondary scale-105' 
                        : 'bg-ui-bg/50 text-ui-text-body hover:bg-ui-bg hover:text-white'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>


      {/* CONTENT AREA */}
      <main className="min-h-[400px]">
        {paginatedReleases.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-fade-in">
              {paginatedReleases.map(release => (
                <ReleaseCard key={release.id} song={release} onDeleteRequest={handleDeleteRequest} />
              ))}
            </div>
        ) : (
            <div className="text-center py-24 bg-ui-surface/50 backdrop-blur-lg border-2 border-dashed border-ui-border rounded-2xl flex flex-col items-center justify-center animate-fade-in">
              <div className="w-20 h-20 bg-ui-surface rounded-full flex items-center justify-center mb-4">
                  <SparklesIcon className="w-10 h-10 text-ui-text-subtle" />
              </div>
              <h3 className="text-2xl font-bold text-ui-text-heading">{t('no_releases_found_title')}</h3>
              <p className="text-ui-text-body mt-2 max-w-md">No videos found matching your search.</p>
              {filterStatus !== 'All' || searchTerm ? (
                  <button onClick={() => { setFilterStatus('All'); setSearchTerm(''); }} className="mt-6 text-primary hover:underline font-bold">
                      Clear Filters
                  </button>
              ) : (
                  <button onClick={() => navigate('/create-release', { state: { initialAssetType: 'Video' } })} className="mt-8 px-8 py-3 bg-secondary text-white font-bold rounded-2xl hover:bg-secondary/80 transition-colors uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-secondary/20">
                      <PlusIcon className="w-4 h-4" />
                      Upload Rilis
                  </button>
              )}
            </div>
        )}
      </main>
        
      {/* PAGINATION */}
      {totalPages > 1 && (
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-ui-surface/50 rounded-xl border border-ui-border">
            <span className="text-sm text-ui-text-subtle">{t('pagination_showing', {count: paginatedReleases.length, total: filteredReleases.length})}</span>
            <div className="flex gap-2 items-center">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1} 
                    className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronLeftIcon className="w-5 h-5"/>
                </button>
                 
                 <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                                <button 
                                    key={page} 
                                    onClick={() => setCurrentPage(page)} 
                                    className={`w-9 h-9 rounded-lg font-bold text-sm transition-all ${currentPage === page ? 'bg-secondary text-white shadow-glow-secondary' : 'hover:bg-white/10 text-ui-text-body'}`}
                                >
                                    {page}
                                </button>
                            )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                             return <span key={page} className="w-9 h-9 flex items-center justify-center text-ui-text-subtle">...</span>
                        }
                        return null;
                    })}
                 </div>

                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages} 
                    className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronRightIcon className="w-5 h-5"/>
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

export default VideosView;
