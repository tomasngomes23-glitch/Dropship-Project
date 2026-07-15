import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import heroImg from "../assets/aurora/cube-hero-teal.webp";
import { bundlePrice, formatKr } from "../data/aurora";
import { useCart } from "../context/CartContext";
import { SparkleBurst } from "./SparkleBurst";

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);
  const { addBundle } = useCart();
  const { price } = bundlePrice(3);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddToCart = () => {
    addBundle(3);
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950/95 backdrop-blur-lg"
        >
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 lg:px-8">
            <img src={heroImg} alt="Aurora Cube" className="h-10 w-10 rounded-lg object-cover" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">Aurora Cube</p>
              <p className="text-xs text-neutral-500">Bundle of 3 · Save 30%</p>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <span className="font-display text-lg font-semibold text-white">
                {formatKr(price)}
              </span>
              <div className="relative">
                <button
                  onClick={handleAddToCart}
                  className="rounded-full bg-teal-400 px-6 py-2.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-105 cursor-pointer"
                >
                  Add to Cart
                </button>
                <AnimatePresence>
                  {bursts.map((id) => (
                    <SparkleBurst key={id} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
