import { motion } from "framer-motion";
import womanImg from "../assets/aurora/cube-woman-pink.webp";

export function TransformSection() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className="overflow-hidden rounded-[2rem] shadow-[0_0_0_0_rgba(45,212,191,0)] transition-shadow duration-300 hover:shadow-[0_0_50px_-10px_rgba(45,212,191,0.35)]"
        >
          <img
            src={womanImg}
            alt="Mulher sorridente a segurar o Aurora Cube com luz rosa a projetar-se no teto"
            className="w-full transition-transform duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Turn Any Room Into a Sanctuary
          </h2>
          <p className="mt-4 max-w-md text-neutral-400">
            One cube is all it takes to completely transform how your space feels.
            No renovation, no hassle. Just instant ambiance at the touch of a button.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ["Instant mood upgrade", "Plug in and your room transforms in seconds."],
              ["Perfect for any occasion", "Movie night, date night, or just unwinding."],
              ["Impresses everyone", "Looks far more expensive than it really is."],
            ].map(([title, body], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-teal-400/30 hover:bg-white/[0.05]"
              >
                <p className="font-medium text-white">{title}</p>
                <p className="mt-0.5 text-sm text-neutral-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
