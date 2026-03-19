
import React from 'react';

const PlaylistIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l4-2-4-2v4z" />
    </svg>
);

export default PlaylistIcon;
