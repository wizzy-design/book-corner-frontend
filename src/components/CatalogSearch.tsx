"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface CatalogSearchProps {
  initialQuery?: string;
}

function FlippingBookLoader() {
  return (
    <span
      className="relative inline-flex items-center justify-center w-3.5 h-2.5 mr-1.5"
      style={{ perspective: "120px" }}
      aria-hidden="true"
    >
      {/* Left Back Cover Page */}
      <span className="absolute left-0 top-0 w-[7px] h-[10px] rounded-l-[1px] bg-brand-pink border-l border-y border-brand-pink-dark/50" />
      {/* Right Back Cover Page */}
      <span className="absolute right-0 top-0 w-[7px] h-[10px] rounded-r-[1px] bg-brand-pink border-r border-y border-brand-pink-dark/50" />
      {/* Center Spine */}
      <span className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-[10px] bg-brand-pink-dark/80 z-10" />
      {/* Flipping Page 1 */}
      <span
        className="absolute left-1/2 top-0 w-[7px] h-[10px] rounded-r-[1px] bg-white border border-brand-pink-dark/60 animate-page-flip-1 origin-left"
      />
      {/* Flipping Page 2 */}
      <span
        className="absolute left-1/2 top-0 w-[7px] h-[10px] rounded-r-[1px] bg-white border border-brand-pink-dark/60 animate-page-flip-2 origin-left"
      />
    </span>
  );
}

export default function CatalogSearch({ initialQuery = "" }: CatalogSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById("catalog");
    if (catalogEl) {
      const headerOffset = 70;
      const elementPosition = catalogEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set("query", searchTerm.trim());
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}#catalog`, { scroll: false });
    });
    scrollToCatalog();
  };

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}#catalog`, { scroll: false });
    });
    scrollToCatalog();
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, author, or keyword..."
          className="w-full rounded-full border border-zinc-200 bg-zinc-50/80 py-2 pl-10 pr-24 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-zinc-900 transition"
        />

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-zinc-400 hover:text-zinc-600 rounded-md"
              title="Clear search"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-90 active:scale-95 min-w-[70px]"
          >
            {isPending ? (
              <>
                <FlippingBookLoader />
                <span>Searching</span>
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
