import { AtSign, MessageCircle, Send } from "lucide-react";

const COLUMNS = [
  {
    title: "Customer Care",
    links: ["Track Order", "Contact", "Refund Policy", "Shipping Policy"],
  },
  {
    title: "Why Choose Us",
    links: [
      "Free Shipping",
      "100% Satisfaction Guarantee",
      "24/7 Customer Support",
      "Secure Payments",
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl text-white">Velory</p>
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

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-neutral-500 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-600 sm:flex-row">
          <p>© 2026 Velory. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-neutral-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
