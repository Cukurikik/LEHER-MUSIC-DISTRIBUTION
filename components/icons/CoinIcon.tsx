import React from 'react';

const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <defs>
            <linearGradient id="leherCoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#leherCoinGradient)" />
        <path 
            d="M12 5V19M8 8L16 16M8 16L16 8" 
            stroke="#000" 
            strokeOpacity="0.3"
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
        />
        <circle cx="12" cy="12" r="10" stroke="#FDE68A" strokeWidth="1" fill="none" />
        <circle cx="12" cy="12" r="7" stroke="#FDE68A" strokeOpacity="0.5" strokeWidth="0.5" fill="none" />
    </svg>
);

export default CoinIcon;