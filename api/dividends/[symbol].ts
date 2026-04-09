import type { VercelRequest, VercelResponse } from '@vercel/node'
import yahooClient from '../_lib/yahooFinance'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { symbol } = req.query
  try {
    const { data } = await yahooClient.get(`/v8/finance/chart/${symbol}`, {
      params: { range: '10y', interval: '1mo', events: 'dividends' },
    })

    const dividends: Record<string, { amount: number; date: number }> =
      data.chart?.result?.[0]?.events?.dividends ?? {}

    const list = Object.values(dividends).map((d) => ({
      amount: d.amount,
      date: new Date(d.date * 1000).toISOString().split('T')[0],
    }))

    res.json(list)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dividends' })
  }
}
