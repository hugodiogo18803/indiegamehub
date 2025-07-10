import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";
import { type GameDto } from "../lib/api";
import { type Game } from "../store/useAppStore";

type CardGame = GameDto | Game;

interface Props {
  game: CardGame;
}

export default function GameCard({ game }: Props) {
  const { wishlist, addToWishlist, removeFromWishlist } = useAppStore();

  const rawgId = (game as Game).rawgId ?? (game as GameDto).id;

  const inWish = wishlist.some((g) => g.rawgId === rawgId);

  const handleClick = () => {
    if (inWish) {
      removeFromWishlist(rawgId);
      toast("Removido da wishlist", { icon: "🗑️" });
    } else {
      const newItem: Omit<Game, "id"> = {
        rawgId,
        slug: game.slug,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
      };
      addToWishlist(newItem);
      toast.success("Adicionado à wishlist");
    }
  };

  return (
    <div className="w-60 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
      <Link to={`/game/${game.slug}`}>
        <img
          src={game.background_image}
          alt={game.name}
          className="h-36 w-full object-cover rounded-t"
          loading="lazy"
        />
      </Link>

      <div className="p-2">
        <h3 className="font-semibold text-sm truncate">{game.name}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          ⭐ {game.rating}
        </p>

        <button
          onClick={handleClick}
          className={`mt-2 w-full py-1 rounded text-xs ${
            inWish
              ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
              : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          }`}
        >
          {inWish ? "Remover da Wishlist" : "Adicionar à Wishlist"}
        </button>
      </div>
    </div>
  );
}
