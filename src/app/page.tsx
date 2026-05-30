import StoreHome from "@/components/StoreHome";

// Product grids are read live from Supabase, so render per-request.
export const dynamic = "force-dynamic";

// The storefront is now the site homepage.
export default function Home() {
  return <StoreHome />;
}
