import type { VercelRequest, VercelResponse } from '@vercel/node'
import finnhub from '../_lib/finnhubClient'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { symbol } = req.query
  try {
    const { data } = await finnhub.get('/quote', { params: { symbol } })
    res.json(data)
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to fetch quote' })
  }
}
