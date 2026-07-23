# Pricing & personalization

## Base prices
| Product type | Price |
|---|---|
| Regular shirt | €24.99 |
| Retro shirt | €31.99 |
| Long sleeve | €32.99 |
| Personalization (name + number) | +€3.99 |

Shipping is not included — handled separately at checkout (configure shipping rates in
Admin > Settings > Shipping and delivery once you know real costs).

## How personalization works (already built into the theme)

Every product needs a **"Personalization" variant option** (alongside Size) with exactly
two values:
- `No personalization`
- `Add name & number (+€3.99)`

Price each variant combo accordingly — e.g. a Style 01 2026/27 Home in size M:
- Size: M / Personalization: No personalization → €24.99
- Size: M / Personalization: Add name & number (+€3.99) → €28.98

The theme (`snippets/personalization-fields.liquid` + `assets/personalization.js`) automatically
shows a "Name" and "Number" text field on the product page **only** when the customer selects
the paid option — those get sent to the cart as line item properties (`Name`, `Number`), so
they show up on the order for whoever prints/presses the shirt. No app, no separate product
needed — it's all native Shopify variants + line item properties.

This applies to every product created — when generating the catalog via the Shopify
connector, each product gets Size × Personalization as its two options.
