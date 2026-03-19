
import React from 'react';

const PlugIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11 20.5v-8.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v8.5a2 2 0 104 0v-8.5a6.5 6.5 0 10-13 0v8.5a2 2 0 104 0z" 
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5a1.5 1.5 0 013 0v1a1.5 1.5 0 01-3 0v-1zM14 3.5a1.5 1.5 0 013 0v1a1.5 1.5 0 01-3 0v-1z" />
    </svg>
);

export default PlugIcon;
