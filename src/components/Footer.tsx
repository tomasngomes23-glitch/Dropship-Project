import { AtSign, Check, MessageCircle, Send } from "lucide-react";

const CUSTOMER_CARE = [
  { label: "Track Order", href: "https://velorystore.com/pages/track-order" },
  { label: "Contact", href: "https://velorystore.com/pages/contact" },
  { label: "Refund Policy", href: "https://velorystore.com/policies/refund-policy" },
  { label: "Shipping Policy", href: "https://velorystore.com/policies/shipping-policy" },
];

const WHY_CHOOSE_US = [
  "Free Shipping",
  "100% Satisfaction Guarantee",
  "24/7 Customer Support",
  "Secure Payments",
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rotate-45 rounded-[3px] bg-gradient-to-br from-teal-300 to-fuchsia-400" />
              <span className="font-display text-[15px] font-medium uppercase tracking-[0.2em] text-white">
                Velory
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">
              The Aurora Cube — instant ambiance for any room, anywhere.
            </p>
            <div className="mt-5 flex gap-3">
              {[AtSign, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-teal-300 hover:text-teal-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Customer Care</p>
            <ul className="mt-4 space-y-2.5">
              {CUSTOMER_CARE.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Why Choose Us</p>
            <ul className="mt-4 space-y-2.5">
              {WHY_CHOOSE_US.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-neutral-500">
                  <Check size={14} className="shrink-0 text-teal-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-600 sm:flex-row">
          <p>© 2026 Velory. All rights reserved.</p>
          <div className="flex gap-5">
            <a
              href="https://velorystore.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400"
            >
              Privacy Policy
            </a>
            <a
              href="https://velorystore.com/policies/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
