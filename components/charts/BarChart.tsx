import React from 'react';

interface BarData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarData[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value), 0);

  return (
    <div className="bg-ui-surface p-6 rounded-xl border border-ui-border flex-1">
      <h3 className="text-lg font-semibold text-ui-text-heading mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map(item => (
          <div key={item.label} className="flex items-center gap-3 group">
            <div className="w-28 text-sm text-ui-text-body truncate text-right">{item.label}</div>
            <div className="flex-1 bg-ui-border/50 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-secondary to-primary h-4 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="w-16 text-sm font-semibold text-ui-text-heading text-left">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;