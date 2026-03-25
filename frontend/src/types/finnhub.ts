export interface FinnhubQuote {
  c: number   // current price
  d: number   // change
  dp: number  // percent change
  h: number   // high
  l: number   // low
  o: number   // open
  pc: number  // previous close
  t: number   // timestamp
}

export interface FinnhubCandle {
  c: number[]   // close prices
  h: number[]   // high prices
  l: number[]   // low prices
  o: number[]   // open prices
  s: string     // status ("ok" | "no_data")
  t: number[]   // timestamps (unix seconds)
  v: number[]   // volumes
}

export interface FinnhubSearchResult {
  count: number
  result: FinnhubSearchItem[]
}

export interface FinnhubSearchItem {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

export interface FinnhubProfile {
  country: string
  currency: string
  exchange: string
  ipo: string
  marketCapitalization: number
  name: string
  phone: string
  shareOutstanding: number
  ticker: string
  weburl: string
  logo: string
  finnhubIndustry: string
}

export interface FinnhubMetrics {
  metric: {
    '52WeekHigh': number
    '52WeekLow': number
    '52WeekHighDate': string
    '52WeekLowDate': string
    '10DayAverageTradingVolume': number
    '3MonthAverageTradingVolume': number
    annualDividendYield: number
    beta: number
    bookValuePerShareAnnual: number
    pbAnnual: number
    currentRatioAnnual: number
    epsBasicExclExtraItemsAnnual: number
    epsGrowth3Y: number
    epsGrowth5Y: number
    marketCapitalization: number
    peBasicExclExtraTTM: number
    peExclExtraAnnual: number
    priceRelativeToS5004W: number
    priceRelativeToS5P13W: number
    priceRelativeToS5P26W: number
    revenueGrowth3Y: number
    revenueGrowth5Y: number
    roaRfy: number
    roeRfy: number
    totalDebt: number
    totalDebtToEquityAnnual: number
    dividendPerShareAnnual: number
    [key: string]: number | string | undefined
  }
  metricType: string
  symbol: string
}

export interface FinnhubNews {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

export interface FinnhubDividend {
  amount: number
  date: string  // "YYYY-MM-DD"
}

export interface FinnhubEarnings {
  actual: number | null
  estimate: number | null
  period: string
  quarter: number
  surprise: number | null
  surprisePercent: number | null
  symbol: string
  year: number
}
