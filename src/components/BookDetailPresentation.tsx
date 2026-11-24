"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/models/book";
import { formatPrice } from "@/utils";
import { APP_CONSTANTS } from "@/constants";

interface BookDetailPresentationProps {
  book: Book;
}

export default function BookDetailPresentation({ book }: BookDetailPresentationProps) {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const isOutOfStock = book.stock <= 0;
  const isLowStock = book.stock > 0 && book.stock <= 3;
  const maxQuantity = Math.max(1, book.stock);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const totalPrice = book.price * quantity;

  // Build tailored WhatsApp message
  const whatsappNumber = APP_CONSTANTS.phone.replace("+", "");
  const whatsappMessage = encodeURIComponent(
    `Hello Book Corner! I would like to order:\n\n📚 Book: "${book.title}"\n✍️ Author: ${book.author}\n🔢 Quantity: ${quantity}\n💰 Total: ${formatPrice(totalPrice)}\n\nPlease advise on delivery to my address.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
      {/* Left Column: Signature Pink Book Tile Presentation */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
          <div className="relative aspect-[1/1.05] w-full rounded-3xl bg-brand-pink flex items-center justify-center p-8 transition-colors duration-300 shadow-xs">
            {/* Ambient Shadow glow */}
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-brand-pink/50 blur-xl opacity-60" />

            {/* Floating Book Cover with 3D Drop Shadow */}
            <div className="relative h-[95%] w-[80%] max-w-[320px]">
              {book.image_url && !imageError ? (
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-contain [filter:drop-shadow(-12px_22px_28px_rgba(0,0,0,0.22))_drop-shadow(-3px_6px_10px_rgba(0,0,0,0.1))] transition-transform duration-500 hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-6 text-center text-zinc-400 shadow-sm border border-zinc-200">
                  <svg
                    className="mb-3 h-14 w-14 stroke-current"
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
                  <span className="text-sm font-medium">Cover Not Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <span>📍 Available for pickup in {APP_CONSTANTS.location}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Book Details & Actions */}
      <div className="lg:col-span-7 flex flex-col">
        {/* Tags / Genres */}
        {book.tags && book.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {book.tags.map((t) => (
              <Link
                key={t.id}
                href={`/?genre=${encodeURIComponent(t.name)}#catalog`}
                className="rounded-full bg-brand-pink/60 px-3 py-1 text-xs font-semibold text-brand-pink-dark transition hover:bg-brand-pink"
              >
                {t.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 font-sans!">
          {book.title}
        </h1>

        {/* Author */}
        <p className="mt-2 text-base text-zinc-600">
          Written by <span className="font-semibold text-zinc-900">{book.author}</span>
        </p>

        {/* Price & Stock Row */}
        <div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-zinc-200 py-4">
          <span className="text-3xl font-extrabold text-[#F3BE3C]">
            {formatPrice(book.price)}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isOutOfStock
                ? "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
                : isLowStock
                  ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                  : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOutOfStock ? "bg-rose-500" : isLowStock ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            {isOutOfStock
              ? "Out of Stock"
              : isLowStock
                ? `Low Stock: Only ${book.stock} left`
                : `In Stock (${book.stock} available)`}
          </span>
        </div>

        {/* Book Synopsis / Description */}
        <div className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Description
          </h2>
          <div className="mt-2 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
            {book.description || "No description provided for this book."}
          </div>
        </div>

        {/* Quantity Selector & Order Section */}
        {!isOutOfStock && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-zinc-900 mb-4">
              Select Quantity & Order
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center rounded-xl border border-zinc-300 bg-zinc-50 p-1 w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-xs hover:bg-zinc-100 disabled:opacity-40 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-semibold text-zinc-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                  disabled={quantity >= maxQuantity}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-xs hover:bg-zinc-100 disabled:opacity-40 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-zinc-500">
                Total: <span className="font-bold text-zinc-900 text-sm">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Order via WhatsApp
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-2xs transition hover:bg-zinc-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                {copied ? "Link Copied!" : "Share"}
              </button>
            </div>
          </div>
        )}

        {/* Perks & Service Guarantees */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-200 pt-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">🚚</span>
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Nationwide Delivery</h4>
              <p className="text-[11px] text-zinc-500">Fast doorstep shipping from Jos across Nigeria.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Original & Curated</h4>
              <p className="text-[11px] text-zinc-500">Carefully vetted, premium physical copies.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">💬</span>
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Direct Support</h4>
              <p className="text-[11px] text-zinc-500">Friendly assistance on WhatsApp anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
