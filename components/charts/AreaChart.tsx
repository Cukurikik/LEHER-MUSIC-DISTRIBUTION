import React from 'react';
import type { PriceHistory } from '../../types';

// --- AREA CHART (existing component) ---
interface ChartSeries {
  name: string;
  data: number[];
  color: string;
}

interface AreaChartProps {
  series: ChartSeries[];
  categories: string[]; // X-axis labels
  yAxisLabelFormatter?: (value: number) => string;
  height?: number;
}

export const AreaChart: React.FC<AreaChartProps> = ({ series, categories, yAxisLabelFormatter, height = 250 }) => {
  const chartWidth = 800;
  const padding = 40;

  if (!series || series.length === 0 || !categories || categories.length === 0 || series.every(s => s.data.length === 0)) {
    return <div className="text-center text-ui-text-subtle flex items-center justify-center" style={{height: `${height}px`}}>No trend data available.</div>;
  }
  
  const allValues = series.flatMap(s => s.data);
  const maxValue = Math.max(...allValues, 1); // Avoid division by zero
  const minValue = 0;

  const getX = (index: number) => {
    if (categories.length === 1) return padding + (chartWidth - padding * 2) / 2;
    return padding + (index / (categories.length - 1)) * (chartWidth - padding * 2);
  };

  const getY = (val: number) => {
    if (maxValue === minValue) return height - padding;
    return height - padding - ((val - minValue) / (maxValue - minValue)) * (height - padding * 2);
  };
  
  const formatLabel = yAxisLabelFormatter ?? ((v) => v.toLocaleString());

  return (
    <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${height}`} className="w-full min-w-[600px] h-auto font-sans">
            {/* Y-Axis Grid Lines & Labels */}
            {[...Array(5)].map((_, i) => {
                const yPos = padding + i * (height - 2 * padding) / 4;
                const value = Math.round(maxValue - (i * maxValue / 4));
                return (
                    <g key={i}>
                        <line x1={padding} y1={yPos} x2={chartWidth - padding} y2={yPos} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="3,3" />
                        <text x={padding - 10} y={yPos + 4} textAnchor="end" fill="rgba(255,255,255,0.6)" className="text-xs">
                            {formatLabel(value)}
                        </text>
                    </g>
                );
            })}
            
            {/* X-Axis Labels */}
            {categories.map((category, i) => {
                 const showEvery = Math.max(1, Math.floor(categories.length / 10));
                 if (i % showEvery === 0 || categories.length <= 12) {
                     return (
                         <text key={category} x={getX(i)} y={height - padding + 20} textAnchor="middle" fill="rgba(255,255,255,0.6)" className="text-xs">
                             {category}
                         </text>
                     )
                 }
                 return null;
            })}

            {/* Area Gradients & Paths */}
            <defs>
                {series.map(s => (
                    <linearGradient key={`grad-${s.name}`} id={`gradient-${s.name.replace(/\s/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                    </linearGradient>
                ))}
            </defs>
            
            <g>
            {series.map(s => {
                const linePath = s.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d)}`).join(' ');
                const areaPath = `${linePath} L ${getX(s.data.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;
                return (
                    <g key={s.name}>
                        <path d={areaPath} fill={`url(#gradient-${s.name.replace(/\s/g, '-')})`} />
                        <path d={linePath} fill="none" stroke={s.color} strokeWidth="2.5" />
                    </g>
                );
            })}
            </g>
        </svg>
    </div>
  );
};


// --- CANDLESTICK CHART (new component) ---
interface CandlestickChartProps {
  data: PriceHistory[];
  height?: number;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, height = 250 }) => {
  const chartWidth = 800;
  const padding = { top: 20, bottom: 30, left: 60, right: 20 };

  if (!data || data.length === 0) {
    return <div className="text-center text-ui-text-subtle flex items-center justify-center" style={{ height: `${height}px` }}>No trend data available.</div>;
  }

  const highs = data.map(d => d.high);
  const lows = data.map(d => d.low);
  const maxValue = Math.max(...highs);
  const minValue = Math.min(...lows);
  const valueRange = maxValue - minValue || 1;

  const chartContentWidth = chartWidth - padding.left - padding.right;
  const chartContentHeight = height - padding.top - padding.bottom;
  const candleWidth = Math.max(1, (chartContentWidth / data.length) * 0.7);

  const getX = (index: number) => padding.left + (chartContentWidth / data.length) * (index + 0.5);
  const getY = (value: number) => padding.top + chartContentHeight * (1 - (value - minValue) / valueRange);

  // Y-Axis Labels
  const yAxisLabels = [];
  const numLabels = 5;
  for (let i = 0; i <= numLabels; i++) {
    const value = minValue + (valueRange / numLabels) * i;
    yAxisLabels.push({
      value: value.toFixed(4),
      y: getY(value),
    });
  }
  
  // X-Axis Labels
  const xAxisLabels = [];
  const numXLabels = Math.min(data.length, 6);
  if (data.length > 1) {
    const step = Math.floor((data.length -1) / (numXLabels -1)) || 1;
    for (let i = 0; i < data.length; i += step) {
       if(i < data.length) {
         xAxisLabels.push({
             value: new Date(data[i].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
             x: getX(i)
         });
       }
    }
  } else if (data.length === 1) {
     xAxisLabels.push({ value: new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), x: getX(0) });
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartWidth} ${height}`} className="w-full min-w-[600px] h-auto font-sans">
        {/* Y-Axis Grid Lines & Labels */}
        {yAxisLabels.map((label, i) => (
          <g key={i}>
            <line x1={padding.left} y1={label.y} x2={chartWidth - padding.right} y2={label.y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={padding.left - 10} y={label.y + 4} textAnchor="end" fill="rgba(255,255,255,0.6)" className="text-xs">
              {label.value}
            </text>
          </g>
        ))}
        
        {/* X-Axis Labels */}
        {xAxisLabels.map((label, i) => (
             <text key={i} x={label.x} y={height - padding.bottom + 15} textAnchor="middle" fill="rgba(255,255,255,0.6)" className="text-xs">
                 {label.value}
             </text>
        ))}

        {/* Candlesticks */}
        {data.map((d, i) => {
          const isUp = d.close >= d.open;
          const color = isUp ? 'var(--color-success)' : 'var(--color-danger)';
          
          const x = getX(i);
          const yHigh = getY(d.high);
          const yLow = getY(d.low);
          const yOpen = getY(d.open);
          const yClose = getY(d.close);
          
          return (
            <g key={i} className="candlestick" style={{ cursor: 'pointer' }}>
              {/* Wick */}
              <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.5" />
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={Math.min(yOpen, yClose)}
                width={candleWidth}
                height={Math.max(1, Math.abs(yOpen - yClose))}
                fill={color}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AreaChart;