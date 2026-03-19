import React from 'react';

interface DoughnutData {
  label: string;
  value: number;
  color: string;
}

interface DoughnutChartProps {
  data: DoughnutData[];
  title: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) {
      return (
          <div className="bg-ui-surface p-6 rounded-xl border border-ui-border flex-1 flex flex-col items-center justify-center h-full">
               <h3 className="text-lg font-semibold text-ui-text-heading mb-4 text-center">{title}</h3>
               <p className="text-ui-text-subtle">No data available.</p>
          </div>
      );
  }

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let accumulatedAngle = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent - Math.PI / 2) * radius;
    const y = Math.sin(2 * Math.PI * percent - Math.PI / 2) * radius;
    return [x, y];
  };

  return (
    <div className="bg-ui-surface p-6 rounded-xl border border-ui-border flex-1 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-ui-text-heading mb-4 text-center">{title}</h3>
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="relative">
          <svg width="200" height="200" viewBox="-100 -100 200 200">
            {data.map(item => {
              const percent = item.value / total;
              const dashOffset = circumference * (1 - percent);
              const rotation = accumulatedAngle * 360;
              accumulatedAngle += percent;

              return (
                 <circle
                    key={item.label}
                    cx="0"
                    cy="0"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    transform={`rotate(${rotation} 0 0)`}
                />
              );
            })}
             <circle cx="0" cy="0" r={radius-10} fill="var(--quantum-surface)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
              <span className="text-3xl font-bold text-ui-text-heading">{total > 999 ? (total/1000).toFixed(1)+'k' : total.toLocaleString()}</span>
              <span className="text-sm text-ui-text-subtle">Total</span>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <ul className="space-y-2">
            {data.map(item => (
              <li key={item.label} className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-ui-text-body truncate max-w-[100px]">{item.label}:</span>
                <span className="font-semibold text-ui-text-heading ml-auto pl-2">
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;