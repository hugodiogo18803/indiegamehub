import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";

interface Props {
  gameId: number;
  onClose: () => void;
}

export default function ReviewModal({ gameId, onClose }: Props) {
  /* ── obter cada campo individualmente ── */
  const userId = useAppStore((s) => s.userId);
  const userEmail = useAppStore((s) => s.userEmail);
  const addReview = useAppStore((s) => s.addReview);

  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!userId) return toast.error("Sessão expirada. Faz login novamente.");
    addReview({ gameId, userId, userEmail: userEmail!, rating: stars, text });
    toast.success("Review publicada");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl p-6 w-96 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold">Escrever Review</h3>

        {/* estrelas */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStars(n)}
              className={`text-2xl ${
                n <= stars ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 w-full h-24 p-2 rounded text-sm resize-none"
          placeholder="Escreve a tua opinião..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded text-gray-600 dark:text-gray-300"
          >
            Cancelar
          </button>
          <button
            disabled={!stars || !text.trim()}
            onClick={handleSubmit}
            className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-40"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
