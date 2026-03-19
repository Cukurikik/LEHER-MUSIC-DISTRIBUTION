
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>);

const TrendPredictorView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const viralTrends = [
        { name: "Sped-Up Phonk", velocity: "+350%", growth: "Exploding", platform: "TikTok" },
        { name: "Lofi Brazilian Funk", velocity: "+120%", growth: "Fast", platform: "Instagram Reels" },
        { name: "Atmospheric Jersey Club", velocity: "+80%", growth: "Stable", platform: "YouTube Shorts" },
    ];

    const potentialSongs = [
        { title: "DJ Pesta Gila", artist: "DJ Galaxy FVNKY", match: "Sped-Up Phonk", score: "92%" },
        { title: "DJ Kasih Aba Aba", artist: "DJ Tenxi SOPAN", match: "Atmospheric Jersey Club", score: "85%" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_viral_trend_predictor_title')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('tool_viral_trend_predictor_desc')}</p>
            </div>

            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <h2 className="text-2xl font-bold text-ui-text-heading mb-4">Viral Trends</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {viralTrends.map(trend => (
                        <div key={trend.name} className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border">
                            <p className="font-bold text-lg text-primary">{trend.name}</p>
                            <p className="text-sm text-ui-text-body">Platform: {trend.platform}</p>
                            <div className="flex justify-between items-end mt-2">
                                <div>
                                    <p className="text-xs text-ui-text-subtle">Velocity</p>
                                    <p className="text-2xl font-bold text-green-400 flex items-center">{trend.velocity} <ArrowUpIcon className="w-4 h-4 ml-1"/></p>
                                </div>
                                <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">{trend.growth}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <h2 className="text-2xl font-bold text-ui-text-heading mb-4">Your Potential Viral Hits</h2>
                {potentialSongs.length > 0 ? (
                    <div className="space-y-3">
                        {potentialSongs.map(song => (
                            <div key={song.title} className="bg-ui-bg/50 p-4 rounded-lg border border-ui-border flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-ui-text-heading">{song.title}</p>
                                    <p className="text-sm text-ui-text-subtle">{song.artist}</p>
                                </div>
                                <div className="text-right">
                                     <p className="text-xs text-ui-text-subtle">Matched Trend: <span className="text-primary font-semibold">{song.match}</span></p>
                                     <p className="text-xl font-bold text-accent">{song.score} Match</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-ui-text-subtle text-center py-8">No potential matches found in your catalog right now. Check back later!</p>
                )}
            </div>
        </div>
    );
};

export default TrendPredictorView;
