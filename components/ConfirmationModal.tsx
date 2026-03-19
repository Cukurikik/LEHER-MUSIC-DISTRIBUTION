import React, { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DangerIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="glass-surface-quantum rounded-2xl shadow-2xl shadow-danger/30 w-full max-w-md m-4 p-6 text-center transform transition-all border-2 border-danger/50"
        onClick={e => e.stopPropagation()}
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-danger/20 border-2 border-danger/50 mb-4">
          <DangerIcon className="h-8 w-8 text-danger" />
        </div>
        <h3 className="text-2xl font-bold text-ui-text-heading" id="modal-title">
          {title}
        </h3>
        <div className="mt-2">
          <p className="text-md text-ui-text-body">
            {message}
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-ui-border hover:bg-opacity-50 text-ui-text-heading font-bold transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2 rounded-full bg-danger text-white font-bold transition shadow-lg hover:bg-red-700 shadow-glow-danger"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
