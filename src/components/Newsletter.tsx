import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { isShopifyConfigured, subscribeToNewsletter } from "../lib/shopify";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!isShopifyConfigured) {
      setSent(true);
      return;
    }
    setLoading(true);
    try {
      const ok = await subscribeToNewsletter(email);
      if (ok) setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 px-6 py-14 text-center lg:px-16 lg:py-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <h2 className="font-display text-3xl font-semibold text-white lg:text-4xl">
            Get 10% Off Your First Order
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
            Join the list for early access to restocks, new colors, and
            exclusive discounts.
          </p>

          {sent ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-teal-300/10 px-6 py-3.5 text-sm font-medium text-teal-300">
              <Check size={18} />
              You're in! Check your inbox for your code.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-400 px-6 py-3.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03] cursor-pointer disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : (
                  <>
                    Subscribe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
