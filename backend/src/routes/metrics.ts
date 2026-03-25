import { Router } from 'express'
import finnhub from '../lib/finnhubClient'

const router = Router()

router.get('/:symbol', async (req, res) => {
  try {
    const { data } = await finnhub.get('/stock/metric', {
      params: { symbol: req.params.symbol, metric: 'all' },
    })
    res.json(data)
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to fetch metrics' })
  }
})

export default router
