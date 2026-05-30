import type { Metadata } from "next";
import Link from "next/link";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import ShopSectionBar from "@/components/ShopSectionBar";
import { searchProducts } from "@/lib/catalog";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  return { title: query ? `Results for “${query}”` : "Search" };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="surface-mesh relative bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
          <Link href="/" className="hover:text-brand-blue">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200">Search</span>
        </nav>

        <div className="grid items-start gap-4 lg:grid-cols-[240px_1fr]">
          <CategorySidebar className="hidden lg:block" />

          <section className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
            <ShopSectionBar
              title={query ? `Results for “${query}”` : "Search"}
              right={
                query ? (
                  <span className="text-sm font-medium">
                    {results.length} product{results.length === 1 ? "" : "s"}
                  </span>
                ) : (
                  false
                )
              }
            />

            {query && results.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} dense />
                ))}
              </div>
            ) : (
              <p className="p-10 text-center text-zinc-500">
                {query
                  ? `No products match “${query}”. Try a different name or category.`
                  : "Type a product name or category to search."}
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
