// A placed-order snapshot, persisted to sessionStorage so the confirmation
// page can show it after the cart has been cleared. No backend — mock flow only.

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

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
