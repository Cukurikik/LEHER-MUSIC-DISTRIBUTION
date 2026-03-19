

import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import LeherIcon from '../layout/LeherIcon'; // For preview
import type { TranslationKeys } from '../../types';

const inputStyles = "form-input-glow w-full";

type WhiteLabelTab = 'branding' | 'login_page' | 'email' | 'domain' | 'features' | 'roles' | 'billing' | 'support' | 'legal' | 'integrations';


const TabButton: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${isActive ? 'bg-singularity-teal text-black' : 'text-ui-text-body hover:bg-singularity-teal/20'}`}
    >
        {label}
    </button>
);

// --- TAB COMPONENTS ---

const generateThemes = () => {
    const themes = [
        { name: 'Leher Default', colors: { primary: '#1331FF', secondary: '#FE2D8B', accent: '#18D59C', bg: '#0A0A1A', surface: '#101223', text: '#FFFFFF' } },
        { name: 'Singularity', colors: { primary: '#9333ea', secondary: '#db2777', accent: '#14b8a6', bg: '#020617', surface: '#0f172a', text: '#f8fafc' } },
        { name: 'Nova Prime', colors: { primary: '#f59e0b', secondary: '#14b8a6', accent: '#6366f1', bg: '#111827', surface: '#1f2937', text: '#f9fafb' } },
        { name: 'Crimson Night', colors: { primary: '#DC2626', secondary: '#F59E0B', accent: '#4F46E5', bg: '#111827', surface: '#1F2937', text: '#F9FAFB' } },
        { name: 'Emerald Forest', colors: { primary: '#10B981', secondary: '#34D399', accent: '#F59E0B', bg: '#064E3B', surface: '#047857', text: '#D1FAE5' } },
        { name: 'Cyberpunk Neon', colors: { primary: '#EC4899', secondary: '#00FFFF', accent: '#A855F7', bg: '#0C0A09', surface: '#1C1917', text: '#FDE047' } },
        { name: 'Oceanic Deep', colors: { primary: '#0EA5E9', secondary: '#67E8F9', accent: '#A3E635', bg: '#0C4A6E', surface: '#075985', text: '#E0F2FE' } },
        { name: 'Luxury Gold', colors: { primary: '#FBBF24', secondary: '#D97706', accent: '#6B7280', bg: '#171717', surface: '#262626', text: '#FEF3C7' } },
    ];
    // To reach ~100, we can generate variations
    const variations: {name: string, colors: any}[] = [];
    const baseThemes = [...themes];
    for (let i = 0; i < 20; i++) {
        const base = baseThemes[i % baseThemes.length];
        const newName = `${base.name} V${Math.floor(i / baseThemes.length) + 2}`;
        // simple color shift for variation
        const shift = (hex: string) => {
            let r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
            r = Math.min(255, r + 10);
            g = Math.min(255, g - 5);
            b = Math.min(255, b + 5);
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
        variations.push({
            name: newName,
            colors: {
                primary: shift(base.colors.primary),
                secondary: shift(base.colors.secondary),
                accent: shift(base.colors.accent),
                bg: base.colors.bg,
                surface: base.colors.surface,
                text: base.colors.text
            }
        });
    }
    return [...themes, ...variations];
};
const themeGallery = generateThemes();


const BrandingTab: React.FC = () => (
    <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="text-sm font-medium text-ui-text-body block mb-1">Brand Logo (PNG, SVG)</label>
                <input type="file" className="w-full text-sm text-ui-text-subtle file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-singularity-purple/20 file:text-singularity-purple hover:file:bg-singularity-purple/30" />
            </div>
            <div>
                <label className="text-sm font-medium text-ui-text-body block mb-1">Favicon (.ico)</label>
                <input type="file" className="w-full text-sm text-ui-text-subtle file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-singularity-purple/20 file:text-singularity-purple hover:file:bg-singularity-purple/30" />
            </div>
        </div>
        <div>
            <h3 className="text-xl font-bold text-ui-text-heading mb-3">Theme Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto pr-2">
                {themeGallery.map((theme) => (
                    <button key={theme.name} className="group relative aspect-square rounded-lg border-2 border-ui-border hover:border-singularity-teal p-2 focus:border-singularity-teal focus:ring-2 focus:ring-singularity-teal/50">
                        <div className="w-full h-full rounded-md flex flex-col items-center justify-center" style={{ backgroundColor: theme.colors.bg }}>
                            <div className="flex gap-1">
                                <div className="w-4 h-4 rounded-full" style={{backgroundColor: theme.colors.primary}}></div>
                                <div className="w-4 h-4 rounded-full" style={{backgroundColor: theme.colors.secondary}}></div>
                                <div className="w-4 h-4 rounded-full" style={{backgroundColor: theme.colors.accent}}></div>
                            </div>
                        </div>
                        <p className="absolute bottom-1 left-0 right-0 text-center text-xs bg-black/50 py-0.5 text-white">{theme.name}</p>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const LoginPageTab: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [activeTemplate, setActiveTemplate] = useState('center_card');
    const [font, setFont] = useState('sans');
    const [cardStyle, setCardStyle] = useState('rounded');
    const [colors, setColors] = useState({
        bg: '#0A0A1A', card: '#101223', text: '#FFFFFF', button: '#1331FF', buttonText: '#FFFFFF'
    });
    const handleColorChange = (key: keyof typeof colors, value: string) => setColors(prev => ({...prev, [key]: value}));

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setLogoUrl(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-ui-text-heading">Login Page Customization</h3>
                <div>
                    <label className="text-sm">Template Layout</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                       <button onClick={() => setActiveTemplate('center_card')} className={`h-16 rounded border-2 p-1 ${activeTemplate === 'center_card' ? 'border-singularity-teal' : 'border-ui-border'}`}><div className="w-8 h-10 bg-ui-border mx-auto rounded flex items-center justify-center"><p className="text-[8px] text-ui-text-subtle">CARD</p></div></button>
                       <button onClick={() => setActiveTemplate('side_image')} className={`h-16 rounded border-2 flex gap-1 p-1 ${activeTemplate === 'side_image' ? 'border-singularity-teal' : 'border-ui-border'}`}><div className="w-1/2 h-full bg-ui-border rounded-sm"></div><div className="w-1/2 h-full"></div></button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm">Font Style</label><select value={font} onChange={e => setFont(e.target.value)} className={inputStyles}><option value="sans">Modern Sans</option><option value="serif">Classic Serif</option><option value="mono">Futuristic Mono</option></select></div>
                    <div><label className="text-sm">Card Style</label><select value={cardStyle} onChange={e => setCardStyle(e.target.value)} className={inputStyles}><option value="rounded">Rounded</option><option value="sharp">Sharp</option><option value="glass">Floating Glass</option></select></div>
                </div>
                <div>
                    <label className="text-sm font-medium text-ui-text-body block mb-1">Brand Logo (PNG, SVG)</label>
                    <input type="file" onChange={handleLogoChange} className="w-full text-sm text-ui-text-subtle file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-singularity-purple/20 file:text-singularity-purple hover:file:bg-singularity-purple/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm">BG Color</label><input type="color" value={colors.bg} onChange={e => handleColorChange('bg', e.target.value)} className="w-full h-10 p-1 form-input-glow" /></div>
                    <div><label className="text-sm">Card BG</label><input type="color" value={colors.card} onChange={e => handleColorChange('card', e.target.value)} className="w-full h-10 p-1 form-input-glow" /></div>
                    <div><label className="text-sm">Text Color</label><input type="color" value={colors.text} onChange={e => handleColorChange('text', e.target.value)} className="w-full h-10 p-1 form-input-glow" /></div>
                    <div><label className="text-sm">Button Color</label><input type="color" value={colors.button} onChange={e => handleColorChange('button', e.target.value)} className="w-full h-10 p-1 form-input-glow" /></div>
                </div>
            </div>
            <div className="lg:col-span-3 bg-singularity-black p-4 rounded-lg">
                <h3 className="text-xl font-bold text-ui-text-heading mb-2 text-center">Live Preview</h3>
                <div className={`flex items-center justify-center p-4 rounded-lg min-h-[400px] transition-all ${font === 'sans' ? 'preview-font-sans' : font === 'serif' ? 'preview-font-serif' : 'preview-font-mono'}`} style={{ backgroundColor: colors.bg }}>
                    <div className={`w-full max-w-xs p-8 shadow-2xl transition-all ${cardStyle === 'sharp' ? 'rounded-none' : 'rounded-2xl'} ${cardStyle === 'glass' ? 'bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200/20' : ''}`} style={{ backgroundColor: cardStyle !== 'glass' ? colors.card : 'rgba(255,255,255,0.1)', color: colors.text }}>
                        <div className="text-center mb-6">
                            {logoUrl ? <img src={logoUrl} alt="Brand Logo" className="w-16 h-16 mx-auto mb-2 object-contain" /> : <LeherIcon className="w-16 h-16 mx-auto mb-2" style={{ color: colors.button }} />}
                            <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Welcome</h2>
                        </div>
                        <div className="space-y-4">
                            <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/50" readOnly />
                            <input type="password" placeholder="Password" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/50" readOnly />
                            <button className="w-full py-3 rounded-lg font-bold transition-colors" style={{ backgroundColor: colors.button, color: colors.buttonText }}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmailTemplatesTab: React.FC = () => {
    const [template, setTemplate] = useState('welcome');
    const [style, setStyle] = useState('minimal');
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
    const [buttonStyle, setButtonStyle] = useState('pill');

    const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setHeaderImageUrl(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-bold text-ui-text-heading">Email Templates</h3>
                <div><label className="text-sm">Template Type</label><select value={template} onChange={e => setTemplate(e.target.value)} className={inputStyles}><option value="welcome">Welcome Email</option><option value="approved">Release Approved</option><option value="rejected">Release Rejected</option></select></div>
                <div><label className="text-sm">Visual Style</label><select value={style} onChange={e => setStyle(e.target.value)} className={inputStyles}><option value="minimal">Minimal</option><option value="corporate">Corporate</option><option value="playful">Playful</option><option value="elegant">Elegant</option></select></div>
                <div><label className="text-sm">Button Style</label><select value={buttonStyle} onChange={e => setButtonStyle(e.target.value)} className={inputStyles}><option value="pill">Pill</option><option value="rectangle">Rectangle</option><option value="outline">Outline</option></select></div>
                <div>
                    <label className="text-sm">Custom Header Image (Optional)</label>
                    <input type="file" onChange={handleHeaderImageChange} className="w-full text-sm text-ui-text-subtle file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-singularity-purple/20 file:text-singularity-purple hover:file:bg-singularity-purple/30" />
                </div>
            </div>
            <div className="lg:col-span-2 bg-singularity-black p-4 rounded-lg">
                 <h3 className="text-xl font-bold text-ui-text-heading mb-2 text-center">Live Preview</h3>
                 <div className="bg-gray-300 p-4 rounded-lg overflow-y-auto">
                    <div className="bg-white text-black p-6 font-sans w-full max-w-lg mx-auto" style={{fontFamily: style === 'elegant' ? "'Playfair Display', serif" : 'Inter, sans-serif' }}>
                        {headerImageUrl && <img src={headerImageUrl} alt="Header" className="w-full h-auto mb-6"/>}
                        <h1 className={`text-2xl font-bold ${style === 'playful' ? 'text-purple-600' : 'text-black'}`}>Welcome to Our Platform!</h1>
                        <p className="mt-4">Hi [User Name],</p>
                        <p className="mt-2">Thanks for joining! We're excited to help you share your music with the world.</p>
                        <button className={`mt-6 px-6 py-3 text-white font-semibold transition-all ${buttonStyle === 'pill' ? 'rounded-full' : buttonStyle === 'rectangle' ? 'rounded-md' : 'rounded-full bg-transparent border-2 border-black text-black hover:bg-black hover:text-white'}`} style={{backgroundColor: buttonStyle !== 'outline' ? (style === 'corporate' ? '#2563eb' : '#000000') : ''}}>Get Started</button>
                        <hr className="my-6" />
                        <p className="text-xs text-gray-500 text-center">© 2024 Your Label. All rights reserved.</p>
                    </div>
                 </div>
            </div>
        </div>
    )
};


const FeatureControlTab: React.FC = () => {
    const features = ['AI Mastering', 'Smart Links', 'UGC Management', 'Royalty Advances', 'Sync Licensing', 'Analytics API Access'];
    return (
        <div className="space-y-4">
             <h3 className="text-xl font-bold text-ui-text-heading">Feature Control</h3>
             <p className="text-sm text-ui-text-subtle">Select which features are available to users on your white-label platform.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map(feature => (
                    <label key={feature} className="feature-toggle-label">
                        <span className="font-semibold text-ui-text-heading">{feature}</span>
                        <input type="checkbox" className="feature-toggle-checkbox" defaultChecked/>
                        <div className="feature-toggle-switch"></div>
                    </label>
                ))}
             </div>
        </div>
    )
};

const BillingTab: React.FC = () => {
    const { t } = useTranslation();
    const paymentHistory = [
        { date: '2024-07-01', description: 'Monthly Subscription Fee', amount: 499.00, status: 'Paid' },
        { date: '2024-06-01', description: 'Monthly Subscription Fee', amount: 499.00, status: 'Paid' },
        { date: '2024-05-01', description: 'Monthly Subscription Fee', amount: 499.00, status: 'Paid' },
    ];
    return(
         <div className="space-y-6">
            <h3 className="text-xl font-bold text-ui-text-heading">{t('wl_billing_desc')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-singularity-black/50 p-4 rounded-lg"><p className="text-sm text-ui-text-subtle">{t('wl_billing_current_plan')}</p><p className="text-2xl font-bold text-primary">{t('wl_billing_plan_name')}</p></div>
                <div className="bg-singularity-black/50 p-4 rounded-lg"><p className="text-sm text-ui-text-subtle">{t('wl_billing_active_artists')}</p><p className="text-2xl font-bold text-ui-text-heading">1,250</p></div>
                <div className="bg-singularity-black/50 p-4 rounded-lg"><p className="text-sm text-ui-text-subtle">{t('wl_billing_total_releases')}</p><p className="text-2xl font-bold text-ui-text-heading">8,940</p></div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">{t('wl_billing_payment_method')}</h4>
                <div className="bg-singularity-black/50 p-4 rounded-lg flex justify-between items-center">
                    <p>Visa ending in **** 4242</p>
                    <button className="text-sm font-semibold text-primary hover:underline">{t('wl_billing_update_method')}</button>
                </div>
            </div>
             <div>
                <h4 className="font-semibold mb-2">{t('wl_billing_payment_history')}</h4>
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-ui-text-subtle"><th className="p-2">{t('wl_billing_date')}</th><th className="p-2">{t('wl_billing_description')}</th><th className="p-2">{t('wl_billing_amount')}</th><th className="p-2">{t('wl_billing_status')}</th></tr></thead><tbody>{paymentHistory.map(p => <tr key={p.date} className="border-t border-singularity-purple/30"><td className="p-2">{p.date}</td><td className="p-2">{p.description}</td><td className="p-2 font-mono">${p.amount.toFixed(2)}</td><td className="p-2 text-green-400">{p.status}</td></tr>)}</tbody></table></div>
            </div>
        </div>
    )
};

const SupportTab: React.FC = () => {
    const { t } = useTranslation();
    return(
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-ui-text-heading">{t('wl_support_desc')}</h3>
            <div><label className="text-sm">{t('wl_support_email_label')}</label><input type="email" placeholder="support@yourlabel.com" className={inputStyles} /></div>
            <div><label className="text-sm">{t('wl_support_help_center_label')}</label><input type="url" placeholder="https://support.yourlabel.com" className={inputStyles} /></div>
            <div><label className="text-sm">{t('wl_support_custom_message_label')}</label><textarea placeholder="For support, please contact us at..." className={inputStyles} rows={3}></textarea></div>
        </div>
    )
};

const LegalTab: React.FC = () => {
    const { t } = useTranslation();
    return(
         <div className="space-y-6">
             <h3 className="text-xl font-bold text-ui-text-heading">{t('wl_legal_desc')}</h3>
             <div><label className="text-sm">{t('wl_legal_terms_url_label')}</label><input type="url" placeholder="https://yourlabel.com/terms" className={inputStyles} /></div>
             <div><label className="text-sm">{t('wl_legal_privacy_url_label')}</label><input type="url" placeholder="https://yourlabel.com/privacy" className={inputStyles} /></div>
             <p className="text-center text-sm text-ui-text-subtle">{t('wl_legal_or_paste')}</p>
             <div><label className="text-sm">Terms of Service Content</label><textarea className={inputStyles} rows={5}></textarea></div>
             <div><label className="text-sm">Privacy Policy Content</label><textarea className={inputStyles} rows={5}></textarea></div>
        </div>
    )
};

const IntegrationsTab: React.FC = () => {
    const { t } = useTranslation();
    return(
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-ui-text-heading">{t('wl_integrations_desc')}</h3>
            <div className="bg-singularity-black/50 p-4 rounded-lg space-y-3">
                <h4 className="font-bold">{t('wl_integrations_s3_title')}</h4>
                <p className="text-xs text-ui-text-subtle">{t('wl_integrations_s3_desc')}</p>
                <div className="grid grid-cols-2 gap-4">
                    <input className={inputStyles} placeholder="S3 Bucket Name" />
                    <input className={inputStyles} placeholder="S3 Region" />
                    <input className={inputStyles} placeholder="Access Key ID" />
                    <input type="password" className={inputStyles} placeholder="Secret Access Key" />
                </div>
            </div>
             <div className="bg-singularity-black/50 p-4 rounded-lg space-y-3">
                <h4 className="font-bold">{t('wl_integrations_sendgrid_title')}</h4>
                <p className="text-xs text-ui-text-subtle">{t('wl_integrations_sendgrid_desc')}</p>
                <input className={inputStyles} placeholder="SendGrid API Key" />
            </div>
             <div className="bg-singularity-black/50 p-4 rounded-lg space-y-3">
                <h4 className="font-bold">{t('wl_integrations_ga_title')}</h4>
                <p className="text-xs text-ui-text-subtle">{t('wl_integrations_ga_desc')}</p>
                <input className={inputStyles} placeholder="Google Analytics Measurement ID (G-XXXXX)" />
            </div>
        </div>
    )
}

// --- MAIN COMPONENT ---

const WhiteLabelSettings: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<WhiteLabelTab>('branding');
    
    // In a real app, this would come from user data
    const isEnterprise = true; 

    if (!isEnterprise) {
        return (
            <div className="text-center p-12">
                <h3 className="text-2xl font-bold text-ui-text-heading">Upgrade to Enterprise</h3>
                <p className="text-ui-text-body mt-2">White-label features are available exclusively on our Enterprise plan. Contact sales to learn more.</p>
                <button className="mt-6 btn-quantum-glow px-6 py-3 rounded-full text-white font-bold">Contact Sales</button>
            </div>
        )
    }

    const tabs: { id: WhiteLabelTab, label: TranslationKeys }[] = [
        { id: 'branding', label: 'wl_branding_title' },
        { id: 'login_page', label: 'wl_login_page_title' },
        { id: 'email', label: 'wl_email_title' },
        { id: 'domain', label: 'wl_domain_title' },
        { id: 'features', label: 'wl_features_title' },
        { id: 'roles', label: 'wl_roles_title' },
        { id: 'billing', label: 'wl_billing_title' },
        { id: 'support', label: 'wl_support_title' },
        { id: 'legal', label: 'wl_legal_title' },
        { id: 'integrations', label: 'wl_integrations_title' },
    ];
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'branding': return <BrandingTab />;
            case 'login_page': return <LoginPageTab />;
            case 'email': return <EmailTemplatesTab />;
            case 'features': return <FeatureControlTab />;
            case 'domain': return <div><label className="text-sm">{t('wl_domain_label')}</label><input type="text" placeholder={t('wl_domain_placeholder')} className={inputStyles} /><p className="text-xs text-ui-text-subtle mt-2">{t('wl_domain_instructions')}</p></div>;
            case 'billing': return <BillingTab />;
            case 'support': return <SupportTab />;
            case 'legal': return <LegalTab />;
            case 'integrations': return <IntegrationsTab />;
            default: return <div className="text-center p-8 text-ui-text-subtle">Settings for '{t(tabs.find(t => t.id === activeTab)?.label || 'Tab' as any)}' coming soon.</div>
        }
    };

    return (
        <div className="space-y-6">
             <div className="overflow-x-auto">
                 <div className="flex items-center gap-2 border-b border-singularity-purple/30 pb-2">
                    {tabs.map(tab => <TabButton key={tab.id} label={t(tab.label)} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />)}
                 </div>
             </div>
            <div className="p-4 bg-singularity-black/50 rounded-lg animate-fade-in min-h-[200px]">
                {renderTabContent()}
            </div>
             <div className="flex justify-end pt-4">
                <button className="px-8 py-3 rounded-full text-white font-bold transition shadow-lg hover:brightness-110 bg-gradient-singularity">Save Changes</button>
            </div>
        </div>
    );
};

export default WhiteLabelSettings;
