export default function BooksSkeleton() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="h-4 w-28 rounded bg-zinc-200 mb-2" />
          <div className="h-8 w-56 rounded bg-zinc-200 mb-2" />
          <div className="h-4 w-72 rounded bg-zinc-200" />
        </div>
        <div className="h-4 w-24 rounded bg-zinc-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col pt-6">
            <div className="relative aspect-[1/0.92] w-full rounded-2xl bg-brand-pink/60 flex items-center justify-center">
              <div className="relative -top-6 h-[96%] w-[74%] rounded-md bg-zinc-200 shadow-sm" />
            </div>
            <div className="mt-3 h-4 w-3/4 rounded bg-zinc-200" />
            <div className="mt-1.5 h-3 w-1/2 rounded bg-zinc-200" />
            <div className="mt-2.5 flex items-center justify-between">
              <div className="h-4 w-16 rounded bg-zinc-200" />
              <div className="h-3 w-12 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

