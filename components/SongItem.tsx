import React from 'react';
import type { Release, Song, Ebook } from '../types';
import { DistributionStatus } from '../types';
import { Link } from 'react-router-dom';


interface ReleaseItemProps {
  release: Release;
}

const getStatusClasses = (status: DistributionStatus): string => {
  switch (status) {
    case DistributionStatus.Live:
      return 'bg-green-500/10 text-green-400';
    case DistributionStatus.Submitted:
    case DistributionStatus.Processing:
    case DistributionStatus.InReview:
      return 'bg-yellow-500/10 text-yellow-400';
    case DistributionStatus.Approved:
       return 'bg-accent/10 text-accent';
    case DistributionStatus.Rejected:
    case DistributionStatus.Error:
      return 'bg-red-500/10 text-red-400';
    case DistributionStatus.TakedownRequested:
       return 'bg-orange-500/10 text-orange-400';
    case DistributionStatus.TakedownCompleted:
    case DistributionStatus.Draft:
    default:
      return 'bg-slate-500/20 text-slate-300';
  }
};

const ReleaseItem: React.FC<ReleaseItemProps> = ({ release }) => {
    const isSong = release.assetType === 'Audio';
    const creatorName = isSong ? (release as Song).artistName : (release as Ebook).authorName;
    // For now, E-books don't have a manager view, so the link is disabled.
    const linkTo = isSong ? `/release/${release.id}` : '#';
    const isClickable = isSong;

    return (
    <Link 
        to={linkTo}
        className={`rounded-xl p-3 flex items-center gap-4 ${isClickable ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'} transition-all duration-200`}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => !isClickable && e.preventDefault()}
    >
        <img src={release.coverArtUrl} alt={`${release.title} cover art`} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
        <div className="flex-1 text-left min-w-0">
          <h3 className="font-semibold text-base text-ui-text-heading truncate">{release.title}</h3>
          <p className="text-ui-text-body text-sm truncate">{creatorName}</p>
        </div>
        <div className="flex items-center gap-4 ml-auto pl-4">
            <div className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(release.status)}`}>
                {release.status}
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-ui-text-subtle">
                {isClickable && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
            </div>
        </div>
    </Link>
  );
};

export default ReleaseItem;