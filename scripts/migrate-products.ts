/**
 * One-time migration: seed the Supabase `products` table from the static data
 * in src/data/products.ts.
 *
 * RLS allows writes only for authenticated users, so this script signs in with
 * an admin email/password (create the user first in the Supabase dashboard:
 * Authentication → Users → Add user) before inserting.
 *
 * Run it (PowerShell or any shell), from the project root:
 *
 *   npx tsx scripts/migrate-products.ts <admin-email> <admin-password>
 *
 * It reads NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY from
 * .env.local. The upsert is keyed on `id`, so re-running is safe (idempotent).
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import {
  featuredProducts,
  newArrivals,
  flashDeals,
  productDescriptions,
  type Product,
} from "../src/data/products";

type Collection = "featured" | "new_arrival";

type ProductRow = {
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

const flashDealIds = new Set(flashDeals.map((p) => p.id));

function toRows(products: Product[], collection: Collection): ProductRow[] {
  return products.map((p, i) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    discount_price: p.discountPrice ?? null,
    image: p.image,
    category: p.category,
    description: productDescriptions[p.id] ?? null,
    collection,
    is_flash_deal: flashDealIds.has(p.id),
    sort_order: i + 1,
  }));
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const email = process.argv[2] ?? process.env.ADMIN_EMAIL;
  const password = process.argv[3] ?? process.env.ADMIN_PASSWORD;

  if (!url || !anonKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.");
    process.exit(1);
  }
  if (!email || !password) {
    console.error(
      "Usage: npx tsx scripts/migrate-products.ts <admin-email> <admin-password>\n" +
        "(or set ADMIN_EMAIL / ADMIN_PASSWORD env vars). The user must exist in Supabase Auth."
    );
    process.exit(1);
  }

  const rows = [...toRows(featuredProducts, "featured"), ...toRows(newArrivals, "new_arrival")];

  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });

  console.log(`Signing in as ${email} …`);
  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) {
    console.error("Sign-in failed:", authError.message);
    process.exit(1);
  }

  console.log(`Upserting ${rows.length} products …`);
  const { data, error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "id" })
    .select("id");

  if (error) {
    console.error("Upsert failed:", error.message);
    process.exit(1);
  }

  console.log(`✓ Done. ${data?.length ?? 0} products written.`);
  console.log(`  ${flashDealIds.size} flagged as flash deals.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
