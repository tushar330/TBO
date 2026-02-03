'use client';

export default function PostBookingIntelligencePage() {
  const modules = [
    {
      id: 1,
      title: 'Intelligent Policy Arbitrage',
      description: 'Auto-swap guests between refundable and non-refundable rooms to avoid penalties',
      metrics: [
        { label: 'Swaps Executed', value: '24' },
        { label: 'Penalties Avoided', value: '₹1.8L' },
        { label: 'Success Rate', value: '96%' },
      ],
    },
    {
      id: 2,
      title: 'Variable Cost Recovery',
      description: 'Downgrade rate plans during cancellations to recover meal and add-on costs',
      metrics: [
        { label: 'Downgrades', value: '18' },
        { label: 'Cost Recovered', value: '₹2.4L' },
        { label: 'Recovery Rate', value: '87%' },
      ],
    },
    {
      id: 3,
      title: 'Asset Conversion Workflow',
      description: 'Transform lost room revenue into banquet credit instead of zero refunds',
      metrics: [
        { label: 'Conversions', value: '12' },
        { label: 'Value Retained', value: '₹3.2L' },
        { label: 'Conversion Rate', value: '92%' },
      ],
    },
    {
      id: 4,
      title: 'Automated Shadow Folio',
      description: 'Live audit bill that flags unauthorized hotel charges before checkout',
      metrics: [
        { label: 'Charges Flagged', value: '7' },
        { label: 'Amount Disputed', value: '₹45K' },
        { label: 'Resolution Rate', value: '100%' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-premium px-8 py-8 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white">Algorithmic Loss Mitigation</h1>
        <p className="text-white/75 mt-2">
          AI-powered financial intelligence for zero-loss event management
        </p>
      </div>

      {/* Modules */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 hover:border-corporate-blue-100 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-corporate-blue-100/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-corporate-blue-100 text-2xl">
                    {module.id === 1 && '🔄'}
                    {module.id === 2 && '💰'}
                    {module.id === 3 && '🔄'}
                    {module.id === 4 && '📋'}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{module.title}</h2>
                  <p className="text-sm text-neutral-400">{module.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-700">
                {module.metrics.map((metric, index) => (
                  <div key={index}>
                    <p className="text-xs text-neutral-500 mb-1">{metric.label}</p>
                    <p className="text-lg font-bold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Insights Panel */}
        <div className="mt-8 bg-neutral-800 border border-neutral-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Financial Impact Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-neutral-400 mb-2">Total Savings</p>
              <p className="text-3xl font-bold text-success">₹7.4L</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-400 mb-2">Revenue Protected</p>
              <p className="text-3xl font-bold text-corporate-blue-100">₹12.8L</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-400 mb-2">Disputes Resolved</p>
              <p className="text-3xl font-bold text-warning">61</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-400 mb-2">Efficiency Gain</p>
              <p className="text-3xl font-bold text-white">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
