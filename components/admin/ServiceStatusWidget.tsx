import React from 'react';
import type { ServiceStatus } from '../../services/adminService';

const getStatusClasses = (status: 'Operational' | 'Disrupted' | 'Maintenance') => {
    switch (status) {
        case 'Operational': return { dot: 'bg-green-500 service-status-dot operational', text: 'text-green-400' };
        case 'Disrupted': return { dot: 'bg-red-500 service-status-dot disrupted', text: 'text-red-400' };
        case 'Maintenance': return { dot: 'bg-yellow-500 service-status-dot maintenance', text: 'text-yellow-400' };
        default: return { dot: 'bg-gray-500', text: 'text-gray-400' };
    }
}

const ServiceStatusWidget: React.FC<{ services: ServiceStatus[] }> = ({ services }) => {
    return (
        <div className="bg-singularity-black/50 border border-singularity-purple/30 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-ui-text-heading mb-4">Service Status</h3>
            <ul className="space-y-3">
                {services.map(service => {
                    const statusInfo = getStatusClasses(service.status);
                    return (
                        <li key={service.name} className="flex justify-between items-center text-sm">
                            <span className="text-ui-text-body">{service.name}</span>
                            <div className={`flex items-center gap-2 font-semibold ${statusInfo.text}`}>
                                <div className={`w-2.5 h-2.5 rounded-full ${statusInfo.dot}`}></div>
                                <span>{service.status}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <p className="text-xs text-center mt-4 text-green-400">All systems operational.</p>
        </div>
    );
};

export default ServiceStatusWidget;
