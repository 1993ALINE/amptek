import type { ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";

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
  const bg =
    color === "red"
      ? "bg-gradient-to-r from-brand-red to-brand-red-dark"
      : "bg-gradient-to-r from-brand-blue to-brand-blue-dark";

  return (
    <div
      className={`sheen-top relative flex items-center justify-between gap-3 overflow-hidden px-4 py-2.5 text-white ${bg}`}
    >
      <h2 className="relative flex items-center gap-2.5 text-base font-bold sm:text-lg">
        <span aria-hidden className="h-4 w-1 rounded-full bg-white/80" />
        {icon}
        {title}
      </h2>
      {right ?? (
        <a
          href={href}
          className="relative inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-white"
        >
          View All
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
