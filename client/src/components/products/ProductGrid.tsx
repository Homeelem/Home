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
        console.log("Loading products...");
        const allProducts = await loadProducts();
        console.log("Products loaded:", allProducts);
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
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

  console.log("ProductGrid rendering:", { 
    loading, 
    productsCount: products.length, 
    filteredCount: filteredProducts.length,
    categories: categories.length,
    active 
  });

  return (
    <div className="space-y-6">
      {/* Debug Info */}
      <div className="bg-yellow-100 p-4 rounded-lg text-sm">
        <p><strong>Debug Info:</strong></p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Products Count: {products.length}</p>
        <p>Filtered Count: {filteredProducts.length}</p>
        <p>Categories: {categories.join(', ')}</p>
        <p>Active Category: {active}</p>
      </div>
      
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
          <p className="text-sm text-muted-foreground mt-2">
            Total products: {products.length}, Filtered: {filteredProducts.length}
          </p>
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
