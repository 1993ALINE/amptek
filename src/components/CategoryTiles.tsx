import Image from "next/image";
import Link from "next/link";
import ShopSectionBar from "@/components/ShopSectionBar";
import { categories } from "@/data/products";

export default function CategoryTiles() {
  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
      <ShopSectionBar title="Shop by Category" />
      <div className="grid grid-cols-3 gap-3 p-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center gap-2 rounded-xl border border-zinc-200/80 bg-white p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-red/40 hover:bg-brand-red/[0.04] hover:shadow-soft dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-red/60 dark:hover:bg-zinc-800"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-inset ring-zinc-200/70 transition-all duration-300 group-hover:ring-2 group-hover:ring-brand-red/30 dark:bg-zinc-800 dark:ring-zinc-700">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="56px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xs font-medium leading-tight text-zinc-700 dark:text-zinc-200">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
