

import React, { useState, useCallback, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { useTranslation } from '../hooks/useTranslation';
import LeherIDIcon from '../components/icons/LeherIDIcon';
import { enhancedDuplicateCheck } from '../services/audioIdentificationService';
import type { EnhancedCheckResult } from '../types';
import SpotifyIcon from '../components/icons/SpotifyIcon';
import YouTubeIcon from '../components/icons/YouTubeIcon';

// --- Local Icons ---
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);

const ResultCard: React.FC<{ result: EnhancedCheckResult }> = ({ result }) => {
    const { t } = useTranslation();
    const PlatformIcon = result.source === 'Spotify' ? SpotifyIcon : YouTubeIcon;
    const platformColor = result.source === 'Spotify' ? 'text-green-400' : 'text-red-500';

    return (
        <div className="bg-ui-surface/50 p-4 rounded-xl border border-ui-border flex flex-col sm:flex-row items-center gap-4">
            <img src={result.coverArtUrl} alt={`${result.album} cover art`} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
                <div className={`flex items-center gap-2 mb-1 justify-center sm:justify-start ${platformColor}`}>
                    <PlatformIcon className="w-5 h-5" />
                    <p className="font-bold">{t('leher_id_duplicate_found_on')} {result.source}</p>
                </div>
                <h4 className="text-xl font-bold text-ui-text-heading">{result.title}</h4>
                <p className="text-ui-text-body">{result.artist}</p>
                <p className="text-sm text-ui-text-subtle mt-1">{t('leher_id_duplicate_album')}: {result.album}</p>
                <p className="text-xs font-mono text-ui-text-subtle mt-1">{t('leher_id_duplicate_isrc')}: {result.isrc}</p>
            </div>
        </div>
    );
};


const LeherIDView: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const audioFileInputRef = useRef<HTMLInputElement>(null);

    const [songToCheck, setSongToCheck] = useState({ title: '', artist: ''});
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'unique' | 'duplicate'>('idle');
    const [foundDuplicates, setFoundDuplicates] = useState<EnhancedCheckResult[]>([]);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSongToCheck(prev => ({ ...prev, [name]: value }));
    };

    const processAudioFile = (file: File) => {
        if (!file.type.startsWith('audio/')) {
            setMessage(t('leher_id_toast_invalid_file'));
            return;
        }
        setAudioFile(file);
    
        let title = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ");
        let artist = t('leher_id_unknown_artist');
        const parts = title.split(' - ');
        if (parts.length > 1) {
            artist = parts[0].trim();
            title = parts.slice(1).join(' - ').trim();
        }
        
        setSongToCheck({ title, artist });
        setMessage(t('leher_id_metadata_extracted'));
        setTimeout(() => setMessage(''), 4000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) processAudioFile(e.target.files[0]);
    };
    
    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processAudioFile(e.dataTransfer.files[0]);
    };

    const handleCheckDuplicate = async () => {
        setCheckStatus('checking');
        setFoundDuplicates([]);
        setMessage('');

        const { title, artist } = songToCheck;
        if (!title.trim() || !artist.trim()) {
            setMessage(t('leher_id_toast_fill_fields'));
            setCheckStatus('idle');
            return;
        }
        
        const { status, results } = await enhancedDuplicateCheck(title, artist);
        setFoundDuplicates(results);
        setCheckStatus(status);
    };
    
    const inputStyles = "form-input-modern w-full";

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div>
                 <button onClick={() => navigate('/distribution-tools')} className="mb-6 flex items-center gap-2 text-ui-text-body hover:text-primary transition-colors font-semibold group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t('back_to_toolkit')}
                </button>
                <h1 className="text-4xl font-bold text-gradient-primary">{t('leher_id_title_enhanced')}</h1>
                <p className="text-lg text-ui-text-body mt-1">{t('leher_id_desc_enhanced')}</p>
            </div>
            
            {message && (
                <div className={`p-4 rounded-md text-sm text-white ${message.includes('successfully') || message.includes('berhasil') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}
            
            <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border">
                <div
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => audioFileInputRef.current?.click()}
                    className="cursor-pointer group flex flex-col justify-center items-center h-40 border-2 border-dashed border-ui-border hover:border-primary rounded-xl p-6 text-center transition-colors bg-ui-bg/50 hover:bg-primary/5 mb-4"
                >
                    <UploadIcon className="w-10 h-10 text-ui-text-subtle group-hover:text-primary transition-colors mb-2" />
                    <p className="text-ui-text-body text-sm">{t('leher_id_upload_desc')}</p>
                    <input ref={audioFileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="audio/*" />
                </div>
                
                <h3 className="text-xl font-bold text-ui-text-heading mb-4 flex items-center gap-2"><SearchIcon className="w-6 h-6 text-primary"/>{t('leher_id_check_form_title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="title" value={songToCheck.title} onChange={handleChange} placeholder={t('table_header_title')} className={inputStyles} />
                    <input type="text" name="artist" value={songToCheck.artist} onChange={handleChange} placeholder={t('table_header_artist')} className={inputStyles} />
                </div>
                <button onClick={handleCheckDuplicate} disabled={checkStatus === 'checking'} className="w-full btn-glow-primary py-3 rounded-full font-bold disabled:opacity-50">
                    {checkStatus === 'checking' ? t('analyzing') : t('tool_cta_check')}
                </button>
            </div>

            {checkStatus !== 'idle' && (
                <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border animate-fade-in">
                    {checkStatus === 'checking' && (
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-ui-text-heading font-semibold">Scanning databases...</p>
                        </div>
                    )}
                    {checkStatus === 'unique' && (
                        <div className="text-center">
                            <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto" />
                            <h3 className="text-2xl font-bold text-ui-text-heading mt-4">No Duplicates Found!</h3>
                            <p className="text-ui-text-body">This track appears to be unique. You're clear for distribution.</p>
                        </div>
                    )}
                    {checkStatus === 'duplicate' && (
                         <div>
                            <div className="text-center mb-6">
                                <AlertTriangleIcon className="w-16 h-16 text-red-400 mx-auto" />
                                <h3 className="text-2xl font-bold text-ui-text-heading mt-4">Potential Duplicate Found</h3>
                                <p className="text-ui-text-body">This track may already exist. Distributing a duplicate can lead to issues.</p>
                            </div>
                             <div className="space-y-4">
                                {foundDuplicates.map(result => <ResultCard key={result.isrc} result={result} />)}
                             </div>
                         </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LeherIDView;