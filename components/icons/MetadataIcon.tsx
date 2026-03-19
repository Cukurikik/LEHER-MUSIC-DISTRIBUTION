

import React from 'react';

const MetadataIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8V4a1 1 0 011-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 5.5l-8 8" />
    </svg>
);

export default MetadataIcon;
