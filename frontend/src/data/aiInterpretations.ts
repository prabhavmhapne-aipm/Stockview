export interface AIInterpretation {
  verdict: string
  bullets: [string, string]
  bottomLine: string
  signal: 'bullish' | 'neutral' | 'cautious'
}

export const AI_INTERPRETATIONS: Record<string, AIInterpretation> = {
  META: {
    verdict: 'Meta is a highly profitable advertising giant experiencing a strong AI-driven resurgence.',
    bullets: [
      'P/E of 25.2x is reasonable given 23.8% revenue growth and a 30% profit margin — strong value for a mega-cap.',
      'ROE of 27.8% shows Meta is generating excellent returns on shareholder capital with disciplined reinvestment.',
    ],
    bottomLine: 'Solid fundamentals with growing AI monetisation — attractive for growth-oriented investors.',
    signal: 'bullish',
  },
  AAPL: {
    verdict: 'Apple is a cash-generating machine with exceptional brand loyalty, trading at a premium valuation.',
    bullets: [
      'P/E of 32.2x reflects the services flywheel and brand premium, though hardware growth has slowed to 15.7%.',
      'A 27% profit margin and ROE of 151.9% reflect best-in-class capital efficiency powered by buybacks.',
    ],
    bottomLine: 'Strong fundamentals, but priced for perfection — best suited for long-term holders.',
    signal: 'neutral',
  },
  AMZN: {
    verdict: 'Amazon is transitioning from a retail giant into a high-margin cloud and advertising powerhouse.',
    bullets: [
      'P/E of 30.5x is backed by 13.6% revenue growth and an expanding 10.8% profit margin driven by AWS.',
      'ROE of 18.9% is rising as AWS and advertising scale, shifting profit mix away from low-margin retail.',
    ],
    bottomLine: 'High valuation justified by AWS dominance and a compelling margin expansion story.',
    signal: 'bullish',
  },
  NFLX: {
    verdict: 'Netflix has evolved into a disciplined, profitable business with growing pricing power.',
    bullets: [
      'P/E of 38.1x is supported by 17.6% revenue growth and a strong 24.3% profit margin — well above peers.',
      'ROE of 41.3% reflects highly efficient use of capital as the business shifts to a high-margin flywheel.',
    ],
    bottomLine: 'Strong operational turnaround — premium valuation requires sustained execution.',
    signal: 'neutral',
  },
  GOOGL: {
    verdict: 'Alphabet is attractively valued for a dominant AI, search, and cloud platform.',
    bullets: [
      'P/E of 29x is modest for a company with 32.8% profit margin, 18% revenue growth, and $94.5B net income.',
      'ROE of 31.8% underlines strong capital efficiency across Search, YouTube, and Google Cloud.',
    ],
    bottomLine: 'One of the most attractively priced mega-cap tech stocks — strong fundamentals at fair value.',
    signal: 'bullish',
  },
  NVDA: {
    verdict: 'NVIDIA is the defining company of the AI hardware era, delivering extraordinary profitability.',
    bullets: [
      '55.6% profit margin and 73.2% revenue growth are historically rare at this scale — driven by AI chip dominance.',
      'P/E of 37x looks reasonable relative to growth, though sustaining 70%+ revenue growth is the central risk.',
    ],
    bottomLine: 'Transformational company at a high valuation — growth must remain exceptional to justify the price.',
    signal: 'bullish',
  },
  TSLA: {
    verdict: "Tesla's valuation reflects future potential in autonomy and robotics — far beyond today's car sales.",
    bullets: [
      'P/E of 339x is pricing in autonomous driving, energy storage, and robotics — revenue declined 3.1% last year.',
      'Profit margin of 4% and ROE of 4.6% reflect significant margin pressure from price cuts and EV competition.',
    ],
    bottomLine: 'High-conviction bet on future technology — not a conventional automotive investment.',
    signal: 'cautious',
  },
  PLTR: {
    verdict: 'Palantir is a fast-growing AI software company with a stretched but momentum-driven valuation.',
    bullets: [
      'Revenue growing 70% year-on-year with a 36.3% profit margin — rare combination of hypergrowth and profitability.',
      'P/E of 207x demands sustained hyper-growth — any slowdown could lead to a sharp valuation reset.',
    ],
    bottomLine: 'High risk, high reward — for investors with conviction in AI-driven enterprise and government software.',
    signal: 'cautious',
  },
  JPM: {
    verdict: "JPMorgan is the world's most profitable bank, trading at a very reasonable valuation.",
    bullets: [
      'P/E of 14.5x is attractive for a bank delivering 15.7% ROE with a 33.9% profit margin — best in class.',
      'Revenue growth of 2.5% is modest but expected for a bank — stability and capital return are the key appeal.',
    ],
    bottomLine: 'Solid defensive holding — best-in-class bank with reliable earnings and dividend growth.',
    signal: 'bullish',
  },
  AVGO: {
    verdict: 'Broadcom is a semiconductor and software giant riding the AI infrastructure wave.',
    bullets: [
      '29.5% revenue growth and 36.6% profit margin reflect strong AI chip demand from hyperscalers.',
      'P/E of 66.6x is elevated — justified if AI infrastructure spending continues at its current pace.',
    ],
    bottomLine: 'Strong AI tailwind with improving margins — a diversified semiconductor play.',
    signal: 'bullish',
  },
  DHR: {
    verdict: 'Danaher is a high-quality life sciences conglomerate in a post-pandemic normalisation phase.',
    bullets: [
      'P/E of 38.4x is a premium for a company with 4.6% revenue growth and 14.7% profit margin — quality costs extra.',
      'ROE of 6.9% is below historical norms as pandemic-era testing demand fades — recovery expected over 2–3 years.',
    ],
    bottomLine: 'Quality compounder for patient investors — near-term headwinds masking long-term strength.',
    signal: 'neutral',
  },
  NOC: {
    verdict: 'Northrop Grumman is a stable defense contractor benefiting from rising global defense budgets.',
    bullets: [
      'P/E of 23.4x and 9.6% revenue growth reflect solid execution backed by government contract backlogs.',
      'ROE of 25.1% is impressive for a defense company — strong capital returns despite a capital-intensive model.',
    ],
    bottomLine: 'Defensive holding with geopolitical tailwinds — lower growth but highly reliable cash flows.',
    signal: 'neutral',
  },
  SAP: {
    verdict: "SAP is Europe's leading enterprise software company undergoing a high-value cloud transition.",
    bullets: [
      'P/E of 23.1x and 19.5% profit margin are solid for enterprise software — cloud transition is expanding margins.',
      'ROE of 16.4% is improving as cloud revenue mix increases and one-time restructuring costs fade.',
    ],
    bottomLine: 'Quality European tech — the cloud transition creates a compelling long-term growth story.',
    signal: 'bullish',
  },
  'SIE.DE': {
    verdict: 'Siemens is a diversified industrial giant with strong automation and digital infrastructure exposure.',
    bullets: [
      'P/E of 22.7x and 10% profit margin are fair for a diversified industrial with 4.3% revenue growth.',
      'ROE of 12.8% reflects steady but unspectacular capital efficiency — typical for capital-intensive industrials.',
    ],
    bottomLine: 'Solid European industrial holding — automation and digitalisation are long-term structural tailwinds.',
    signal: 'bullish',
  },
  'ALV.DE': {
    verdict: "Allianz is one of Europe's largest and most reliable insurers, offering strong dividends.",
    bullets: [
      'P/E of 13.6x is attractive for a company with 17.5% ROE — revenue declined 5.6% but earnings remain resilient.',
      '9.5% profit margin is typical for a large insurer — capital returns via dividends and buybacks are the main draw.',
    ],
    bottomLine: 'Dependable income stock — ideal for dividend-focused investors seeking European exposure.',
    signal: 'bullish',
  },
  'DTE.DE': {
    verdict: 'Deutsche Telekom is a stable telecom giant anchored by T-Mobile US as its core growth engine.',
    bullets: [
      'P/E of 15.8x and 7.9% profit margin reflect stable but slow-growing telecom fundamentals — 2.5% revenue growth.',
      'ROE of 15.6% is solid for a telecom and is driven primarily by T-Mobile US market share gains in 5G.',
    ],
    bottomLine: 'Solid telecom with a hidden growth gem in T-Mobile — reasonable valuation for long-term holders.',
    signal: 'neutral',
  },
  'BMW.DE': {
    verdict: 'BMW trades at a depressed valuation reflecting EV transition uncertainty and China demand softness.',
    bullets: [
      'P/E of 6.9x is very cheap — revenue declined 8.1% and profit margin of 5.5% reflects significant cost pressure.',
      'ROE of 7.7% is well below BMW\'s historical average — signalling that EV transition costs are weighing heavily.',
    ],
    bottomLine: 'Deep value opportunity — requires confidence in BMW\'s EV strategy and a China demand recovery.',
    signal: 'cautious',
  },
  ASML: {
    verdict: 'ASML is a critical monopoly in semiconductor lithography — irreplaceable in global chip manufacturing.',
    bullets: [
      'P/E of 44.3x and 29.4% profit margin reflect the pricing power of being the sole EUV supplier in the world.',
      'ROE of 49% is exceptional — ASML generates extraordinary returns with minimal competition risk.',
    ],
    bottomLine: 'Premium quality business with a structural moat — indispensable to the global semiconductor industry.',
    signal: 'bullish',
  },
  'AIR.PA': {
    verdict: "Airbus is the world's largest commercial aircraft maker with a decade-long order backlog.",
    bullets: [
      'P/E of 25.9x and 5.1% revenue growth are backed by a record 8,000+ aircraft order book stretching into the 2030s.',
      'ROE of 21.6% and 7.1% profit margin are solid for aerospace — supply chain bottlenecks are the key near-term drag.',
    ],
    bottomLine: 'Strong long-term position — execution on the production ramp is the key watch item.',
    signal: 'neutral',
  },
  'RHM.DE': {
    verdict: "Rheinmetall is Europe's fastest-growing defense company riding a structural rearmament wave.",
    bullets: [
      'P/E of 68.8x reflects extremely high growth expectations — order book has tripled as European rearmament accelerates.',
      'ROE of 23.3% and 7% profit margin are expanding rapidly as ammunition and vehicle production scales up.',
    ],
    bottomLine: 'High-conviction European defense play — strong structural tailwind with clear execution momentum.',
    signal: 'bullish',
  },
}

export const AI_INTERPRETATION_FALLBACK: AIInterpretation = {
  verdict: 'A detailed AI interpretation is not yet available for this stock.',
  bullets: [
    'Review the key metrics below for a data-driven picture of financial health.',
    'Compare P/E, ROE, and profit margin against sector peers for context.',
  ],
  bottomLine: 'Use the metrics and news sentiment above to form your own view.',
  signal: 'neutral',
}
