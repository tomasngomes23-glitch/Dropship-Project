# Main menu structure

Build this in Shopify Admin under **Online Store > Navigation > Main menu**. Dawn renders
nested items as dropdowns automatically — no theme code needed, just the menu tree below.
Every link points at a collection handle created by `scripts/create-collections.js`.

```
New Arrivals        -> /collections/new-arrivals
Leagues             -> /collections/all               (parent, dropdown only)
  Premier League       -> /collections/premier-league
  La Liga               -> /collections/la-liga
  Serie A                -> /collections/serie-a
  Bundesliga              -> /collections/bundesliga
  Ligue 1                   -> /collections/ligue-1
  Primeira Liga               -> /collections/primeira-liga
Competitions          -> /collections/all             (parent, dropdown only)
  Champions League        -> /collections/champions-league
  Europa League              -> /collections/europa-league
  Conference League            -> /collections/conference-league
  World Cup                      -> /collections/world-cup
  Euro                             -> /collections/euro
  Copa America                       -> /collections/copa-america
  AFCON                                -> /collections/afcon
Retro                  -> /collections/all             (parent, dropdown only)
  90s                      -> /collections/retro-90s
  2000s                       -> /collections/retro-2000s
  2010s                          -> /collections/retro-2010s
  Iconic Kits                       -> /collections/retro-iconic
Special Editions          -> /collections/all          (parent, dropdown only)
  Third Kits                    -> /collections/third-kits
  Concept Kits                     -> /collections/concept-kits
  City Editions                       -> /collections/city-editions
  Player Version                         -> /collections/player-version
Kids                    -> /collections/kids
```

## Footer menu (optional, add under Navigation > Footer menu)

```
Contact              -> /pages/contact
Shipping & Returns   -> /pages/shipping-returns  (create this page first)
Size Guide           -> /pages/size-guide
FAQ                  -> /pages/faq
```

Tip: for the parent items ("Leagues", "Competitions", etc.) you can leave the link pointing at
`/collections/all` since the parent itself isn't meant to be clicked — it just opens the dropdown.
