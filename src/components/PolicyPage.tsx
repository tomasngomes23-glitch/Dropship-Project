import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PolicyPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <section className="px-5 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-neutral-500">Last updated: {updated}</p>}
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-neutral-300 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
