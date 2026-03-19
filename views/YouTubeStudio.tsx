import React, { useMemo } from 'react';
import type { Song } from '../types';
import { DistributionStatus } from '../types';
import YouTubeIcon from '../components/icons/YouTubeIcon';
import { Link } from 'react-router-dom';


interface YouTubeStudioProps {
  songs: Song[];
}

// Helper to create a seeded random number generator for consistency
const seededRandom = (seed: number) => {
  let s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
};

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toLocaleString();
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <p className="text-xs text-ui-text-subtle uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-ui-text-heading">{value}</p>
    </div>
);

export const YouTubeStudio: React.FC<YouTubeStudioProps> = ({ songs }) => {
  const youtubeSongs = useMemo(() => {
    return songs
      .filter(song => song.distribution['youtube-music']?.status === DistributionStatus.Live)
      .map(song => {
        const seed = song.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const views = Math.floor(seededRandom(seed) * 250000) + 5000;
        const watchTimeHours = Math.floor(views * (seededRandom(seed+1) * 0.03 + 0.01));
        const subsGained = Math.floor(views * (seededRandom(seed+2) * 0.001 + 0.0001));

        return {
          ...song,
          analytics: {
            views,
            watchTimeHours,
            subsGained
          }
        }
      });
  }, [songs]);

  return (
      <div className="space-y-4">
        {youtubeSongs.length > 0 ? (
          youtubeSongs.map(song => {
            const liveLink = song.distribution['youtube-music']?.link;
            return (
                <div key={song.id} className="bg-ui-surface rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:bg-ui-border/20 transition-colors duration-200 border border-ui-border shadow-sm">
                    <img src={song.coverArtUrl} alt={`${song.title} cover art`} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-xl text-ui-text-heading">{song.title}</h3>
                        <p className="text-ui-text-body text-md">{song.artistName}</p>
                    </div>
                    <div className="h-px w-full bg-ui-border md:h-16 md:w-px my-4 md:my-0"></div>
                    <div className="flex items-center justify-center gap-8 text-center">
                        <Stat label="Views" value={formatNumber(song.analytics.views)} />
                        <Stat label="Watch Time (h)" value={formatNumber(song.analytics.watchTimeHours)} />
                        <Stat label="Subscribers" value={`+${formatNumber(song.analytics.subsGained)}`} />
                    </div>
                     <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4">
                        {liveLink && (
                            <Link to={liveLink.replace(/^#/, '')} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-700 transition shadow-lg w-full flex items-center justify-center gap-2 btn-glow-danger">
                                View on YouTube
                            </Link>
                        )}
                    </div>
                </div>
            )
          })
        ) : (
          <div className="text-center py-16 bg-ui-surface border-2 border-dashed border-ui-border rounded-xl">
            <YouTubeIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-ui-text-heading">No Tracks Live on YouTube Music</h3>
            <p className="text-ui-text-subtle mt-2">Distribute a track to YouTube to see its performance here.</p>
          </div>
        )}
      </div>
  );
};