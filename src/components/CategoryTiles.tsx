import Image from "next/image";
import Link from "next/link";
import ShopSectionBar from "@/components/ShopSectionBar";
import { categories } from "@/data/products";

export default function CategoryTiles() {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <ShopSectionBar title="Shop by Category" />
      <div className="grid grid-cols-3 gap-3 p-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-center transition-colors hover:border-brand-red/50 hover:bg-brand-red/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-red/60 dark:hover:bg-zinc-800"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="56px"
                className="object-cover transition-transform group-hover:scale-110"
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
