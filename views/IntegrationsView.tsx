
import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { PlatformDefinition, Song } from '../types';
import { ALL_PLATFORMS } from '../data/platforms';
import { getPlatformIcon } from '../components/icons/PlatformIcons';
import CubeIcon from '../components/icons/CubeIcon';
import { DistributionStatus } from '../types';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

// --- ICONS ---
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);


// --- PROPS ---
interface IntegrationsViewProps {
  songs: Song[];
}

const PlatformCard: React.FC<{
  platform: PlatformDefinition;
  isConnected: boolean;
  liveReleasesCount: number;
}> = ({ platform, isConnected, liveReleasesCount }) => {
  const Icon = getPlatformIcon(platform.name, 'w-8 h-8 text-white');

  return (
    <div className={`group relative bg-ui-surface rounded-2xl p-6 text-center transition-all duration-300 border border-ui-border hover:shadow-lg overflow-hidden card-interactive-glow ${isConnected ? 'hover:border-green-500/50' : 'hover:border-primary/50'}`}>
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 mb-4 mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {Icon}
        </div>
        <h3 className="font-bold text-xl text-ui-text-heading truncate">{platform.name}</h3>
        <p className="text-sm text-ui-text-subtle h-10 line-clamp-2 mt-1">{platform.description}</p>
        
        <div className="my-4 h-px bg-ui-border w-3/4 mx-auto group-hover:bg-primary/30 transition-colors duration-300"></div>

        <div className="flex justify-around items-center text-left gap-4">
          <div className="flex items-center gap-2">
            <CubeIcon className="w-5 h-5 text-quantum-flux opacity-80 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg text-ui-text-heading">{liveReleasesCount}</p>
              <p className="text-xs uppercase tracking-wider text-ui-text-subtle">Live Releases</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isConnected ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
              <CheckIcon className="w-5 h-5" />
              Connected
            </div>
          ) : (
            <button className="w-full bg-primary/20 text-primary font-bold py-2 rounded-full hover:bg-primary/30 transition-colors">
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const IntegrationsView: React.FC<IntegrationsViewProps> = ({ songs }) => {
  const [filter, setFilter] = useState<'all' | 'connected' | 'unconnected'>('connected');
  const navigate = useNavigate();

  const platformData = useMemo(() => {
    return ALL_PLATFORMS.map(platform => {
      const isConnected = true; // Set all platforms to be connected
      const liveReleasesCount = songs.filter(song => song.distribution[platform.id]?.status === DistributionStatus.Live).length;
      return { ...platform, isConnected, liveReleasesCount };
    });
  }, [songs]);

  const filteredPlatforms = useMemo(() => {
    switch (filter) {
      case 'connected': return platformData.filter(p => p.isConnected);
      case 'unconnected': return platformData.filter(p => !p.isConnected);
      default: return platformData;
    }
  }, [platformData, filter]);
  
  const totalReleasesDistributed = useMemo(() => {
      const distributedSet = new Set<string>();
      songs.forEach(song => {
          Object.keys(song.distribution).forEach(platformId => {
              if (song.distribution[platformId]?.status === DistributionStatus.Live) {
                  distributedSet.add(song.id);
              }
          });
      });
      return distributedSet.size;
  }, [songs]);

  const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-ui-surface p-6 rounded-xl border-l-4 border-primary card-interactive-glow">
        <p className="text-sm text-ui-text-subtle">{title}</p>
        <p className="text-4xl font-bold text-primary mt-1">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/')} className="mb-4 inline-flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Connected Platforms" value={`${platformData.filter(p=>p.isConnected).length} / ${ALL_PLATFORMS.length}`} />
        <StatCard title="Total Releases Distributed" value={totalReleasesDistributed.toLocaleString()} />
        <StatCard title="Total Live Links" value={songs.reduce((acc, s) => acc + Object.keys(s.distribution).length, 0).toLocaleString()} />
      </div>

      <div className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-1 border border-ui-border rounded-full p-1 self-start bg-ui-bg">
          {(['all', 'connected', 'unconnected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-pill px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${filter === f ? 'active bg-primary text-black shadow-md' : 'text-ui-text-body hover:bg-ui-border/50'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex-grow"></div>
        <p className="text-sm text-ui-text-subtle">Showing {filteredPlatforms.length} platforms</p>
      </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlatforms.map(platform => (
          <PlatformCard 
            key={platform.id}
            platform={platform}
            isConnected={platform.isConnected}
            liveReleasesCount={platform.liveReleasesCount}
          />
        ))}
      </main>
    </div>
  );
};

export default IntegrationsView;
