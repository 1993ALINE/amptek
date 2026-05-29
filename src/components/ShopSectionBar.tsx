import type { ReactNode } from "react";

// Colored section-header bar used across the shop: title on the left, a
// "View All" link (or custom node) on the right. Pair with a bordered panel
// for the bdshop-style boxed sections.
export default function ShopSectionBar({
  title,
  icon,
  href = "#",
  color = "blue",
  right,
}: {
  title: string;
  icon?: ReactNode;
  href?: string;
  color?: "blue" | "red";
  /** Overrides the default "View All" link (e.g. a countdown). */
  right?: ReactNode;
}) {
  const bg = color === "red" ? "bg-brand-red" : "bg-brand-blue";

  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-2.5 text-white ${bg}`}>
      <h2 className="flex items-center gap-2 text-base font-bold sm:text-lg">
        {icon}
        {title}
      </h2>
      {right ?? (
        <a href={href} className="text-sm font-medium text-white/90 transition-colors hover:text-white">
          View All
        </a>
      )}
    </div>
  );
}
