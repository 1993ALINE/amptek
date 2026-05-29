"use client";

import Image from "next/image";
import Link from "next/link";
import { effectivePrice, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, setQuantity, removeItem, clear, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-zinc-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand-red px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
          Shopping Cart{" "}
          <span className="text-base font-normal text-zinc-500">
            ({totalItems} item{totalItems === 1 ? "" : "s"})
          </span>
        </h1>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-medium text-zinc-500 hover:text-rose-600"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        {/* Line items */}
        <ul className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
          {items.map(({ product, quantity }) => {
            const unit = effectivePrice(product);
            return (
              <li key={product.id} className="flex gap-4 py-4">
                <Link
                  href={`/product/${product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-1">
                  <Link
                    href={`/product/${product.id}`}
                    className="font-medium text-zinc-900 hover:text-brand-blue dark:text-zinc-100"
                  >
                    {product.name}
                  </Link>
                  <span className="text-xs uppercase tracking-wide text-zinc-400">
                    {product.category}
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {formatPrice(unit)}
                    {product.discountPrice && (
                      <span className="ml-2 text-xs font-normal text-zinc-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </span>

                  {/* Quantity controls */}
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        className="px-3 py-1.5 text-lg leading-none text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                        className="px-3 py-1.5 text-lg leading-none text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-sm font-medium text-zinc-500 hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="text-right font-bold text-zinc-900 dark:text-white">
                  {formatPrice(unit * quantity)}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-300">
            <span>Subtotal ({totalItems} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-zinc-600 dark:text-zinc-300">
            <span>Shipping</span>
            <span className="text-emerald-600">Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-base font-bold text-zinc-900 dark:border-zinc-800 dark:text-white">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-lg bg-brand-red py-3 font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            Proceed to Checkout
          </button>
          <Link
            href="/"
            className="mt-3 block text-center text-sm font-medium text-brand-blue hover:underline dark:text-brand-red"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
