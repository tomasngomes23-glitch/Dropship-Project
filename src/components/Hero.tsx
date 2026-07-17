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
      {/* Ambient backdrop, blurred on purpose — this is what covers screens
          wider than the sharp image below, so there's never a hard edge
          or black bar no matter how wide the monitor is. */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="h-full w-full scale-125 object-cover object-center blur-3xl"
        />
        <div className="absolute inset-0 bg-neutral-950/50" />
      </div>

      {/* Sharp full-bleed image, capped at a width where the 1024px source
          still holds up — beyond that width, the blurred backdrop above
          takes over instead of stretching this one into visible mush.
          Capped tighter than the section itself (which still fills 100% of
          any screen via the glow+blur backdrop) so the crisp photo itself
          never gets upscaled past ~1.6x, which is where the source
          starts visibly softening. */}
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[1600px] overflow-hidden sm:aspect-[16/9]">
        <img
          src={heroImg}
          alt="Aurora Cube a projetar luz teal num quarto escuro"
          className="h-full w-full object-cover object-center contrast-[1.05] saturate-[1.1] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
      </div>

      {/* The source photo has a large dark void to the right of the cube —
          on wide screens that void would otherwise read as flat dead black.
          This sits on the full <section>, not the capped image above it, and
          uses % anchors — so the glow always reaches edge to edge, whether
          the screen is 1920px or 7680px wide, instead of stopping at the
          1920px cap and leaving everything past it unlit. Masked out toward
          the bottom so it eases into the plain dark page background instead
          of cutting hard into the next section. */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen [mask-image:linear-gradient(to_bottom,black,black_55%,transparent_92%)]"
        style={{
          background: `
            radial-gradient(circle at 22% 58%, ${ACCENT_COLOR}, transparent 40%),
            radial-gradient(ellipse 70% 85% at 60% 45%, ${ACCENT_COLOR}aa, transparent 65%),
            radial-gradient(ellipse 65% 75% at 90% 70%, #a855f788, transparent 68%)
          `,
          opacity: 0.55,
        }}
      />

      {/* Final fade to the page's own flat background, so the section's
          bottom edge lands on the exact same color the next section starts
          with — no seam between "bright hero" and "next section". */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-1/2 bg-gradient-to-b from-transparent to-neutral-950" />

      {/* Panel overlaps the bottom of the image and grows with its own
          content, so it never depends on the image's height. */}
      <div className="relative z-10 mx-auto -mt-28 max-w-6xl px-5 pb-14 sm:-mt-36 lg:px-8 lg:-mt-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:max-w-2xl lg:p-9 xl:max-w-3xl 2xl:max-w-4xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            4.8/5 · 10,000+ Verified Customers
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Aurora Cube
          </h1>
          <p className="mt-2 text-base text-neutral-300 sm:text-lg lg:text-xl">
            The crystal-glass light that turns any room into an aurora borealis.
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span
              className="font-display text-4xl font-bold sm:text-[2.75rem] lg:text-6xl"
              style={{ color: ACCENT_COLOR }}
            >
              {formatKr(price)}
            </span>
            <span className="text-lg text-neutral-400 line-through">
              {formatKr(selected === 1 ? UNIT_COMPARE_AT : base)}
            </span>
          </div>
          <span className="mt-2 inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-300">
            Save {selected === 1 ? 39 : bundles.find((b) => b.qty === selected)?.discountPct}% today
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
    </section>
  );
}
