import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/api";
import BookDetailPresentation from "@/components/BookDetailPresentation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const book = await getBookById(id);
    return {
      title: `${book.title} by ${book.author} | Book Corner`,
      description: book.description || `Buy ${book.title} by ${book.author} at Book Corner.`,
      openGraph: {
        title: `${book.title} | Book Corner`,
        description: book.description || undefined,
        images: book.image_url ? [book.image_url] : undefined,
      },
    };
  } catch {
    return {
      title: "Book Details | Book Corner",
    };
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  let book = null;
  try {
    book = await getBookById(id);
  } catch {
    notFound();
  }

  if (!book) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <Navbar showBackToCatalog />

      <main className="flex-1 py-10 sm:py-16">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-zinc-500">
              <li>
                <Link href="/" className="hover:text-zinc-900 transition">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#catalog" className="hover:text-zinc-900 transition">
                  Catalog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-zinc-800 truncate max-w-xs sm:max-w-md">
                {book.title}
              </li>
            </ol>
          </nav>

          <BookDetailPresentation book={book} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
