import { products, type Category } from "../data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ filter }: { filter: Category | null }) {
  const list = filter ? products.filter((p) => p.category === filter) : products;

  return (
    <section id="destaques" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
              {filter ? `Coleção ${filter}` : "Novidades e destaques"}
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {list.length} peças disponíveis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
