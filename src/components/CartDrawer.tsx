import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const { isOpen, close, lines, setQty, remove, subtotal } = useCart();

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
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <ShoppingBag size={20} />
                O teu carrinho
              </h2>
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Fechar carrinho"
              >
                <X size={18} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={40} className="text-neutral-700" />
                <p className="text-neutral-500">O teu carrinho está vazio.</p>
                <button
                  onClick={close}
                  className="mt-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-neutral-950 cursor-pointer"
                >
                  Continuar a comprar
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="flex flex-col gap-4">
                    {lines.map((line) => (
                      <div key={line.product.id} className="flex gap-3">
                        <div
                          className={`h-20 w-16 shrink-0 rounded-xl bg-gradient-to-br ${line.product.gradient}`}
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-neutral-100">
                              {line.product.name}
                            </p>
                            <button
                              onClick={() => remove(line.product.id)}
                              className="text-xs text-neutral-500 hover:text-red-400 cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-white/10 px-1">
                              <button
                                onClick={() => setQty(line.product.id, line.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center text-sm text-white">
                                {line.qty}
                              </span>
                              <button
                                onClick={() => setQty(line.product.id, line.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-white">
                              {(line.product.price * line.qty).toFixed(2)}€
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Subtotal</span>
                    <span className="font-display text-lg font-bold text-white">
                      {subtotal.toFixed(2)}€
                    </span>
                  </div>
                  <button className="w-full rounded-full bg-lime-300 py-3.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.02] cursor-pointer">
                    Finalizar compra
                  </button>
                  <p className="mt-3 text-center text-xs text-neutral-600">
                    Envio e impostos calculados no checkout
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
