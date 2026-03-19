

import React from 'react';

const GeminiIcon: React.FC<{ className?: string, title?: string }> = ({ className, title }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label={title}
  >
    {title && <title>{title}</title>}
    <path d="M16.0031 9.4248L12 2L7.99688 9.4248L9.42469 10.8526L12 8.27734L14.5753 10.8526L16.0031 9.4248Z" />
    <path d="M21.9998 12L14.5751 7.99687L13.1473 9.42468L15.7225 12L13.1473 14.5753L14.5751 16.0031L21.9998 12Z" />
    <path d="M7.99688 14.5752L12 22L16.0031 14.5752L14.5753 13.1474L12 15.7226L9.42469 13.1474L7.99688 14.5752Z" />
    <path d="M2 12L9.42469 16.0031L10.8525 14.5753L8.27719 12L10.8525 9.42468L9.42469 7.99687L2 12Z" />
    <path d="M12 13.4141L10.5858 12L12 10.5858L13.4142 12L12 13.4141Z" />
  </svg>
);

export default GeminiIcon;
