import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import CatalogSearch from "./CatalogSearch";

interface NavbarProps {
  showSearch?: boolean;
  initialQuery?: string;
  showQuizLink?: boolean;
  showBackToCatalog?: boolean;
}

export default function Navbar({
  showSearch = false,
  initialQuery = "",
  showQuizLink = true,
  showBackToCatalog = false,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 backdrop-blur-md bg-white/75">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="text-xl font-bold tracking-tight text-zinc-900">
            Book
            <span className="text-brand-pink-dark">Corner</span>
          </span>
        </Link>

        {showSearch && (
          <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <CatalogSearch initialQuery={initialQuery} />
          </div>
        )}

        <nav aria-label="Primary navigation" className="flex items-center gap-3 shrink-0">
          {showQuizLink && (
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink/70 px-3 py-1.5 text-xs font-semibold text-brand-pink-dark transition hover:bg-brand-pink"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Quiz</span>
            </Link>
          )}

          {showBackToCatalog ? (
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-2xs transition hover:bg-zinc-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Catalog</span>
            </Link>
          ) : (
            <span className="hidden md:inline-flex text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">
              Online Bookstore
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
