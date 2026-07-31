#!/usr/bin/env node
// Creates every collection from data/collections.json in your Shopify store via the Admin REST API.
// Usage:
//   SHOPIFY_STORE=your-store.myshopify.com SHOPIFY_ADMIN_TOKEN=shpat_xxx node scripts/create-collections.js
//
// SHOPIFY_ADMIN_TOKEN needs a custom app with the "write_products" scope
// (Shopify Admin > Settings > Apps and sales channels > Develop apps).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_VERSION = "2024-10";

const STORE = process.env.SHOPIFY_STORE;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

if (!STORE || !TOKEN) {
  console.error("Missing SHOPIFY_STORE or SHOPIFY_ADMIN_TOKEN environment variables.");
  process.exit(1);
}

const data = JSON.parse(readFileSync(join(__dirname, "../data/collections.json"), "utf8"));

function smartRule(tags) {
  return {
    disjunctive: false, // false = product must match ALL rules (AND)
    rules: tags.map((tag) => ({ column: "tag", relation: "equals", condition: tag })),
  };
}

function buildCollections() {
  const out = [];

  for (const league of data.leagues) {
    out.push({ title: league.title, handle: league.handle, ...smartRule([league.tag]) });
    for (const season of data.seasons) {
      out.push({
        title: `${league.title} ${season}`,
        handle: `${league.handle}-${season}`,
        ...smartRule([league.tag, `season:${season}`]),
      });
    }
  }

  for (const comp of data.club_competitions) {
    out.push({ title: comp.title, handle: comp.handle, ...smartRule([comp.tag]) });
  }

  for (const comp of data.national_competitions) {
    out.push({ title: comp.title, handle: comp.handle, ...smartRule([comp.tag]) });
    for (const edition of comp.editions) {
      out.push({
        title: `${comp.title} ${edition}`,
        handle: `${comp.handle}-${edition}`,
        ...smartRule([comp.tag, `season:${edition}`]),
      });
    }
  }

  for (const retro of data.retro) {
    out.push({ title: retro.title, handle: retro.handle, ...smartRule([retro.tag]) });
  }

  for (const special of data.special_editions) {
    out.push({ title: special.title, handle: special.handle, ...smartRule([special.tag]) });
  }

  for (const cross of data.cross_cutting) {
    if (cross.type === "manual") {
      out.push({ title: cross.title, handle: cross.handle, manual: true });
    } else {
      out.push({ title: cross.title, handle: cross.handle, ...smartRule([cross.tag]) });
    }
  }

  return out;
}

async function createCollection(collection) {
  const isManual = collection.manual === true;
  const endpoint = isManual ? "custom_collections" : "smart_collections";
  const body = isManual
    ? { custom_collection: { title: collection.title, handle: collection.handle, published: true } }
    : {
        smart_collection: {
          title: collection.title,
          handle: collection.handle,
          published: true,
          disjunctive: collection.disjunctive,
          rules: collection.rules,
        },
      };

  const res = await fetch(`https://${STORE}/admin/api/${API_VERSION}/${endpoint}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} — ${text}`);
  }
  return res.json();
}

async function main() {
  const collections = buildCollections();
  console.log(`Creating ${collections.length} collections in ${STORE}...\n`);

  let ok = 0;
  let failed = 0;

  for (const collection of collections) {
    try {
      await createCollection(collection);
      ok += 1;
      console.log(`  ✓ ${collection.title} (/${collection.handle})`);
    } catch (err) {
      failed += 1;
      console.error(`  ✗ ${collection.title} — ${err.message}`);
    }
    // Basic pacing to stay under Shopify's REST rate limit (2 req/s on most plans).
    await new Promise((r) => setTimeout(r, 550));
  }

  console.log(`\nDone. ${ok} created, ${failed} failed.`);
}

main();
