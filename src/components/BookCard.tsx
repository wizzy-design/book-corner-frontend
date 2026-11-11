"use client";

import Image from "next/image";
import { useState } from "react";
import type { Book } from "@/models/book";
import { formatPrice } from "@/utils";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const isOutOfStock = book.stock <= 0;
  const isLowStock = book.stock > 0 && book.stock <= 3;

  return (
    <article className="group flex flex-col cursor-pointer pt-6">
      {/* Pink Background Tile with Floating Book */}
      <div className="relative aspect-[1/0.92] w-full rounded-2xl bg-brand-pink flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-pink-hover">
        <div className="relative -top-6 h-[96%] w-[74%] transition-all duration-300 group-hover:-top-7">
          {book.image_url && !imageError ? (
            <Image
              src={book.image_url}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 20vw"
              className="object-contain [filter:drop-shadow(-8px_14px_18px_rgba(0,0,0,0.18))_drop-shadow(-2px_4px_6px_rgba(0,0,0,0.08))] transition-all duration-300 group-hover:[filter:drop-shadow(-10px_18px_24px_rgba(0,0,0,0.22))_drop-shadow(-3px_5px_8px_rgba(0,0,0,0.1))]"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-zinc-100 p-3 text-center text-zinc-400 shadow-sm">
              <svg
                className="mb-1.5 h-8 w-8 stroke-current"
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
              <span className="text-[10px] font-medium leading-tight">
                No Cover
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Book Details */}
      <div className="mt-3 flex flex-col">
        <h3
          className="line-clamp-1 text-base font-bold transition-colors font-sans!"
          title={book.title}
        >
          {book.title}
        </h3>

        <p className="mt-0.5 line-clamp-1 text-xs text-[#999999]">
          By {book.author}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-[#F3BE3C]">
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
            {isOutOfStock ? "Out of stock" : `${book.stock} in stock`}
          </span>
        </div>
      </div>
    </article>
  );
}
