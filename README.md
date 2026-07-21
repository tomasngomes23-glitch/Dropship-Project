# Football shop — Shopify theme

This is a Shopify theme (built on top of [Dawn](https://github.com/Shopify/dawn), Shopify's
free base theme) for an independent football-culture apparel store. Everything is standard
Liquid/JSON, ready to push to a real Shopify store.

## What's in here

- `templates/index.json` — homepage: hero, "Shop by league", "Shop by competition",
  "Retro & special editions", New Arrivals, brand blurb, newsletter signup.
- `templates/collection.json` — product listing page, tuned for a large catalog
  (36 products/page, filtering + sorting on, quick add enabled).
- `config/settings_data.json` — color scheme (dark, green accent) and typography.
- `data/collections.json` + `COLLECTIONS.md` — the full collection structure (leagues ×
  seasons, competitions, retro, special editions) and the **tagging convention** that makes
  collections fill themselves automatically as you add products.
- `scripts/create-collections.js` — one command that creates all 67 collections in your
  store via the Admin API.
- `NAVIGATION.md` — the exact menu tree to build in Shopify Admin so the header dropdowns
  match the collections.

## Setup order

1. **Create the Shopify store** (shopify.com, pick a plan — Basic is enough to start).
2. **Push this theme:**
   - Easiest: Admin > Online Store > Themes > Add theme > Upload zip (zip this repo and upload), or
   - `shopify theme push` via [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) if you want a live dev preview first (`shopify theme dev`).
3. **Create a custom app** for API access: Admin > Settings > Apps and sales channels >
   Develop apps > Create an app > Configure Admin API scopes: `write_products`,
   `read_products`. Install it and copy the Admin API access token.
4. **Run the collections script** (see `COLLECTIONS.md` for details):
   ```
   SHOPIFY_STORE=your-store.myshopify.com SHOPIFY_ADMIN_TOKEN=shpat_xxx node scripts/create-collections.js
   ```
5. **Build the navigation menu** in Admin > Online Store > Navigation, following `NAVIGATION.md`.
6. **Add products**, tagging each one per the convention in `COLLECTIONS.md`
   (`league:`, `season:`, `competition:`, `era:`, `type:`) — they'll sort themselves into
   the right collections automatically.
7. **Preview and publish** the theme from Admin > Online Store > Themes.

## What I need from you

- Final **brand name** (still open — once picked I'll drop it into the theme settings, logo
  text, favicon, and social copy).
- **Logo** (or say "text logo for now" and I'll style the brand name as a wordmark).
- **Product photos** per shirt — I can't fetch or generate real product photography in this
  environment; those have to come from you (or from print-on-demand/your own supplier once
  that's sorted — no licensed club crests/logos, per what we discussed).
- Once the store exists: the **Admin API token** (step 3 above) so I can run the
  collections script and, later, help with bulk product import.
- Your **WhatsApp number/link**, so I can wire it into the footer/contact page for manual
  order handling.

## Notes

- No licensed club/league/brand logos are used anywhere in this theme or in the collection
  naming — see the earlier conversation for why that matters for a store like this.
- Color scheme is dark with a green accent (streetwear-leaning); easy to tweak later in
  Admin > Online Store > Themes > Customize > Theme settings > Colors.
- Header font is set to League Spartan (bold, fits the "league" branding) — double-check it
  rendered correctly in the Theme Editor and swap it there if not.
