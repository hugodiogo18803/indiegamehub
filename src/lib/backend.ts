/**
 * Cliente Axios para o JSON Server
 * - End-point definido em .env.local  →  VITE_BACKEND_URL=http://localhost:4000
 */
import axios from 'axios'

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

export default backend
