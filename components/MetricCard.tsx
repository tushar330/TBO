import { MetricData } from '@/lib/types';

interface MetricCardProps {
  data: MetricData;
}

export default function MetricCard({ data }: MetricCardProps) {
  const trendColor = data.trend === 'up' ? 'text-success' : data.trend === 'down' ? 'text-error' : 'text-neutral-500';
  const trendIcon = data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→';

  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-600 font-medium mb-1">{data.label}</p>
          <p className="text-3xl font-bold text-neutral-900">{data.value}</p>
        </div>
        {data.change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{Math.abs(data.change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
