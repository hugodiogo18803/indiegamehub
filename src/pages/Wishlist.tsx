import { useEffect } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { useAppStore } from "../store/useAppStore";

export default function Wishlist() {
  const { userId, wishlist, fetchWishlist } = useAppStore();

  /* carrega sempre que userId muda */
  useEffect(() => {
    if (userId) fetchWishlist();
  }, [userId]);

  if (!userId)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <p className="mb-4 text-lg">Precisas de iniciar sessão.</p>
        <Link
          to="/login"
          className="px-4 py-2 border rounded text-indigo-600 dark:text-indigo-400"
        >
          Ir para Login
        </Link>
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 space-y-4">
        <h2 className="text-2xl font-semibold">A tua wishlist está vazia</h2>
        <Link to="/" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Descobrir jogos
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Wishlist ({wishlist.length})
      </h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
        {wishlist.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}
