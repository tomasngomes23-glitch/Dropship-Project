import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { bundlePrice, formatKr, SHOPIFY_PRODUCT_HANDLE } from "../data/aurora";
import {
  createCart,
  getProductByHandle,
  isShopifyConfigured,
  updateCartLine,
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
  const cartRef = useRef<ShopifyCart | null>(null);
  const qtyRef = useRef<number>(0);

  useEffect(() => {
    if (!isShopifyConfigured) return;
    getProductByHandle(SHOPIFY_PRODUCT_HANDLE).then((product) => {
      const variant = product?.variants[0];
      if (variant) setVariantId(variant.id);
    });
  }, []);

  const addBundle = async (addedQty: number) => {
    const targetQty = qtyRef.current + addedQty;
    qtyRef.current = targetQty;
    setQty(targetQty);
    setIsOpen(true);

    if (!isShopifyConfigured || !variantId) return;

    setLoading(true);
    try {
      const existing = cartRef.current;
      const cart =
        existing && existing.lineId
          ? await updateCartLine(existing.id, existing.lineId, targetQty)
          : await createCart(variantId, targetQty);
      cartRef.current = cart;
      setShopifyCart(cart);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    qtyRef.current = 0;
    cartRef.current = null;
    setQty(null);
    setShopifyCart(null);
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
        clear,
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
