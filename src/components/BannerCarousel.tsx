"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { banners } from "@/data/products";

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const count = banners.length;

  const goTo = useCallback((i: number) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance every 5s; reset the timer whenever the slide changes.
  useEffect(() => {
    const timer = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(timer);
  }, [goTo, index]);

  return (
    <section className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-card ring-1 ring-inset ring-black/5 dark:bg-zinc-800 dark:ring-white/10 lg:aspect-auto lg:h-full">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={banner.image}
            alt={banner.title ?? "Amptek Engineering"}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          {!banner.imageOnly && (
            <>
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.accent}`} />
              <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-12">
                <h2 className="max-w-md text-2xl font-bold text-white drop-shadow sm:text-4xl">
                  {banner.title}
                </h2>
                <p className="max-w-sm text-sm text-white/90 sm:text-lg">
                  {banner.subtitle}
                </p>
                <button
                  type="button"
                  className="w-fit rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
                >
                  {banner.cta}
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Prev / next controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/35"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/35"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
