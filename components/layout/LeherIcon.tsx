import React from 'react';

const LeherIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        style={style}
    >
        <defs>
            <linearGradient id="leherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
            </linearGradient>
        </defs>
        
        {/* Central Core / Singularity */}
        <path d="M12 3V21" strokeWidth="2" strokeLinecap="round" />
        
        {/* Waveform / Sound Pulse Left */}
        <path d="M8.5 6C6.5 8 6.5 16 8.5 18" strokeWidth="1.5" />
        <path d="M5 9C4 10.5 4 13.5 5 15" strokeWidth="1.5" opacity="0.7" />
        
        {/* Waveform / Sound Pulse Right */}
        <path d="M15.5 6C17.5 8 17.5 16 15.5 18" strokeWidth="1.5" />
        <path d="M19 9C20 10.5 20 13.5 19 15" strokeWidth="1.5" opacity="0.7" />

        {/* Connecting Orbit */}
        <path d="M12 12H12.01" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

export default LeherIcon;