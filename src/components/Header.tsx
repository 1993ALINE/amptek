"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/data/company";
import { useCart } from "@/context/CartContext";
import HeaderSearch from "@/components/HeaderSearch";
import { SearchIcon } from "@/components/icons";

// The cart only makes sense within the store. The storefront is now the
// homepage, so the icon shows on / plus the product and cart routes.
function isShopRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/shop" ||
    pathname.startsWith("/shop/") ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search") ||
    pathname === "/cart" ||
    pathname.startsWith("/checkout")
  );
}

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const showCart = isShopRoute(pathname);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 shadow-soft backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-lg font-black text-white shadow-sm ring-1 ring-inset ring-white/10">
            <span className="text-brand-red">A</span>
          </span>
          <span className="text-xl font-extrabold tracking-tight leading-none">
            <span className="text-brand-red">Amp</span>
            <span className="text-brand-blue dark:text-white">tek</span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-zinc-400">
              Engineering
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-brand-red/[0.07] text-brand-red"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-brand-blue dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Inline search — desktop */}
          <HeaderSearch className="hidden w-56 lg:block xl:w-72" />

          {/* Search toggle — mobile/tablet */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((o) => !o);
              setMenuOpen(false);
            }}
            aria-label="Search"
            aria-expanded={searchOpen}
            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-brand-blue dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          {showCart && <CartButton totalItems={totalItems} />}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((o) => !o);
              setSearchOpen(false);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Search row — mobile/tablet (expands from the search icon) */}
      {searchOpen && (
        <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800 lg:hidden">
          <HeaderSearch autoFocus onSubmitted={() => setSearchOpen(false)} />
        </div>
      )}

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-zinc-200 px-4 py-2 dark:border-zinc-800 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-brand-red/[0.07] text-brand-red"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function CartButton({ totalItems }: { totalItems: number }) {
  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
      className="relative flex items-center p-2 text-zinc-700 hover:text-brand-blue dark:text-zinc-200 dark:hover:text-white"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
