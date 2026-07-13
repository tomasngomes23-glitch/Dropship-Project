import { AtSign, MessageCircle, Send } from "lucide-react";

const COLUMNS = [
  {
    title: "Loja",
    links: ["Mulher", "Homem", "Sneakers", "Acessórios", "Saldos"],
  },
  {
    title: "Apoio ao cliente",
    links: ["Envios", "Devoluções", "Guia de tamanhos", "Contactos", "FAQ"],
  },
  {
    title: "Empresa",
    links: ["Sobre nós", "Sustentabilidade", "Carreiras", "Imprensa"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold text-white">
              AURA<span className="text-lime-300">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">
              Moda urbana e atemporal para quem não abdica de estilo nem de conforto.
            </p>
            <div className="mt-5 flex gap-3">
              {[AtSign, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-lime-300 hover:text-lime-300"
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
          <p>© 2026 AURA. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-neutral-400">
              Privacidade
            </a>
            <a href="#" className="hover:text-neutral-400">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
