import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { open, qty } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (hash: string) => (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-neutral-950/85 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="h-3 w-3 rotate-45 rounded-[3px] bg-gradient-to-br from-teal-300 to-fuchsia-400" />
          <span className="font-display text-[15px] font-medium uppercase tracking-[0.2em] text-white">
            Velory
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-neutral-300 hover:text-white">
            Home
          </Link>
          <a
            href="#reviews"
            onClick={goToSection("#reviews")}
            className="text-sm text-neutral-300 hover:text-white"
          >
            Reviews
          </a>
          <a
            href="#faq"
            onClick={goToSection("#faq")}
            className="text-sm text-neutral-300 hover:text-white"
          >
            FAQ
          </a>
        </nav>

        <button
          onClick={open}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag size={18} />
          {qty && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-400 px-1 text-[11px] font-bold text-neutral-950">
              {qty}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
