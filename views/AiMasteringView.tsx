import React, { useMemo, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import type { MasteringProject, MasteringStatus } from '../types';
import AudioWaveIcon from '../components/icons/AudioWaveIcon';

// Icons
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const DotsVerticalIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>);

const getStatusClasses = (status: MasteringStatus): string => {
  switch (status) {
    case 'Ready': return 'bg-blue-500/20 text-blue-300';
    case 'Processing': return 'bg-yellow-500/20 text-yellow-300 animate-pulse';
    case 'Downloaded': return 'bg-green-500/20 text-green-300';
    case 'Failed': return 'bg-red-500/20 text-red-300';
    default: return 'bg-slate-500/20 text-slate-300';
  }
};

const ProjectCard: React.FC<{ project: MasteringProject }> = ({ project }) => (
    <Link to={`/distribution-tools/ai-mastering/${project.id}`} className="group relative bg-ui-surface/70 backdrop-blur-lg rounded-2xl p-4 flex items-center gap-4 text-left transition-all duration-300 border border-ui-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        <img src={project.coverArtUrl} alt="cover art" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-ui-text-heading truncate">{project.projectName}</h3>
            <p className="text-sm text-ui-text truncate">{project.artistName}</p>
            <div className="mt-2">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getStatusClasses(project.status)}`}>{project.status}</span>
            </div>
        </div>
        <div className="text-ui-text/60 group-hover:text-primary transition-colors">
            <DotsVerticalIcon className="w-6 h-6" />
        </div>
    </Link>
);


interface AiMasteringViewProps {
    projects: MasteringProject[];
}

const AiMasteringView: React.FC<AiMasteringViewProps> = ({ projects }) => {
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
                        <h1 className="text-4xl font-bold text-ui-text-heading">AI Mastering Studio</h1>
                        <p className="text-lg text-ui-text mt-1">Get professional, release-ready sound in minutes.</p>
                    </div>
                    <Link to="/distribution-tools/ai-mastering/new" className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-black font-bold px-5 py-2.5 rounded-full transition-all duration-300 btn-glow-primary btn-border-glow">
                        <PlusIcon className="w-5 h-5" />
                        Start New Master
                    </Link>
                </div>
            </div>

            <main>
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                           <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16 bg-ui-surface/70 backdrop-blur-lg border-2 border-dashed border-ui-border rounded-xl">
                        <AudioWaveIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-ui-text-heading">No Mastering Projects Yet</h3>
                        <p className="text-ui-text mt-2">Start a new project to get your tracks sounding their best.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AiMasteringView;