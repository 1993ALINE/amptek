import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { categories } from "@/data/products";

// Left vertical category list (bdshop-style). Each entry links to its
// /category/[slug] page; the current category is highlighted via activeSlug.
export default function CategorySidebar({
  className = "",
  activeSlug,
}: {
  className?: string;
  activeSlug?: string;
}) {
  return (
    <aside className={className}>
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="bg-brand-blue px-4 py-2.5 text-sm font-bold text-white">
          All Categories
        </div>
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`group flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-brand-red/5 font-semibold text-brand-red"
                      : "text-zinc-700 hover:bg-brand-red/5 hover:text-brand-red dark:text-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                    <Image src={category.image} alt={category.name} fill sizes="28px" className="object-cover" />
                  </span>
                  <span className="flex-1 leading-tight">{category.name}</span>
                  <ChevronRightIcon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-brand-red" : "text-zinc-300 group-hover:text-brand-red"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
