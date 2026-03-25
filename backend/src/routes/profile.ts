import { Router } from 'express'
import finnhub from '../lib/finnhubClient'

const router = Router()

router.get('/:symbol', async (req, res) => {
  try {
    const { data } = await finnhub.get('/stock/profile2', {
      params: { symbol: req.params.symbol },
    })
    res.json(data)
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to fetch profile' })
  }
})

export default router
