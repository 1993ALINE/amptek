import { createServerSupabase } from "@/lib/supabase-server";
import type { Product } from "@/data/products";
import type { ProductRow } from "@/lib/product-types";

export type { Collection, ProductRow } from "@/lib/product-types";

// Map a DB row to the UI `Product` shape the existing components expect.
export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    discountPrice: row.discount_price == null ? undefined : Number(row.discount_price),
    image: row.image,
    category: row.category,
    description: row.description ?? undefined,
  };
}

// Columns selected for store reads. Listed explicitly so the shape is stable.
const COLUMNS =
  "id, name, price, discount_price, image, category, description, collection, is_flash_deal, sort_order";

/** Featured collection, ordered for the homepage grid. */
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .eq("collection", "featured")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getFeaturedProducts:", error.message);
    return [];
  }
  return ((data as ProductRow[] | null) ?? []).map(rowToProduct);
}

/** New-arrival collection, ordered for the homepage grid. */
export async function getNewArrivals(): Promise<Product[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .eq("collection", "new_arrival")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getNewArrivals:", error.message);
    return [];
  }
  return ((data as ProductRow[] | null) ?? []).map(rowToProduct);
}

/** The curated flash-deal subset. */
export async function getFlashDeals(): Promise<Product[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .eq("is_flash_deal", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getFlashDeals:", error.message);
    return [];
  }
  return ((data as ProductRow[] | null) ?? []).map(rowToProduct);
}

/** All products in a given category (matched by category name). */
export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .eq("category", categoryName)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getProductsByCategory:", error.message);
    return [];
  }
  return ((data as ProductRow[] | null) ?? []).map(rowToProduct);
}

/** Look up a single product by id. Returns null when not found. */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getProductById:", error.message);
    return null;
  }
  return data ? rowToProduct(data as ProductRow) : null;
}

/** Find products whose name or category matches the query (case-insensitive). */
export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  // Strip characters that have meaning in PostgREST's `or` filter grammar.
  const safe = q.replace(/[%,()]/g, " ").trim();
  if (!safe) return [];
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .or(`name.ilike.%${safe}%,category.ilike.%${safe}%`)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("searchProducts:", error.message);
    return [];
  }
  return ((data as ProductRow[] | null) ?? []).map(rowToProduct);
}
