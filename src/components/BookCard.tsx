import Link from "next/link";
import type { Book } from "@/models/book";
import { formatPrice, getStockStatus } from "@/utils";
import BookCoverImage from "./BookCoverImage";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { isOutOfStock, isLowStock, shortLabel } = getStockStatus(book.stock);
  const tags = Array.isArray(book.tags) ? book.tags : [];

  return (
    <Link href={`/books/${book.id}`} className="block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-pink-dark rounded-2xl">
      <article className="group flex flex-col cursor-pointer pt-6">
        {/* Pink Background Tile with Floating Book */}
        <div className="relative aspect-[1/0.92] w-full rounded-2xl bg-brand-pink flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-pink-hover">
          <div className="relative -top-6 h-[96%] w-[74%] transition-all duration-300 group-hover:-top-7">
            <BookCoverImage
              src={book.image_url}
              alt={book.title || "Book cover"}
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 20vw"
              className="object-contain [filter:drop-shadow(-8px_14px_18px_rgba(0,0,0,0.18))_drop-shadow(-2px_4px_6px_rgba(0,0,0,0.08))] transition-all duration-300 group-hover:[filter:drop-shadow(-10px_18px_24px_rgba(0,0,0,0.22))_drop-shadow(-3px_5px_8px_rgba(0,0,0,0.1))]"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="mt-3 flex flex-col">
          {tags.length > 0 && (
            <div className="mb-1 flex flex-wrap gap-1">
              {tags.slice(0, 2).map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}

          <h3
            className="line-clamp-1 text-base font-bold transition-colors font-sans! group-hover:text-brand-pink-dark"
            title={book.title}
          >
            {book.title || "Untitled Book"}
          </h3>

          <p className="mt-0.5 line-clamp-1 text-xs text-ink-subtle">
            By {book.author || "Unknown Author"}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-brand-gold">
              {formatPrice(book.price)}
            </span>

            <span
              className={`text-xs font-medium ${
                isOutOfStock
                  ? "text-rose-500"
                  : isLowStock
                    ? "text-amber-600"
                    : "text-zinc-400"
              }`}
            >
              {shortLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
