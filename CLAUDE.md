@AGENTS.md

# Amptek Engineering — Project Guide

## What this is
Website for **Amptek Engineering**, a Bangladesh-based electrical, fire-safety & mechanical engineering company. It is a hybrid site: a **corporate engineering site** PLUS a **bdshop.com-style e-commerce store**. The store is the homepage (`/`); corporate content lives on other routes.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS, Turbopack
- Supabase (Postgres + Auth) — products live in the `products` table; admin panel uses Supabase Auth
- Code under `src/`; static/reference data in `src/data/` (`company.ts`; `products.ts` keeps the `Product` type, categories, banners, price helpers, and is the seed source for the migration)
- Supabase clients: `src/lib/supabase.ts` (browser, cookie-based via `@supabase/ssr`), `src/lib/supabase-server.ts` (server); product reads in `src/lib/catalog.ts`; shared row types in `src/lib/product-types.ts` and `src/lib/order-types.ts` (`src/lib/order-status.ts` holds the shared status colors)
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
- `/cart`, `/checkout`, `/checkout/success` — cart + checkout; placing an order saves it to the Supabase `orders` table (payment is still mock/COD; sessionStorage drives the confirmation page)
- `/search` — product search results
- `/track` — public order tracking (enter an order number → status, items, total, and cancellation reason if cancelled)
- `/company`, `/services`, `/about`, `/projects`, `/contact` — corporate pages
- `/admin` — login-protected admin panel: products (`/admin`) and orders (`/admin/orders`) management; `/admin/login` is the public sign-in route
- Route protection: `src/proxy.ts` (Next 16 Proxy, formerly Middleware) does the optimistic `/admin` redirect; the authoritative gate is the server `getUser()` check in `src/app/admin/(panel)/layout.tsx`

## Backend (Supabase)
- **Products** are stored in the Supabase `products` table and read live by the store (all product-driven routes are `force-dynamic`, so admin edits show up immediately). Columns: `id` (text PK), `name`, `price` (numeric), `discount_price` (numeric, nullable), `image`, `category`, `description`, `collection` ('featured' | 'new_arrival'), `is_flash_deal` (bool), `sort_order` (int).
- **RLS**: public can read, authenticated users can write. So writes (admin panel + the seed migration) require a signed-in Supabase Auth user.
- **Admin auth**: email + password via Supabase Auth. Create the user in the Supabase dashboard (Authentication → Users → Add user); that same user logs into `/admin`.
- **Seed migration** (one-time, idempotent): `npx tsx scripts/migrate-products.ts <admin-email> <admin-password>` — reads the 16 products from `src/data/products.ts` and upserts them. Re-runnable.
- Categories and banners are NOT in the DB — still defined in `src/data/products.ts`.
- **Orders** are stored in the `orders` table. Checkout inserts an order; columns: `id` (uuid), `order_number` (text), `customer_name`/`customer_phone`/`customer_email`, `shipping_address`, `shipping_city`, `items` (jsonb — array of `{id,name,quantity,unitPrice,lineTotal}`), `subtotal`, `total` (numeric), `payment_method` (text), `status` (text, default 'pending'), `cancellation_reason` (text, nullable), `created_at`.
- **Orders RLS**: anon can insert (so checkout works without login); authenticated can read/update/delete (admin). Status flow: pending → confirmed → shipped → delivered → cancelled. The admin Orders panel (`/admin/orders`) lists orders newest-first, expands to show items, and changes status; setting **cancelled** prompts for a reason saved to `cancellation_reason` (and shown in the order detail).
- **Public order tracking** (`/track`) calls the `get_order_status(lookup_number text)` RPC (callable by anon) for an exact order-number match. The RPC returns only safe fields — `order_number`, `status`, `cancellation_reason`, `total`, `payment_method`, `items`, `created_at` — i.e. no customer PII.

## Status: built & working
Store homepage, category filtering, product pages, cart (React context), checkout, corporate pages, header product search, a premium visual redesign + visual-richness pass (subtle backgrounds, scroll-reveal animations). Products and orders are served from Supabase, with a login-protected admin panel (`/admin`) for product CRUD and order management (view orders, change status, cancel with a reason). Customers place orders at checkout (saved to Supabase) and can track them at `/track`. Real product images in `public/products/`; main banner at `public/banners/amptek-banner.jpg`.

## Open items / TODO
1. Replace a few low-res product images with higher-resolution versions (same filenames, no code change).
2. Some shop banner carousel slides still use picsum placeholders (besides the real Amptek banner).
3. Products and orders now have a Supabase backend (product CRUD, order capture + status management + public tracking). Still outstanding: **real payment** (bKash/Nagad/SSLCommerz — checkout is COD/mock) and **contact-form submission** (still front-end only; could write to a Supabase table or an API route).
4. Dark mode inherits system colors; not specifically tuned.
5. Not yet deployed — plan is Vercel via the GitHub repo.

## Conventions / rules
- Verify with typecheck + lint before finishing: `npx tsc --noEmit` and `npx eslint src --max-warnings 0`.
- All images must be legally usable: own photos, licensed manufacturer images, or free-license stock (Pexels/Unsplash/Pixabay). Do NOT use random copyrighted images from the web.
- Keep red-and-blue branding; keep the design premium/refined, not flashy.
- GitHub is the sync point between two computers: `git pull` when starting, `git push` when done.
- Don't change content/structure when only a visual change is requested, and vice versa.
