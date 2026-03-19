import React from 'react';

const ProCrownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.05 3.05a.75.75 0 00-1.1 0l-1.34 1.343L7.11 5.894a.75.75 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l1.34-1.343 1.343-1.34z" />
      <path d="M9.95 12.05a.75.75 0 00-1.1 0l-1.34 1.343-1.5 1.5a.75.75 0 101.06 1.06l1.5-1.5a.75.75 0 000-1.06l-1.343-1.34z" />
      <path d="M12.94 9.95a.75.75 0 000-1.1l-1.34-1.343-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l1.343-1.34.001-.001z" />
      <path d="M15 12.94a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 000 1.06l1.5 1.5a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 000-1.06z" />
    </svg>
);

export default ProCrownIcon;