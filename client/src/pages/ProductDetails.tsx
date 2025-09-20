import { useParams, Link } from "react-router-dom";
import { getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Button asChild>
          <Link to="/">Back to products</Link>
        </Button>
      </div>
    );
  }

  const dim = product.dimensions;

  return (
    <div className="container py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border">
            <img src={product.images[0]} alt={product.name} className="w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(1).map((img, i) => (
              <img key={i} src={img} alt={`${product.name} ${i + 2}`} className="h-28 w-full object-cover rounded-lg border" />
            ))}
          </div>
          {product.videos && product.videos.length > 0 && (
            <div className="grid gap-4">
              {product.videos.map((v, i) => (
                <div key={i} className="rounded-xl overflow-hidden border">
                  <video controls className="w-full" preload="metadata">
                    <source src={v} />
                  </video>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          </div>
          <p className="text-muted-foreground">
            {product.description}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {product.features.map((f) => (
              <li key={f} className="rounded-md border bg-card p-3 text-sm">{f}</li>
            ))}
          </ul>
          {dim && (
            <div className="rounded-lg border p-4 text-sm">
              <p className="font-medium mb-2">Dimensions</p>
              <p>
                {dim.widthCm} × {dim.depthCm} × {dim.heightCm} cm
                {dim.weightKg ? ` • ${dim.weightKg} kg` : ""}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {product.amazonUrl && (
              <Button asChild>
                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">Buy on Amazon.in</a>
              </Button>
            )}
            <Button asChild variant="secondary">
              <Link to={`/register?productId=${product.id}`}>Register this product</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
