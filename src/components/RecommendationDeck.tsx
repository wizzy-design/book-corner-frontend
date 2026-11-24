"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  RotateCcw,
  X,
  BookmarkCheck,
} from "lucide-react";
import type { Book } from "@/models/book";
import { formatPrice, getStockStatus } from "@/utils";
import { playPageFlip, playOptionTap } from "@/lib/sound";
import BookCoverImage from "./BookCoverImage";

interface RecommendationDeckProps {
  books: Book[];
  soundEnabled?: boolean;
}

export default function RecommendationDeck({
  books,
  soundEnabled = true,
}: RecommendationDeckProps) {
  const safeBooks = Array.isArray(books) ? books.filter((b) => Boolean(b?.id)) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlistedIds, setShortlistedIds] = useState<number[]>([]);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const startXRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (safeBooks.length === 0) {
    return null;
  }

  const isFinished = currentIndex >= safeBooks.length;
  const activeBook = !isFinished ? safeBooks[currentIndex] : null;
  const shortlistedBooks = safeBooks.filter((b) => shortlistedIds.includes(b.id));

  const advanceCard = (direction: "left" | "right", saveBook = false) => {
    if (!activeBook || exitDirection) return;

    playPageFlip(soundEnabled);

    if (saveBook && !shortlistedIds.includes(activeBook.id)) {
      setShortlistedIds((prev) => [...prev, activeBook.id]);
    }

    setExitDirection(direction);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
      setDragX(0);
    }, 220);
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !exitDirection) {
      playPageFlip(soundEnabled);
      setCurrentIndex((prev) => prev - 1);
      setDragX(0);
    }
  };

  const handleRestartDeck = () => {
    playPageFlip(soundEnabled);
    setCurrentIndex(0);
    setDragX(0);
    setExitDirection(null);
  };

  const toggleShortlist = (bookId: number) => {
    playOptionTap(soundEnabled);
    setShortlistedIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  // Pointer drag handlers for swipe gestures
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    setShowSwipeHint(false);
    startXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startXRef.current === null) return;
    const delta = e.clientX - startXRef.current;
    setDragX(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startXRef.current = null;

    if (dragX > 90) {
      advanceCard("right", true);
    } else if (dragX < -90) {
      advanceCard("left", false);
    } else {
      setDragX(0);
    }
  };

  // End-of-deck summary view
  if (isFinished) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-border-subtle bg-surface-card p-8 sm:p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-pink text-brand-pink-dark">
          <BookmarkCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-ink font-sans!">
          You&apos;ve Explored All {safeBooks.length} Matches
        </h2>
        <p className="mt-2 text-sm text-ink-secondary">
          {shortlistedBooks.length > 0
            ? `You saved ${shortlistedBooks.length} ${shortlistedBooks.length === 1 ? "book" : "books"} to your reading shortlist.`
            : "You can restart the deck to revisit any of your matched books."}
        </p>

        {shortlistedBooks.length > 0 && (
          <div className="mt-6 space-y-3 text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Your Shortlist
            </h3>
            {shortlistedBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-brand-pink p-1">
                    <BookCoverImage
                      src={book.image_url}
                      alt={book.title || "Book cover"}
                      sizes="48px"
                      className="object-contain"
                      iconClassName="h-4 w-4"
                      fallbackText=""
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">
                      {book.title || "Untitled Book"}
                    </p>
                    <p className="truncate text-xs text-ink-muted">
                      By {book.author || "Unknown Author"} •{" "}
                      <span className="font-semibold text-brand-gold">
                        {formatPrice(book.price)}
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  href={`/books/${book.id}`}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>View</span>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRestartDeck}
            className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-card px-5 py-2.5 text-xs font-semibold text-ink transition hover:bg-surface-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Swipe Deck Again</span>
          </button>
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
          >
            Browse Full Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Up to 3 cards in stack (top card + 2 behind)
  const visibleStack = safeBooks.slice(currentIndex, currentIndex + 3);

  return (
    <div className="mx-auto max-w-2xl select-none">
      {/* Top Progress Dots & Shortlist Counter */}
      <div className="mb-5 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5" aria-label={`Match ${currentIndex + 1} of ${safeBooks.length}`}>
          {safeBooks.map((book, idx) => (
            <button
              key={book.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to match ${idx + 1}: ${book.title}`}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-6 bg-brand-pink-dark"
                  : idx < currentIndex
                    ? "w-2 bg-brand-pink-dark/40"
                    : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
          <span>
            {currentIndex + 1} / {safeBooks.length}
          </span>
          {shortlistedIds.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-pink px-2.5 py-0.5 text-[11px] font-semibold text-brand-pink-dark">
              <Heart className="h-3 w-3 fill-current" aria-hidden="true" />
              {shortlistedIds.length} saved
            </span>
          )}
        </div>
      </div>

      {/* Stacked Card Viewport */}
      <div className="relative h-[470px] sm:h-[360px] w-full">
        {visibleStack
          .slice()
          .reverse()
          .map((book, revIdx) => {
            const stackPosition = visibleStack.length - 1 - revIdx;
            const isTop = stackPosition === 0;
            const { isOutOfStock, isLowStock, shortLabel } = getStockStatus(book.stock);
            const tags = Array.isArray(book.tags) ? book.tags : [];
            const isSaved = shortlistedIds.includes(book.id);

            let cardTransform = "";
            if (isTop) {
              if (exitDirection === "left") {
                cardTransform = "translateX(-120%) rotate(-12deg)";
              } else if (exitDirection === "right") {
                cardTransform = "translateX(120%) rotate(12deg)";
              } else {
                cardTransform = `translateX(${dragX}px) rotate(${dragX * 0.035}deg)`;
              }
            } else if (stackPosition === 1) {
              cardTransform = "translateY(12px) scale(0.96)";
            } else {
              cardTransform = "translateY(24px) scale(0.92)";
            }

            return (
              <article
                key={book.id}
                onPointerDown={isTop ? handlePointerDown : undefined}
                onPointerMove={isTop ? handlePointerMove : undefined}
                onPointerUp={isTop ? handlePointerUp : undefined}
                onPointerCancel={isTop ? handlePointerUp : undefined}
                style={{
                  transform: cardTransform,
                  zIndex: 30 - stackPosition * 10,
                  opacity: isTop && exitDirection ? 0 : 1 - stackPosition * 0.12,
                }}
                className={`absolute inset-0 flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-lg ${
                  isTop
                    ? isDragging
                      ? "cursor-grabbing transition-none"
                      : `cursor-grab transition-all duration-250 ease-out ${showSwipeHint && !exitDirection ? "animate-swipe-hint" : ""}`
                    : "pointer-events-none transition-all duration-300"
                }`}
              >
                {/* Swipe Feedback Stamps */}
                {isTop && (dragX > 35 || (showSwipeHint && !isDragging && !exitDirection)) && (
                  <div
                    className={`pointer-events-none absolute top-5 left-5 z-40 rounded-xl border-2 border-emerald-500 bg-emerald-50/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-700 -rotate-12 ${
                      dragX > 35 ? "opacity-100" : "animate-hint-save"
                    }`}
                  >
                    Save
                  </div>
                )}
                {isTop && (dragX < -35 || (showSwipeHint && !isDragging && !exitDirection)) && (
                  <div
                    className={`pointer-events-none absolute top-5 right-5 z-40 rounded-xl border-2 border-rose-500 bg-rose-50/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-rose-700 rotate-12 ${
                      dragX < -35 ? "opacity-100" : "animate-hint-skip"
                    }`}
                  >
                    Skip
                  </div>
                )}

                {/* Left Pink Book Cover Showcase */}
                <div className="relative flex h-52 sm:h-auto sm:w-5/12 shrink-0 items-center justify-center bg-brand-pink p-6">
                  <div className="relative h-full w-4/5 max-w-[170px]">
                    <BookCoverImage
                      src={book.image_url}
                      alt={book.title || "Book cover"}
                      sizes="(max-width: 640px) 60vw, 240px"
                      className="object-contain [filter:drop-shadow(-8px_14px_18px_rgba(0,0,0,0.2))]"
                    />
                  </div>
                </div>

                {/* Right Book Info */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-7 overflow-hidden">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 2).map((t) => (
                          <span
                            key={t.id}
                            className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[10px] font-semibold text-ink-secondary"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleShortlist(book.id)}
                        aria-label={isSaved ? "Remove from shortlist" : "Save to shortlist"}
                        className={`rounded-full p-1.5 transition ${
                          isSaved
                            ? "bg-brand-pink text-brand-pink-dark"
                            : "text-ink-muted hover:bg-surface-muted"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <h3 className="mt-2 line-clamp-2 text-xl font-bold text-ink font-sans!">
                      {book.title || "Untitled Book"}
                    </h3>

                    <p className="mt-0.5 text-xs text-ink-subtle">
                      By {book.author || "Unknown Author"}
                    </p>

                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-ink-secondary">
                      {book.description?.trim() || "A curated match selected from your reading quiz answers."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
                    <div>
                      <span className="text-lg font-extrabold text-brand-gold">
                        {formatPrice(book.price)}
                      </span>
                      <p
                        className={`text-[11px] font-medium ${
                          isOutOfStock
                            ? "text-rose-500"
                            : isLowStock
                              ? "text-amber-600"
                              : "text-ink-muted"
                        }`}
                      >
                        {shortLabel}
                      </p>
                    </div>

                    <Link
                      href={`/books/${book.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 active:scale-95"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
      </div>

      {/* Swipe Action Controls */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous match"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-card text-ink-secondary shadow-xs transition hover:bg-surface-muted disabled:opacity-35"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => advanceCard("left", false)}
          aria-label="Skip book"
          className="flex h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-5 text-xs font-semibold text-ink-secondary shadow-xs transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          <span>Skip</span>
        </button>

        <button
          type="button"
          onClick={() => advanceCard("right", true)}
          aria-label="Save book to shortlist"
          className="flex h-12 items-center gap-2 rounded-full bg-brand-pink px-5 text-xs font-semibold text-brand-pink-dark ring-1 ring-inset ring-brand-pink-dark/25 shadow-xs transition hover:bg-brand-pink-hover active:scale-95"
        >
          <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
          <span>Save &amp; Next</span>
        </button>

        <button
          type="button"
          onClick={() => advanceCard("left", false)}
          aria-label="Next match"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-card text-ink-secondary shadow-xs transition hover:bg-surface-muted"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] text-ink-muted">
        Tip: Drag cards left to skip or right to save to your shortlist.
      </p>
    </div>
  );
}
