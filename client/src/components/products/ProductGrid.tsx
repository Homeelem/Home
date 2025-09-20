import { products as allProducts, categories as allCategories, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductGrid() {
  const [active, setActive] = useState<string>("All");
  const categories = useMemo(() => ["All", ...allCategories], []);

  const products: Product[] = useMemo(() => {
    if (active === "All") return allProducts;
    return allProducts.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="space-y-6">
      <div id="categories" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors",
              active === c
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
