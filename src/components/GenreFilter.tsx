"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Tag } from "@/models/tag";

interface GenreFilterProps {
  tags: Tag[];
  selectedGenre?: string;
}

export default function GenreFilter({ tags, selectedGenre = "" }: GenreFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const safeTags = Array.isArray(tags) ? tags : [];

  const handleSelectGenre = (genreName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (genreName) {
      params.set("genre", genreName);
    } else {
      params.delete("genre");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}#catalog`, { scroll: false });
  };

  return (
    <nav aria-label="Filter books by genre" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        type="button"
        onClick={() => handleSelectGenre("")}
        aria-pressed={!selectedGenre}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
          !selectedGenre
            ? "bg-zinc-900 text-white shadow-xs"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
        }`}
      >
        All Books
      </button>

      {safeTags.map((tag) => {
        const isSelected = selectedGenre.toLowerCase() === tag.name.toLowerCase();
        return (
          <button
            type="button"
            key={tag.id}
            onClick={() => handleSelectGenre(tag.name)}
            aria-pressed={isSelected}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? "bg-brand-pink-dark text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {tag.name}
          </button>
        );
      })}
    </nav>
  );
}
