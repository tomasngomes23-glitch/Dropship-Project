import { useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

export function TrackOrder() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-5 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl text-center"
      >
        <PackageSearch size={36} className="mx-auto text-teal-300" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
          Track Your Order
        </h1>
        <p className="mt-3 text-neutral-400">
          Enter your order number and email to see the latest status.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-teal-400/20 bg-teal-400/5 px-5 py-4 text-sm text-teal-300">
            Order lookup will connect to Shopify once the store is linked —
            for now, check your order confirmation email for tracking.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
            <input
              type="text"
              required
              placeholder="Order number (e.g. #1023)"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
            />
            <input
              type="email"
              required
              placeholder="Email used at checkout"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-teal-400 py-3.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-[1.01] cursor-pointer"
            >
              Track Order
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
