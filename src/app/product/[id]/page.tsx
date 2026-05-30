import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";
import Reveal from "@/components/Reveal";
import { discountPercent, formatPrice } from "@/data/products";
import { getProductById } from "@/lib/catalog";

// Products come from Supabase, so render per-request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: product ? `${product.name} — Amptek` : "Product — Amptek",
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const { name, price, discountPrice, image, category, description } = product;
  const percentOff = discountPercent(price, discountPrice);
  const hasDiscount = percentOff !== null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/" className="hover:text-brand-blue">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{category}</span>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200">{name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Large image */}
        <Reveal className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 shadow-soft ring-1 ring-inset ring-black/5 dark:border-zinc-800 dark:bg-zinc-800 dark:ring-white/5">
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {hasDiscount && (
            <span className="absolute left-4 top-4 rounded-md bg-gradient-to-br from-brand-red to-brand-red-dark px-3 py-1.5 text-sm font-bold text-white shadow ring-1 ring-inset ring-white/15">
              -{percentOff}% OFF
            </span>
          )}
        </Reveal>

        {/* Details */}
        <Reveal delay={100} className="flex flex-col gap-5">
          <div>
            <span className="text-sm font-medium uppercase tracking-wide text-brand-blue dark:text-brand-red">
              {category}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              {name}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              {formatPrice(hasDiscount ? discountPrice! : price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-zinc-400 line-through">
                  {formatPrice(price)}
                </span>
                <span className="rounded-md bg-rose-100 px-2 py-0.5 text-sm font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Save {formatPrice(price - discountPrice!)}
                </span>
              </>
            )}
          </div>

          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>

          <div className="mt-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <ProductActions product={product} />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
