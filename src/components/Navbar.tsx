import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const LINKS = [
  { label: "Novidades", href: "#novidades" },
  { label: "Coleções", href: "#colecoes" },
  { label: "Destaques", href: "#destaques" },
  { label: "Sobre", href: "#sobre" },
];

export function Navbar() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="font-display text-xl font-bold tracking-tight text-white">
          AURA<span className="text-lime-300">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white sm:flex cursor-pointer"
            aria-label="Pesquisar"
          >
            <Search size={18} />
          </button>
          <button
            onClick={open}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1 text-[11px] font-bold text-neutral-950">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white md:hidden cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-base text-neutral-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
