import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Discover from "./pages/Discover";
import GameDetail from "./pages/GameDetail";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/game/:slug" element={<GameDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
