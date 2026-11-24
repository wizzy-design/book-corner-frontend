import Link from "next/link";
import { MapPin, Sparkles } from "lucide-react";

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

      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink px-3.5 py-1 text-xs font-semibold text-brand-pink-dark ring-1 ring-inset ring-brand-pink-dark/20">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Jos, Nigeria • Nationwide Delivery</span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Affordable books &amp; accessories.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg">
            Discover curated fiction, self-help, and more. Based in Jos,
            Nigeria — delivering your next great read nationwide to your
            doorstep.
          </p>

          {/* 2 Centered CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-95"
            >
              Browse Books
            </a>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-pink px-6 py-3 text-sm font-semibold text-brand-pink-dark ring-1 ring-inset ring-brand-pink-dark/25 shadow-xs transition-all hover:bg-brand-pink-hover active:scale-95"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Reading Quiz</span>
            </Link>
          </div>

          {/* Centered Open Book Frame */}
          <div className="relative mt-12 flex w-full justify-center">
            <div className="pointer-events-none absolute -inset-6 mx-auto max-w-[500px] rounded-3xl bg-brand-pink/70 blur-3xl opacity-70" aria-hidden="true" />

            <div className="relative w-full max-w-[460px] drop-shadow-[-8px_20px_25px_rgba(0,0,0,0.18)] drop-shadow-[0_8px_16px_rgba(224,83,117,0.16)] [transform:perspective(1200px)_rotateX(4deg)_rotateZ(-2.5deg)] hover:[transform:perspective(1200px)_rotateX(0deg)_rotateZ(0deg)] transition-transform duration-500 ease-out">
              <div className="pointer-events-none absolute -left-1.5 inset-y-5 w-2 rounded-l-xs bg-book-page shadow-xs border-l border-book-page-border opacity-80" />
              <div className="pointer-events-none absolute -right-1.5 inset-y-5 w-2 rounded-r-xs bg-book-page shadow-xs border-r border-book-page-border opacity-80" />

              <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 z-25 h-1.5 w-6 rounded-t-full bg-gradient-to-r from-book-headband-edge via-book-headband-center to-book-headband-edge shadow-xs" />

              <div className="pointer-events-none absolute -top-3 left-1/2 z-30 h-11 w-3.5 -translate-x-1/2 rounded-t-sm bg-gradient-to-b from-book-ribbon-from to-book-ribbon-to drop-shadow-[2px_3px_5px_rgba(0,0,0,0.25)]">
                <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[7px] border-l-book-ribbon-to border-r-[7px] border-r-book-ribbon-to border-b-[7px] border-b-transparent" />
              </div>

              <div
                className="relative aspect-[16/11] w-full bg-book-cover p-2 sm:p-2.5"
                style={{ clipPath: "url(#open-book-clip)" }}
              >
                <div
                  className="relative h-full w-full bg-book-page p-1 sm:p-1.5"
                  style={{ clipPath: "url(#open-book-clip)" }}
                >
                  <div
                    className="relative h-full w-full overflow-hidden bg-zinc-900"
                    style={{ clipPath: "url(#open-book-clip)" }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    >
                      <source
                        src="https://res.cloudinary.com/dvjslohdt/video/upload/v1794380405/hero_kntoeu.mp4"
                        type="video/mp4"
                      />
                    </video>

                    <span className="pointer-events-none absolute top-3 left-4 z-20 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Book Corner • Vol. I
                    </span>
                    <span className="pointer-events-none absolute top-3 right-4 z-20 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Discover Stories
                    </span>

                    <span className="pointer-events-none absolute bottom-3 left-4 z-20 text-[9px] sm:text-[10px] font-mono text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      01
                    </span>
                    <span className="pointer-events-none absolute bottom-3 right-4 z-20 text-[9px] sm:text-[10px] font-mono text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      02
                    </span>

                    <div className="pointer-events-none absolute inset-y-2.5 left-2.5 right-[51%] rounded-sm border border-white/10" />
                    <div className="pointer-events-none absolute inset-y-2.5 left-[51%] right-2.5 rounded-sm border border-white/10" />

                    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-14 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
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
