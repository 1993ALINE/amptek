import BannerCarousel from "@/components/BannerCarousel";
import CategorySidebar from "@/components/CategorySidebar";
import CategoryTiles from "@/components/CategoryTiles";
import FlashDeals from "@/components/FlashDeals";
import ProductListing from "@/components/ProductListing";
import PromoTiles from "@/components/PromoTiles";
import TrustStrip from "@/components/TrustStrip";
import { featuredProducts, newArrivals } from "@/data/products";

// The bdshop-style storefront. Used as the site homepage (/).
export default function StoreHome() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
        {/* Top row: category sidebar + banner carousel + promo tiles.
            items-start keeps the sidebar's top edge aligned with the banner. */}
        <div className="grid items-start gap-4 lg:grid-cols-[240px_1fr]">
          <CategorySidebar className="hidden lg:block" />
          <div className="grid gap-4 sm:grid-cols-[1fr_240px]">
            <BannerCarousel />
            <PromoTiles />
          </div>
        </div>

        <CategoryTiles />
        <FlashDeals />
        <ProductListing title="Featured Products" products={featuredProducts} color="blue" />
        <ProductListing title="New Arrivals" products={newArrivals} color="red" />
        <TrustStrip />
      </main>
    </div>
  );
}
