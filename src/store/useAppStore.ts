import { create } from 'zustand'
import backend from '../lib/backend'

/* Tipos */
export interface Game {
  id?: number          // id interno JSON Server (undefined até POST devolver)
  rawgId: number       // id do RAWG
  slug: string
  name: string
  background_image: string
  rating: number
}

export interface Review {
  id?: number
  gameId: number
  userId: number
  userEmail: string
  rating: number
  text: string
  date: string
}

/* Estado global */
interface AppState {
  /* Sessão */
  userId: number | null
  userEmail: string | null

  /* Dados */
  wishlist: Game[]
  reviews: Review[]

  /* Auth */
  login: (e: string, p: string) => Promise<boolean>
  logout: () => void
  signup: (e: string, p: string) => Promise<boolean>

  /* Wishlist CRUD */
  fetchWishlist: () => Promise<void>
  addToWishlist: (g: Omit<Game, 'id'>) => Promise<void>
  removeFromWishlist: (rawgId: number) => Promise<void>

  /* Reviews */
  fetchReviews: (gameId: number) => Promise<void>
  addReview: (r: Omit<Review, 'id' | 'date'>) => Promise<void>
  getReviewsByGame: (gameId: number) => Review[]
}

/* Restaurar sessão */
const session = JSON.parse(localStorage.getItem('session') || 'null') as
  | { id: number; email: string }
  | null

export const useAppStore = create<AppState>((set, get) => ({
  userId: session?.id ?? null,
  userEmail: session?.email ?? null,

  wishlist: [],
  reviews: [],

  /* AUTH */
  login: async (email, password) => {
    const { data } = await backend.get('/users', { params: { email, password } })
    if (!data.length) return false
    const { id } = data[0]
    localStorage.setItem('session', JSON.stringify({ id, email }))
    set({ userId: id, userEmail: email })
    await get().fetchWishlist()
    return true
  },

  logout: () => {
    localStorage.removeItem('session')
    set({ userId: null, userEmail: null, wishlist: [], reviews: [] })
  },

  signup: async (email, password) => {
    const { data: exists } = await backend.get('/users', { params: { email } })
    if (exists.length) return false
    const { data } = await backend.post('/users', { email, password })
    localStorage.setItem('session', JSON.stringify({ id: data.id, email }))
    set({ userId: data.id, userEmail: email })
    return true
  },

  /* WISHLIST */
  fetchWishlist: async () => {
    const id = get().userId
    if (!id) return
    const { data } = await backend.get('/wishlist', { params: { userId: id } })
    set({ wishlist: data })
  },

  addToWishlist: async (g) => {
    const id = get().userId
    if (!id) return
    if (get().wishlist.some((w) => w.rawgId === g.rawgId)) return
    const { data } = await backend.post('/wishlist', { ...g, userId: id })
    set((s) => ({ wishlist: [...s.wishlist, data] }))
  },

  removeFromWishlist: async (rawgId) => {
    const item = get().wishlist.find((w) => w.rawgId === rawgId)
    if (!item?.id) return
    await backend.delete(`/wishlist/${item.id}`)
    set((s) => ({ wishlist: s.wishlist.filter((w) => w.rawgId !== rawgId) }))
  },

  /* REVIEWS */
  fetchReviews: async (gameId) => {
    const { data } = await backend.get('/reviews', { params: { gameId } })
    set((s) => ({
      reviews: [...s.reviews.filter((r) => r.gameId !== gameId), ...data],
    }))
  },

  addReview: async (r) => {
    const review = { ...r, date: new Date().toISOString() }
    const { data } = await backend.post('/reviews', review)
    set((s) => ({ reviews: [...s.reviews, data] }))
  },

  getReviewsByGame: (gameId) => get().reviews.filter((r) => r.gameId === gameId),
}))
