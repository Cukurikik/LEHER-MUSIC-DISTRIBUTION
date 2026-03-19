import React, { useState, useEffect, useMemo } from 'react';
import type { PayoutRequest } from '../types';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSubmit: (payoutData: Omit<PayoutRequest, 'id' | 'date' | 'status'>) => void;
}

// --- ICONS ---
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const BankIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 6.75zM9 12.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 12.75z" /></svg>);
const PayPalIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M7.64 2.152a.75.75 0 00-.75.75v12.42c0 .414.336.75.75.75h2.9c.48 0 .87-.39.87-.87v-2.31c0-.414-.336-.75-.75-.75H8.39V3.652h3.36c2.49 0 4.29 1.49 3.82 4.1-.42 2.3-2.31 3.25-4.47 3.25H8.39v-.93h2.61c1.33 0 2.4-.64 2.64-2.12.26-1.57-.7-2.37-2.11-2.37H8.39V2.902h2.15c.66 0 1.2.22 1.48.8.28.58.1 1.46-.38 1.94-.48.48-1.13.71-1.82.71H8.39v.93zm9.05 1.5c.3-.65.88-1.03 1.5-1.03.22 0 .44.04.66.13l.2.09c.18.09.34.2.48.33.14.13.26.28.36.45.1.17.18.35.24.54.06.19.1.38.12.58.02.2-.02.4-.08.6-.06.2-.14.39-.24.58-.1.19-.22.37-.36.54-.14.17-.3.33-.48.48l-.2.15c-.22.1-.44.15-.66.15-.62 0-1.2-.38-1.5-1.03v.01c-.3.65-.88 1.03-1.5 1.03-.22 0-.44-.04-.66-.13l.2-.09c-.18-.09-.34-.2-.48-.33a2.3 2.3 0 01-.84-2.02c0-.78.36-1.46.9-1.9.54-.44 1.25-.66 2.02-.66.3 0 .59.07.87.2zm-.87 3.1c.42 0 .78-.34.78-.78 0-.44-.36-.78-.78-.78a.78.78 0 000 1.56z"/></svg>);
const WiseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zM12 2L3 7v10l9 5 9-5V7L12 2z" /></svg>);
const EWalletIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const paymentOptions: { id: PayoutRequest['method']; name: string; icon: React.FC<{className?: string}> }[] = [
    { id: 'Bank Transfer', name: 'Bank Transfer', icon: BankIcon },
    { id: 'PayPal', name: 'PayPal', icon: PayPalIcon },
    { id: 'Wise', name: 'Wise', icon: WiseIcon },
    { id: 'GoPay', name: 'GoPay', icon: EWalletIcon },
    { id: 'OVO', name: 'OVO', icon: EWalletIcon },
    { id: 'DANA', name: 'DANA', icon: EWalletIcon },
    { id: 'ShopeePay', name: 'ShopeePay', icon: EWalletIcon },
];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ isOpen, onClose, currentBalance, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState<PayoutRequest['method']>('Bank Transfer');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setAmount('');
            setRecipient('');
            setError('');
            setMethod('Bank Transfer');
        }
    }, [isOpen]);

    const recipientPlaceholder = useMemo(() => {
        switch (method) {
            case 'Bank Transfer': return 'e.g., Bank Name, Account Number';
            case 'PayPal': return 'e.g., yourname@example.com';
            case 'Wise': return 'e.g., Wise email or account details';
            case 'GoPay':
            case 'OVO':
            case 'DANA':
            case 'ShopeePay':
                return 'e.g., 081234567890';
            default: return 'Recipient details';
        }
    }, [method]);

    const validateAndSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount < 10) {
            setError('Minimum withdrawal amount is $10.00.');
            return;
        }
        if (numericAmount > currentBalance) {
            setError('Withdrawal amount cannot exceed your current balance.');
            return;
        }
        if (!recipient.trim()) {
            setError('Please enter recipient details.');
            return;
        }

        setError('');
        onSubmit({
            amount: numericAmount,
            method,
            recipient,
        });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div
                className="relative bg-luminous-black rounded-2xl shadow-glow-primary w-full max-w-lg m-4 animate-drawer-slide-up border border-singularity-purple-transparent"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-ui-text-subtle hover:text-primary transition-colors p-2 rounded-full z-10" aria-label="Close modal"><CloseIcon className="w-6 h-6"/></button>
                
                <form onSubmit={validateAndSubmit} className="p-6 md:p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gradient-singularity">Request Payout</h2>
                        <p className="text-ui-text-body mt-1">Transfer funds from your Leher balance.</p>
                    </div>

                    <div className="text-center bg-singularity-black/50 border border-singularity-purple-transparent rounded-lg p-3">
                        <p className="text-sm text-ui-text-subtle">Available Balance</p>
                        <p className="text-2xl font-bold text-green-400">{formatCurrency(currentBalance)}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-ui-text-body block mb-2">Payout Method</label>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                            {paymentOptions.map(option => (
                                <button
                                    type="button"
                                    key={option.id}
                                    onClick={() => setMethod(option.id)}
                                    className={`payment-method-btn ${method === option.id ? 'active' : ''}`}
                                >
                                    <option.icon className="w-8 h-8" />
                                    <span className="text-xs font-semibold">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                     <div>
                        <label htmlFor="recipient" className="text-sm font-medium text-ui-text-body block mb-1">Recipient Details</label>
                        <input type="text" id="recipient" value={recipient} onChange={e => setRecipient(e.target.value)} className="form-input-glow w-full" placeholder={recipientPlaceholder} required />
                    </div>

                    <div>
                        <label htmlFor="amount" className="text-sm font-medium text-ui-text-body block mb-1">Amount (USD)</label>
                        <div className="relative">
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-text-subtle">$</span>
                            <input 
                                type="number" 
                                id="amount" 
                                value={amount} 
                                onChange={e => setAmount(e.target.value)} 
                                className="form-input-glow w-full pl-7" 
                                placeholder="0.00" 
                                required 
                                step="0.01"
                                min="10"
                                max={currentBalance}
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-center text-danger -mb-2 animate-fade-in">{error}</p>}
                    
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-gradient-singularity text-white font-bold py-3 px-6 rounded-full transition shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawalModal;