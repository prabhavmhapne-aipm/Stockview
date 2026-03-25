import { Link, useLocation } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import SearchBar from '../search/SearchBar'
import { useTickerStore } from '../../store/tickerStore'

export default function Navbar() {
  const { currency, setCurrency } = useTickerStore()
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-40 bg-surface-0/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center gap-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-surface-0" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-text-1 text-base tracking-tight hidden sm:block">
            stockview
          </span>
        </Link>

        {/* Live TV link */}
        <Link
          to="/live"
          className={`flex items-center gap-1.5 text-sm flex-shrink-0 transition-colors hidden sm:flex ${
            pathname === '/live' ? 'text-text-1' : 'text-text-3 hover:text-text-2'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-negative animate-live-dot" />
          Live TV
        </Link>

        {/* Search — centred */}
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        {/* Currency toggle */}
        <button
          onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}
          className="flex items-center flex-shrink-0 bg-surface-2 border border-border rounded-lg overflow-hidden"
          title="Switch currency"
        >
          {(['USD', 'EUR'] as const).map((c) => (
            <span
              key={c}
              className={`px-2.5 py-1.5 text-xs font-mono font-medium transition-colors ${
                currency === c
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-3 hover:text-text-2'
              }`}
            >
              {c}
            </span>
          ))}
        </button>
      </div>
    </nav>
  )
}
