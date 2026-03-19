
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Settings, Trash2, BarChart3, ExternalLink } from 'lucide-react';
import type { Release, Song, Ebook, Video } from '../types';
import { DistributionStatus } from '../types';



const getStatusColor = (status: DistributionStatus): string => {
  switch (status) {
    case DistributionStatus.Live: return '#10B981'; // emerald-500
    case DistributionStatus.Submitted:
    case DistributionStatus.Processing:
    case DistributionStatus.InReview:
    case DistributionStatus.Approved:
    case DistributionStatus.Delivered: return '#3B82F6'; // blue-500
    case DistributionStatus.Rejected:
    case DistributionStatus.Error: return '#EF4444'; // rose-500
    default: return '#71717A'; // zinc-500
  }
};

interface ReleaseCardProps {
    song: Release; 
    onDeleteRequest: (release: Release) => void;
}

const ReleaseCard: React.FC<ReleaseCardProps> = React.memo(({ song: release, onDeleteRequest }) => {
    const navigate = useNavigate();
    const isSong = release.assetType === 'Audio';
    const isVideo = release.assetType === 'Video';
    const creatorName = (isSong || isVideo) ? (release as Song | Video).artistName : (release as Ebook).authorName;
    const releaseDate = (isSong || isVideo) ? (release as Song | Video).releaseDate : (release as Ebook).publicationDate;
    const linkTo = isSong ? `/release/${release.id}` : '#';
    const statusColor = getStatusColor(release.status);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDeleteRequest(release);
    };

    const handleManageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSong) {
            navigate(linkTo);
        }
    };
    
    const handleAnalyticsClick = (e: React.MouseEvent) => {
         e.preventDefault();
        e.stopPropagation();
        navigate('/analytics');
    };

    const handleNavigate = () => {
        if (isSong) {
            navigate(linkTo);
        }
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            onClick={handleNavigate} 
            className={`group relative flex flex-col bg-zinc-900/40 rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 ${isSong ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden w-full bg-zinc-950">
                <img 
                    src={release.coverArtUrl} 
                    alt={`${release.title} cover art`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    loading="lazy"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-xl px-2.5 py-1 border border-white/5">
                    <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}` }}
                    ></div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">{release.status}</span>
                </div>

                {/* Desktop Action Overlay */}
                <div className="hidden md:flex absolute inset-0 flex-col justify-end p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-black/60 backdrop-blur-md z-30">
                     {isSong && (
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <button onClick={handleAnalyticsClick} className="flex items-center justify-center gap-2 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all">
                                <BarChart3 className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">Stats</span>
                            </button>
                             <button onClick={handleDeleteClick} className="flex items-center justify-center gap-2 p-2.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl text-rose-400 transition-all">
                                <Trash2 className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">Delete</span>
                            </button>
                        </div>
                    )}
                    {isSong && (
                         <button onClick={handleManageClick} className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-xl">
                            <Settings className="w-4 h-4" /> 
                            <span className="text-xs uppercase tracking-tight">Manage Release</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Text Content */}
            <div className="p-5 flex flex-col flex-grow relative z-10">
                <h3 className="font-bold text-base text-white leading-tight line-clamp-1 mb-1 group-hover:text-primary transition-colors">{release.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-1 mb-4 font-medium">{creatorName}</p>
                
                <div className="mt-auto flex justify-between items-center">
                    <div className="flex gap-2">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">{release.assetType}</span>
                         {isSong && <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">{(release as Song).releaseType}</span>}
                    </div>
                    
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                         {releaseDate ? new Date(releaseDate).toLocaleDateString(undefined, { year: 'numeric' }) : 'TBA'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
});

export default ReleaseCard;
