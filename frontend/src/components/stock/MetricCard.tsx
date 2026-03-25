interface MetricCardProps {
  label: string
  value: string
  interpretation: string
  trend?: 'up' | 'down' | 'neutral' | 'warning'
  sub?: string
}

const styles = {
  up:      { value: 'text-positive', border: 'border-l-positive/50' },
  down:    { value: 'text-negative', border: 'border-l-negative/50' },
  warning: { value: 'text-warning',  border: 'border-l-warning/50'  },
  neutral: { value: 'text-text-1',   border: 'border-l-border'      },
}

export default function MetricCard({ label, value, interpretation, trend = 'neutral', sub }: MetricCardProps) {
  const s = styles[trend]

  return (
    <div className={`bg-surface-2 rounded-xl pl-3.5 pr-4 py-4 border-l-2 ${s.border} flex flex-col gap-1.5`}>
      <p className="text-[10px] font-medium text-text-3 uppercase tracking-wider leading-none">{label}</p>
      <p className={`text-xl font-semibold font-mono tabular-nums leading-none ${s.value}`}>{value}</p>
      {sub && <p className="text-[10px] text-text-3 -mt-0.5">{sub}</p>}
      <p className="text-[11px] text-text-2 leading-snug">{interpretation}</p>
    </div>
  )
}
