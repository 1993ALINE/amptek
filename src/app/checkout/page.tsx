"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/context/CartContext";
import { effectivePrice, formatPrice } from "@/data/products";
import { saveOrder, type Order } from "@/lib/order";
import { supabase } from "@/lib/supabase";

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay with cash when your order arrives.",
    available: true,
  },
  {
    id: "bkash",
    label: "bKash",
    description: "Mobile payment — coming soon.",
    available: false,
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Mobile payment — coming soon.",
    available: false,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalItems, clear } = useCart();
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);

  // Empty cart (and not mid-submit) — nothing to check out.
  if (items.length === 0 && !placing) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-zinc-500">Add some products before checking out.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand-red px-6 py-3 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-md"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const method = PAYMENT_METHODS.find((m) => m.id === payment);
    const order: Order = {
      orderNumber: `AMP-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      paymentMethod: method?.label ?? "Cash on Delivery",
      customer: {
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        address: get("address"),
        city: get("city"),
      },
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        unitPrice: effectivePrice(i.product),
        lineTotal: effectivePrice(i.product) * i.quantity,
      })),
      total: subtotal,
    };

    setPlacing(true);

    // Persist the order to Supabase (anon insert is allowed by RLS). `status`
    // defaults to 'pending' and `created_at` is set server-side. The success
    // page still reads from sessionStorage, so a failed insert won't block the
    // customer's confirmation — we just log it.
    const { error } = await supabase.from("orders").insert({
      order_number: order.orderNumber,
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_email: order.customer.email,
      shipping_address: order.customer.address,
      shipping_city: order.customer.city,
      items: order.items,
      subtotal,
      total: order.total,
      payment_method: order.paymentMethod,
    });
    if (error) {
      console.error("Failed to save order to Supabase:", error.message);
    }

    saveOrder(order);
    clear();
    router.push("/checkout/success");
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600";

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        {/* Left: shipping + payment */}
        <div className="flex flex-col gap-8">
          {/* Shipping / contact */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
              Shipping &amp; Contact
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="City" name="city" autoComplete="address-level2" />
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Address
                </label>
                <textarea id="address" name="address" rows={3} required className={inputClass} />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
              Payment Method
            </h2>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                    payment === m.id
                      ? "border-brand-blue bg-brand-blue/5"
                      : "border-zinc-300 dark:border-zinc-700"
                  } ${m.available ? "" : "cursor-not-allowed opacity-60"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={payment === m.id}
                    disabled={!m.available}
                    onChange={() => m.available && setPayment(m.id)}
                    className="mt-0.5 h-4 w-4 accent-brand-blue"
                  />
                  <span>
                    <span className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
                      {m.label}
                      {!m.available && (
                        <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                          Coming soon
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-zinc-500 dark:text-zinc-400">
                      {m.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right: order summary */}
        <aside className="h-fit rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
            Order Summary
          </h2>

          <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-start justify-between gap-3 py-2 text-sm">
                <span className="text-zinc-700 dark:text-zinc-300">
                  {product.name}
                  <span className="text-zinc-400"> × {quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-zinc-900 dark:text-white">
                  {formatPrice(effectivePrice(product) * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
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
            type="submit"
            className="mt-6 w-full rounded-lg bg-brand-red py-3 font-semibold text-white shadow-sm transition-all hover:bg-brand-red-dark hover:shadow-md active:scale-[0.99]"
          >
            Place Order
          </button>
          <Link
            href="/cart"
            className="mt-3 block text-center text-sm font-medium text-brand-blue hover:underline dark:text-brand-red"
          >
            Back to Cart
          </Link>
        </aside>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
      />
    </div>
  );
}
