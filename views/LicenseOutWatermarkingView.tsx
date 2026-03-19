
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';

// Icons
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-14.964z" /></svg>);
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);
const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>);
const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>);

const LicenseOutWatermarkingView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [watermarkFrequency, setWatermarkFrequency] = useState('30s');
    const [protectedLink, setProtectedLink] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setProtectedLink(null);
        }
    };

    const handleProcess = () => {
        if (!file) return;
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setProtectedLink(`https://leher.io/preview/${Math.random().toString(36).substring(7)}`);
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_toolkit')}
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/50">
                        <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gradient-primary">{t('tool_license_out_watermarking_title')}</h1>
                        <p className="text-lg text-ui-text-body mt-1">{t('tool_license_out_watermarking_desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Upload & Config */}
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border space-y-6">
                    <h3 className="text-xl font-bold text-ui-text-heading">1. Upload Master Audio</h3>
                    
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-ui-border rounded-xl cursor-pointer hover:border-primary/50 bg-ui-bg/30 hover:bg-ui-bg/50 transition-colors">
                        {file ? (
                            <div className="text-center">
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                                </div>
                                <p className="font-bold text-white">{file.name}</p>
                                <p className="text-xs text-ui-text-subtle">Ready for protection</p>
                            </div>
                        ) : (
                            <div className="text-center text-ui-text-subtle">
                                <UploadIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Click to upload WAV/MP3</p>
                            </div>
                        )}
                        <input type="file" className="hidden" accept="audio/*" onChange={handleUpload} />
                    </label>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-ui-text-body">Watermark Frequency</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['15s', '30s', '60s'].map(freq => (
                                <button 
                                    key={freq}
                                    onClick={() => setWatermarkFrequency(freq)}
                                    className={`py-2 rounded-lg text-sm font-bold border ${watermarkFrequency === freq ? 'bg-primary/20 border-primary text-primary' : 'bg-ui-bg border-ui-border text-ui-text-subtle'}`}
                                >
                                    Every {freq}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleProcess}
                        disabled={!file || processing}
                        className="w-full btn-glow-primary py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Injecting Watermark...' : 'Protect & Generate Link'}
                    </button>
                </div>

                {/* Right: Result */}
                <div className="bg-singularity-black/50 p-6 rounded-2xl border border-singularity-purple/30 flex flex-col justify-center items-center text-center">
                    {protectedLink ? (
                        <div className="w-full space-y-6 animate-slide-up">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-500 shadow-glow-success">
                                <LockClosedIcon className="w-10 h-10 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Protection Active</h3>
                                <p className="text-ui-text-body text-sm mt-1">File is now safe for sharing.</p>
                            </div>
                            
                            <div className="bg-ui-bg p-4 rounded-xl border border-ui-border w-full text-left">
                                <p className="text-xs text-ui-text-subtle mb-1 uppercase">Secure Preview Link</p>
                                <div className="flex gap-2 items-center">
                                    <input type="text" value={protectedLink} readOnly className="bg-transparent w-full text-primary font-mono text-sm focus:outline-none" />
                                    <button className="text-white hover:text-primary" title="Copy">
                                        <LinkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-ui-surface rounded-lg">
                                    <p className="font-bold">0</p>
                                    <p className="text-xs text-ui-text-subtle">Downloads</p>
                                </div>
                                <div className="p-3 bg-ui-surface rounded-lg">
                                    <p className="font-bold">0</p>
                                    <p className="text-xs text-ui-text-subtle">Streams</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-ui-text-subtle opacity-50">
                            <ShieldCheckIcon className="w-24 h-24 mx-auto mb-4" />
                            <p>Upload a track to generate a secure, watermarked preview link for licensing deals.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LicenseOutWatermarkingView;
