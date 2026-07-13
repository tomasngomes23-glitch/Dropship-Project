import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section id="sobre" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 px-6 py-14 text-center lg:px-16 lg:py-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
            -15% na tua primeira encomenda
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
            Subscreve a newsletter e sê o primeiro a saber sobre novos drops,
            promoções exclusivas e acesso antecipado.
          </p>

          {sent ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-lime-300/10 px-6 py-3.5 text-sm font-medium text-lime-300">
              <Check size={18} />
              Obrigado! Verifica o teu email.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="o-teu-email@exemplo.com"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-lime-300"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03] cursor-pointer"
              >
                Subscrever
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
