
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { ADMIN_TOOLS } from '../../data/tools';
import type { AdminTool, AdminToolCategory } from '../../types';
import AnalyticsIcon from '../icons/AnalyticsIcon';
import CopyrightIcon from '../icons/CopyrightIcon';
import CashIcon from '../icons/CashIcon';
import UsersIcon from '../icons/ArtistIcon';
import BriefcaseIcon from '../icons/BriefcaseIcon';
import TagIcon from '../icons/TagIcon';
import PlugIcon from '../icons/PlugIcon';


const categoryIcons: Partial<Record<AdminToolCategory, React.FC<{className?: string}>>> = {
    'Content & Rights': CopyrightIcon,
    'Financial & Revenue': CashIcon,
    'User & Platform': UsersIcon,
    'Analytics & Strategy': AnalyticsIcon,
    'Kustomisasi & Branding': TagIcon,
    'System & Infrastructure': PlugIcon,
};


const InteractiveAdminToolkit: React.FC = () => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeCategory, setActiveCategory] = useState<AdminToolCategory | null>(null);
    const [hoveredTool, setHoveredTool] = useState<AdminTool | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [radii, setRadii] = useState({ category: 160, tool: 280 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
            if (window.innerWidth < 768) {
                setRadii({ category: 110, tool: 200 });
            } else {
                setRadii({ category: 160, tool: 280 });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const toolsByCategory = useMemo(() => {
        return ADMIN_TOOLS.reduce((acc, tool) => {
            (acc[tool.category] = acc[tool.category] || []).push(tool);
            return acc;
        }, {} as Record<AdminToolCategory, AdminTool[]>);
    }, []);

    const categories = Object.keys(toolsByCategory) as AdminToolCategory[];
    const activeTools = activeCategory ? toolsByCategory[activeCategory] : [];

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                 setIsExpanded(false);
                 setActiveCategory(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCategoryClick = (category: AdminToolCategory, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveCategory(prev => prev === category ? null : category);
        setHoveredTool(null);
    };
    
    const renderCenterContent = () => {
        if (!isExpanded) {
            return (
                <button onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} className="toolkit-activate-btn relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative z-10 bg-singularity-black border-2 border-primary/50 rounded-full p-6 transition-transform group-hover:scale-110 group-hover:border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                        <BriefcaseIcon className="w-12 h-12 text-white" />
                    </div>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Initialize Toolkit
                    </span>
                </button>
            );
        }

        const item = hoveredTool || (activeCategory && { titleKey: activeCategory, descKey: `${toolsByCategory[activeCategory].length} tools available` });
        
        const title = item 
            ? (item === hoveredTool ? t(item.titleKey as any) : item.titleKey) 
            : "Admin Toolkit";
            
        const description = item 
            ? (item === hoveredTool ? t(item.descKey as any) : item.descKey) 
            : "Select a category to explore tools.";
        
        return (
            <div className="animate-fade-in-text text-center w-full max-w-xs px-4 z-30 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-bold text-gradient-singularity leading-tight mb-2 drop-shadow-md">{title}</h3>
                <p className="text-xs md:text-sm text-ui-text-body min-h-[40px] line-clamp-3 leading-relaxed">{description}</p>
                 {activeCategory && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); setActiveCategory(null); setHoveredTool(null); }} 
                        className="mt-4 pointer-events-auto text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white px-4 py-1.5 rounded-full hover:bg-white/20 transition-all border border-white/5 hover:border-white/20"
                    >
                        Return to Hub
                    </button>
                )}
            </div>
        );
    };

    // Calculate positions for lines
    const center = { x: dimensions.width / 2, y: dimensions.height / 2 };

    return (
        <div className="bg-[#050505] border border-white/10 rounded-3xl min-h-[650px] relative overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <div ref={containerRef} className="toolkit-container relative w-full h-full flex items-center justify-center">
                
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.1)" />
                            <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0.5)" />
                        </linearGradient>
                    </defs>
                    {isExpanded && categories.map((category, i) => {
                        const angle = (i / categories.length) * 360 - 90;
                        const rad = (angle * Math.PI) / 180;
                        const catX = center.x + radii.category * Math.cos(rad);
                        const catY = center.y + radii.category * Math.sin(rad);
                        const isActive = activeCategory === category;

                        return (
                            <g key={`line-${category}`}>
                                {/* Line from Center to Category */}
                                <line 
                                    x1={center.x} y1={center.y} 
                                    x2={catX} y2={catY} 
                                    stroke={isActive ? "var(--color-primary)" : "rgba(255,255,255,0.1)"} 
                                    strokeWidth={isActive ? 2 : 1}
                                    className="transition-all duration-500"
                                />
                                
                                {/* Lines from Category to Tools (if active) */}
                                {isActive && activeTools.map((tool, j) => {
                                    const toolAngle = (j / activeTools.length) * 360 - 90;
                                    const toolRad = (toolAngle * Math.PI) / 180;
                                    const toolX = center.x + radii.tool * Math.cos(toolRad);
                                    const toolY = center.y + radii.tool * Math.sin(toolRad);

                                    return (
                                        <line 
                                            key={`line-tool-${tool.id}`}
                                            x1={catX} y1={catY} 
                                            x2={toolX} y2={toolY} 
                                            stroke="var(--color-primary)" 
                                            strokeWidth="1"
                                            strokeOpacity="0.4"
                                            className="animate-draw-line"
                                        />
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>

                {/* Center Display */}
                <div className="toolkit-center-display z-20 absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                         {renderCenterContent()}
                    </div>
                </div>

                {/* Categories Ring */}
                {categories.map((category, i) => {
                    const isActive = activeCategory === category;
                    const isDimmed = activeCategory && !isActive;
                    const angle = (i / categories.length) * 360 - 90;
                    const transform = `rotate(${angle}deg) translateX(${radii.category}px) rotate(${-angle}deg)`;
                    const CategoryIcon = categoryIcons[category] || PlugIcon;

                    return (
                        <div
                            key={category}
                            className={`toolkit-node absolute top-1/2 left-1/2 -ml-10 -mt-10 w-20 h-20 flex items-center justify-center transition-all duration-500 z-10 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} ${isDimmed ? 'opacity-20 blur-[2px] scale-90' : ''}`}
                            style={{ transform: isExpanded ? transform : 'none' }}
                            onClick={(e) => handleCategoryClick(category, e)}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer border transition-all duration-300 relative group ${isActive ? 'bg-black border-primary text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] scale-110' : 'bg-[#111] border-white/10 text-ui-text-subtle hover:border-primary/50 hover:text-white'}`}>
                                <CategoryIcon className="w-6 h-6" />
                                {isActive && <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>}
                            </div>
                            {isActive && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary uppercase tracking-wider w-32 text-center bg-black/80 px-2 py-1 rounded-md border border-primary/30 backdrop-blur-sm">
                                    {category}
                                </div>
                            )}
                        </div>
                    );
                })}
                
                 {/* Tools Ring (Outer) */}
                {activeTools.map((tool, i) => {
                    const angle = (i / activeTools.length) * 360 - 90;
                    const transform = `rotate(${angle}deg) translateX(${radii.tool}px) rotate(${-angle}deg)`;
                    const ToolIcon = tool.icon;
                    
                    return (
                         <Link
                            key={tool.id}
                            to={tool.link}
                            className={`toolkit-node absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 flex items-center justify-center transition-all duration-500 delay-75 z-10 ${activeCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                            style={{ transform: activeCategory ? transform : 'none' }}
                            onMouseEnter={() => setHoveredTool(tool)}
                            onMouseLeave={() => setHoveredTool(null)}
                        >
                             <div className="w-12 h-12 rounded-full bg-[#0A0A0A] border border-white/10 hover:border-primary hover:bg-primary/10 hover:scale-110 transition-all flex items-center justify-center shadow-xl cursor-pointer group relative">
                                 <ToolIcon className="w-5 h-5 text-ui-text-subtle group-hover:text-primary transition-colors" />
                                 {/* Tooltip on Hover */}
                                 <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[150px] bg-black/90 border border-white/10 text-white text-[10px] px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-md">
                                     <p className="font-bold text-center">{t(tool.title as any)}</p>
                                     <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/10 transform rotate-45"></div>
                                 </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveAdminToolkit;
