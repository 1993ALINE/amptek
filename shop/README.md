# ShopBD — BDShop-style E-commerce Demo

A static storefront inspired by [bdshop.com](https://www.bdshop.com/) for Bangladesh: category hubs, product grids, BDT pricing, cart, and FAQ.

## Preview locally

```bash
cd shop
python3 -m http.server 8080
```

Open http://localhost:8080/index.html

## Features

- Category hub banners (Solar, Electronics, Gaming, Mobile)
- Product sections: Most Sold, Most Discount, New Arrivals
- Shop by category filters
- Search (`?search=solar`)
- Cart (localStorage) + product detail pages
- FAQ accordion, trust strip, payment badges (COD, bKash, etc.)

## Next steps for production

1. Replace demo products with real catalog (JSON API or CMS)
2. Add checkout backend (bKash/Nagad APIs, order database)
3. Admin panel for inventory
4. User accounts & order tracking
5. Real product images (CDN)
