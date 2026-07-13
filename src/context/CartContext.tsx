import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

interface CartLine {
  product: Product;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  open: () => void;
  close: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = (product: Product) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const remove = (id: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      remove(id);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
    );
  };

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.product.price, 0),
    [lines],
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        add,
        remove,
        setQty,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        count,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
