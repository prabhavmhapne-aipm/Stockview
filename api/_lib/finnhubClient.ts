import axios from 'axios'

const finnhubClient = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  timeout: 10_000,
})

finnhubClient.interceptors.request.use((config) => {
  config.params = { ...config.params, token: process.env.FINNHUB_API_KEY }
  return config
})

finnhubClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 429) console.warn('[Finnhub] Rate limit hit')
    return Promise.reject(err)
  }
)

export default finnhubClient
