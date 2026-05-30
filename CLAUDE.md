@AGENTS.md

# Amptek Engineering — Project Guide

## What this is
Website for **Amptek Engineering**, a Bangladesh-based electrical, fire-safety & mechanical engineering company. It is a hybrid site: a **corporate engineering site** PLUS a **bdshop.com-style e-commerce store**. The store is the homepage (`/`); corporate content lives on other routes.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS, Turbopack
- Supabase (Postgres + Auth) — products live in the `products` table; admin panel uses Supabase Auth
- Code under `src/`; static/reference data in `src/data/` (`company.ts`; `products.ts` keeps the `Product` type, categories, banners, price helpers, and is the seed source for the migration)
- Supabase clients: `src/lib/supabase.ts` (browser, cookie-based via `@supabase/ssr`), `src/lib/supabase-server.ts` (server); product reads in `src/lib/catalog.ts`; shared row types in `src/lib/product-types.ts`
- Env vars in `.env.local` (gitignored): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Developed on Windows / PowerShell
- Repo: https://github.com/1993ALINE/amptek.git

## Company details (source of truth — keep consistent everywhere)
- Name: Amptek Engineering — Tagline: "Engineering Tomorrow Today"
- Focus: Electrical, Fire Safety & Mechanical Solutions
- Phone: +880 1671 113615
- Email: info@amptekeng.com
- Website: www.amptekeng.com
- Address: Holding No - 266, Rajabari Uttarkhan, Dhaka-1230, Bangladesh
- Brand colors: red and blue
- All company info is centralized in `src/data/company.ts`.

## Routes / structure
- `/` — store homepage (banner carousel, promo tiles, flash deals, category tiles, product grids, trust strip)
- `/category/[slug]` — filtered category pages (sidebar + tiles link here)
- `/product/[id]` — product detail
- `/cart`, `/checkout`, `/checkout/success` — cart + mock checkout (sessionStorage, no real payment)
- `/search` — product search results
- `/company`, `/services`, `/about`, `/projects`, `/contact` — corporate pages
- `/admin` — login-protected admin panel (product CRUD); `/admin/login` is the public sign-in route
- Route protection: `src/proxy.ts` (Next 16 Proxy, formerly Middleware) does the optimistic `/admin` redirect; the authoritative gate is the server `getUser()` check in `src/app/admin/(panel)/layout.tsx`

## Backend (Supabase)
- **Products** are stored in the Supabase `products` table and read live by the store (all product-driven routes are `force-dynamic`, so admin edits show up immediately). Columns: `id` (text PK), `name`, `price` (numeric), `discount_price` (numeric, nullable), `image`, `category`, `description`, `collection` ('featured' | 'new_arrival'), `is_flash_deal` (bool), `sort_order` (int).
- **RLS**: public can read, authenticated users can write. So writes (admin panel + the seed migration) require a signed-in Supabase Auth user.
- **Admin auth**: email + password via Supabase Auth. Create the user in the Supabase dashboard (Authentication → Users → Add user); that same user logs into `/admin`.
- **Seed migration** (one-time, idempotent): `npx tsx scripts/migrate-products.ts <admin-email> <admin-password>` — reads the 16 products from `src/data/products.ts` and upserts them. Re-runnable.
- Categories and banners are NOT in the DB — still defined in `src/data/products.ts`.

## Status: built & working
Store homepage, category filtering, product pages, cart (React context), mock checkout flow, corporate pages, header product search, a premium visual redesign + visual-richness pass (subtle backgrounds, scroll-reveal animations). Products are served from Supabase, with a login-protected admin panel (`/admin`) for product CRUD. Real product images in `public/products/`; main banner at `public/banners/amptek-banner.jpg`.

## Open items / TODO
1. Replace a few low-res product images with higher-resolution versions (same filenames, no code change).
2. Some shop banner carousel slides still use picsum placeholders (besides the real Amptek banner).
3. Products have a Supabase backend (read + admin CRUD), but the **contact form and checkout are still front-end only** — orders aren't persisted and there's no real payment. Real orders/payment (bKash/Nagad/SSLCommerz) and contact-form submission still need wiring up (could use Supabase tables / an API route).
4. Dark mode inherits system colors; not specifically tuned.
5. Not yet deployed — plan is Vercel via the GitHub repo.

## Conventions / rules
- Verify with typecheck + lint before finishing: `npx tsc --noEmit` and `npx eslint src --max-warnings 0`.
- All images must be legally usable: own photos, licensed manufacturer images, or free-license stock (Pexels/Unsplash/Pixabay). Do NOT use random copyrighted images from the web.
- Keep red-and-blue branding; keep the design premium/refined, not flashy.
- GitHub is the sync point between two computers: `git pull` when starting, `git push` when done.
- Don't change content/structure when only a visual change is requested, and vice versa.
