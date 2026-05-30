@AGENTS.md

# Amptek Engineering — Project Guide

## What this is
Website for **Amptek Engineering**, a Bangladesh-based electrical, fire-safety & mechanical engineering company. It is a hybrid site: a **corporate engineering site** PLUS a **bdshop.com-style e-commerce store**. The store is the homepage (`/`); corporate content lives on other routes.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS, Turbopack
- Code under `src/`; data in `src/data/` (`products.ts`, `company.ts`)
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

## Status: built & working
Store homepage, category filtering, product pages, cart (React context), mock checkout flow, corporate pages, header product search, a premium visual redesign + visual-richness pass (subtle backgrounds, scroll-reveal animations). Real product images in `public/products/`; main banner at `public/banners/amptek-banner.jpg`.

## Open items / TODO
1. Replace a few low-res product images with higher-resolution versions (same filenames, no code change).
2. Some shop banner carousel slides still use picsum placeholders (besides the real Amptek banner).
3. Contact form and checkout are front-end only — no backend. Real orders/payment (bKash/Nagad/SSLCommerz) and form submission need a backend.
4. Dark mode inherits system colors; not specifically tuned.
5. Not yet deployed — plan is Vercel via the GitHub repo.

## Conventions / rules
- Verify with typecheck + lint before finishing: `npx tsc --noEmit` and `npx eslint src --max-warnings 0`.
- All images must be legally usable: own photos, licensed manufacturer images, or free-license stock (Pexels/Unsplash/Pixabay). Do NOT use random copyrighted images from the web.
- Keep red-and-blue branding; keep the design premium/refined, not flashy.
- GitHub is the sync point between two computers: `git pull` when starting, `git push` when done.
- Don't change content/structure when only a visual change is requested, and vice versa.
