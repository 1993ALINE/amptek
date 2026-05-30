import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { featuredProducts } from "@/data/products";
import Reveal from "@/components/Reveal";

export default function FeaturedStrip() {
  const products = featuredProducts.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="From Our Shop"
          title="Featured Products"
          subtitle="Quality electrical and safety products available to order online."
        />
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-lg border border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue transition-all hover:bg-brand-blue hover:text-white hover:shadow-md dark:border-zinc-600 dark:text-white"
        >
          Browse the Shop
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <Reveal className="mt-10" delay={100}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            // No Add-to-Cart here — cards link into the shop where the cart lives.
            <ProductCard key={product.id} product={product} showAddToCart={false} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
