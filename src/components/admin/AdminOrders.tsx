"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/data/products";
import { ORDER_STATUSES, type OrderRow, type OrderStatus } from "@/lib/order-types";

// Tailwind classes per status, used for the colored status pill / select.
const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  confirmed:
    "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300",
  shipped:
    "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300",
  delivered:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  cancelled:
    "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
};

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    // No synchronous setState before the await, so this is safe in an effect.
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setLoadError(error.message);
      setOrders([]);
    } else {
      setLoadError(null);
      setOrders((data as OrderRow[] | null) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time fetch of orders on mount; state is set after the awaited query resolves
    fetchOrders();
  }, [fetchOrders]);

  async function changeStatus(id: string, status: OrderStatus) {
    setUpdatingId(id);
    setUpdateError(null);
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    setUpdatingId(null);
    if (error) {
      setUpdateError(`Could not update order: ${error.message}`);
      return;
    }
    // Reflect the change locally without refetching (keeps row order + expansion).
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  function toggleExpand(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Orders</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {orders.length} order{orders.length === 1 ? "" : "s"} · newest first.
        </p>
      </div>

      {updateError && (
        <p
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
        >
          {updateError}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
        {loading ? (
          <p className="p-8 text-center text-sm text-zinc-500">Loading orders…</p>
        ) : loadError ? (
          <p className="p-8 text-center text-sm text-rose-600">Failed to load: {loadError}</p>
        ) : orders.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60">
                <tr>
                  <th className="w-8 px-4 py-3" />
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {orders.map((order) => {
                  const expanded = expandedId === order.id;
                  return (
                    <FragmentRow
                      key={order.id}
                      order={order}
                      expanded={expanded}
                      updating={updatingId === order.id}
                      onToggle={() => toggleExpand(order.id)}
                      onStatusChange={(status) => changeStatus(order.id, status)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FragmentRow({
  order,
  expanded,
  updating,
  onToggle,
  onStatusChange,
}: {
  order: OrderRow;
  expanded: boolean;
  updating: boolean;
  onToggle: () => void;
  onStatusChange: (status: OrderStatus) => void;
}) {
  return (
    <>
      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
        <td className="px-4 py-3 align-top">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse order" : "Expand order"}
            className="grid h-6 w-6 place-items-center rounded text-zinc-500 transition-colors hover:bg-zinc-200/60 dark:hover:bg-zinc-700"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${expanded ? "rotate-90" : ""}`}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </td>
        <td className="px-4 py-3 align-top font-mono text-xs font-semibold text-brand-blue dark:text-brand-red">
          {order.order_number}
        </td>
        <td className="px-4 py-3 align-top">
          <div className="font-medium text-zinc-900 dark:text-white">{order.customer_name}</div>
          <div className="text-xs text-zinc-400">{order.customer_phone}</div>
        </td>
        <td className="px-4 py-3 align-top font-medium text-zinc-900 dark:text-white">
          {formatPrice(Number(order.total))}
        </td>
        <td className="px-4 py-3 align-top text-zinc-600 dark:text-zinc-300">
          {order.payment_method}
        </td>
        <td className="px-4 py-3 align-top">
          <select
            value={order.status}
            disabled={updating}
            onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize outline-none transition focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-60 ${STATUS_STYLES[order.status]}`}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-white capitalize text-zinc-900">
                {s}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">
          {formatDate(order.created_at)}
        </td>
      </tr>

      {expanded && (
        <tr className="bg-zinc-50/70 dark:bg-zinc-900/40">
          <td />
          <td colSpan={6} className="px-4 pb-5 pt-1">
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              {/* Items */}
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                  Items
                </h3>
                <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
                  {order.items.map((item, i) => (
                    <li
                      key={`${item.id}-${i}`}
                      className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                    >
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {item.name}
                        <span className="text-zinc-400"> × {item.quantity}</span>
                        <span className="ml-2 text-xs text-zinc-400">
                          @ {formatPrice(Number(item.unitPrice))}
                        </span>
                      </span>
                      <span className="shrink-0 font-medium text-zinc-900 dark:text-white">
                        {formatPrice(Number(item.lineTotal))}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-end gap-6 px-1 text-sm">
                  <span className="text-zinc-500">
                    Subtotal:{" "}
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {formatPrice(Number(order.subtotal))}
                    </span>
                  </span>
                  <span className="text-zinc-900 dark:text-white">
                    Total: <span className="font-bold">{formatPrice(Number(order.total))}</span>
                  </span>
                </div>
              </div>

              {/* Shipping / contact */}
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                  Shipping
                </h3>
                <div className="rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <p className="font-medium text-zinc-900 dark:text-white">{order.customer_name}</p>
                  <p>{order.shipping_address}</p>
                  <p>{order.shipping_city}</p>
                  <p className="mt-1">{order.customer_phone}</p>
                  <p className="break-all">{order.customer_email}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
