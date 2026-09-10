# PawPaw 🐾

A premium, interactive pet shop e-commerce site — food, toys, beds and care essentials for dogs and cats.

## Running locally

No build step required — it's a static site.

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Structure

- `index.html` — page markup (header, hero, categories, products, promo, reviews, newsletter, footer, cart drawer)
- `css/styles.css` — design system (tokens, layout, responsive breakpoints)
- `js/script.js` — product data + all interactivity (search, filters, favorites, cart, toasts, scroll reveal)

## Features

- Sticky header with live search, favorites, and a cart drawer with item counters
- Category bento grid with working filters (also reachable from nav/footer links)
- Product grid with add-to-cart, favorite toggling, quantity controls, and running totals — all persisted to `localStorage`
- Toast notifications, scroll-reveal animations, and a mobile nav menu
- Fully responsive from desktop down to small phones
