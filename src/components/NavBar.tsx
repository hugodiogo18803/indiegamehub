import { Link, NavLink } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const linkBase =
    "text-sm px-4 py-2 focus:outline-none focus-visible:ring-2 ring-indigo-400";
  const active = "text-indigo-300 dark:text-indigo-100 font-semibold";

  const wishlistCount = useAppStore((s) => s.wishlist.length);
  const userEmail = useAppStore((s) => s.userEmail);
  const logout = useAppStore((s) => s.logout);

  return (
    <nav
      className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-700 dark:to-purple-800 text-white flex justify-between items-center px-6 h-14 shadow-lg"
      role="navigation"
      aria-label="Main"
    >
      <Link
        to="/"
        className="text-xl font-bold focus-visible:ring-2 ring-indigo-400"
      >
        IndieGameHub
      </Link>

      <div className="space-x-2 flex items-center">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          Discover
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          Wishlist{" "}
          {wishlistCount > 0 && (
            <span
              className="ml-1 text-xs bg-rose-500 text-white rounded-full px-1"
              aria-label={`${wishlistCount} itens na wishlist`}
            >
              {wishlistCount}
            </span>
          )}
        </NavLink>

        {userEmail ? (
          <button
            onClick={logout}
            className={`${linkBase} text-rose-200 hover:text-white`}
          >
            Sair ({userEmail.split("@")[0]})
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Login
          </NavLink>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
