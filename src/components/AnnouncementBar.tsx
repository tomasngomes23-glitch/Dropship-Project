const ITEMS = [
  "30 DAY MONEYBACK GUARANTEE",
  "FREE SHIPPING ON ORDERS 300 KR+",
  "50% OFF TODAY ONLY",
];

export function AnnouncementBar() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-b border-white/10 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 py-2">
      <div className="animate-marquee flex w-max gap-10">
        {[...loop, ...loop].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-neutral-950"
          >
            {item} <span className="mx-3 opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
