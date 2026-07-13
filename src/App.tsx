import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MarqueeBar } from "./components/MarqueeBar";
import { Categories } from "./components/Categories";
import { ProductGrid } from "./components/ProductGrid";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import type { Category } from "./data/products";

function App() {
  const [filter, setFilter] = useState<Category | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-neutral-950">
        <Navbar />
        <MarqueeBar />
        <main>
          <Hero />
          <Categories active={filter} onSelect={setFilter} />
          <ProductGrid filter={filter} />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
