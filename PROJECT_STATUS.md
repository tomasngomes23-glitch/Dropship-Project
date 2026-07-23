# Project status (read this first in a new conversation)

Independent football-culture shirt store, brand name **First Touch**. Shopify theme built on
Dawn, in this repo (branch `claude/football-shop-shopify-yrtg4h`). Not licensed by any
club/league — see the naming/pricing conventions below, they exist for legal reasons, don't
deviate from them without re-reading why (ask the user if unsure).

## Done
- Full Dawn-based theme in this repo: homepage (`templates/index.json`), collection page,
  size guide, dark/green color scheme, League Spartan-ish headings. See `README.md`.
- **66 collections already created live** in the Shopify store via the Shopify Claude
  connector (leagues x seasons, competitions, retro, special editions — see `COLLECTIONS.md`
  and `data/collections.json`). Tag-based smart collections — products file themselves in
  automatically once tagged correctly.
- Store exists: domain `hq25fq-yg.myshopify.com`, plan Basic, admin email
  `firsttouchkits2026@gmail.com`. Country/currency still wrongly set to Sweden/SEK — needs
  fixing in Settings > General, then Settings > Markets for multi-currency (Dawn's
  country/currency picker already works, just needs Markets configured).
- Name & number **personalization** built into the theme (`snippets/personalization-fields.liquid`,
  `assets/personalization.js`) — see `PRICING.md` for how it works and the required
  Size x Personalization variant structure on every product.
- Pricing decided: regular shirt €24.99, retro €31.99, long sleeve €32.99, personalization
  +€3.99.
- Product naming convention decided (see `PRICING.md` and the private style-reference file
  already sent to the user): public product titles are `Style ## SEASON KITTYPE` (e.g.
  `Style 04 2026/27 Home`) — **never** real club names publicly, that's a trademark risk.
  The real club per Style ## lives ONLY in a private file already delivered to the user
  (`style-reference-PRIVATE.md`) — never put club names in this public repo or on the
  storefront.

## Not done yet / next steps
- **Theme not yet live on the store** — still needs to be pushed (zip upload via Admin >
  Online Store > Themes, or via the Shopify connector if/when it can reach theme assets).
- **432 club-shirt products not yet created.** Scope already agreed with the user:
  8 top clubs per league (48 clubs total, listed in `style-reference-PRIVATE.md`) x 3 kit
  types (Home/Away/Third) x 3 seasons (2026/27, 2025/26, 2024/25) = 432 products. Each needs
  Size x Personalization variants per `PRICING.md`. Was about to start with Premier League
  (72 products) when the Shopify Claude connector dropped mid-session and wouldn't
  reconnect — that's why this file exists, to resume in a fresh conversation.
- Special editions / Fan Made / retro products: ~80-90 more products planned (not started),
  same "Style ##" naming discipline, same 3-season window where applicable.
- Navigation menu not yet built in Admin (`NAVIGATION.md` has the exact tree).
- Content pages (About, Shipping & Returns, FAQ) not created — draft copy in `STORE_COPY.md`.
- Domain not yet purchased/connected.

## Working style established with this user
- User is Portuguese-speaking (Portugal, not Brazil) — respond in PT-PT.
- User pushed hard, more than once, to source from unlicensed replica catalogs (Yupoo,
  "retro kit" resellers) and to use real club names/logos — each time declined and
  explained why (trademark/counterfeit risk), and the user came around to the
  independent-brand approach each time. If this comes up again, hold the same line.
- User prefers direct, concise answers; dislikes being asked multiple rounds of vague
  brainstorming without a point.
