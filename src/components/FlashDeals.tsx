"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ShopSectionBar from "@/components/ShopSectionBar";
import { flashDeals } from "@/data/products";

// Countdown to the next midnight — gives the strip a live "deal ends in" timer.
function useCountdown() {
  const [remaining, setRemaining] = useState<string>("--:--:--");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0); // next midnight
      const diff = Math.max(0, end.getTime() - now.getTime());

      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setRemaining(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return remaining;
}

export default function FlashDeals() {
  const remaining = useCountdown();

  const countdown = (
    <span className="flex items-center gap-2 text-sm font-medium">
      <span className="hidden sm:inline">Ends in</span>
      <span className="rounded-md bg-white px-2 py-1 font-mono text-brand-red tabular-nums">
        {remaining}
      </span>
    </span>
  );

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <ShopSectionBar
        title="Flash Deals"
        icon={<span aria-hidden>⚡</span>}
        color="red"
        right={countdown}
      />

      {/* Horizontal scroll strip */}
      <div className="flex gap-3 overflow-x-auto p-3 [scrollbar-width:thin]">
        {flashDeals.map((product) => (
          <div key={product.id} className="w-36 shrink-0 sm:w-40">
            <ProductCard product={product} dense />
          </div>
        ))}
      </div>
    </section>
  );
}
