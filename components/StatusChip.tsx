interface StatusChipProps {
  status: 'success' | 'warning' | 'error' | 'processing' | 'active' | 'upcoming' | 'completed';
  label?: string;
}

export default function StatusChip({ status, label }: StatusChipProps) {
  const statusConfig = {
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
      icon: '✓',
      defaultLabel: 'Success',
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
      icon: '⚠',
      defaultLabel: 'Warning',
    },
    error: {
      bg: 'bg-error/10',
      text: 'text-error',
      border: 'border-error/20',
      icon: '✕',
      defaultLabel: 'Error',
    },
    processing: {
      bg: 'bg-processing/10',
      text: 'text-processing',
      border: 'border-processing/20',
      icon: '⟳',
      defaultLabel: 'Processing',
    },
    active: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
      icon: '●',
      defaultLabel: 'Active',
    },
    upcoming: {
      bg: 'bg-processing/10',
      text: 'text-processing',
      border: 'border-processing/20',
      icon: '○',
      defaultLabel: 'Upcoming',
    },
    completed: {
      bg: 'bg-neutral-200',
      text: 'text-neutral-600',
      border: 'border-neutral-300',
      icon: '✓',
      defaultLabel: 'Completed',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      <span>{config.icon}</span>
      <span>{label || config.defaultLabel}</span>
    </span>
  );
}
