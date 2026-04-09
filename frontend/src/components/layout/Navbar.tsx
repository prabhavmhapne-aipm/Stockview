import { Link } from 'react-router-dom'
import SearchBar from '../search/SearchBar'
import { useTickerStore } from '../../store/tickerStore'

export default function Navbar() {
  const { currency, setCurrency } = useTickerStore()

  return (
    <nav className="sticky top-0 z-40 bg-surface-0/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center gap-6">
        {/* Brand */}
        <Link to="/" className="flex-shrink-0">
          <img src="/scalable-logo.png" alt="Scalable Capital" className="w-8 h-8" />
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
