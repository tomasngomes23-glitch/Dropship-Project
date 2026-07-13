import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-lime-400/20 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-300"
            >
              Coleção Verão 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Estilo que
              <br />
              não pede
              <br />
              <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                licença.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-md text-base text-neutral-400 lg:text-lg"
            >
              Peças pensadas para quem vive rápido. Qualidade premium,
              envio em 24h e devolução grátis — sem complicações.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#destaques"
                className="group inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03]"
              >
                Ver coleção
                <ArrowDownRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#colecoes"
                className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explorar categorias
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 text-neutral-500"
            >
              <div>
                <p className="font-display text-2xl font-bold text-white">40k+</p>
                <p className="text-xs">clientes felizes</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-display text-2xl font-bold text-white">4.9/5</p>
                <p className="text-xs">avaliação média</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-display text-2xl font-bold text-white">24h</p>
                <p className="text-xs">envio expresso</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto aspect-[3/4] w-full max-w-md"
          >
            <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-orange-400 via-rose-500 to-fuchsia-700 shadow-2xl" />
            <div className="absolute inset-0 -rotate-2 rounded-[2rem] bg-gradient-to-tr from-neutral-900/40 to-transparent" />
            <div className="absolute inset-6 flex flex-col justify-end rounded-3xl">
              <p className="font-display text-3xl font-bold text-white drop-shadow-lg">
                Drop 04
              </p>
              <p className="text-sm text-white/80">Edição limitada · 200 peças</p>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-neutral-950/90 px-5 py-4 shadow-xl backdrop-blur"
            >
              <p className="text-xs text-neutral-400">A partir de</p>
              <p className="font-display text-xl font-bold text-lime-300">49,90€</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
