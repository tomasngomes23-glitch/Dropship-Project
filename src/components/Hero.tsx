import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, Star, Truck } from "lucide-react";
import heroImg from "../assets/aurora/cube-hero-teal.webp";
import { bundles, bundlePrice, formatKr, UNIT_COMPARE_AT } from "../data/aurora";
import { useCart } from "../context/CartContext";
import { SparkleBurst } from "./SparkleBurst";

const VALUE_PROPS = [
  "Transform any room into a dreamy escape",
  "16 colors to match your every mood",
  "Instant ambiance with one click",
];

const STARS = [
  { top: "6%", left: "8%", size: 3, delay: 0 },
  { top: "14%", left: "88%", size: 2, delay: 0.6 },
  { top: "28%", left: "2%", size: 2, delay: 1.2 },
  { top: "40%", left: "94%", size: 3, delay: 0.3 },
  { top: "58%", left: "4%", size: 2, delay: 1.8 },
  { top: "72%", left: "90%", size: 2, delay: 0.9 },
  { top: "86%", left: "10%", size: 3, delay: 1.5 },
  { top: "92%", left: "80%", size: 2, delay: 0.2 },
];

export function Hero() {
  const [selected, setSelected] = useState(3);
  const [bursts, setBursts] = useState<number[]>([]);
  const { addBundle } = useCart();
  const { base, price } = bundlePrice(selected);

  const handleAddToCart = () => {
    addBundle(selected);
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 700);
  };

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-6 lg:px-8 lg:pb-20 lg:pt-8">
      <div className="pointer-events-none absolute inset-0 left-1/2 -z-10 w-screen -translate-x-1/2">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle, rgba(45,212,191,0.25), transparent 60%)",
              "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)",
              "radial-gradient(circle, rgba(236,72,153,0.22), transparent 60%)",
              "radial-gradient(circle, rgba(45,212,191,0.25), transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 -top-32 h-[36rem] w-[36rem] rounded-full blur-3xl xl:-left-10"
        />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle, rgba(56,189,248,0.2), transparent 60%)",
              "radial-gradient(circle, rgba(52,211,153,0.22), transparent 60%)",
              "radial-gradient(circle, rgba(56,189,248,0.2), transparent 60%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-20 bottom-0 h-[32rem] w-[32rem] rounded-full blur-3xl xl:-right-10"
        />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle, rgba(217,70,239,0.14), transparent 65%)",
              "radial-gradient(circle, rgba(45,212,191,0.14), transparent 65%)",
              "radial-gradient(circle, rgba(217,70,239,0.14), transparent 65%)",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute left-1/2 top-1/3 hidden h-[40rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl 2xl:block"
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-lg xl:max-w-2xl"
        >
          {STARS.map((s, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
              className="absolute hidden rounded-full bg-white lg:block"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            />
          ))}

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-10 -top-16 hidden h-56 w-56 rounded-full opacity-90 lg:block lg:h-72 lg:w-72 xl:-right-16 xl:-top-20 xl:h-[22rem] xl:w-[22rem]"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, #fbfbf7 0%, #dfe2d9 26%, #aeb5aa 55%, #6c736b 80%, #40453f 100%)",
              boxShadow: "0 0 100px 10px rgba(226,232,240,0.12)",
            }}
          >
            <span className="absolute left-[28%] top-[42%] h-3 w-3 rounded-full bg-black/10 blur-[1px]" />
            <span className="absolute left-[55%] top-[22%] h-5 w-5 rounded-full bg-black/10 blur-[1px]" />
            <span className="absolute left-[62%] top-[58%] h-2.5 w-2.5 rounded-full bg-black/10 blur-[1px]" />
            <span className="absolute left-[40%] top-[68%] h-2 w-2 rounded-full bg-black/10 blur-[1px]" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2rem] shadow-[0_0_80px_-10px_rgba(45,212,191,0.4)]"
          >
            <img src={heroImg} alt="Aurora Cube a projetar luz teal num quarto escuro" className="w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -left-6 top-8 hidden rounded-2xl bg-neutral-900/90 px-4 py-3 shadow-xl backdrop-blur sm:block"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <p className="mt-1 text-xs text-neutral-300">1,720+ compras felizes</p>
          </motion.div>
        </motion.div>

        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300"
          >
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            4.8/5 · 10,000+ Verified Customers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Aurora Cube
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 text-lg text-neutral-400"
          >
            The crystal-glass light that turns any room into an aurora borealis.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 flex flex-col gap-2"
          >
            {VALUE_PROPS.map((v) => (
              <li key={v} className="flex items-center gap-2 text-sm text-neutral-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-300">
                  <Check size={12} />
                </span>
                {v}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-baseline gap-3"
          >
            <span className="font-display text-3xl font-semibold text-white">
              {formatKr(price)}
            </span>
            <span className="text-lg text-neutral-500 line-through">
              {formatKr(selected === 1 ? UNIT_COMPARE_AT : base)}
            </span>
            <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-400">
              Save {selected === 1 ? 39 : bundles.find((b) => b.qty === selected)?.discountPct}%
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 grid grid-cols-3 gap-3"
          >
            {bundles.map((b) => {
              const { price: p } = bundlePrice(b.qty);
              const isSelected = selected === b.qty;
              return (
                <button
                  key={b.qty}
                  onClick={() => setSelected(b.qty)}
                  className={`relative rounded-2xl border px-3 py-3 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-teal-400 bg-teal-400/10 shadow-[0_0_0_1px_rgba(45,212,191,0.5)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  {b.discountPct >= 30 && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-400 px-2 py-0.5 text-[10px] font-bold text-neutral-950">
                      MOST POPULAR
                    </span>
                  )}
                  <p className="text-xs font-semibold text-white">{b.label}</p>
                  <p className="mt-1 text-sm font-bold text-teal-300">{formatKr(p)}</p>
                  {b.sublabel && (
                    <p className="text-[11px] text-neutral-400">{b.sublabel.split("—")[0]}</p>
                  )}
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative mt-5"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="w-full rounded-full bg-teal-400 py-4 text-sm font-bold uppercase tracking-wide text-neutral-950 shadow-[0_0_30px_-5px_rgba(45,212,191,0.6)] transition-transform hover:scale-[1.01] cursor-pointer"
            >
              Add to Cart — {formatKr(price)}
            </motion.button>
            <AnimatePresence>
              {bursts.map((id) => (
                <SparkleBurst key={id} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500"
          >
            <span className="flex items-center gap-1.5">
              <Truck size={14} /> Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> 30 Day Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} /> 24/7 Support
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
