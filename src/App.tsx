import { CartProvider } from "./context/CartContext";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TransformSection } from "./components/TransformSection";
import { HowItWorks } from "./components/HowItWorks";
import { StatsSection } from "./components/StatsSection";
import { Testimonials } from "./components/Testimonials";
import { GuaranteeSection } from "./components/GuaranteeSection";
import { FAQSection } from "./components/FAQSection";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { StickyBuyBar } from "./components/StickyBuyBar";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-neutral-950">
        <AnnouncementBar />
        <Navbar />
        <main>
          <Hero />
          <TransformSection />
          <HowItWorks />
          <StatsSection />
          <Testimonials />
          <GuaranteeSection />
          <FAQSection />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <StickyBuyBar />
      </div>
    </CartProvider>
  );
}

export default App;
