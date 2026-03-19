import React from 'react';

const mockPayments = [
    { id: 'pay_1', user: 'Indie Collective', amount: 5230.00, method: 'Wise' },
    { id: 'pay_2', user: 'DJ Galaxy FVNKY', amount: 2105.50, method: 'Bank Transfer' },
    { id: 'pay_3', user: 'Pixel Groove', amount: 850.75, method: 'PayPal' },
    { id: 'pay_4', user: 'Stellar Music', amount: 15400.00, method: 'Bank Transfer' },
];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);


const ApprovedPaymentsWidget: React.FC = () => {
    return (
         <div className="bg-singularity-black/50 border border-singularity-purple/30 p-6 rounded-2xl h-full">
            <h3 className="text-xl font-bold text-ui-text-heading mb-4">Recent Payout Approvals</h3>
            <ul className="space-y-3">
                {mockPayments.map(payment => (
                    <li key={payment.id} className="bg-singularity-black/70 rounded-lg p-3 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-ui-text-heading truncate">{payment.user}</p>
                            <p className="text-xs text-ui-text-subtle">{payment.method}</p>
                        </div>
                        <p className={`font-bold text-lg ${payment.amount > 5000 ? 'text-green-400' : 'text-ui-text-heading'}`}>
                            {formatCurrency(payment.amount)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApprovedPaymentsWidget;