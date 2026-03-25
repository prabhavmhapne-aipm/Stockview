import { Router } from 'express'
import yahooClient from '../lib/yahooFinance'

const router = Router()

type Range = '1D' | '1W' | '1M' | '3M' | '1Y'

function getYFParams(range: Range) {
  switch (range) {
    case '1D': return { yfRange: '1d',  interval: '5m'  }
    case '1W': return { yfRange: '5d',  interval: '60m' }
    case '1M': return { yfRange: '1mo', interval: '1d'  }
    case '3M': return { yfRange: '3mo', interval: '1d'  }
    case '1Y': return { yfRange: '1y',  interval: '1wk' }
    default:   return { yfRange: '1mo', interval: '1d'  }
  }
}

router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params
  const range = (req.query.range as Range) ?? '1M'
  const { yfRange, interval } = getYFParams(range)

  try {
    const { data } = await yahooClient.get(`/v8/finance/chart/${encodeURIComponent(symbol)}`, {
      params: { range: yfRange, interval, includePrePost: false },
    })

    const result = data?.chart?.result?.[0]
    if (!result || data?.chart?.error) {
      return res.json({ s: 'no_data', t: [], o: [], h: [], l: [], c: [], v: [] })
    }

    const timestamps: number[] = result.timestamp ?? []
    const quote = result.indicators?.quote?.[0] ?? {}

    const indices = timestamps.reduce<number[]>((acc, _, i) => {
      if (quote.close?.[i] != null) acc.push(i)
      return acc
    }, [])

    res.json({
      s: indices.length > 0 ? 'ok' : 'no_data',
      t: indices.map((i) => timestamps[i]),
      o: indices.map((i) => quote.open?.[i]  ?? 0),
      h: indices.map((i) => quote.high?.[i]  ?? 0),
      l: indices.map((i) => quote.low?.[i]   ?? 0),
      c: indices.map((i) => quote.close?.[i] ?? 0),
      v: indices.map((i) => quote.volume?.[i] ?? 0),
    })
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to fetch candles' })
  }
})

export default router
