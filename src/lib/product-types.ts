// Neutral (no server/client-only imports) types for the Supabase `products`
// table, shared by the server catalog layer and the client admin panel.

// Which homepage collection a product belongs to.
export type Collection = "featured" | "new_arrival";

// A raw row from the Supabase `products` table (snake_case, as stored).
export type ProductRow = {
  id: string;
  name: string;
  price: number;
  discount_price: number | null;
  image: string;
  category: string;
  description: string | null;
  collection: Collection;
  is_flash_deal: boolean;
  sort_order: number;
};
