import React from 'react';

type ChartProps = {
  type: 'bar' | 'line' | 'pie';
  data: { label: string; value: number }[];
};

export default function Chart({ type, data }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-600 mb-4">{type.toUpperCase()} CHART</div>
      {type === 'bar' && (
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-24 text-sm text-gray-700">{item.label}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {type === 'line' && (
        <div className="text-gray-500 text-sm">Line chart (mock visualization)</div>
      )}
      {type === 'pie' && (
        <div className="text-gray-500 text-sm">Pie chart (mock visualization)</div>
      )}
    </div>
  );
}