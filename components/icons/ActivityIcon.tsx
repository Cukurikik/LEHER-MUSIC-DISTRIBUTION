import React from 'react';

const ActivityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l2.29-2.29a1 1 0 00-1.42-1.42L16 15.17l-1.88-1.88a1 1 0 00-1.42 1.42L16 18z" />
  </svg>
);

export default ActivityIcon;