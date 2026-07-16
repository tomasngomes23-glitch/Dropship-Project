import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, Star, Truck } from "lucide-react";
import heroImg from "../assets/aurora/cube-hero-teal.webp";
import { bundles, bundlePrice, formatKr, UNIT_COMPARE_AT } from "../data/aurora";
import { useCart } from "../context/CartContext";
import { SparkleBurst } from "./SparkleBurst";

// Single source of truth for the accent color used across the hero.
// The Aurora Cube only ships in this teal — change this value if that ever changes.
const ACCENT_COLOR = "#5eead4";

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
    <section id="top" className="relative overflow-hidden">
      {/* Full-bleed ambient backdrop — deliberately blurred, so the source
          photo's resolution never has to stretch sharp across the whole
          screen (which is what caused the blurriness before). */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="h-full w-full scale-125 object-cover object-center blur-3xl"
        />
        <div className="absolute inset-0 bg-neutral-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/10" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${ACCENT_COLOR}, transparent 60%)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Sharp foreground photo, kept close to its native resolution
              so it never needs to be stretched past the point it stays crisp. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 mx-auto w-full max-w-md lg:order-2"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="overflow-hidden rounded-[2rem] shadow-[0_0_80px_-10px_rgba(45,212,191,0.5)]"
            >
              <img
                src={heroImg}
                alt="Aurora Cube a projetar luz teal num quarto escuro"
                className="w-full"
              />
            </motion.div>
          </motion.div>

          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                4.8/5 · 10,000+ Verified Customers
              </div>

              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Aurora Cube
              </h1>
              <p className="mt-2 text-base text-neutral-300 sm:text-lg">
                The crystal-glass light that turns any room into an aurora borealis.
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span
                  className="font-display text-4xl font-bold sm:text-[2.75rem]"
                  style={{ color: ACCENT_COLOR }}
                >
                  {formatKr(price)}
                </span>
                <span className="text-lg text-neutral-400 line-through">
                  {formatKr(selected === 1 ? UNIT_COMPARE_AT : base)}
                </span>
              </div>
              <span className="mt-2 inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-300">
                Save {selected === 1 ? 39 : bundles.find((b) => b.qty === selected)?.discountPct}%
                today
              </span>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {bundles.map((b) => {
                  const { price: p } = bundlePrice(b.qty);
                  const isSelected = selected === b.qty;
                  return (
                    <button
                      key={b.qty}
                      onClick={() => setSelected(b.qty)}
                      style={isSelected ? { borderColor: ACCENT_COLOR } : undefined}
                      className={`relative rounded-2xl border px-3 py-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white/10"
                          : "border-white/15 bg-white/[0.04] hover:border-white/30"
                      }`}
                    >
                      {b.discountPct >= 30 && (
                        <span
                          className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold text-neutral-950"
                          style={{ backgroundColor: ACCENT_COLOR }}
                        >
                          MOST POPULAR
                        </span>
                      )}
                      <p className="text-xs font-semibold text-white">{b.label}</p>
                      <p className="mt-1 text-sm font-bold" style={{ color: ACCENT_COLOR }}>
                        {formatKr(p)}
                      </p>
                      {b.sublabel && (
                        <p className="text-[11px] text-neutral-400">{b.sublabel.split("—")[0]}</p>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="relative mt-6">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleAddToCart}
                  style={{ backgroundColor: ACCENT_COLOR }}
                  className="w-full rounded-full py-5 text-base font-extrabold uppercase tracking-wide text-neutral-950 shadow-xl cursor-pointer"
                >
                  Add to Cart — {formatKr(price)}
                </motion.button>
                <AnimatePresence>
                  {bursts.map((id) => (
                    <SparkleBurst key={id} />
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} /> Free Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} /> 30 Day Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} /> 24/7 Support
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
