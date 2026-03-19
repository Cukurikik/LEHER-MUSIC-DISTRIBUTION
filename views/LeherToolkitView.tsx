
import React from 'react';
import InteractiveAdminToolkit from '../components/admin/InteractiveAdminToolkit';
import SparklesIcon from '../components/layout/SparklesIcon';

const LeherToolkitView: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 animate-fade-in">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="text-center space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-singularity-purple/10 border border-singularity-purple/20 backdrop-blur-xl">
                        <SparklesIcon className="w-4 h-4 text-singularity-purple" />
                        <span className="text-[10px] font-bold tracking-widest text-singularity-purple uppercase">Admin Command Center</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-oxanium tracking-tight">
                        <span className="text-white">LEHER</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-singularity-purple to-singularity-teal">TOOLKIT</span>
                    </h1>
                    <p className="text-ui-text-subtle max-w-2xl mx-auto text-lg">
                        Access the full suite of administrative tools, AI automation, and system controls from a single interactive interface.
                    </p>
                </div>

                {/* Toolkit Component */}
                <div className="w-full max-w-5xl mx-auto">
                    <InteractiveAdminToolkit />
                </div>

                {/* Footer / Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center md:text-left">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white mb-2">AI-Powered Automation</h3>
                        <p className="text-sm text-ui-text-subtle">Leverage advanced AI models for content moderation, royalty calculations, and trend prediction.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white mb-2">Real-Time Monitoring</h3>
                        <p className="text-sm text-ui-text-subtle">Track system performance, user activity, and financial metrics in real-time.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white mb-2">Global Infrastructure</h3>
                        <p className="text-sm text-ui-text-subtle">Manage distributed nodes, CDNs, and multi-region deployments with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeherToolkitView;
