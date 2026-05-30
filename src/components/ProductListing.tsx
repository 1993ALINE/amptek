"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ShopSectionBar from "@/components/ShopSectionBar";
import { discountPercent, effectivePrice, type Product } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "discount";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

export default function ProductListing({
  title,
  products,
  color = "blue",
}: {
  title: string;
  products: Product[];
  color?: "blue" | "red";
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const visible = useMemo(() => {
    const list = onSaleOnly
      ? products.filter((p) => discountPercent(p.price, p.discountPrice) !== null)
      : [...products];

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "discount":
        list.sort(
          (a, b) =>
            (discountPercent(b.price, b.discountPrice) ?? 0) -
            (discountPercent(a.price, a.discountPrice) ?? 0)
        );
        break;
    }
    return list;
  }, [products, sort, onSaleOnly]);

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
      <ShopSectionBar title={title} color={color} />

      {/* Sort / filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-4 py-2.5 dark:border-zinc-800">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {visible.length} product{visible.length === 1 ? "" : "s"}
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex cursor-pointer items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={(e) => setOnSaleOnly(e.target.checked)}
              className="h-4 w-4 accent-brand-red"
            />
            On sale
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <span className="text-zinc-500 dark:text-zinc-400">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-sm shadow-sm outline-none transition hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-800"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Dense grid — even gaps, equal-height cards */}
      <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} dense />
        ))}
      </div>
    </section>
  );
}
