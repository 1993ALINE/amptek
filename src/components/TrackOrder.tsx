"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/data/products";
import { STATUS_STYLES } from "@/lib/order-status";
import type { TrackedOrder } from "@/lib/order-types";
import { SearchIcon } from "@/components/icons";

type LookupState = "idle" | "loading" | "found" | "notfound" | "error";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TrackOrder() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("order") ?? "";

  const [query, setQuery] = useState(initial);
  const [state, setState] = useState<LookupState>("idle");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const runLookup = useCallback(async (rawNumber: string) => {
    const lookupNumber = rawNumber.trim();
    if (!lookupNumber) return;

    setState("loading");
    setOrder(null);
    setErrorMsg(null);

    const { data, error } = await supabase.rpc("get_order_status", {
      lookup_number: lookupNumber,
    });

    if (error) {
      setErrorMsg(error.message);
      setState("error");
      return;
    }

    // The RPC may return a single row or a one-element set — normalise both.
    const row = (Array.isArray(data) ? data[0] : data) as TrackedOrder | null | undefined;
    if (!row) {
      setState("notfound");
      return;
    }
    setOrder(row);
    setState("found");
  }, []);

  // Auto-look-up when arriving with ?order=AMP-… (e.g. from the success page).
  useEffect(() => {
    if (initial.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time lookup from the URL param; state is set inside the awaited handler
      runLookup(initial);
    }
  }, [initial, runLookup]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runLookup(query);
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} role="search" className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Order number, e.g. AMP-XXXXXX"
            aria-label="Order number"
            className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-9 pr-3 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
          />
        </div>
        <button
          type="submit"
          disabled={state === "loading" || !query.trim()}
          className="rounded-lg bg-gradient-to-b from-brand-blue to-brand-blue-dark px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/10 transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "Checking…" : "Track Order"}
        </button>
      </form>

      {state === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
        >
          Something went wrong while looking up your order. Please try again.
          {errorMsg ? <span className="mt-1 block text-xs opacity-70">{errorMsg}</span> : null}
        </p>
      )}

      {state === "notfound" && (
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 text-center shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
            <SearchIcon className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Order not found</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            We couldn&apos;t find an order with that number. Double-check it and try again —
            it should look like <span className="font-mono">AMP-XXXXXX</span>.
          </p>
        </div>
      )}

      {state === "found" && order && <OrderResult order={order} />}
    </div>
  );
}

function OrderResult({ order }: { order: TrackedOrder }) {
  const isCancelled = order.status === "cancelled";

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-card ring-1 ring-inset ring-black/5 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Order
          </div>
          <div className="font-mono text-lg font-bold text-brand-blue dark:text-brand-red">
            {order.order_number}
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <div className="px-6 py-5">
        <div className="flex flex-wrap justify-between gap-4 text-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Placed
            </div>
            <div className="text-zinc-700 dark:text-zinc-300">{formatDate(order.created_at)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Payment
            </div>
            <div className="text-zinc-700 dark:text-zinc-300">{order.payment_method}</div>
          </div>
        </div>

        {isCancelled && (
          <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <span className="font-semibold">This order was cancelled.</span>
            {order.cancellation_reason ? (
              <span className="mt-1 block">Reason: {order.cancellation_reason}</span>
            ) : null}
          </div>
        )}

        <div className="mt-5">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">Items</h3>
          <ul className="divide-y divide-zinc-100 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {order.items.map((item, i) => (
              <li
                key={`${item.id}-${i}`}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
              >
                <span className="text-zinc-700 dark:text-zinc-300">
                  {item.name}
                  <span className="text-zinc-400"> × {item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-zinc-900 dark:text-white">
                  {formatPrice(Number(item.lineTotal))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-base font-bold text-zinc-900 dark:border-zinc-800 dark:text-white">
          <span>Total</span>
          <span>{formatPrice(Number(order.total))}</span>
        </div>
      </div>
    </div>
  );
}
