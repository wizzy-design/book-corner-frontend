import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookPlaceholderIcon } from "@/components/Icons";

export default function BookNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <Navbar showBackToCatalog />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md rounded-3xl border border-zinc-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-pink text-brand-pink-dark">
            <BookPlaceholderIcon className="h-8 w-8 stroke-current" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Book Not Found
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            The book you are looking for may have been removed, unpublished, or does not exist.
          </p>

          <div className="mt-6">
            <Link
              href="/#catalog"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-zinc-800"
            >
              Browse Available Books
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
