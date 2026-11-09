"use client";

import Image from "next/image";
import { useState } from "react";
import type { Book } from "@/models/book";

interface BookCardProps {
  book: Book;
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}

export default function BookCard({ book }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const isOutOfStock = book.stock <= 0;
  const isLowStock = book.stock > 0 && book.stock <= 3;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {book.image_url && !imageError ? (
          <Image
            src={book.image_url}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-zinc-400 dark:text-zinc-500">
            <svg
              className="mb-2 h-12 w-12 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="text-xs font-medium">Cover Unavailable</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {isOutOfStock ? (
            <span className="rounded-full bg-rose-500/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              Out of stock
            </span>
          ) : isLowStock ? (
            <span className="rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              Only {book.stock} left
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              {book.stock} in stock
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {book.author}
          </p>
          <h3
            className="mt-1 line-clamp-1 text-lg font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {book.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block">
              Price
            </span>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              {formatPrice(book.price)}
            </span>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              isOutOfStock
                ? "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            }`}
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
