import { Router } from 'express'
import yahooClient from '../lib/yahooFinance'

const router = Router()

router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
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
    console.error('[dividends]', err)
    res.status(500).json({ error: 'Failed to fetch dividends' })
  }
})

export default router
