"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/data/products";
import { loadOrder, type Order } from "@/lib/order";

export default function CheckoutSuccessPage() {
  // Single state so the storage read is one setState call. Read happens in an
  // effect (not a lazy initializer) so server/first client render agree, avoiding
  // a hydration mismatch; sessionStorage is client-only.
  const [state, setState] = useState<{ order: Order | null; loaded: boolean }>({
    order: null,
    loaded: false,
  });
  const { order, loaded } = state;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of client-only sessionStorage
    setState({ order: loadOrder(), loaded: true });
  }, []);

  if (!loaded) {
    return <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6" />;
  }

  // No order found (e.g. visited directly) — gentle fallback.
  if (!order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          No recent order
        </h1>
        <p className="mt-2 text-zinc-500">
          We couldn&apos;t find an order to confirm.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand-red px-6 py-3 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-md"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Confirmation header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Thank you, {order.customer.name.split(" ")[0] || "there"}. Your order has been placed.
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Order number:{" "}
          <span className="font-mono font-semibold text-brand-blue dark:text-brand-red">
            {order.orderNumber}
          </span>
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-card dark:border-zinc-800 dark:bg-zinc-900">
        {/* Items */}
        <div className="p-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-500">
            Items
          </h2>
          <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 py-2 text-sm">
                <span className="text-zinc-700 dark:text-zinc-300">
                  {item.name}
                  <span className="text-zinc-400"> × {item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-zinc-900 dark:text-white">
                  {formatPrice(item.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-base font-bold text-zinc-900 dark:border-zinc-800 dark:text-white">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Shipping + payment recap */}
        <div className="grid gap-6 border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-500">
              Shipping To
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {order.customer.name}
              <br />
              {order.customer.address}
              <br />
              {order.customer.city}
              <br />
              {order.customer.phone}
              <br />
              {order.customer.email}
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-500">
              Payment Method
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {order.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg bg-brand-red px-8 py-3 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
