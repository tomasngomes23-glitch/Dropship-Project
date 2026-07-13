const ITEMS = [
  "ENVIO GRÁTIS ACIMA DE 50€",
  "NOVA COLEÇÃO DISPONÍVEL",
  "DEVOLUÇÕES GRÁTIS EM 30 DIAS",
  "-20% NA PRIMEIRA COMPRA",
];

export function MarqueeBar() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-lime-300 py-2.5">
      <div className="animate-marquee flex w-max gap-10">
        {[...loop, ...loop].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-neutral-950"
          >
            {item} <span className="mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
