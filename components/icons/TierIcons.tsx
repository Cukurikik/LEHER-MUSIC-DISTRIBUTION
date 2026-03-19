import React from 'react';

// NOVA DISCOVERY - Simple, single shape
export const NovaDiscoveryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L4.5 6.5L12 11L19.5 6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 17.5L12 22L19.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
    <path d="M4.5 12L12 16.5L19.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

// NOVA ASCENDANT - Two stacked shapes
export const NovaAscendantIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L4.5 6.5L12 11L19.5 6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 12L12 16.5L19.5 12L12 7.5L4.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 17.5L12 22L19.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

// NOVA ELITE - Three shapes, more complex
export const NovaEliteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L4.5 6.5L12 11L19.5 6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 12L12 16.5L19.5 12L12 7.5L4.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 17.5L12 22L19.5 17.5L12 13L4.5 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

// NOVA PRIME - Full, complex structure with outer elements
export const NovaPrimeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 6L9 7.732V11.268L12 13L15 11.268V7.732L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 16.268V12.732L6 11V14L9 16.268Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M15 16.268V12.732L18 11V14L15 16.268Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);