import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { StickyBuyBar } from "./StickyBuyBar";
import { CursorGlow } from "./CursorGlow";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-neutral-950">
      <CursorGlow />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <StickyBuyBar />
    </div>
  );
}
