import { Suspense } from "react";
import Books from "@/components/Books";
import BooksSkeleton from "@/components/BooksSkeleton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Book<span className="text-emerald-600 dark:text-emerald-400">Corner</span>
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <span className="text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1">
              Online Bookstore
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-zinc-200 bg-gradient-to-b from-emerald-50/50 via-white to-zinc-50 dark:border-zinc-800 dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center sm:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
              Welcome to Book Corner
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Stories that inspire, transport, and captivate.
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Discover stories from bestselling authors and emerging voices. Shop our collection and find your next favorite read today.
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <main className="flex-1">
        <Suspense fallback={<BooksSkeleton />}>
          <Books />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Book Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
