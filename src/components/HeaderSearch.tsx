"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SearchIcon } from "@/components/icons";

// Product search field. Submitting (Enter or the icon) navigates to /search?q=...
export default function HeaderSearch({
  className = "",
  autoFocus = false,
  onSubmitted,
}: {
  className?: string;
  autoFocus?: boolean;
  /** Called after a successful submit (e.g. to close the mobile search row). */
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onSubmitted?.();
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative ${className}`}>
      <button
        type="submit"
        aria-label="Search"
        className="absolute left-0 top-0 grid h-full w-9 place-items-center text-zinc-400 transition-colors hover:text-brand-blue"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
      />
    </form>
  );
}
