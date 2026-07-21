# Page copy — paste into Shopify Admin > Online Store > Pages

Content pages (About, Shipping, FAQ) live in Shopify's database, not in theme files — you
create the page in Admin and paste this text in. The Size Guide page is the exception: it's
already built into the theme (`sections/size-guide.liquid` + `templates/page.size-guide.json`)
— just create a page titled "Size Guide" with handle `size-guide` and set its theme template
to `page.size-guide` in the page editor, no content needed.

Anywhere you see `[...]` below, that's a placeholder — fill in your real details before publishing.

---

## About page (handle: `about`)

**Title:** Our Story

We're an independent football culture brand — not affiliated with, licensed by, or endorsed
by any club, league, or federation. We make [and sell] kits and apparel inspired by the game,
for people who live and breathe it.

[1-2 sentences here about why you started this — the honest version. E.g.: started posting kit
content on Insta/TikTok, built a following, decided to sell.]

[How support/contact works — e.g. "Questions about sizing or your order? Reach out via the
contact form." Fill in once you decide your support channel.]

---

## Shipping & Returns page (handle: `shipping-returns`)

**Title:** Shipping & Returns

**Shipping**
- Orders are processed within [X] business days.
- Delivery time: [X–X business days domestic / X–X weeks international] — depends on your supplier's real fulfillment time, fill in once known.
- Shipping cost: [flat rate / free over €X / calculated at checkout].
- You'll get a tracking link by [email] once your order ships.

**Returns & exchanges**
- [X] days from delivery to request a return/exchange.
- Item must be unworn, unwashed, with tags attached.
- To start a return, use the contact form with your order number.
- [Who pays return shipping — you or the customer]

*(Fill in the bracketed parts once you know real supplier lead times and your return policy —
don't publish shipping promises you can't back yet.)*

---

## FAQ page (handle: `faq`)

**Title:** FAQ

**How do I order?**
Add items to your cart and checkout normally.

**What sizes do you have?**
Check the [Size Guide](/pages/size-guide) — most kits run slim compared to a regular t-shirt.

**Are these official licensed products?**
No — these are independent designs inspired by football culture, not licensed by any club,
league, or brand.

**How long does delivery take?**
See our [Shipping & Returns](/pages/shipping-returns) page.

**Can I track my order?**
Yes — you'll receive a tracking link by email once your order ships.

**Can I return or exchange an item?**
Yes, see our [Shipping & Returns](/pages/shipping-returns) page for the full policy.

---

## Contact page

Dawn's default contact page (`templates/page.contact.json`) uses a standard contact form that
emails you — that's already wired up and needs no changes. Fill in your store's contact email
under Admin > Settings > Notifications ("Sender email") so replies land somewhere you check.
