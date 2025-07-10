import { useEffect, useState } from "react";
import { getGenres, type GenreDto } from "../lib/api";

interface Props {
  value: string;
  onChange: (slug: string) => void;
}
export default function GenreSelect({ value, onChange }: Props) {
  const [genres, setGenres] = useState<GenreDto[]>([]);
  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-2 rounded"
    >
      <option value="">Todas as categorias</option>
      {genres.map((g) => (
        <option key={g.id} value={g.slug}>
          {g.name}
        </option>
      ))}
    </select>
  );
}
