export default function BooksSkeleton() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
          <div className="h-8 w-56 rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
          <div className="h-4 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="aspect-[3/4] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 mb-4" />
            <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
            <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
            <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800 mb-1" />
            <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800 mb-6" />
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-9 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

