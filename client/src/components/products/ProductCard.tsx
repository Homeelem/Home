import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const dim = product.dimensions;
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the Buy button
    if ((e.target as HTMLElement).closest('a[href]')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="group rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium shadow">
          {product.category}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        {dim && (
          <p className="text-xs text-muted-foreground">
            {dim.widthCm}×{dim.depthCm}×{dim.heightCm} cm{dim.weightKg ? ` • ${dim.weightKg} kg` : ""}
          </p>
        )}
        <div className="flex gap-2 pt-1">
          {product.amazonUrl && (
            <Button asChild size="sm" variant="secondary">
              <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                Buy
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
