export interface BundleTier {
  qty: 1 | 2 | 3;
  label: string;
  sublabel?: string;
  discountPct: number;
}

export const UNIT_PRICE = 295.0;
export const UNIT_COMPARE_AT = 491.0;

export const bundles: BundleTier[] = [
  { qty: 1, label: "Buy 1", discountPct: 0 },
  { qty: 2, label: "Buy 2", sublabel: "Save 20%", discountPct: 20 },
  { qty: 3, label: "Buy 3", sublabel: "Save 30% — Most Popular", discountPct: 30 },
];

export function bundlePrice(qty: number) {
  const base = qty * UNIT_PRICE;
  const tier = bundles.find((b) => b.qty === qty);
  const discount = tier ? tier.discountPct : 0;
  const price = base * (1 - discount / 100);
  return { base, price };
}

export function formatKr(value: number) {
  return `${value.toFixed(2)} kr`;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Emma K.",
    location: "Stockholm",
    quote:
      "My room looks completely different now. Everyone who visits asks where I got it.",
    rating: 5,
  },
  {
    name: "Sofia M.",
    location: "Amsterdam",
    quote: "Bought this as a gift and he was speechless. Absolutely worth it.",
    rating: 5,
  },
  {
    name: "James R.",
    location: "London",
    quote: "Genuinely stunning. Best impulse buy I've ever made.",
    rating: 5,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How big is it?",
    answer:
      "Compact and portable at approximately 8x8cm. Small enough for any surface but powerful enough to light up an entire room.",
  },
  {
    question: "How many colors does it have?",
    answer:
      "16 color options controllable instantly with the included remote. No app or WiFi needed.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "7-14 business days across Europe. Tracking number provided as soon as your order ships.",
  },
  {
    question: "Is it safe to leave on overnight?",
    answer:
      "Yes — energy efficient LED stays cool to the touch even after hours of use.",
  },
  {
    question: "How fast is shipping?",
    answer:
      "We process orders within 24-72 hours and deliver them within 6-15 days depending on your location, with tracked shipment included for your convenience.",
  },
  {
    question: "How do I get in contact?",
    answer:
      'You can message support by clicking the "Contact Us" section on our store.',
  },
];

export const stats = [
  { value: 94, label: "said it completely transformed their room" },
  { value: 96, label: "said they would recommend it to a friend" },
  { value: 95, label: "said it was worth every penny" },
];

export const features = [
  {
    title: "Instant mood upgrade",
    body: "Plug in and your room transforms in seconds.",
  },
  {
    title: "Perfect for any occasion",
    body: "Movie night, date night, or just unwinding.",
  },
  {
    title: "Impresses everyone",
    body: "Looks far more expensive than it really is.",
  },
];
