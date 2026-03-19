
import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Activity, 
    ArrowUpRight, 
    CheckCircle2, 
    AlertCircle, 
    Copyright, 
    Upload, 
    Video, 
    Megaphone, 
    DollarSign, 
    BarChart3, 
    Wallet, 
    Briefcase, 
    Code, 
    HelpCircle, 
    Globe,
    Zap,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import type { Release } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



// Main Dashboard View Props
interface DashboardViewProps {
  songs: Release[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const StatCard: React.FC<{ icon: any, value: number, label: string, color: string, trend?: string }> = ({ icon: Icon, value, label, color, trend }) => (
    <motion.div 
        whileHover={{ y: -4 }}
        className="relative group overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/5 p-6 transition-all duration-300 hover:bg-zinc-900/80 hover:border-white/10"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            {trend && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </div>
            )}
        </div>
        
        <div className="space-y-1">
            <h3 className="text-3xl font-bold text-white tracking-tight">
                {value.toLocaleString()}
            </h3>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                {label}
            </p>
        </div>

        {/* Subtle background glow */}
        <div 
            className="absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: color }}
        />
    </motion.div>
);

const QuickActionCard: React.FC<{ icon: any, title: string, description: string, onClick: () => void }> = ({ icon: Icon, title, description, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex flex-col items-start p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/60 hover:border-white/10 transition-all text-left group"
    >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-all">
            <Icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{description}</p>
    </motion.button>
);

const UpdateBanner: React.FC = () => {
    return (
        <Link to="/changelog" className="block group">
            <motion.div 
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-8"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] -z-10" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                            <Zap className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">New Update</span>
                                <span className="text-xs text-zinc-500 font-mono">v5.8.0 • Quantum Core</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                                Cultural Intelligence & Brand Ecosystem
                            </h3>
                            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                                AI Lyric Translator, Brand Matchmaking, and Social Licensing Portal for global expansion and ethical monetization.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white group-hover:bg-primary group-hover:border-primary transition-all">
                        View Changelog
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

// Main Dashboard View
export const DashboardView: React.FC<DashboardViewProps> = ({ songs, showToast }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const networkCanvasContainerRef = useRef<HTMLDivElement>(null);
    
    const [releaseStats, setReleaseStats] = useState({
      live: 688321,
      processing: 8456,
      error: 1811,
      copyright: 1412,
    });
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    
     useEffect(() => {
        const container = networkCanvasContainerRef.current;
        if (!container) return;

        let animationFrameId: number;
        let renderer: THREE.WebGLRenderer | null = null;
        let scene: THREE.Scene | null = null;
        let controls: OrbitControls | null = null;
        let particleGeometry: THREE.BufferGeometry | null = null;
        let particleMaterial: THREE.PointsMaterial | null = null;
        let lineGeometry: THREE.BufferGeometry | null = null;
        let lineMaterial: THREE.LineBasicMaterial | null = null;
        let handleResize: () => void;

        try {
            scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 1, 1000);
            camera.position.z = 50;

            // Attempt to create renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;

            const particleCount = 200;
            const positions = new Float32Array(particleCount * 3);
            const velocities = Array.from({ length: particleCount }, () => new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1));
            particleGeometry = new THREE.BufferGeometry();
            
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            }
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            particleMaterial = new THREE.PointsMaterial({ color: 0x9333ea, size: 2, sizeAttenuation: true, transparent: true, opacity: 0.6 });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            lineGeometry = new THREE.BufferGeometry();
            lineMaterial = new THREE.LineBasicMaterial({ color: 0x9333ea, transparent: true, opacity: 0.1 });
            const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lines);

            const connectionDistanceSq = 30 * 30;

            const animate = () => {
                if (!renderer || !scene || !camera || !particleGeometry) return;
                
                animationFrameId = requestAnimationFrame(animate);
                const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;

                for (let i = 0; i < particleCount; i++) {
                    posAttr.setXYZ(i, posAttr.getX(i) + velocities[i].x, posAttr.getY(i) + velocities[i].y, posAttr.getZ(i) + velocities[i].z);
                    if (posAttr.getX(i) < -50 || posAttr.getX(i) > 50) velocities[i].x *= -1;
                    if (posAttr.getY(i) < -50 || posAttr.getY(i) > 50) velocities[i].y *= -1;
                    if (posAttr.getZ(i) < -50 || posAttr.getZ(i) > 50) velocities[i].z *= -1;
                }
                posAttr.needsUpdate = true;

                const linePositions = [];
                for (let i = 0; i < particleCount; i++) {
                    for (let j = i + 1; j < particleCount; j++) {
                        const p1 = new THREE.Vector3().fromBufferAttribute(posAttr, i);
                        const p2 = new THREE.Vector3().fromBufferAttribute(posAttr, j);
                        if (p1.distanceToSquared(p2) < connectionDistanceSq) {
                            linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                        }
                    }
                }
                if (lineGeometry) lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

                if (controls) controls.update();
                renderer.render(scene, camera);
            };
            animate();

            handleResize = () => {
                if (!container || !renderer) return;
                camera.aspect = container.offsetWidth / container.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.offsetWidth, container.offsetHeight);
            };
            window.addEventListener('resize', handleResize);

        } catch (error) {
            console.error("Failed to initialize WebGL context:", error);
            // Fallback or silent fail if WebGL not supported/blocked
        }

        return () => {
            if (handleResize) window.removeEventListener('resize', handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            
            if (renderer) {
                if (renderer.domElement && renderer.domElement.parentNode === container) {
                    container.removeChild(renderer.domElement);
                }
                renderer.dispose();
                // Force loss of context to ensure cleanup in browsers with limited contexts
                renderer.forceContextLoss();
            }
            
            if (controls) controls.dispose();
            if (particleGeometry) particleGeometry.dispose();
            if (particleMaterial) particleMaterial.dispose();
            if (lineGeometry) lineGeometry.dispose();
            if (lineMaterial) lineMaterial.dispose();
        };
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setReleaseStats(prev => {
                const errorsToFix = Math.min(prev.error, Math.floor(Math.random() * 10) + 1);
                const conflictsToFix = Math.min(prev.copyright, Math.floor(Math.random() * 8) + 1);
                
                if (prev.error === 0 && prev.copyright === 0) {
                    return prev;
                }

                const totalFixed = errorsToFix + conflictsToFix;
                const toLive = Math.floor(totalFixed * (Math.random() * 0.4 + 0.4));
                const toProcessing = totalFixed - toLive;

                const updateRoll = Math.random();
                if (updateRoll < 0.25 && errorsToFix > 0) setLastUpdated('error');
                else if (updateRoll < 0.5 && conflictsToFix > 0) setLastUpdated('copyright');
                else if (updateRoll < 0.75) setLastUpdated('processing');
                else setLastUpdated('live');

                return {
                    error: prev.error - errorsToFix,
                    copyright: prev.copyright - conflictsToFix,
                    live: prev.live + toLive,
                    processing: prev.processing + toProcessing,
                };
            });
            setTimeout(() => setLastUpdated(null), 800);
        }, 2500);

        return () => clearInterval(interval);
    }, []);
    
    const quickActions = useMemo(() => [
        {
            icon: Zap,
            title: t('create_release'),
            description: t('dashboard_qa_desc_upload'),
            onClick: () => navigate('/create-release')
        },
        {
            icon: Activity,
            title: 'Audio Analysis AI',
            description: 'Analyze BPM, Key, and Mood of your tracks.',
            onClick: () => navigate('/distribution-tools/audio-analysis')
        },
        {
            icon: Video,
            title: 'Create Video',
            description: 'Distribute Official Music Video, Lyric Video, or Visualizer.',
            onClick: () => navigate('/create-release', { state: { initialAssetType: 'Video' } })
        },
        {
            icon: Megaphone,
            title: 'Growth & Promo',
            description: 'AI Audience, SmartLinks & Creator Network',
            onClick: () => navigate('/promotions')
        },
        {
            icon: DollarSign,
            title: 'Advanced Monetization',
            description: 'Smart Splits, Advances & Licensing',
            onClick: () => navigate('/monetization')
        },
        {
            icon: BarChart3,
            title: t('title_analytics'),
            description: t('dashboard_qa_desc_analytics'),
            onClick: () => navigate('/analytics')
        },
        {
            icon: Wallet,
            title: t('title_payments'),
            description: t('dashboard_qa_desc_payments'),
            onClick: () => navigate('/payments')
        },
        {
            icon: Briefcase,
            title: t('nav_toolkit'),
            description: t('dashboard_qa_desc_toolkit'),
            onClick: () => navigate('/distribution-tools')
        },
        {
            icon: Copyright,
            title: t('dashboard_copyright_conflicts'),
            description: t('dashboard_qa_desc_copyright'),
            onClick: () => navigate('/copyright-conflicts')
        },
        {
            icon: Code,
            title: t('title_api_documentation') || 'API Docs',
            description: 'Access developer guides & API references.',
            onClick: () => navigate('/developer/docs')
        },
        {
            icon: HelpCircle,
            title: 'FAQ Support',
            description: t('support_subtitle') || 'Pusat Bantuan & Pertanyaan Umum',
            onClick: () => navigate('/support')
        }
    ], [t, navigate]);

    return (
       <div className="space-y-12 relative pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                        {t('welcome_message')}
                    </h1>
                    <p className="text-sm md:text-lg text-zinc-500 font-medium max-w-2xl">
                        {t('slogan')}
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 p-1 rounded-2xl bg-zinc-900/50 border border-white/5"
                >
                    <div className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-white">
                        Live Status
                    </div>
                    <div className="flex items-center gap-2 pr-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">System Active</span>
                    </div>
                </motion.div>
            </header>

            {/* Background Canvas Layer */}
            <div ref={networkCanvasContainerRef} className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none opacity-30 mask-image-gradient-b"></div>

            <div className="space-y-12 relative z-10">
                {/* Main Status Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={Zap} value={releaseStats.live} label={t('dashboard_live')} color="#10B981" trend="+12.5%" />
                    <StatCard icon={Activity} value={releaseStats.processing} label={t('dashboard_in_process')} color="#3B82F6" trend="+3.2%" />
                    <StatCard icon={AlertCircle} value={releaseStats.error} label={t('dashboard_errors')} color="#F59E0B" />
                    <StatCard icon={ShieldCheck} value={releaseStats.copyright} label={t('dashboard_copyright_conflicts')} color="#EF4444" />
                </div>
                
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white tracking-tight">Quick Actions</h3>
                        <div className="h-px flex-1 bg-white/5 mx-6" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {quickActions.map((action, idx) => (
                            <motion.div
                                key={action.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + idx * 0.05 }}
                            >
                                <QuickActionCard 
                                    icon={action.icon}
                                    title={action.title}
                                    description={action.description}
                                    onClick={action.onClick}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <UpdateBanner />
                </motion.div>
            </div>
       </div>
    );
};
