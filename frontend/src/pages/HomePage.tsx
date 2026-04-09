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
    sublabel: 'Finance & defense',
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
        <p className="text-xs font-medium text-accent uppercase tracking-wider mb-5">Insights+</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-1 leading-[1.1] tracking-tight mb-5">
          All your Stock Intelligence<br />
          at one place.
        </h1>
        <ul className="text-text-1 text-base leading-relaxed space-y-1.5 list-none whitespace-nowrap">
          <li>Know how many Scalable users are currently buying, selling, and holding</li>
          <li>AI-powered news sentiment: bullish, bearish, or mixed</li>
          <li>AI interpretation of every metric based on sector, competitors, past earnings and expected growth rate</li>
        </ul>
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

    </PageShell>
  )
}
