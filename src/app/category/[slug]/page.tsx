import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import ShopSectionBar from "@/components/ShopSectionBar";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/data/products";

// Pre-render a page for every category.
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? `${category.name} — Shop` : "Category",
    description: category
      ? `Browse ${category.name} products from Amptek Engineering.`
      : undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.name);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
          <Link href="/" className="hover:text-brand-blue">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200">{category.name}</span>
        </nav>

        {/* Store layout: category sidebar + filtered listing */}
        <div className="grid items-start gap-4 lg:grid-cols-[240px_1fr]">
          <CategorySidebar className="hidden lg:block" activeSlug={category.slug} />

          <section className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
            <ShopSectionBar
              title={category.name}
              right={
                <span className="text-sm font-medium">
                  {products.length} product{products.length === 1 ? "" : "s"}
                </span>
              }
            />

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} dense />
                ))}
              </div>
            ) : (
              <p className="p-8 text-center text-zinc-500">
                No products in this category yet.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
