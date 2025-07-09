import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

/* inicializa a partir de localStorage */
const initial: Theme = (localStorage.getItem('theme') as Theme) || 'light'

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initial,
  toggleTheme: () =>
    set((s) => {
      const next: Theme = s.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      return { theme: next }
    }),
  setTheme: (t) => {
    localStorage.setItem('theme', t)
    set({ theme: t })
  },
}))
