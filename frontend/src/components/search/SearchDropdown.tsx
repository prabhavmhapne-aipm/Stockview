import type { FinnhubSearchItem } from '../../types/finnhub'
import Spinner from '../ui/Spinner'

interface SearchDropdownProps {
  results: FinnhubSearchItem[]
  loading: boolean
  selectedIndex: number
  onSelect: (symbol: string) => void
  onHover: (index: number) => void
}

export default function SearchDropdown({ results, loading, selectedIndex, onSelect, onHover }: SearchDropdownProps) {
  return (
    <div className="absolute top-full mt-1.5 w-full bg-surface-1 border border-border rounded-[14px] shadow-float z-50 overflow-hidden animate-slide-down">
      {loading && results.length === 0 ? (
        <div className="flex items-center justify-center py-7">
          <Spinner size="sm" />
        </div>
      ) : results.length === 0 ? (
        <div className="py-7 text-center text-text-3 text-sm">No results found</div>
      ) : (
        <ul className="py-1.5">
          {results.map((item, i) => (
            <li
              key={item.symbol}
              onMouseEnter={() => onHover(i)}
              onMouseDown={(e) => { e.preventDefault(); onSelect(item.symbol) }}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                i === selectedIndex ? 'bg-surface-2' : 'hover:bg-surface-2'
              }`}
            >
              {/* Ticker pill */}
              <div className="w-10 flex-shrink-0">
                <span className="text-xs font-bold text-accent font-mono">{item.displaySymbol}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-1 truncate">{item.description}</p>
              </div>
              <span className="tag tag-default flex-shrink-0">{item.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
