"use client";

import Image from "next/image";
import Link from "next/link";
import { discountPercent, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({
  product,
  showAddToCart = true,
  dense = false,
}: {
  product: Product;
  /** Hide the Add-to-Cart button (e.g. on the corporate homepage teaser strip). */
  showAddToCart?: boolean;
  /** Tighter padding/typography + contained image box for the denser shop grids. */
  dense?: boolean;
}) {
  const { name, price, discountPrice, image, category } = product;
  const { addItem } = useCart();
  const percentOff = discountPercent(price, discountPrice);
  const hasDiscount = percentOff !== null;
  const href = `/product/${product.id}`;

  return (
    <article
      className={`accent-line-top group relative flex h-full flex-col overflow-hidden border border-zinc-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lift dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-blue/50 ${
        dense ? "rounded-xl" : "rounded-2xl"
      }`}
    >
      {dense ? (
        // Shop cards: uniform square box, neutral bg, image contained & centered.
        <Link
          href={href}
          className="relative block aspect-square overflow-hidden border-b border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-800"
        >
          <span className="absolute inset-2.5">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          {hasDiscount && (
            <span className="absolute left-1.5 top-1.5 rounded bg-gradient-to-br from-brand-red to-brand-red-dark px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm ring-1 ring-inset ring-white/15">
              -{percentOff}%
            </span>
          )}
        </Link>
      ) : (
        // Homepage teaser strip: unchanged.
        <Link href={href} className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-md bg-gradient-to-br from-brand-red to-brand-red-dark px-2 py-1 text-xs font-bold text-white shadow-sm ring-1 ring-inset ring-white/15">
              -{percentOff}%
            </span>
          )}
        </Link>
      )}

      <div className={`flex flex-1 flex-col ${dense ? "gap-0.5 p-2" : "gap-1 p-3"}`}>
        <span
          className={`font-medium uppercase tracking-wide text-brand-blue dark:text-brand-red ${
            dense ? "text-[10px]" : "text-xs"
          }`}
        >
          {category}
        </span>
        <Link href={href} className="hover:text-brand-blue dark:hover:text-brand-red">
          <h3
            className={`line-clamp-2 font-medium text-zinc-800 dark:text-zinc-100 ${
              dense ? "text-xs leading-snug" : "text-sm"
            }`}
          >
            {name}
          </h3>
        </Link>

        <div className={`mt-auto flex items-baseline gap-2 ${dense ? "pt-1.5" : "pt-2"}`}>
          <span
            className={`font-bold text-zinc-900 dark:text-white ${
              dense ? "text-sm" : "text-base"
            }`}
          >
            {formatPrice(hasDiscount ? discountPrice! : price)}
          </span>
          {hasDiscount && (
            <span className={`text-zinc-400 line-through ${dense ? "text-xs" : "text-sm"}`}>
              {formatPrice(price)}
            </span>
          )}
        </div>

        {showAddToCart && (
          <button
            type="button"
            onClick={() => addItem(product)}
            className={`w-full rounded-lg bg-gradient-to-b from-brand-blue to-brand-blue-dark font-semibold text-white shadow-sm ring-1 ring-inset ring-white/10 transition-all hover:shadow-md hover:brightness-110 active:scale-[0.99] ${
              dense ? "mt-1.5 py-1.5 text-xs" : "mt-2.5 py-2.5 text-sm"
            }`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
