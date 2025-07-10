import axios from 'axios'

const apiKey = import.meta.env.VITE_RAWG_KEY as string

export const api = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: { key: apiKey },
})

export interface GameDto {
  id: number
  slug: string
  name: string
  background_image: string
  rating: number
  description_raw?: string
}

export interface GenreDto { id: number; slug: string; name: string }

/* géneros */
export async function getGenres(): Promise<GenreDto[]> {
  const { data } = await api.get('/genres')
  return data.results
}

/* searchGames */
export async function searchGames(
  query = '',
  genre = '',
  page = 1,
  pageSize = 24,
): Promise<GameDto[]> {
  const { data } = await api.get('/games', {
    params: {
      search: query || undefined,
      genres: genre || undefined,
      page,
      page_size: pageSize,
    },
  })
  return data.results
}

/*Detalhes completos de um jogo*/
export async function getGame(slug: string): Promise<GameDto> {
  const { data } = await api.get(`/games/${slug}`)
  return data
}

/* Array de screenshots */
export async function getScreenshots(
  slug: string,
): Promise<{ image: string }[]> {
  const { data } = await api.get(`/games/${slug}/screenshots`)
  return data.results as { image: string }[]
}

/* Jogos sugeridos */
export async function getSuggested(
  slug: string,
  pageSize = 8,
): Promise<GameDto[]> {
  const { data } = await api.get(`/games/${slug}/suggested`, {
    params: { page_size: pageSize },
  })
  return data.results
}
