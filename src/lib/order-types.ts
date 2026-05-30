// Neutral (no server/client-only imports) types for the Supabase `orders`
// table, shared by checkout (insert) and the admin panel (read/update).

// A line item as stored in the `items` jsonb column.
export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

// Order lifecycle. Order matters: the admin advances a status along this list.
export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

// A raw row from the Supabase `orders` table (snake_case, as stored).
export type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  shipping_address: string;
  shipping_city: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  payment_method: string;
  status: OrderStatus;
  created_at: string;
};
