import axios from 'axios'

// All requests go to /api/... which Vite proxies to the backend in dev
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10_000,
})

export default apiClient
