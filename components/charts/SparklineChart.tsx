
import React from 'react';

interface SparklineChartProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, width = 100, height = 30, color = 'var(--color-primary)' }) => {
    if (!data || data.length < 2) {
        return <div style={{ width, height }} className="flex items-center justify-center text-xs text-ui-text-subtle">...</div>;
    }

    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - minVal) / (range || 1)) * (height - 2) + 1; // Add padding
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default SparklineChart;
