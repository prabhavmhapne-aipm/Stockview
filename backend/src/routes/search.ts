import { Router } from 'express'
import finnhub from '../lib/finnhubClient'

const router = Router()

router.get('/', async (req, res) => {
  const q = req.query.q as string
  if (!q) return res.json({ count: 0, result: [] })

  try {
    const { data } = await finnhub.get('/search', {
      params: { q },
    })
    res.json(data)
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to search' })
  }
})

export default router
