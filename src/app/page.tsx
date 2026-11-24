import { Suspense } from "react";
import Hero from "@/components/Hero";
import Books from "@/components/Books";
import BooksSkeleton from "@/components/BooksSkeleton";
import GenreFilter from "@/components/GenreFilter";
import CatalogSearch from "@/components/CatalogSearch";
import { getTags } from "@/lib/api";

interface HomeProps {
  searchParams: Promise<{
    query?: string;
    genre?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;
  const tags = await getTags().catch(() => []);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 backdrop-blur-md bg-white/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Book
              <span className="text-brand-pink-dark">Corner</span>
            </span>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <CatalogSearch initialQuery={resolvedParams?.query} />
          </div>

          <nav className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline-flex text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">
              Online Bookstore
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Books Catalog Section */}
      <main id="catalog" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-4">
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
          </div>

          {/* Genre / Tag Filter Chips */}
          {tags.length > 0 && (
            <div className="pt-2 pb-4">
              <GenreFilter tags={tags} selectedGenre={resolvedParams?.genre} />
            </div>
          )}
        </div>

        {/* Books Grid */}
        <Suspense
          key={`${resolvedParams?.query || ""}-${resolvedParams?.genre || ""}-${resolvedParams?.page || "1"}`}
          fallback={<BooksSkeleton />}
        >
          <Books searchParams={resolvedParams} />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Book Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
