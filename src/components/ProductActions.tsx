"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    // Briefly confirm, then revert the button label.
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Quantity
        </span>
        <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-2 text-lg leading-none text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="px-3 py-2 text-lg leading-none text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-lg bg-brand-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark active:bg-brand-blue-dark sm:flex-none"
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
        <Link
          href="/cart"
          className="flex-1 rounded-lg border border-zinc-300 px-6 py-3 text-center text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:flex-none"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
