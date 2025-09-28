import { loadProducts, Product } from "../../lib/products";
import ProductCard from "./ProductCard";
import { useMemo, useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export default function ProductGrid() {
  const [active, setActive] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Generate categories dynamically from actual products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return ["All", ...uniqueCategories.sort()];
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await loadProducts();
        setProducts(allProducts);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts: Product[] = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.category === active);
  }, [products, active]);

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
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
