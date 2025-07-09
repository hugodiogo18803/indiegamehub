import { useThemeStore } from "../store/useThemeStore";
import { Moon, Sun } from "lucide-react"; /* ícones (lucide) */

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-2 ring-indigo-400"
      aria-label="Alternar tema"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
