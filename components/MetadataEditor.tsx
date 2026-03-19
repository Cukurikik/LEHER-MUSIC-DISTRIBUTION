
import React, { useState, useEffect, useMemo } from 'react';
import type { Song, Video, Release, Contributor } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { getPlatformIcon } from './icons/PlatformIcons';

// --- ICONS ---
const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 9.91l4.243 4.243a2 2 0 012.828 0l4.243-4.243M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const SaveIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>);

// --- CONSTANTS ---
const CONTRIBUTOR_ROLES = [
    "Main Artist", "Featured Artist", "Producer", "Composer", "Lyricist", "Arranger", "Mixer", "Remixer",
    "Video Director", "Video Producer", "Director of Photography", "Editor", "Production Company", "Actor", "Actress", "Choreographer"
];
const AUDIO_RELEASE_TYPES = ['Single', 'EP', 'Mini Album', 'Album', 'Mega Album'];
const VIDEO_RELEASE_TYPES = ['Music Video', 'Lyric Video', 'Visualizer'];

export const RECORDING_VERSIONS = [
    "Original",
    "Remix",
    "Live",
    "Remastered",
    "AI Generated",
    "Cover",
    "Acoustic",
    "Demo",
    "Radio Edit",
    "Extended Mix",
    "Instrumental"
];

interface MetadataEditorProps {
  releaseData: Song | Video;
  onSave: (updatedRelease: Partial<Song | Video>) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
  onCancel: () => void;
}

const FormSection: React.FC<{ title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, isOpen, onToggle, children, icon }) => (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F0F0F] mb-6 transition-all duration-300 shadow-md">
        <button 
            type="button"
            onClick={onToggle}
            className={`w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors ${isOpen ? 'bg-[#181818] border-b border-white/5' : 'hover:bg-[#181818]'}`}
        >
            <div className="flex items-center gap-3">
                {icon && <span className="text-primary">{icon}</span>}
                <span className="font-bold text-white text-base md:text-lg tracking-wide">{title}</span>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-ui-text-subtle transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && <div className="p-4 md:p-6 animate-fade-in bg-[#0A0A0A]">{children}</div>}
    </div>
);

const InputField: React.FC<{ 
    label: string; 
    name: string; 
    value: string | number; 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; 
    type?: string; 
    options?: string[];
    required?: boolean;
    placeholder?: string;
    className?: string;
}> = ({ label, name, value, onChange, type = "text", options, required, placeholder, className = "" }) => (
    <div className={`group relative ${className}`}>
        <label className="absolute -top-2.5 left-3 bg-[#0A0A0A] px-1 text-[10px] font-mono text-primary font-bold uppercase tracking-wider z-10">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {options ? (
            <div className="relative">
                <select 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    className="w-full bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 focus:outline-none transition-colors appearance-none font-medium hover:border-white/20"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                    <ChevronDownIcon className="w-4 h-4" />
                </div>
            </div>
        ) : (
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                className="w-full bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:border-primary focus:ring-0 focus:outline-none transition-colors font-medium hover:border-white/20"
                required={required}
            />
        )}
    </div>
);

const PreviewCard: React.FC<{ data: Partial<Song | Video>, releaseTime: string }> = ({ data, releaseTime }) => {
    const typeColor = data.releaseType === 'Single' ? 'bg-blue-500' : data.releaseType === 'Album' ? 'bg-purple-500' : 'bg-orange-500';

    return (
        <div className="mb-8 lg:mb-0 w-full">
             <h4 className="text-xs font-bold text-ui-text-subtle uppercase tracking-wider mb-3 flex items-center gap-2 pl-1">
                <GlobeIcon className="w-4 h-4" /> Mobile DSP Preview
            </h4>
            <div className="bg-[#121212] rounded-2xl p-4 border border-white/10 shadow-2xl w-full max-w-sm mx-auto transform transition-all hover:scale-[1.01]">
                {/* Spotify-like Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-20 h-20 shadow-lg flex-shrink-0 bg-black/50 rounded-md overflow-hidden">
                         {data.coverArtUrl ? (
                            <img src={data.coverArtUrl} alt="Cover" className="w-full h-full object-cover" />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center text-white/10 text-xs">No Art</div>
                         )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className={`text-[9px] font-bold text-white uppercase mb-1 px-1.5 py-0.5 rounded w-fit ${typeColor} bg-opacity-20 text-opacity-90 border border-white/10`}>
                            {data.releaseType}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight line-clamp-2 mb-0.5">
                            {data.title || 'Untitled Track'}
                        </h3>
                        <p className="text-[10px] text-[#b3b3b3] font-medium truncate">
                            {data.artistName || 'Unknown Artist'}
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#b3b3b3] text-[10px] border-b border-white/10 pb-1">
                        <span># Title</span>
                        <ClockIcon className="w-3 h-3" />
                    </div>
                    <div className="flex items-center justify-between text-xs group cursor-default">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-[#1DB954] w-4 text-center">1</span>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-medium truncate">{data.title || 'Track Title'}</span>
                                <span className="text-[10px] text-ui-text-[#b3b3b3] truncate">{data.artistName}</span>
                            </div>
                        </div>
                        <span className="text-[#b3b3b3] text-[10px]">3:42</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetadataEditor: React.FC<MetadataEditorProps> = ({ releaseData, onSave, showToast, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Song | Video>>({});
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [releaseTime, setReleaseTime] = useState('10:00');
  const [isSaving, setIsSaving] = useState(false);
  const [sections, setSections] = useState({ general: true, credits: false, rights: false, technical: false });

  const toggleSection = (key: keyof typeof sections) => setSections(prev => ({...prev, [key]: !prev[key]}));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 75 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (releaseData) {
      const dataToEdit = { ...releaseData };
      if (dataToEdit.releaseDate) {
        dataToEdit.releaseDate = dataToEdit.releaseDate.split('T')[0];
        const date = new Date(releaseData.releaseDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        setReleaseTime(`${hours}:${minutes}`);
      }
      setFormData(dataToEdit);
      setContributors(releaseData.contributors || []);
    }
  }, [releaseData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };
  
  const handleContributorChange = (id: string, field: 'name' | 'role' | 'share', value: string | number) => {
    setContributors(prev => prev.map(c => (c.id === id ? { ...c, [field]: field === 'share' ? Number(value) : value } : c)));
  };
  
  const addContributor = () => setContributors([...contributors, { id: crypto.randomUUID(), name: '', role: 'Featured Artist', share: 0 }]);
  const removeContributor = (id: string) => setContributors(contributors.filter(c => c.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const releaseDateVal = formData.releaseDate ? formData.releaseDate.split('T')[0] : new Date().toISOString().split('T')[0];
    const combinedDateTime = new Date(`${releaseDateVal}T${releaseTime}:00`).toISOString();
    
    const updatedRelease: Partial<Song | Video> = {
      ...formData,
      releaseDate: combinedDateTime,
      contributors: contributors.filter(c => c.name && c.role),
    };
    
    setTimeout(() => {
        onSave(updatedRelease);
        setIsSaving(false);
        showToast('Release metadata updated successfully!', 'success');
    }, 800);
  };

  // Helper to handle composite copyright fields
  const parseHolder = (holderString: string | undefined) => {
    if (!holderString) return { year: currentYear.toString(), name: '' };
    const clean = holderString.replace(/^[©℗]\s*/, '');
    const match = clean.match(/^(\d{4})\s+(.*)$/);
    if (match) return { year: match[1], name: match[2] };
    return { year: currentYear.toString(), name: clean };
  };

  const cParts = parseHolder(formData.cHolder);
  const pParts = parseHolder(formData.pHolder);

  const updateHolder = (type: 'c' | 'p', part: 'year' | 'name', val: string) => {
      if (type === 'c') {
          const newYear = part === 'year' ? val : cParts.year;
          const newName = part === 'name' ? val : cParts.name;
          setFormData(prev => ({ ...prev, cHolder: `${newYear} ${newName}` }));
      } else {
          const newYear = part === 'year' ? val : pParts.year;
          const newName = part === 'name' ? val : pParts.name;
          setFormData(prev => ({ ...prev, pHolder: `${newYear} ${newName}` }));
      }
  }

  const isVideo = formData.assetType === 'Video';
  const releaseFormatOptions = isVideo ? VIDEO_RELEASE_TYPES : AUDIO_RELEASE_TYPES;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
        <div className="flex-1 overflow-y-auto pb-32"> 
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* FORM CONTENT */}
                <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                    <FormSection title="General Information" isOpen={sections.general} onToggle={() => toggleSection('general')} icon={<GlobeIcon className="w-5 h-5"/>}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputField label={t('table_header_title')} name="title" value={formData.title || ''} onChange={handleChange} required placeholder="Track Title" />
                            <InputField label={t('table_header_artist')} name="artistName" value={formData.artistName || ''} onChange={handleChange} required placeholder="Main Artist Name" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <InputField label={t('form_label_genre')} name="genre" value={formData.genre || ''} onChange={handleChange} required placeholder="Primary Genre" />
                             <InputField label="Sub-Genre (Optional)" name="subGenre" value={formData.subGenre || ''} onChange={handleChange} placeholder="e.g. Pop Punk" />
                            <InputField label={t('form_label_release_type')} name="releaseType" value={formData.releaseType || (isVideo ? 'Music Video' : 'Single')} onChange={handleChange} options={releaseFormatOptions} />
                        </div>
                        {!isVideo && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <InputField label="Version Type" name="recordingVersion" value={(formData as Song).recordingVersion || 'Original'} onChange={handleChange} options={RECORDING_VERSIONS} />
                                <InputField label="Track Version" name="trackVersion" value={(formData as Song).trackVersion || ''} onChange={handleChange} placeholder="e.g. Radio Edit" />
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label={t('form_label_record_label')} name="label" value={formData.label || ''} onChange={handleChange} placeholder={t('form_placeholder_record_label_optional')} />
                            <div className="flex items-end h-full">
                                <label className="flex items-center gap-3 cursor-pointer bg-[#121212] border border-white/10 px-4 py-3 rounded-lg hover:border-red-500/50 transition-colors w-full h-[46px]">
                                    <input type="checkbox" name="isExplicit" checked={!!formData.isExplicit} onChange={(e) => setFormData(p => ({...p, isExplicit: e.target.checked}))} className="rounded text-red-500 focus:ring-red-500 bg-black border-white/20 h-5 w-5" />
                                    <span className={`text-sm font-bold ${formData.isExplicit ? 'text-red-400' : 'text-white/70'}`}>Explicit Content</span>
                                </label>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Credits & Contributors" isOpen={sections.credits} onToggle={() => toggleSection('credits')} icon={<UserIcon className="w-5 h-5"/>}>
                         <div className="space-y-3 mb-4">
                            {contributors.map(c => (
                                <div key={c.id} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-[#151515] p-4 rounded-xl border border-white/5 relative">
                                    <div className="w-full md:flex-grow">
                                        <InputField label="Name" name="c_name" value={c.name} onChange={e => handleContributorChange(c.id, 'name', e.target.value)} placeholder={t('form_placeholder_contributor_name')} className="mb-0" />
                                    </div>
                                    <div className="w-full md:w-1/3">
                                         <div className="relative group">
                                            <label className="absolute -top-2.5 left-3 bg-[#151515] px-1 text-[10px] font-mono text-primary font-bold uppercase tracking-wider z-10">Role</label>
                                            <select value={c.role} onChange={e => handleContributorChange(c.id, 'role', e.target.value)} className="w-full bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-3 py-3 text-sm text-white appearance-none">
                                                {CONTRIBUTOR_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto items-center mt-2 md:mt-0">
                                        <div className="relative flex-grow md:w-24">
                                            <label className="absolute -top-2.5 left-3 bg-[#151515] px-1 text-[10px] font-mono text-primary font-bold uppercase tracking-wider z-10">Share</label>
                                            <input 
                                                type="number" value={c.share || ''} onChange={e => handleContributorChange(c.id, 'share', e.target.value)} 
                                                className="w-full bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-3 py-3 text-sm text-right text-white pr-6" placeholder="0" min="0" max="100"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50">%</span>
                                        </div>
                                        <button type="button" onClick={() => removeContributor(c.id)} className="p-3 text-white/50 hover:text-red-400 rounded-lg bg-[#0F0F0F] border border-white/10 transition-colors self-end"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </div>
                            ))}
                            {contributors.length === 0 && <p className="text-sm text-ui-text-subtle text-center py-4">No contributors added yet.</p>}
                        </div>
                        <button type="button" onClick={addContributor} className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-sm font-bold text-white/70 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
                            <PlusCircleIcon className="w-5 h-5"/> {t('form_button_add_contributor')}
                        </button>
                    </FormSection>

                    <FormSection title="Rights & Distribution" isOpen={sections.rights} onToggle={() => toggleSection('rights')} icon={<SaveIcon className="w-5 h-5"/>}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative group">
                               <label className="absolute -top-2.5 left-3 bg-[#0A0A0A] px-1 text-[10px] font-mono text-primary font-bold uppercase tracking-wider z-10">{t('form_label_copyright_holder_c')}</label>
                               <div className="flex gap-2">
                                    <select value={cParts.year} onChange={e => updateHolder('c', 'year', e.target.value)} className="w-28 bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-3 py-3 text-sm text-white appearance-none">
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <input type="text" value={cParts.name} onChange={e => updateHolder('c', 'name', e.target.value)} className="flex-1 bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-4 py-3 text-sm text-white" placeholder="Name" required />
                                </div>
                           </div>
                           <div className="relative group">
                               <label className="absolute -top-2.5 left-3 bg-[#0A0A0A] px-1 text-[10px] font-mono text-primary font-bold uppercase tracking-wider z-10">{t('form_label_copyright_holder_p')}</label>
                                <div className="flex gap-2">
                                     <select value={pParts.year} onChange={e => updateHolder('p', 'year', e.target.value)} className="w-28 bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-3 py-3 text-sm text-white appearance-none">
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <input type="text" value={pParts.name} onChange={e => updateHolder('p', 'name', e.target.value)} className="flex-1 bg-[#0F0F0F] border-2 border-white/10 rounded-lg px-4 py-3 text-sm text-white" placeholder="Name" required />
                                </div>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label={t('form_label_release_date')} name="releaseDate" value={formData.releaseDate || ''} onChange={handleChange} type="date" />
                            <InputField label={t('form_label_release_time')} name="releaseTime" value={releaseTime} onChange={e => setReleaseTime(e.target.value)} type="time" />
                        </div>
                    </FormSection>
                </div>

                {/* PREVIEW CARD (Right Column on Desktop, Bottom on Mobile) */}
                <div className="lg:col-span-1 order-1 lg:order-2">
                    <div className="lg:sticky lg:top-6">
                         <PreviewCard data={formData} releaseTime={releaseTime} />
                    </div>
                </div>
            </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 md:px-8 bg-[#0A0A1A]/95 border-t border-white/10 backdrop-blur-md z-50">
             <button type="button" onClick={onCancel} className="text-white/60 hover:text-white font-semibold transition-colors text-xs md:text-sm px-4 py-2 rounded-lg hover:bg-white/5">
                Discard
            </button>
            <div className="flex gap-4">
                <button type="submit" disabled={isSaving} className="bg-gradient-singularity px-8 py-3 rounded-full text-black font-black transition shadow-glow-primary hover:scale-105 disabled:opacity-70 flex items-center gap-2 text-sm md:text-base">
                    {isSaving ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div> : <SaveIcon className="w-5 h-5"/>}
                    {isSaving ? 'Saving...' : 'SAVE CHANGES'}
                </button>
            </div>
        </div>
    </form>
  );
};

export default MetadataEditor;
