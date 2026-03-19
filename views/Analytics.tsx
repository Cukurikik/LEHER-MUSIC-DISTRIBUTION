
import React, { useState, useMemo, useEffect } from 'react';
import type { Release, AnalyticsData, Song } from '../types';
import { fetchAnalyticsForSong } from '../services/analyticsService';
import CustomSelector from '../components/ui/CustomSelector';
import DoughnutChart from '../components/charts/DoughnutChart';
import PlatformDistributionChart from '../components/charts/PlatformDistributionChart';
import WorldMapChart from '../components/charts/WorldMapChart';
import AreaChart from '../components/charts/AreaChart';
import BarChart from '../components/charts/BarChart';
import { YouTubeStudio } from './YouTubeStudio';
import { generateAnalyticsInsights } from '../services/geminiService';
import SparklesIcon from '../components/layout/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface AnalyticsProps {
    songs: Release[];
}

const StatCard: React.FC<{ title: string; value: string | number; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, change, changeType }) => (
    <div className="bg-ui-surface/70 backdrop-blur-lg p-4 rounded-xl border border-ui-border">
        <p className="text-sm text-ui-text-subtle">{title}</p>
        <div className="flex justify-between items-baseline">
            <p className="text-3xl font-bold text-ui-text-heading">{value}</p>
            {change && (
                <p className={`text-sm font-semibold ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                    {change}
                </p>
            )}
        </div>
    </div>
);

const TabButton: React.FC<{ name: string; isActive: boolean; onClick: () => void }> = ({ name, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`py-3 px-4 font-semibold text-sm relative transition-colors whitespace-nowrap ${isActive ? 'text-ui-text-heading' : 'text-ui-text-body hover:text-ui-text-heading'}`}
    >
        {name}
        {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-primary rounded-full"></div>}
    </button>
);

const SocialTab: React.FC<{data: AnalyticsData}> = ({ data }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="TikTok Uses" value="12.5K" change="+15%" changeType="increase" />
                <StatCard title="Instagram Reels" value="8.2K" change="+5%" changeType="increase" />
                <StatCard title="Shazams" value="3.4K" change="-2%" changeType="decrease" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-ui-surface p-6 rounded-xl border border-ui-border">
                    <h3 className="text-lg font-semibold text-ui-text-heading mb-4">Viral Momentum (TikTok)</h3>
                    <AreaChart 
                        series={[{ name: 'Video Creations', data: [100, 400, 1200, 2500, 5000, 8000, 12500], color: '#00F2EA' }]} 
                        categories={['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']} 
                    />
                </div>
                 <div className="bg-ui-surface p-6 rounded-xl border border-ui-border">
                    <h3 className="text-lg font-semibold text-ui-text-heading mb-4">Playlist Reach</h3>
                     <div className="space-y-4">
                         <div className="flex justify-between items-center bg-ui-bg/30 p-3 rounded-lg">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center font-bold text-black text-xs">SPT</div>
                                 <div>
                                     <p className="font-bold text-ui-text-heading">Spotify Editorial</p>
                                     <p className="text-xs text-ui-text-subtle">2 Playlists</p>
                                 </div>
                             </div>
                             <p className="font-mono text-ui-text-heading">1.2M Reach</p>
                         </div>
                         <div className="flex justify-between items-center bg-ui-bg/30 p-3 rounded-lg">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-500 rounded-md flex items-center justify-center font-bold text-white text-xs">USR</div>
                                 <div>
                                     <p className="font-bold text-ui-text-heading">User Curated</p>
                                     <p className="text-xs text-ui-text-subtle">145 Playlists</p>
                                 </div>
                             </div>
                             <p className="font-mono text-ui-text-heading">450K Reach</p>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    )
}

const OverviewTab: React.FC<{data: AnalyticsData}> = ({ data }) => {
    const { language } = useTranslation();
    const [aiInsights, setAiInsights] = useState<any>(null);
    const [isInsightsLoading, setIsInsightsLoading] = useState(false);
    const handleGenerateInsights = async () => {
        setIsInsightsLoading(true);
        const insights = await generateAnalyticsInsights(data);
        setAiInsights(insights);
        setIsInsightsLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Streams" value={data.totalStreams.toLocaleString()} />
                <StatCard title="Monthly Listeners" value={data.monthlyListeners.toLocaleString()} />
                <StatCard title="Total Revenue" value={data.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
                <StatCard title="Playlist Adds" value={data.playlistAdds.toLocaleString()} />
            </div>

             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="bg-ui-surface p-6 rounded-xl border border-ui-border">
                    <h3 className="text-lg font-semibold text-ui-text-heading mb-4">Top Platforms</h3>
                    <PlatformDistributionChart data={data.streamsByPlatform.slice(0, 5)} />
                </div>
             </div>

             <div className="lg:col-span-3 bg-ui-surface/70 backdrop-blur-lg p-6 rounded-xl border border-ui-border quantum-panel">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-ui-text-heading">AI-Powered Insights</h3>
                     <button onClick={handleGenerateInsights} disabled={isInsightsLoading} className="btn-glow-primary px-4 py-2 rounded-full font-semibold text-sm disabled:opacity-50 btn-border-glow">
                        {isInsightsLoading ? "Analyzing..." : "Generate Insights"}
                    </button>
                </div>
                {isInsightsLoading && <div className="text-center py-8 text-primary">Analyzing your data with Gemini...</div>}
                {aiInsights && (
                    <div className="grid md:grid-cols-3 gap-4 animate-fade-in">
                         <div className="bg-ui-surface p-4 rounded-lg border border-ui-border">
                            <h4 className="font-bold text-quantum-flux mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5"/> Projection</h4>
                            <p className="text-sm text-ui-text-body">{aiInsights.projection}</p>
                        </div>
                        <div className="bg-ui-surface p-4 rounded-lg border border-ui-border">
                            <h4 className="font-bold text-quantum-flux mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5"/> Anomalies</h4>
                            <ul className="space-y-1 text-sm text-ui-text-body list-disc list-inside">{aiInsights.anomalies.map((a:string, i:number) => <li key={i}>{a}</li>)}</ul>
                        </div>
                        <div className="bg-ui-surface p-4 rounded-lg border border-ui-border">
                            <h4 className="font-bold text-quantum-flux mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5"/> Recommendations</h4>
                            <ul className="space-y-1 text-sm text-ui-text-body list-disc list-inside">{aiInsights.recommendations.map((r:string, i:number) => <li key={i}>{r}</li>)}</ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AudienceTab: React.FC<{data: AnalyticsData}> = ({ data }) => {
    const demographicsData = useMemo(() => {
        const genderColors = {'Female': '#FE2D8B', 'Male': '#1331FF', 'Non-binary': '#18D59C'};
        const ageColors = ['#FE2D8B', '#1331FF', '#18D59C', '#FECA0D', '#8A2BE2'];
        return {
            gender: Object.entries(data.demographics.gender).map(([label, value]) => ({ label, value, color: genderColors[label as keyof typeof genderColors] || '#FFFFFF' })),
            age: Object.entries(data.demographics.age).map(([label, value], i) => ({ label, value, color: ageColors[i % ageColors.length] })),
        }
    }, [data]);
    
    const topCitiesData = useMemo(() => {
        return Object.entries(data.streamsByCity)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 8)
            .map(([label, value]) => ({ label, value: value as number }));
    }, [data.streamsByCity]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoughnutChart title="Gender Demographics" data={demographicsData.gender} />
            <DoughnutChart title="Age Demographics" data={demographicsData.age} />
            <div className="md:col-span-2">
                <BarChart title="Top Cities" data={topCitiesData} />
            </div>
        </div>
    );
};

const GeographyTab: React.FC<{data: AnalyticsData}> = ({ data }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 bg-ui-surface p-6 rounded-xl border border-ui-border">
            <h3 className="text-lg font-semibold text-ui-text-heading mb-4">Streams by Country</h3>
            <div className="h-96"><WorldMapChart data={data.streamsByCountry} /></div>
        </div>
         <div className="lg:col-span-2 bg-ui-surface rounded-xl border border-ui-border overflow-x-auto">
             <table className="w-full">
                <thead><tr><th className="p-3">Country</th><th className="p-3">Streams</th><th className="p-3">% of Total</th></tr></thead>
                <tbody>
                    {data.topCountries.map(c => (
                        <tr key={c.code} className="border-t border-ui-border">
                            <td className="p-3 font-semibold">{c.name}</td>
                            <td className="p-3">{c.streams.toLocaleString()}</td>
                            <td className="p-3">{((c.streams / data.totalStreams) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
    </div>
);

const RevenueTab: React.FC<{data: AnalyticsData}> = ({ data }) => {
     const revenueTrendData = useMemo(() => {
        const seriesData = Array.from({length: 12}, (_, i) => data.totalRevenue / 12 * (0.8 + Math.random() * 0.4));
        return {
            series: [{ name: 'Revenue', data: seriesData, color: 'var(--quantum-green)' }],
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    }, [data]);
    return(
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Revenue" value={data.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
            <StatCard title="Revenue per Stream" value={`$${(data.totalRevenue / data.totalStreams).toFixed(5)}`} />
            <StatCard title="Last 30d Revenue" value={`$${(data.totalRevenue / 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} />
        </div>
         <div className="bg-ui-surface p-6 rounded-xl border border-ui-border">
            <h3 className="text-lg font-semibold text-ui-text-heading mb-4">Revenue Trend (YTD)</h3>
            <AreaChart series={revenueTrendData.series} categories={revenueTrendData.categories} yAxisLabelFormatter={(v) => `$${v.toLocaleString()}`} />
        </div>
    </div>
)};

const RealTimeTab: React.FC<{data: AnalyticsData}> = ({ data }) => {
    const [streams, setStreams] = useState(data.realtimeStreams);
    const [revenue, setRevenue] = useState(data.realtimeRevenue);
    useEffect(() => {
        const interval = setInterval(() => {
            setStreams(s => s + Math.floor(Math.random() * 3));
            setRevenue(r => r + Math.random() * 0.01);
        }, 1500);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="text-center p-16 bg-ui-surface rounded-xl border border-ui-border">
            <h2 className="text-3xl font-bold">Real-time Pulse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                 <div>
                    <p className="text-lg text-ui-text-subtle">Streams Today</p>
                    <p className="text-6xl font-bold text-quantum-flux">{streams.toLocaleString()}</p>
                 </div>
                 <div>
                    <p className="text-lg text-ui-text-subtle">Revenue Today (Est.)</p>
                    <p className="text-6xl font-bold text-quantum-flux">${revenue.toFixed(4)}</p>
                 </div>
            </div>
        </div>
    )
};

export const Analytics: React.FC<AnalyticsProps> = ({ songs: releases }) => {
    const { t } = useTranslation();
    const [selectedSongId, setSelectedSongId] = useState<string | undefined>();
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [activeTab, setActiveTab] = useState('overview');

    const liveSongs = useMemo(() => releases.filter((r): r is Song => r.assetType === 'Audio' && r.status === 'Live'), [releases]);
    const songOptions = useMemo(() => liveSongs.map(s => ({ value: s.id, label: s.title, artist: s.artistName, cover: s.coverArtUrl })), [liveSongs]);

    useEffect(() => {
        if (liveSongs.length > 0 && !selectedSongId) {
            setSelectedSongId(liveSongs[0].id);
        }
    }, [liveSongs, selectedSongId]);

    useEffect(() => {
        if (selectedSongId) {
            const song = liveSongs.find(s => s.id === selectedSongId);
            if (song) setAnalyticsData(fetchAnalyticsForSong(song));
        } else {
            setAnalyticsData(null);
        }
    }, [selectedSongId, liveSongs]);
    

    return (
        <div className="space-y-6">
             <div className="w-full md:w-1/2 lg:w-1/3">
                <CustomSelector
                    value={selectedSongId}
                    onChange={setSelectedSongId}
                    options={songOptions}
                    placeholder="Select a song to view analytics"
                    renderOption={(option) => (
                         <div className="flex items-center gap-3">
                            {option.cover && <img src={option.cover} className="w-8 h-8 rounded-md" alt={option.label} />}
                            <div>
                                <p className="font-semibold">{option.label}</p>
                                {option.artist && <p className="text-xs text-ui-text/70">{option.artist}</p>}
                            </div>
                        </div>
                    )}
                />
            </div>

            <div className="border-b border-ui-border flex space-x-2 overflow-x-auto">
                <TabButton name="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <TabButton name="Social & Trends" isActive={activeTab === 'social'} onClick={() => setActiveTab('social')} />
                <TabButton name="Audience" isActive={activeTab === 'audience'} onClick={() => setActiveTab('audience')} />
                <TabButton name="Geography" isActive={activeTab === 'geography'} onClick={() => setActiveTab('geography')} />
                <TabButton name="Revenue" isActive={activeTab === 'revenue'} onClick={() => setActiveTab('revenue')} />
                <TabButton name="Real-time" isActive={activeTab === 'real-time'} onClick={() => setActiveTab('real-time')} />
                <TabButton name="YouTube Studio" isActive={activeTab === 'youtube'} onClick={() => setActiveTab('youtube')} />
            </div>
            
            {!analyticsData ? (
                 <div className="text-center py-16 bg-ui-surface/50 rounded-xl border-2 border-dashed border-ui-border">
                    <h3 className="text-xl font-semibold text-ui-text-heading">No Analytics Data</h3>
                    <p className="text-ui-text-body mt-2">Select a live release to see its performance.</p>
                </div>
            ) : (
                <div className="animate-fade-in">
                    {activeTab === 'overview' && <OverviewTab data={analyticsData} />}
                    {activeTab === 'social' && <SocialTab data={analyticsData} />}
                    {activeTab === 'audience' && <AudienceTab data={analyticsData} />}
                    {activeTab === 'geography' && <GeographyTab data={analyticsData} />}
                    {activeTab === 'revenue' && <RevenueTab data={analyticsData} />}
                    {activeTab === 'real-time' && <RealTimeTab data={analyticsData} />}
                    {activeTab === 'youtube' && <YouTubeStudio songs={liveSongs} />}
                </div>
            )}
        </div>
    );
};
