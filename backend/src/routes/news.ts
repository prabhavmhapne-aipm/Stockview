import { Router } from 'express'
import finnhub from '../lib/finnhubClient'

const router = Router()

router.get('/:symbol', async (req, res) => {
  const to   = new Date().toISOString().split('T')[0]
  const from = new Date(Date.now() - 30 * 86400 * 1000).toISOString().split('T')[0]

  try {
    const { data } = await finnhub.get('/company-news', {
      params: { symbol: req.params.symbol, from, to },
    })
    res.json(data)
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to fetch news' })
  }
})

export default router
