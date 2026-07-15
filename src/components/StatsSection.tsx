import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data/aurora";

function Counter({ target }: { target: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold text-teal-300">
      {value}%
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-14 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-2xl font-semibold text-white sm:text-3xl"
        >
          The Results Speak For Themselves
        </motion.h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-neutral-400">
          Thousands of happy customers across the globe can't imagine their room
          without it.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.06 }}
              className="cursor-default rounded-2xl p-3 text-center transition-colors duration-200 hover:bg-white/[0.04]"
            >
              <Counter target={s.value} />
              <p className="mt-2 text-sm text-neutral-400">"{s.label}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
