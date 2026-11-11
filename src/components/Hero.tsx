import { APP_CONSTANTS } from "@/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 py-12 sm:py-16 lg:py-20">
      {/* SVG Clip Path Definition for Open Book with Curved Page Tops */}
      <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="open-book-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.13 C 0.12,0.02 0.38,0.02 0.5,0.11 C 0.62,0.02 0.88,0.02 1,0.13 L 1,0.93 C 0.88,0.98 0.62,0.98 0.5,0.91 C 0.38,0.98 0.12,0.98 0,0.93 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Text Column */}
          <div className="text-center sm:text-left lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink px-3.5 py-1 text-xs font-semibold text-brand-pink-dark ring-1 ring-inset ring-brand-pink-dark/20">
              📍 Jos, Nigeria • Nationwide Delivery
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Affordable books & accessories.
            </h1>

            <p className="mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
              Discover curated fiction, self-help, and more. Based in Jos,
              Nigeria — delivering your next great read nationwide to your
              doorstep.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-95"
              >
                Browse Books
              </a>

              {APP_CONSTANTS.whatsapp && (
                <a
                  href={APP_CONSTANTS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-xs transition-all hover:bg-zinc-50 active:scale-95"
                >
                  <svg
                    className="h-4 w-4 text-emerald-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Order on WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Right Open Book Frame */}
          <div className="relative flex justify-center lg:col-span-5">
            {/* Soft Ambient Glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-brand-pink/70 blur-3xl opacity-70" />

            {/* Slanted Open Book Assembly with Form-Fitting Drop Shadow */}
            <div className="relative w-full max-w-[460px] drop-shadow-[-8px_20px_25px_rgba(0,0,0,0.18)] drop-shadow-[0_8px_16px_rgba(224,83,117,0.16)] [transform:perspective(1200px)_rotateX(4deg)_rotateZ(-2.5deg)] hover:[transform:perspective(1200px)_rotateX(0deg)_rotateZ(0deg)] transition-transform duration-500 ease-out">
              {/* Stacked Side Pages (Left & Right Ream Thickness) */}
              <div className="pointer-events-none absolute -left-1.5 inset-y-5 w-2 rounded-l-xs bg-[#FAF7F2] shadow-xs border-l border-[#E2DDD7] opacity-80" />
              <div className="pointer-events-none absolute -right-1.5 inset-y-5 w-2 rounded-r-xs bg-[#FAF7F2] shadow-xs border-r border-[#E2DDD7] opacity-80" />

              {/* Book Headband (classic fabric strip at top spine) */}
              <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 z-25 h-1.5 w-6 rounded-t-full bg-gradient-to-r from-[#D8A77E] via-[#FCECEF] to-[#D8A77E] shadow-xs" />

              {/* Bookmark Ribbon hanging down from spine */}
              <div className="pointer-events-none absolute -top-3 left-1/2 z-30 h-11 w-3.5 -translate-x-1/2 rounded-t-sm bg-gradient-to-b from-[#C93B60] to-[#A02848] drop-shadow-[2px_3px_5px_rgba(0,0,0,0.25)]">
                <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[7px] border-l-[#A02848] border-r-[7px] border-r-[#A02848] border-b-[7px] border-b-transparent" />
              </div>

              {/* Outer Pink Hardback Cover (Takes the EXACT curved open book shape) */}
              <div
                className="relative aspect-[16/11] w-full bg-[#F5DDE2] p-2 sm:p-2.5"
                style={{ clipPath: "url(#open-book-clip)" }}
              >
                {/* Stacked Ivory Page Edge Rim (Takes the same curved book shape) */}
                <div
                  className="relative h-full w-full bg-[#FAF7F2] p-1 sm:p-1.5"
                  style={{ clipPath: "url(#open-book-clip)" }}
                >
                  {/* Inner Book Page Spread with Video */}
                  <div
                    className="relative h-full w-full overflow-hidden bg-zinc-900"
                    style={{ clipPath: "url(#open-book-clip)" }}
                  >
                    {/* Autoplay & Muted Video */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source
                        src="https://res.cloudinary.com/dvjslohdt/video/upload/v1794380405/hero_kntoeu.mp4"
                        type="video/mp4"
                      />
                    </video>

                    {/* Editorial Running Heads (Top Headers on Left & Right Pages) */}
                    <span className="pointer-events-none absolute top-3 left-4 z-20 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Book Corner • Vol. I
                    </span>
                    <span className="pointer-events-none absolute top-3 right-4 z-20 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Discover Stories
                    </span>

                    {/* Folio Page Numbers (Bottom Corners) */}
                    <span className="pointer-events-none absolute bottom-3 left-4 z-20 text-[9px] sm:text-[10px] font-mono text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      01
                    </span>
                    <span className="pointer-events-none absolute bottom-3 right-4 z-20 text-[9px] sm:text-[10px] font-mono text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      02
                    </span>

                    {/* Hairline Ruling Margin (luxury illustrated book framing) */}
                    <div className="pointer-events-none absolute inset-y-2.5 left-2.5 right-[51%] rounded-sm border border-white/10" />
                    <div className="pointer-events-none absolute inset-y-2.5 left-[51%] right-2.5 rounded-sm border border-white/10" />

                    {/* Dampened Center Spine Crease */}
                    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-14 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent" />

                    {/* Subtle Curvature Lighting / Highlights on each page mound */}
                    <div className="pointer-events-none absolute inset-y-0 left-[24%] z-10 w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 left-[76%] z-10 w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
