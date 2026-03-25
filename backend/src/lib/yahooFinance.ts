import axios from 'axios'

const yahooClient = axios.create({
  baseURL: 'https://query1.finance.yahoo.com',
  timeout: 10_000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
})

export default yahooClient
