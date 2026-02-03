'use client';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Events', value: '24', change: '+12%' },
    { label: 'Total Revenue', value: '₹84.2L', change: '+28%' },
    { label: 'Avg. Group Size', value: '186', change: '+5%' },
    { label: 'Booking Success Rate', value: '94%', change: '+3%' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Performance insights and operational metrics
        </p>
      </div>

      <div className="px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="card p-6">
              <p className="text-sm text-neutral-600 mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-neutral-900">{metric.value}</p>
                <span className="text-sm font-semibold text-success">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Booking Trends</h2>
            <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
              <p className="text-neutral-500">Chart visualization coming soon</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Revenue by Event Type</h2>
            <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
              <p className="text-neutral-500">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
