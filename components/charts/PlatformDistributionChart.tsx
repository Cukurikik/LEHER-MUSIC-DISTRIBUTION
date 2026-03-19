import React, { useMemo } from 'react';
import type { StreamData } from '../../types';
import { getPlatformIcon } from '../icons/PlatformIcons';


interface PlatformDistributionChartProps {
    data: StreamData[];
}

const PlatformDistributionChart: React.FC<PlatformDistributionChartProps> = ({ data }) => {
    const totalStreams = useMemo(() => data.reduce((sum, p) => sum + p.streams, 0), [data]);

    if (data.length === 0) {
        return <p className="text-ui-text text-center text-sm py-4">No platform data available.</p>;
    }

    return (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {data.map((platformData, index) => {
                const percentage = totalStreams > 0 ? (platformData.streams / totalStreams) * 100 : 0;
                return (
                    <div key={platformData.platform} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="flex justify-between items-center mb-1 text-sm">
                            <div className="flex items-center gap-2 font-semibold text-ui-text-heading">
                                {getPlatformIcon(platformData.platform, 'w-4 h-4')}
                                <span>{platformData.platform}</span>
                            </div>
                            <span className="font-mono text-ui-text">{platformData.streams.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-ui-border/50 rounded-full h-1.5">
                            <div 
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PlatformDistributionChart;