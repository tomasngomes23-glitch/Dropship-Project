import { motion } from "framer-motion";
import { categories, type Category } from "../data/products";

export function Categories({
  active,
  onSelect,
}: {
  active: Category | null;
  onSelect: (id: Category | null) => void;
}) {
  return (
    <section id="colecoes" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
            Compra por categoria
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const isActive = active === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => onSelect(isActive ? null : cat.id)}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} text-left transition-transform hover:scale-[1.02] cursor-pointer ${
                  isActive ? "ring-2 ring-lime-300 ring-offset-2 ring-offset-neutral-950" : ""
                }`}
              >
                <div className="absolute inset-0 bg-neutral-950/20 transition-colors group-hover:bg-neutral-950/0" />
                <span className="absolute bottom-4 left-4 font-display text-lg font-bold text-white drop-shadow sm:text-xl">
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
