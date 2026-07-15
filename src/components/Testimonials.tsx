import { motion } from "framer-motion";
import { Star } from "lucide-react";
import collageImg from "../assets/aurora/cube-collage-reviews.webp";
import { testimonials } from "../data/aurora";

const AVATAR_COLORS = [
  "from-teal-300 to-emerald-500",
  "from-fuchsia-300 to-purple-500",
  "from-amber-300 to-orange-500",
];

export function Testimonials() {
  return (
    <section id="reviews" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            What Customers Are Raving About
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem]"
          >
            <img
              src={collageImg}
              alt="Colagem de clientes felizes a usar o Aurora Cube em vários quartos"
              className="w-full"
            />
          </motion.div>

          <div className="flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-neutral-200">"{t.quote}"</p>
                <div className="mt-3 flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-neutral-950 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <p className="text-xs font-medium text-neutral-500">
                    {t.name}, {t.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
