import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group relative flex flex-col"
    >
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${product.gradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23n)%22/></svg>')]" />

        {product.tag && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${
              product.tag === "sale"
                ? "bg-red-500/90 text-white"
                : "bg-white/90 text-neutral-900"
            }`}
          >
            {product.tag === "sale" ? "Saldo" : "Novo"}
          </span>
        )}

        <button
          onClick={() => add(product)}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950/90 text-white shadow-lg backdrop-blur transition-transform duration-200 hover:scale-110 hover:bg-lime-300 hover:text-neutral-950 cursor-pointer"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-neutral-100">{product.name}</h3>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-neutral-500">
            {product.category}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-neutral-100">
            {product.price.toFixed(2)}€
          </p>
          {product.compareAt && (
            <p className="text-xs text-neutral-500 line-through">
              {product.compareAt.toFixed(2)}€
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
