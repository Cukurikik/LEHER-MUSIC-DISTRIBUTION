import React from 'react';

const CopyrightIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.354a4 4 0 100 5.292" />
    </svg>
);

export default CopyrightIcon;