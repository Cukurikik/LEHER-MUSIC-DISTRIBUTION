import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { SmartLinkCampaign, SmartLinkCampaignStatus } from '../types';
import ProCrownIcon from '../components/icons/ProCrownIcon';

// --- Icons ---
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>);
const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

interface SmartLinkDashboardViewProps {
    campaigns: SmartLinkCampaign[];
}

const getStatusClasses = (status: SmartLinkCampaignStatus): string => {
    switch (status) {
        case 'Active':
        case 'Live (Pre-Save Only)':
            return 'bg-green-500/10 text-green-400';
        case 'Draft':
            return 'bg-yellow-500/10 text-yellow-400';
        case 'Expired':
            return 'bg-slate-500/20 text-slate-300';
        default:
            return 'bg-slate-500/20 text-slate-300';
    }
};

const CampaignCard: React.FC<{ campaign: SmartLinkCampaign }> = ({ campaign }) => {
    return (
        <div className="bg-ui-surface rounded-xl border border-ui-border p-4 flex items-center gap-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
            <img src={campaign.coverArtUrl} alt={campaign.releaseTitle} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
                <p className="font-bold text-lg text-ui-text-heading truncate">{campaign.name}</p>
                <p className="text-sm text-ui-text-body">{campaign.releaseTitle} &bull; {campaign.artistName}</p>
                <a href={`https://${campaign.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm text-quantum-flux hover:underline flex items-center gap-1 mt-1">
                    <LinkIcon className="w-4 h-4" /> {campaign.shortUrl}
                </a>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(campaign.status)}`}>{campaign.status}</span>
                 <div className="text-sm text-ui-text-body">Clicks: {campaign.totalClicks.toLocaleString()}</div>
            </div>
        </div>
    );
};

const SmartLinkDashboardView: React.FC<SmartLinkDashboardViewProps> = ({ campaigns }) => {
    const navigate = useNavigate();
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Toolkit
                </button>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-ui-text-heading flex items-center gap-2">
                            SmartLinks & Pre-Saves
                            <ProCrownIcon className="w-8 h-8 text-amber-400" />
                        </h1>
                        <p className="text-lg text-ui-text mt-1">Manage your marketing and pre-save campaigns.</p>
                    </div>
                    <Link to="/distribution-tools/smart-links/create" className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-black font-bold px-5 py-2.5 rounded-full transition-all duration-300 btn-glow-primary btn-border-glow">
                        <PlusIcon className="w-5 h-5" />
                        Create Campaign
                    </Link>
                </div>
            </div>

            <main>
                {campaigns.length > 0 ? (
                    <div className="space-y-4">
                        {campaigns.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} />)}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-ui-surface/70 backdrop-blur-lg border-2 border-dashed border-ui-border rounded-xl">
                        <h3 className="text-xl font-semibold text-ui-text-heading">No Campaigns Yet</h3>
                        <p className="text-ui-text mt-2">Create your first SmartLink or Pre-Save campaign to get started.</p>
                    </div>
                )}
            </main>
        </div>
    );
};
export default SmartLinkDashboardView;