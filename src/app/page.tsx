import { Suspense } from "react";
import Hero from "@/components/Hero";
import Books from "@/components/Books";
import BooksSkeleton from "@/components/BooksSkeleton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Book
              <span className="text-emerald-600">Corner</span>
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <span className="text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">
              Online Bookstore
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Books Section */}
      <main id="catalog" className="flex-1">
        <Suspense fallback={<BooksSkeleton />}>
          <Books />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          TODO:
          {/* <p>© {new Date().getFullYear()} Book Corner. All rights reserved.</p> */}
        </div>
      </footer>
    </div>
  );
}
