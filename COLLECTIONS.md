# Collections & tagging convention

This store uses **automated (smart) collections** wherever possible. That means you almost
never manage collections by hand — you tag a product correctly when you create it, and it
files itself into every collection it belongs to (league, season, competition, retro era,
special edition...) automatically.

## One-time setup

Run this once your Shopify store exists and you've created a custom app with `write_products`
access (Admin > Settings > Apps and sales channels > Develop apps > Create an app):

```
SHOPIFY_STORE=your-store.myshopify.com SHOPIFY_ADMIN_TOKEN=shpat_xxx node scripts/create-collections.js
```

This creates all 67 collections below directly in your store, already wired to the tag rules.
The full machine-readable list lives in `data/collections.json` if you want to edit it before running.

## Tagging convention — use these tags on every product

| Tag prefix | Example | What it controls |
|---|---|---|
| `league:` | `league:premier-league` | Files into that league's hub collection |
| `season:` | `season:2025` | Combined with `league:` or `competition:`, files into the specific year collection |
| `competition:` | `competition:champions-league` | Club/international competition hub |
| `era:` | `era:90s` | Retro collections |
| `type:` | `type:third-kit` | Special edition collections |
| `audience:` | `audience:kids` | Kids collection |

**Example:** a 2025 Real Madrid home shirt gets tags:
`league:la-liga`, `season:2025`
→ automatically appears in **La Liga** and **La Liga 2025**.

**Example:** a 2022 France World Cup away shirt gets tags:
`competition:world-cup`, `season:2022`
→ automatically appears in **World Cup** and **World Cup 2022**.

A product can carry tags from multiple groups at once — e.g. a shirt can be both
`league:premier-league` + `season:2025` **and** `type:third-kit`, and it'll show up in all three
collections without any extra work.

## Full collection list

### Leagues (top-flight only) × season
Premier League · La Liga · Serie A · Bundesliga · Ligue 1 · Primeira Liga
— each with its own hub collection, plus one sub-collection per season: 2026, 2025, 2024, 2023, 2022.
(36 collections total)

### Club competitions
Champions League · Europa League · Conference League · Club World Cup · Copa Libertadores

### National team competitions
- World Cup — hub + 2026, 2022, 2018
- Euro — hub + 2024, 2020, 2016
- Copa America
- AFCON
- Nations League

### Retro
90s · 2000s · 2010s · Iconic Kits

### Special editions
Third Kits · Concept Kits · Anniversary Editions · City Editions · Festive Editions ·
Goalkeeper Kits · Player Version

### Manual collections (add products by hand, no tag rule)
All Kits · New Arrivals · Best Sellers

## Adding more seasons/leagues/competitions later
Edit `data/collections.json` and re-run the script — it only creates what's missing
(re-running is safe for new entries; it will error harmlessly on ones that already exist).
