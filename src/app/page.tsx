import { Suspense } from "react";
import Hero from "@/components/Hero";
import Books from "@/components/Books";
import BooksSkeleton from "@/components/BooksSkeleton";
import GenreFilter from "@/components/GenreFilter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <Navbar showSearch initialQuery={resolvedParams?.query} />

      <Hero />

      <main id="catalog" className="flex-1">
        <div className="site-container pt-12">
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

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="pt-2 pb-4">
              <GenreFilter tags={tags} selectedGenre={resolvedParams?.genre} />
            </div>
          )}
        </div>

        <Suspense
          key={`${resolvedParams?.query || ""}-${resolvedParams?.genre || ""}-${resolvedParams?.page || "1"}`}
          fallback={<BooksSkeleton />}
        >
          <Books searchParams={resolvedParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
