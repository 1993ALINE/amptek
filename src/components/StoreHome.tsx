import BannerCarousel from "@/components/BannerCarousel";
import CategorySidebar from "@/components/CategorySidebar";
import CategoryTiles from "@/components/CategoryTiles";
import FlashDeals from "@/components/FlashDeals";
import ProductListing from "@/components/ProductListing";
import PromoTiles from "@/components/PromoTiles";
import TrustStrip from "@/components/TrustStrip";
import Reveal from "@/components/Reveal";
import { getFeaturedProducts, getFlashDeals, getNewArrivals } from "@/lib/catalog";

// The bdshop-style storefront. Used as the site homepage (/).
// Reads its product grids live from Supabase so admin edits show up immediately.
export default async function StoreHome() {
  const [featuredProducts, newArrivals, flashDeals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getFlashDeals(),
  ]);

  return (
    <div className="surface-mesh relative bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
        {/* Top row: category sidebar + banner carousel + promo tiles.
            At lg the three columns stretch to equal height (sidebar, banner,
            promo all align top and bottom); grid-rows-1 makes the banner/promo
            cell fill that height so the banner covers it and the promo tiles
            split it evenly. Below lg they stack. */}
        <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
          <CategorySidebar className="hidden lg:block" />
          <div className="grid gap-4 lg:grid-cols-[1fr_240px] lg:grid-rows-1">
            <BannerCarousel />
            <PromoTiles />
          </div>
        </div>

        <Reveal>
          <CategoryTiles />
        </Reveal>
        <Reveal>
          <FlashDeals products={flashDeals} />
        </Reveal>
        <Reveal>
          <ProductListing title="Featured Products" products={featuredProducts} color="blue" />
        </Reveal>
        <Reveal>
          <ProductListing title="New Arrivals" products={newArrivals} color="red" />
        </Reveal>
        <Reveal>
          <TrustStrip />
        </Reveal>
      </main>
    </div>
  );
}
