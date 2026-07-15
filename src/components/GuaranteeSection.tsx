import { motion } from "framer-motion";
import { Flame, PackageCheck, ShieldCheck } from "lucide-react";
import bedImg from "../assets/aurora/cube-guy-bed.webp";

export function GuaranteeSection() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="group order-2 overflow-hidden rounded-[2rem] lg:order-1"
        >
          <img
            src={bedImg}
            alt="Rapaz na cama a admirar o brilho do Aurora Cube"
            className="w-full transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
            <Flame size={13} />
            We recently went viral — stock is limited
          </span>

          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Our Guarantee
          </h2>
          <p className="mt-4 max-w-md text-neutral-400">
            If you're not 100% satisfied within the first 30 days, just send it
            back and we'll give you a full refund. No need to worry about return
            shipping — we've got you covered.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors duration-200 hover:bg-white/[0.04]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-300">
                <ShieldCheck size={17} />
              </span>
              <div>
                <p className="font-medium text-white">30-day money-back guarantee</p>
                <p className="text-sm text-neutral-400">Risk-free, no questions asked.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors duration-200 hover:bg-white/[0.04]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-300">
                <PackageCheck size={17} />
              </span>
              <div>
                <p className="font-medium text-white">Tracked shipping included</p>
                <p className="text-sm text-neutral-400">
                  Orders processed in 24-72h, delivered in 6-15 days depending on
                  your location.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
