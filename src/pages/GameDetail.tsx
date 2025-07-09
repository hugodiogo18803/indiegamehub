import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getGame,
  getScreenshots,
  getSuggested,
  type GameDto,
} from "../lib/api";
import GameCard from "../components/GameCard";
import ReviewModal from "../components/ReviewModal";
import { useAppStore, type Game } from "../store/useAppStore";

export default function GameDetail() {
  /* ---------- state ---------- */
  const { slug } = useParams();
  const [game, setGame] = useState<GameDto | null>(null);
  const [shots, setShots] = useState<{ image: string }[]>([]);
  const [suggested, setSuggested] = useState<GameDto[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* ---------- global ---------- */
  const {
    userEmail,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    getReviewsByGame,
  } = useAppStore();

  /* ---------- fetch ---------- */
  useEffect(() => {
    if (!slug) return;
    (async () => {
      window.scrollTo({ top: 0 });
      setGame(null);
      const g = await getGame(slug);
      setGame(g);
      setShots(await getScreenshots(slug));
      setSuggested(await getSuggested(slug));
    })();
  }, [slug]);

  if (!game) return <p className="p-8">A carregar…</p>;

  /* ---------- wishlist toggle ---------- */
  const inWish = wishlist.some((g) => g.rawgId === game.id);

  const toggleWish = () => {
    if (inWish) {
      removeFromWishlist(game.id);
      toast("Removido da wishlist", { icon: "🗑️" });
    } else {
      const newItem: Omit<Game, "id"> = {
        rawgId: game.id,
        slug: game.slug,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
      };
      addToWishlist(newItem);
      toast.success("Adicionado à wishlist");
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Banner */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full md:w-96 rounded shadow bg-gray-200 dark:bg-gray-700"
          loading="lazy"
        />

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{game.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">⭐ {game.rating}</p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={toggleWish}
              className={`px-4 py-2 rounded ${
                inWish
                  ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {inWish ? "Remover da Wishlist" : "Adicionar à Wishlist"}
            </button>

            <button
              className="px-4 py-2 rounded border border-indigo-600 text-indigo-600 dark:text-indigo-400"
              onClick={() => {
                if (!userEmail) return toast.error("Faz login para avaliar");
                setShowModal(true);
              }}
            >
              Escrever Review
            </button>
          </div>

          <p className="mt-6 whitespace-pre-wrap">
            {game.description_raw?.slice(0, 800)}…
          </p>
        </div>
      </div>

      {/* Screenshots */}
      {shots.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Screenshots</h3>
          <div className="flex overflow-x-auto gap-4">
            {shots.map((s) => (
              <img
                key={s.image}
                src={s.image}
                alt="Screenshot"
                className="h-40 rounded shadow bg-gray-200 dark:bg-gray-700"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}

      {/* Jogos semelhantes */}
      {suggested.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Também poderás gostar…</h3>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
            {suggested.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {getReviewsByGame(game.id).length === 0 && (
          <p className="text-sm text-gray-500">Sem reviews ainda.</p>
        )}
        <ul className="space-y-4">
          {getReviewsByGame(game.id).map((r) => (
            <li key={r.date} className="border rounded p-3">
              <p className="text-sm">
                <span className="font-semibold">{r.userEmail}</span> •{" "}
                {new Date(r.date).toLocaleDateString()}
              </p>
              <p className="text-yellow-500">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
              <p className="text-sm mt-1">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {showModal && (
        <ReviewModal gameId={game.id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
