import { useNavigate } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const STOCK_GROUPS = [
  {
    label: 'US Big Tech',
    sublabel: 'Mega-cap technology',
    stocks: [
      { symbol: 'META',  name: 'Meta Platforms' },
      { symbol: 'AAPL',  name: 'Apple' },
      { symbol: 'AMZN',  name: 'Amazon' },
      { symbol: 'NFLX',  name: 'Netflix' },
      { symbol: 'GOOGL', name: 'Alphabet' },
      { symbol: 'NVDA',  name: 'NVIDIA' },
    ],
  },
  {
    label: 'US Growth',
    sublabel: 'Finance, defense & emerging tech',
    stocks: [
      { symbol: 'TSLA', name: 'Tesla' },
      { symbol: 'PLTR', name: 'Palantir' },
      { symbol: 'JPM',  name: 'JP Morgan' },
      { symbol: 'AVGO', name: 'Broadcom' },
      { symbol: 'DHR',  name: 'Danaher' },
      { symbol: 'NOC',  name: 'Northrop Grumman' },
    ],
  },
  {
    label: 'Europe',
    sublabel: 'DAX, AEX & Euronext blue chips',
    stocks: [
      { symbol: 'SAP',    name: 'SAP' },
      { symbol: 'SIE.DE', name: 'Siemens' },
      { symbol: 'ALV.DE', name: 'Allianz' },
      { symbol: 'DTE.DE', name: 'Deutsche Telekom' },
      { symbol: 'BMW.DE', name: 'BMW' },
      { symbol: 'ASML',   name: 'ASML' },
      { symbol: 'AIR.PA', name: 'Airbus' },
      { symbol: 'RHM.DE', name: 'Rheinmetall' },
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

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {group.stocks.map(({ symbol, name }) => (
                <button
                  key={symbol}
                  onClick={() => navigate(`/${symbol}`)}
                  className="card p-3 text-left hover:bg-surface-2 hover:border-accent/20 transition-all duration-150"
                >
                  <p className="text-xs font-medium text-white leading-snug mb-1">{name}</p>
                  <p className="text-[10px] font-mono text-white/50">{symbol}</p>
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
            ['Live quotes',       'price updates every 15 seconds'],
            ['News sentiment',    'bullish / bearish signal from latest headlines'],
            ['Key metrics',       'P/E, P/B, EPS, beta, dividend yield and more'],
            ['Earnings history',  'actual vs estimate, quarter by quarter'],
            ['Dividend history',  'annual payout trend by year'],
            ['USD / EUR',         'switch currencies across all prices'],
            ['Live finance TV',   'Bloomberg, CNBC, Euronews and more'],
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
