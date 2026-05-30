// A placed-order snapshot, persisted to sessionStorage so the confirmation page
// can show it after the cart has been cleared. The order is also saved to the
// Supabase `orders` table at checkout; this snapshot just drives the success page.

import type { OrderItem } from "@/lib/order-types";

export type { OrderItem } from "@/lib/order-types";

export type Order = {
  orderNumber: string;
  placedAt: string;
  paymentMethod: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  items: OrderItem[];
  total: number;
};

const STORAGE_KEY = "amptek-last-order";

export function saveOrder(order: Order): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Storage unavailable (private mode) — confirmation will fall back gracefully.
  }
}

export function loadOrder(): Order | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
