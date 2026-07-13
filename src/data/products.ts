export type Category = "homem" | "mulher" | "acessorios" | "sneakers";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  tag?: "novo" | "esgota-se" | "sale";
  gradient: string;
  swatch: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Casaco Oversized Terracotta",
    category: "homem",
    price: 89.9,
    tag: "novo",
    gradient: "from-orange-400 via-rose-500 to-red-600",
    swatch: "#e8583a",
  },
  {
    id: "p2",
    name: "Vestido Slip Midnight",
    category: "mulher",
    price: 64.9,
    compareAt: 89.9,
    tag: "sale",
    gradient: "from-indigo-500 via-purple-600 to-slate-900",
    swatch: "#4c3b8a",
  },
  {
    id: "p3",
    name: "Sneaker Volt Runner",
    category: "sneakers",
    price: 129.9,
    tag: "novo",
    gradient: "from-lime-300 via-emerald-400 to-teal-600",
    swatch: "#7bd93f",
  },
  {
    id: "p4",
    name: "Boné Utility Sand",
    category: "acessorios",
    price: 24.9,
    gradient: "from-amber-200 via-yellow-400 to-orange-400",
    swatch: "#e8b34a",
  },
  {
    id: "p5",
    name: "Camisola Oversize Ecru",
    category: "mulher",
    price: 54.9,
    gradient: "from-neutral-200 via-stone-300 to-neutral-400",
    swatch: "#cbbfae",
  },
  {
    id: "p6",
    name: "Calça Cargo Olive",
    category: "homem",
    price: 74.9,
    tag: "novo",
    gradient: "from-green-700 via-emerald-800 to-neutral-900",
    swatch: "#3f5b3f",
  },
  {
    id: "p7",
    name: "Sneaker Cloud White",
    category: "sneakers",
    price: 119.9,
    compareAt: 149.9,
    tag: "sale",
    gradient: "from-slate-100 via-slate-300 to-slate-400",
    swatch: "#c9ccd1",
  },
  {
    id: "p8",
    name: "Blazer Structured Black",
    category: "mulher",
    price: 99.9,
    gradient: "from-neutral-700 via-neutral-900 to-black",
    swatch: "#232323",
  },
  {
    id: "p9",
    name: "Óculos Retro Amber",
    category: "acessorios",
    price: 34.9,
    tag: "novo",
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    swatch: "#e8792f",
  },
  {
    id: "p10",
    name: "Hoodie Signature Grey",
    category: "homem",
    price: 59.9,
    gradient: "from-zinc-400 via-zinc-600 to-zinc-800",
    swatch: "#5c5c63",
  },
  {
    id: "p11",
    name: "Saia Plissada Rosé",
    category: "mulher",
    price: 49.9,
    tag: "novo",
    gradient: "from-pink-300 via-rose-400 to-fuchsia-500",
    swatch: "#e77fa8",
  },
  {
    id: "p12",
    name: "Sneaker Trail Rust",
    category: "sneakers",
    price: 134.9,
    gradient: "from-orange-600 via-red-700 to-neutral-900",
    swatch: "#a8442a",
  },
];

export const categories: { id: Category; label: string; gradient: string }[] = [
  { id: "mulher", label: "Mulher", gradient: "from-rose-400 to-fuchsia-600" },
  { id: "homem", label: "Homem", gradient: "from-orange-400 to-red-600" },
  { id: "sneakers", label: "Sneakers", gradient: "from-lime-300 to-emerald-600" },
  { id: "acessorios", label: "Acessórios", gradient: "from-amber-300 to-orange-500" },
];
