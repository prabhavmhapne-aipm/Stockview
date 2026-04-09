import type { VercelRequest, VercelResponse } from '@vercel/node'
import finnhub from './_lib/finnhubClient'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const q = req.query.q as string
  if (!q) return res.json({ count: 0, result: [] })

  try {
    const { data } = await finnhub.get('/search', { params: { q } })
    res.json(data)
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json({ error: 'Failed to search' })
  }
}
