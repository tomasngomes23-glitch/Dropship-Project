import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { isShopifyConfigured } from "../lib/shopify";

// Submitting to the *.myshopify.com domain would normally 301-redirect to
// the connected custom domain, which turns the POST into a GET and silently
// drops the form fields. Posting straight to the live storefront domain
// avoids that redirect entirely.
const STORE_DOMAIN = "velorystore.com";

export function Contact() {
  const [sent, setSent] = useState(false);

  // Shopify's own /contact endpoint doesn't allow cross-origin fetch reads,
  // so this submits as a real browser form post (opened in a new tab) —
  // that's a plain navigation, not an AJAX call, so CORS never applies.
  // Delivery goes to the store's "Store contact email" (Settings > General).
  const handleSubmit = (e: React.FormEvent) => {
    if (!isShopifyConfigured) {
      e.preventDefault();
      setSent(true);
      return;
    }
    setSent(true);
  };

  return (
    <section className="px-5 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl"
      >
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Contact</h1>
        <p className="mt-3 text-neutral-400">
          Questions about your order or the Aurora Cube? Send us a message
          and we'll get back to you within 24 hours.
        </p>

        {sent ? (
          <div className="mt-8 flex items-center gap-2 rounded-2xl border border-teal-400/20 bg-teal-400/5 px-5 py-4 text-sm text-teal-300">
            <Check size={18} />
            Thanks! We've received your message and will reply soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action={isShopifyConfigured ? `https://${STORE_DOMAIN}/contact#ContactForm` : undefined}
            method={isShopifyConfigured ? "post" : undefined}
            target={isShopifyConfigured ? "_blank" : undefined}
            className="mt-8 flex flex-col gap-4"
          >
            <input type="hidden" name="form_type" value="contact" />
            <input type="hidden" name="utf8" value="✓" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="contact[name]"
                placeholder="Name"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
              />
              <input
                type="email"
                name="contact[email]"
                required
                placeholder="Email *"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
              />
            </div>
            <input
              type="tel"
              name="contact[phone]"
              placeholder="Phone number"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
            />
            <textarea
              name="contact[body]"
              placeholder="Comment"
              rows={5}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-teal-400 py-3.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-[1.01] cursor-pointer sm:w-auto sm:px-8"
            >
              Send
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
