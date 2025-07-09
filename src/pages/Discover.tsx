import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import GenreSelect from "../components/GenreSelect";
import { type GameDto, searchGames } from "../lib/api";
import { toast } from "react-hot-toast";

export default function Discover() {
  const [query, setQuery] = useState(""); // ← vazio
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<GameDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  /* fetch helper */
  const load = async (reset = false) => {
    setLoading(true);
    try {
      const data = await searchGames(query, genre, reset ? 1 : page);
      if (reset) {
        setGames(data);
        setNoMore(data.length < 24);
        setPage(2);
      } else {
        setGames((g) => [...g, ...data]);
        setNoMore(data.length < 24);
        setPage((p) => p + 1);
      }
    } catch {
      toast.error("Erro ao obter jogos");
    } finally {
      setLoading(false);
    }
  };

  /* carregar assim que género ou query mudam */
  useEffect(() => {
    load(true);
  }, [genre]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
      {/* barra de pesquisa + filtro */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-2 items-center"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar jogos..."
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 w-72 rounded"
        />
        <GenreSelect value={genre} onChange={setGenre} />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Pesquisar
        </button>
      </form>

      {/* grid de jogos */}
      {games.length === 0 && !loading && (
        <p className="text-gray-500">Nenhum resultado.</p>
      )}

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {/* botão carregar mais */}
      {!noMore && games.length > 0 && (
        <div className="text-center">
          <button
            disabled={loading}
            onClick={() => load(false)}
            className="mt-4 px-4 py-2 border rounded disabled:opacity-40"
          >
            {loading ? "A carregar…" : "Carregar mais"}
          </button>
        </div>
      )}

      {loading && <p className="text-center text-sm">A carregar…</p>}
    </div>
  );
}
