import { useNavigate } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const STOCK_GROUPS = [
  {
    label: 'FAANG',
    sublabel: 'US Big Tech',
    stocks: [
      { symbol: 'META',  name: 'Meta Platforms' },
      { symbol: 'AAPL',  name: 'Apple' },
      { symbol: 'AMZN',  name: 'Amazon' },
      { symbol: 'NFLX',  name: 'Netflix' },
      { symbol: 'GOOGL', name: 'Alphabet' },
    ],
  },
  {
    label: 'Oil Majors',
    sublabel: 'Global Energy',
    stocks: [
      { symbol: 'XOM',  name: 'ExxonMobil' },
      { symbol: 'CVX',  name: 'Chevron' },
      { symbol: 'SHEL', name: 'Shell' },
      { symbol: 'BP',   name: 'BP' },
      { symbol: 'TTE',  name: 'TotalEnergies' },
    ],
  },
  {
    label: 'German Top 5',
    sublabel: 'DAX Blue Chips',
    stocks: [
      { symbol: 'SAP',     name: 'SAP' },
      { symbol: 'SIE.DE',  name: 'Siemens' },
      { symbol: 'ALV.DE',  name: 'Allianz' },
      { symbol: 'DTE.DE',  name: 'Deutsche Telekom' },
      { symbol: 'BMW.DE',  name: 'BMW' },
    ],
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <PageShell>
      {/* Hero */}
      <div className="pt-16 pb-14">
        <p className="text-xs font-medium text-accent uppercase tracking-wider mb-5">Stock Intelligence</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-1 leading-[1.1] tracking-tight mb-5">
          Everything about a stock.<br />
          <span className="text-text-2 font-normal">In plain English.</span>
        </h1>
        <p className="text-text-2 text-base max-w-md leading-relaxed">
          Live prices, key metrics, news sentiment, and earnings history — curated for the stocks that matter.
        </p>
      </div>

      {/* Stock groups */}
      <div className="flex flex-col gap-10 mb-14">
        {STOCK_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="flex items-baseline gap-2.5 mb-4">
              <h2 className="text-sm font-semibold text-text-1">{group.label}</h2>
              <span className="text-xs text-text-3">{group.sublabel}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {group.stocks.map(({ symbol, name }) => (
                <button
                  key={symbol}
                  onClick={() => navigate(`/${symbol}`)}
                  className="card p-4 text-left hover:bg-surface-2 hover:border-accent/20 transition-all duration-150"
                >
                  <p className="text-sm font-medium text-text-1 leading-snug mb-1.5">{name}</p>
                  <p className="text-[11px] font-mono text-text-3">{symbol}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Capability strip */}
      <div className="border-t border-border pt-8 pb-14">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {[
            ['Live quotes',      'updated every 15 seconds'],
            ['News sentiment',   'bullish / bearish signals'],
            ['Key metrics',      'P/E, EPS, beta, ROE and more'],
            ['Earnings history', 'actual vs estimate by quarter'],
          ].map(([title, desc]) => (
            <span key={title} className="text-sm text-text-3">
              <span className="text-text-2 font-medium">{title}</span>
              {' — '}{desc}
            </span>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
