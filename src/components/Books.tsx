import type { Book, BooksApiResponse } from "@/models/book";
import BookCard from "./BookCard";

async function getBooks(): Promise<BooksApiResponse | null> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/books`;
    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch books: ${res.status} ${res.statusText}`);
      return null;
    }

    const data: BooksApiResponse = await res.json();
    console.log("Books from backend:", data);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
}

export default async function Books() {
  const result = await getBooks();
  const books: Book[] = result?.data ?? [];
  const total = result?.total ?? books.length;

  if (!result || books.length === 0) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 mb-3">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-zinc-900">
            {!result ? "Unable to load books" : "No books found"}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {!result
              ? "The book catalog is currently unavailable. Please check back shortly."
              : "There are currently no published books available."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-pink-dark mb-1">
            Curated Catalog
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Available Books
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Explore our collection of handpicked titles and bestsellers.
          </p>
        </div>

        <div className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-semibold text-zinc-800">{books.length}</span>{" "}
          {books.length === 1 ? "book" : "books"}
          {total > books.length ? ` of ${total}` : ""}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-14">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
