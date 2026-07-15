import { motion } from "framer-motion";
import portableImg from "../assets/aurora/cube-portable-hand.webp";
import colorsImg from "../assets/aurora/cube-colors-desk.webp";
import dimmingImg from "../assets/aurora/cube-dimming-bedside.webp";

const STEPS = [
  {
    n: "01",
    title: "Place & Plug In",
    body: "Set the Aurora Cube on any surface and plug it in. No app, no WiFi, no complicated setup.",
    img: portableImg,
  },
  {
    n: "02",
    title: "Pick Your Color",
    body: "16 color options controlled instantly with the included remote — find your vibe in seconds.",
    img: colorsImg,
  },
  {
    n: "03",
    title: "Dim to Perfection",
    body: "Stepless dimming lets you adjust brightness exactly how you like it, day or night.",
    img: dimmingImg,
  },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Simple To Use, Impossible To Ignore
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">
            The crystal glass projects stunning light patterns across your walls
            and ceiling. Perfect atmosphere in seconds.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-teal-400/30"
            >
              <div className="overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="font-display text-xs font-semibold text-teal-300">
                  {step.n}
                </span>
                <p className="mt-1 font-medium text-white">{step.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
