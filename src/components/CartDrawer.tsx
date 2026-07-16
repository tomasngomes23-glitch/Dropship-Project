import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ShieldCheck, ShoppingBag, Trash2, X } from "lucide-react";
import heroImg from "../assets/aurora/cube-hero-teal.webp";
import { bundlePrice, formatKr, UNIT_COMPARE_AT } from "../data/aurora";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const { isOpen, close, qty, loading, shopifyCart, clear } = useCart();
  const { base, price: estimatedPrice } = qty ? bundlePrice(qty) : { base: 0, price: 0 };
  const compareAt = qty === 1 ? UNIT_COMPARE_AT : base;

  const price = shopifyCart ? Number(shopifyCart.totalAmount.amount) : estimatedPrice;
  const savings = compareAt - price;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-neutral-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <ShoppingBag size={20} />
                Your Cart
              </h2>
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Fechar carrinho"
              >
                <X size={18} />
              </button>
            </div>

            {!qty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={40} className="text-neutral-700" />
                <p className="text-neutral-500">Your cart is empty.</p>
                <button
                  onClick={close}
                  className="mt-2 rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 cursor-pointer"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="flex gap-3">
                    <img src={heroImg} alt="Aurora Cube" className="h-24 w-20 shrink-0 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-neutral-100">Aurora Cube</p>
                        <button
                          onClick={clear}
                          aria-label="Remove from cart"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-white/10 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {qty === 1 ? "Single" : `Qty: ${qty}`}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        {loading ? (
                          <Loader2 size={16} className="animate-spin text-teal-300" />
                        ) : (
                          <span className="text-sm font-semibold text-white">
                            {formatKr(price)}
                          </span>
                        )}
                        <span className="text-xs text-neutral-500 line-through">
                          {formatKr(compareAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-teal-400/20 bg-teal-400/5 px-3 py-2.5 text-xs text-teal-300">
                    <ShieldCheck size={14} />
                    30-day money-back guarantee
                  </div>
                </div>

                <div className="border-t border-white/10 px-6 py-5">
                  <div className="mb-1 flex items-center justify-between text-sm text-neutral-400">
                    <span>You save</span>
                    <span className="text-teal-300">{formatKr(savings)}</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Subtotal</span>
                    <span className="font-display text-lg font-semibold text-white">
                      {formatKr(price)}
                    </span>
                  </div>
                  {shopifyCart ? (
                    <a
                      href={shopifyCart.checkoutUrl}
                      className="flex w-full items-center justify-center rounded-full bg-teal-400 py-3.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-[1.02]"
                    >
                      Checkout
                    </a>
                  ) : (
                    <button
                      disabled={loading}
                      className="w-full rounded-full bg-teal-400 py-3.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-60"
                    >
                      {loading ? "Loading…" : "Checkout"}
                    </button>
                  )}
                  <p className="mt-3 text-center text-xs text-neutral-600">
                    Free shipping · Tracked delivery
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
