import { Router } from 'express'
import finnhub from '../lib/finnhubClient'
import yahoo, { getYahooCrumb } from '../lib/yahooFinance'

const router = Router()

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

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol

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

  // Normalise Yahoo values to the same units as Finnhub
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
  })
})

export default router
