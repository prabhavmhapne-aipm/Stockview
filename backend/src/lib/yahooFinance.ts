import axios from 'axios'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const yahooClient = axios.create({
  baseURL: 'https://query2.finance.yahoo.com',
  timeout: 10_000,
  headers: { 'User-Agent': UA },
})

// Crumb cache — valid for 1 hour
let crumbCache: { crumb: string; cookie: string; ts: number } | null = null

export async function getYahooCrumb(): Promise<{ crumb: string; cookie: string }> {
  if (crumbCache && Date.now() - crumbCache.ts < 3_600_000) return crumbCache

  // Step 1: hit fc.yahoo.com to get the A3 session cookie
  const cookieRes = await axios.get('https://fc.yahoo.com', {
    headers: { 'User-Agent': UA },
    validateStatus: () => true,
    maxRedirects: 5,
  })
  const rawCookies: string[] = (cookieRes.headers['set-cookie'] as string[]) ?? []
  const cookie = rawCookies.map((c: string) => c.split(';')[0]).join('; ')

  // Step 2: exchange the cookie for a crumb
  const crumbRes = await axios.get('https://query2.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': UA, Cookie: cookie },
  })
  const crumb = typeof crumbRes.data === 'string' ? crumbRes.data.trim() : ''

  crumbCache = { crumb, cookie, ts: Date.now() }
  return crumbCache
}

export default yahooClient
