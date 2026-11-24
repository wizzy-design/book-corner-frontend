"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Truck, Sparkles, MessageCircle, Share2, Check } from "lucide-react";
import type { Book } from "@/models/book";
import { formatPrice, getStockStatus } from "@/utils";
import { APP_CONSTANTS } from "@/constants";
import BookCoverImage from "./BookCoverImage";
import { WhatsAppIcon } from "./Icons";

interface BookDetailPresentationProps {
  book: Book;
}

export default function BookDetailPresentation({ book }: BookDetailPresentationProps) {
  const safeStock = typeof book.stock === "number" && Number.isFinite(book.stock) ? book.stock : 0;
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const { isOutOfStock, isLowStock, detailedLabel } = getStockStatus(safeStock);
  const maxQuantity = Math.max(1, safeStock);
  const tags = Array.isArray(book.tags) ? book.tags : [];

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard API unavailable
    }
  };

  const safePrice = typeof book.price === "number" && Number.isFinite(book.price) ? book.price : 0;
  const totalPrice = safePrice * quantity;

  const whatsappNumber = APP_CONSTANTS.phone.replace("+", "");
  const whatsappMessage = encodeURIComponent(
    `Hello Book Corner! I would like to order:\n\nBook: "${book.title}"\nAuthor: ${book.author}\nQuantity: ${quantity}\nTotal: ${formatPrice(totalPrice)}\n\nPlease advise on delivery to my address.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
      {/* Left Column: Signature Pink Book Tile Presentation */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
          <div className="relative aspect-[1/1.05] w-full rounded-3xl bg-brand-pink flex items-center justify-center p-8 transition-colors duration-300 shadow-xs">
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-brand-pink/50 blur-xl opacity-60" aria-hidden="true" />

            <div className="relative h-[95%] w-[80%] max-w-[320px]">
              <BookCoverImage
                src={book.image_url}
                alt={book.title || "Book cover"}
                priority
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                className="object-contain [filter:drop-shadow(-12px_22px_28px_rgba(0,0,0,0.22))_drop-shadow(-3px_6px_10px_rgba(0,0,0,0.1))] transition-transform duration-500 hover:scale-[1.02]"
                fallbackText="Cover Not Available"
                iconClassName="mb-3 h-14 w-14 stroke-current"
                fallbackClassName="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-6 text-center text-zinc-400 shadow-sm border border-zinc-200"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5 text-brand-pink-dark" aria-hidden="true" />
            <span>Available for pickup in {APP_CONSTANTS.location}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Book Details & Actions */}
      <div className="lg:col-span-7 flex flex-col">
        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
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

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 font-sans!">
          {book.title || "Untitled Book"}
        </h1>

        <p className="mt-2 text-base text-zinc-600">
          Written by <span className="font-semibold text-zinc-900">{book.author || "Unknown Author"}</span>
        </p>

        {/* Price & Stock Row */}
        <div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-border-subtle py-4">
          <span className="text-3xl font-extrabold text-brand-gold">
            {formatPrice(safePrice)}
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
              aria-hidden="true"
            />
            {detailedLabel}
          </span>
        </div>

        {/* Book Synopsis / Description */}
        <section className="mt-6" aria-labelledby="book-description-heading">
          <h2 id="book-description-heading" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Description
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
            {book.description?.trim() || "No description provided for this book."}
          </p>
        </section>

        {/* Quantity Selector & Order Section */}
        {!isOutOfStock && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-zinc-900 mb-4">
              Select Quantity &amp; Order
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
                <span
                  className="w-12 text-center text-sm font-semibold text-zinc-900"
                  aria-live="polite"
                >
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

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                <span>Order via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-2xs transition hover:bg-zinc-50"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                ) : (
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Perks & Service Guarantees */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-200 pt-6">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-brand-pink-dark shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Nationwide Delivery</h4>
              <p className="text-[11px] text-zinc-500">Fast doorstep shipping from Jos across Nigeria.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-brand-pink-dark shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Original &amp; Curated</h4>
              <p className="text-[11px] text-zinc-500">Carefully vetted, premium physical copies.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-brand-pink-dark shrink-0 mt-0.5" aria-hidden="true" />
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
