import Link from "next/link";
import type { Book, BooksApiResponse } from "@/models/book";
import { getBooks } from "@/lib/api";
import BookCard from "./BookCard";
import { BookPlaceholderIcon } from "./Icons";

interface BooksProps {
  searchParams?: {
    query?: string;
    genre?: string;
    page?: string;
  };
}

export default async function Books({ searchParams }: BooksProps) {
  const query = searchParams?.query?.trim() || "";
  const genre = searchParams?.genre?.trim() || "";
  const parsedPage = Number.parseInt(searchParams?.page ?? "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit = 12;

  let result: BooksApiResponse | null = null;
  try {
    result = await getBooks({
      query: query || undefined,
      genre: genre || undefined,
      page: currentPage,
      limit,
    });
  } catch (err) {
    console.error("Error loading books from API:", err);
  }

  const books: Book[] = Array.isArray(result?.data) ? result.data : [];
  const total = typeof result?.total === "number" && Number.isFinite(result.total) ? result.total : books.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (genre) params.set("genre", genre);
    params.set("page", pageNumber.toString());
    return `/?${params.toString()}#catalog`;
  };

  if (!result || books.length === 0) {
    return (
      <section className="site-container py-12">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 p-12 text-center bg-white/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 mb-3">
            <BookPlaceholderIcon className="h-6 w-6 stroke-current" />
          </div>
          <h3 className="text-base font-semibold text-zinc-900">
            {!result ? "Unable to load books" : "No books found"}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 max-w-sm">
            {!result
              ? "The book catalog is currently unavailable. Please check back shortly."
              : query || genre
                ? `No results match your criteria${genre ? ` in genre "${genre}"` : ""}${query ? ` for "${query}"` : ""}. Try adjusting your filters.`
                : "There are currently no published books available."}
          </p>
          {(query || genre) && (
            <Link
              href="/#catalog"
              className="mt-4 inline-flex items-center rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition"
            >
              Reset Filters
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="site-container py-8">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
        <p className="text-xs text-zinc-500">
          Showing <span className="font-semibold text-zinc-800">{books.length}</span>{" "}
          {books.length === 1 ? "book" : "books"} of{" "}
          <span className="font-semibold text-zinc-800">{total}</span> total
          {genre ? ` in ${genre}` : ""}
          {query ? ` matching "${query}"` : ""}
        </p>
        <span className="text-xs text-zinc-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-14">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Catalog pagination" className="mt-16 flex items-center justify-center gap-2">
          {currentPage > 1 ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition"
            >
              Previous
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-400 cursor-not-allowed"
            >
              Previous
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isCurrent = p === currentPage;
              return (
                <Link
                  key={p}
                  href={createPageUrl(p)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={createPageUrl(currentPage + 1)}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition"
            >
              Next
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-400 cursor-not-allowed"
            >
              Next
            </span>
          )}
        </nav>
      )}
    </section>
  );
}
