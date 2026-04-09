import { Info } from 'lucide-react'
import { AI_INTERPRETATIONS, AI_INTERPRETATION_FALLBACK } from '../../data/aiInterpretations'

const signalStyle = {
  bullish:  { label: 'Bullish',  color: 'text-positive', dot: 'bg-positive' },
  neutral:  { label: 'Neutral',  color: 'text-text-2',   dot: 'bg-text-3'  },
  cautious: { label: 'Cautious', color: 'text-warning',  dot: 'bg-warning' },
}

export default function AIInterpretation({ ticker }: { ticker: string }) {
  const data = AI_INTERPRETATIONS[ticker] ?? AI_INTERPRETATION_FALLBACK
  const { label, color, dot } = signalStyle[data.signal]

  return (
    <div className="border border-border rounded-xl p-4 bg-surface-1 mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent flex-shrink-0">
            <path d="M12 2C12 2 13.5 7.5 18 9C13.5 10.5 12 16 12 16C12 16 10.5 10.5 6 9C10.5 7.5 12 2 12 2Z" fill="currentColor"/>
            <path d="M19 2C19 2 19.75 4.75 22 5.5C19.75 6.25 19 9 19 9C19 9 18.25 6.25 16 5.5C18.25 4.75 19 2 19 2Z" fill="currentColor" opacity="0.7"/>
          </svg>
          <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Insights+</span>
          <span className="text-[10px] font-medium text-text-2 uppercase tracking-wider">AI-powered Metric Interpretation</span>
          <div className="relative group/tip flex items-center">
            <Info className="w-3 h-3 text-white/40 hover:text-accent cursor-help flex-shrink-0" />
            <div className="absolute bottom-full left-0 mb-2 w-80 bg-surface-0 border border-border rounded-xl p-3.5 hidden group-hover/tip:block z-50 shadow-2xl pointer-events-none">
              <p className="text-[11px] text-white/80 leading-relaxed">This interpretation is generated based on publicly available fundamental data and is for informational purposes only. It does not constitute financial advice. Always do your own research before making investment decisions.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
          <span className={`text-xs font-semibold ${color}`}>{label}</span>
        </div>
      </div>

      <p className="text-sm text-text-1 leading-relaxed mb-3">{data.verdict}</p>

      <ul className="space-y-1.5 mb-3">
        {data.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-text-2 leading-relaxed">
            <span className="text-accent mt-0.5 flex-shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-3">
        <p className="text-xs text-text-2 leading-relaxed">
          <span className="text-text-1 font-medium">Bottom line: </span>{data.bottomLine}
        </p>
      </div>
    </div>
  )
}
