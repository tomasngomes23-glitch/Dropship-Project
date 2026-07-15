import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { bundlePrice, formatKr, SHOPIFY_PRODUCT_HANDLE } from "../data/aurora";
import {
  createCart,
  getProductByHandle,
  isShopifyConfigured,
  type ShopifyCart,
} from "../lib/shopify";

interface CartContextValue {
  isOpen: boolean;
  qty: number | null;
  loading: boolean;
  shopifyCart: ShopifyCart | null;
  open: () => void;
  close: () => void;
  addBundle: (qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [shopifyCart, setShopifyCart] = useState<ShopifyCart | null>(null);

  useEffect(() => {
    if (!isShopifyConfigured) return;
    getProductByHandle(SHOPIFY_PRODUCT_HANDLE).then((product) => {
      const variant = product?.variants[0];
      if (variant) setVariantId(variant.id);
    });
  }, []);

  const addBundle = async (newQty: number) => {
    setQty(newQty);
    setIsOpen(true);

    if (!isShopifyConfigured || !variantId) return;

    setLoading(true);
    try {
      const cart = await createCart(variantId, newQty);
      setShopifyCart(cart);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        qty,
        loading,
        shopifyCart,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        addBundle,
        clear: () => {
          setQty(null);
          setShopifyCart(null);
        },
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
