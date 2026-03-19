
import React, { useState, useRef, useEffect } from 'react';

interface FaqAccordionProps {
    title: string;
    children: React.ReactNode;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const FaqAccordion: React.FC<FaqAccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className={`group relative mb-4 transition-all duration-500 ${isOpen ? 'scale-[1.01]' : 'hover:scale-[1.005]'}`}>
            {/* Animated Border Background (Visible on Open/Hover) */}
            <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary via-secondary to-primary opacity-0 transition-opacity duration-500 blur-[1px] group-hover:opacity-50 ${isOpen ? 'opacity-100 animate-border-flow' : ''}`}></div>
            
            <div className="relative bg-ui-surface/80 backdrop-blur-md border border-ui-border/50 rounded-xl overflow-hidden shadow-lg">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center text-left p-5 cursor-pointer focus:outline-none z-10 relative"
                >
                    <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-ui-text-heading group-hover:text-white'}`}>
                        {title}
                    </h3>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border border-ui-border ${isOpen ? 'bg-primary/20 text-primary rotate-45 border-primary' : 'bg-ui-bg/50 text-ui-text-subtle group-hover:border-white/30 group-hover:text-white'}`}>
                        <PlusIcon className="w-5 h-5" />
                    </div>
                </button>
                
                <div
                    style={{ height: `${height}px` }}
                    className="transition-[height] duration-500 ease-in-out overflow-hidden"
                >
                    <div ref={contentRef} className="p-6 pt-0 text-ui-text-body leading-relaxed text-sm md:text-base">
                        <div className="border-t border-dashed border-ui-border/30 pt-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqAccordion;
