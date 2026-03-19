import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
      <div
        className="glass-surface-quantum modal-glow-border rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 text-center transform transition-all animate-drawer-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-4 shadow-lg shadow-green-500/20">
          <svg className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-ui-text-heading" id="modal-title">
          SELAMAT!!
        </h3>
        <div className="mt-2">
          <p className="text-lg text-ui-text-body">
            RILIS MU TELAH DIKIRIMKAN!!
          </p>
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-6 py-3 rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 btn-glow-primary"
          >
            Mantap!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;