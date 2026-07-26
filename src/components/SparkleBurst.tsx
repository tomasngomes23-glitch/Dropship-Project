import { motion } from "framer-motion";

const COLORS = ["#5eead4", "#c084fc", "#f472b6", "#fbbf24"];

const PARTICLES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
  const distance = 50 + Math.random() * 40;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.06,
  };
});

export function SparkleBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: p.delay, ease: "easeOut" }}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}
