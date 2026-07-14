import { createContext, useContext, useState, type ReactNode } from "react";
import { bundlePrice, formatKr } from "../data/aurora";

interface CartContextValue {
  isOpen: boolean;
  qty: number | null;
  open: () => void;
  close: () => void;
  addBundle: (qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState<number | null>(null);

  const addBundle = (newQty: number) => {
    setQty(newQty);
    setIsOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        qty,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        addBundle,
        clear: () => setQty(null),
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

export { bundlePrice, formatKr };
