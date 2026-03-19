import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const typeStyles = {
    success: { border: 'border-green-500', icon: '✓', iconColor: 'text-green-500' },
    error: { border: 'border-red-500', icon: '✗', iconColor: 'text-red-500' },
    warning: { border: 'border-amber-500', icon: '!', iconColor: 'text-amber-500' },
  }
  const styles = typeStyles[type];

  return (
    <div className={`fixed bottom-5 right-5 p-4 rounded-xl shadow-lg glass-surface-quantum z-50 animate-page-fade-in-up w-full max-w-sm border-l-4 ${styles.border}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 mr-3 text-lg font-bold ${styles.iconColor}`}>
          {styles.icon}
        </div>
        <div className="flex-1">
          <p className="text-ui-text-heading">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-2xl font-light text-ui-text-subtle opacity-70 hover:opacity-100">&times;</button>
      </div>
    </div>
  );
};

export default Toast;
