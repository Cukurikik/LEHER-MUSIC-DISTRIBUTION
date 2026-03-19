import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const colors = {
        success: 'bg-green-500/10 border-green-500/50 text-green-400',
        error: 'bg-red-500/10 border-red-500/50 text-red-400',
        info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
    };

    const icons = {
        success: <CheckCircleIcon className="w-5 h-5" />,
        error: <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">!</div>,
        info: <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">i</div>,
    };

    return createPortal(
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl ${colors[type]}`}>
                {icons[type]}
                <span className="font-bold text-sm">{message}</span>
                <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">✕</button>
            </div>
        </div>,
        document.body
    );
};

export default Toast;
