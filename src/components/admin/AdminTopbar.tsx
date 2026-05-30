"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const NAV = [
  { href: "/admin", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

// Admin chrome: section nav (Products / Orders), the signed-in user, and a
// sign-out button.
export default function AdminTopbar({ email }: { email: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-sm font-black text-white">
              <span className="text-brand-red">A</span>
            </span>
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              Admin
              <span className="ml-1 font-medium uppercase tracking-widest text-zinc-400">
                Panel
              </span>
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-brand-blue/[0.08] text-brand-blue dark:bg-brand-blue/20 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-brand-blue dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="hidden font-medium text-brand-blue hover:underline dark:text-brand-red sm:inline"
          >
            View store
          </Link>
          {email && (
            <span className="hidden text-zinc-500 dark:text-zinc-400 md:inline">{email}</span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {loading ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
}
