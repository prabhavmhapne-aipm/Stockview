interface MetricCardProps {
  label: string
  value: string
  interpretation: string
  trend?: 'up' | 'down' | 'neutral' | 'warning'
  sub?: string
  tooltip?: string
}

const styles = {
  up:      { value: 'text-positive', border: 'border-l-positive/50' },
  down:    { value: 'text-negative', border: 'border-l-negative/50' },
  warning: { value: 'text-warning',  border: 'border-l-warning/50'  },
  neutral: { value: 'text-text-1',   border: 'border-l-border'      },
}

export default function MetricCard({ label, value, interpretation, trend = 'neutral', sub, tooltip }: MetricCardProps) {
  const s = styles[trend]

  return (
    <div className={`bg-surface-2 rounded-xl pl-3.5 pr-4 py-4 border-l-2 ${s.border} flex flex-col gap-1.5`}>
      <div className="flex items-center gap-1.5">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider leading-none">{label}</p>
        {tooltip && (
          <div className="relative group/tip">
            <span className="text-[10px] text-white/50 hover:text-accent cursor-help leading-none select-none">ⓘ</span>
            <div className="absolute bottom-full left-0 mb-2 w-80 bg-[#0d1117] border border-border rounded-xl p-3.5 hidden group-hover/tip:block z-50 shadow-2xl pointer-events-none">
              <p className="text-[11px] text-white/80 leading-relaxed whitespace-pre-line">{tooltip}</p>
            </div>
          </div>
        )}
      </div>
      <p className={`text-xl font-semibold font-mono tabular-nums leading-none ${s.value}`}>{value}</p>
      {sub && <p className="text-[10px] text-white/50 -mt-0.5">{sub}</p>}
      <p className="text-[11px] text-white/70 leading-snug">{interpretation}</p>
    </div>
  )
}
