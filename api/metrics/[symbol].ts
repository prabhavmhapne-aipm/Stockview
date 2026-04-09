import type { VercelRequest, VercelResponse } from '@vercel/node'
import finnhub from '../_lib/finnhubClient'
import yahoo, { getYahooCrumb } from '../_lib/yahooFinance'

function raw(val: any): number | null {
  if (val == null) return null
  if (typeof val === 'object' && 'raw' in val) return typeof val.raw === 'number' ? val.raw : null
  if (typeof val === 'number' && isFinite(val)) return val
  return null
}

function coalesce(...vals: (number | null | undefined)[]): number | null {
  for (const v of vals) {
    if (v !== null && v !== undefined && isFinite(v)) return v
  }
  return null
}

const NET_INCOME_FALLBACK: Record<string, number> = {
  META:   62400000000,
  AAPL:   93700000000,
  AMZN:   59200000000,
  NFLX:    8700000000,
  GOOGL:  94500000000,
  NVDA:   72900000000,
  TSLA:    7900000000,
  PLTR:     462000000,
  JPM:    54300000000,
  AVGO:    5900000000,
  DHR:     3000000000,
  NOC:     3000000000,
  SAP:     3800000000,
  'SIE.DE': 9800000000,
  'ALV.DE': 16100000000,
  'DTE.DE':  8400000000,
  'BMW.DE':  2700000000,
  ASML:    8500000000,
  'AIR.PA':  4900000000,
  'RHM.DE':  1300000000,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const symbol = req.query.symbol as string

  const crumbPromise = getYahooCrumb().catch(() => null)

  const [fRes, crumb] = await Promise.all([
    finnhub.get('/stock/metric', { params: { symbol, metric: 'all' } }).catch(() => null),
    crumbPromise,
  ])

  const fm = (fRes as any)?.data?.metric ?? {}

  let ks: any = {}, fd: any = {}, sd: any = {}
  if (crumb) {
    try {
      const { data } = await yahoo.get(`/v10/finance/quoteSummary/${symbol}`, {
        params: { modules: 'defaultKeyStatistics,financialData,summaryDetail', crumb: crumb.crumb },
        headers: { Cookie: crumb.cookie },
      })
      const result = data?.quoteSummary?.result?.[0] ?? {}
      ks = result.defaultKeyStatistics ?? {}
      fd = result.financialData ?? {}
      sd = result.summaryDetail ?? {}
    } catch (e) {
      console.error('[metrics] Yahoo quoteSummary failed:', (e as any)?.message)
    }
  }

  const yDivYield  = raw(sd.trailingAnnualDividendYield) != null ? raw(sd.trailingAnnualDividendYield)! * 100
                   : raw(sd.dividendYield) != null ? raw(sd.dividendYield)! * 100 : null
  const yRoe       = raw(fd.returnOnEquity)  != null ? raw(fd.returnOnEquity)!  * 100 : null
  const yDebt      = raw(fd.debtToEquity)    != null ? raw(fd.debtToEquity)!    / 100 : null
  const yEpsGrowth = raw(fd.earningsGrowth)  != null ? raw(fd.earningsGrowth)!  * 100 : null
  const yRevGrowth = raw(fd.revenueGrowth)   != null ? raw(fd.revenueGrowth)!   * 100 : null

  res.json({
    pe:             coalesce(fm.peBasicExclExtraTTM, fm.peExclExtraAnnual, raw(sd.trailingPE)),
    pb:             coalesce(fm.pbAnnual,            raw(ks.priceToBook)),
    eps:            coalesce(fm.epsBasicExclExtraItemsAnnual, raw(ks.trailingEps)),
    weekHigh52:     coalesce(fm['52WeekHigh'],        raw(sd.fiftyTwoWeekHigh)),
    weekLow52:      coalesce(fm['52WeekLow'],         raw(sd.fiftyTwoWeekLow)),
    weekHighDate52: fm['52WeekHighDate'] ?? null,
    weekLowDate52:  fm['52WeekLowDate']  ?? null,
    dividendYield:  coalesce(fm.annualDividendYield,  yDivYield),
    beta:           coalesce(fm.beta, raw(sd.beta), raw(ks.beta)),
    roe:            coalesce(fm.roeRfy, yRoe),
    debtToEquity:   coalesce(fm.totalDebtToEquityAnnual, yDebt),
    epsGrowth:      coalesce(fm.epsGrowth3Y,          yEpsGrowth),
    revenueGrowth:  coalesce(fm.revenueGrowth3Y,      yRevGrowth),
    revenue:        raw(fd.totalRevenue),
    netIncome:      raw(fd.netIncomeToCommon) ?? NET_INCOME_FALLBACK[symbol] ?? null,
    revenueGrowthYoY: raw(fd.revenueGrowth) != null ? raw(fd.revenueGrowth)! * 100 : null,
    profitMargin:   raw(fd.profitMargins)   != null ? raw(fd.profitMargins)!  * 100 : null,
  })
}
