import { Product } from "../../lib/products";
import { Button } from "../ui/button";
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
      className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-contain rounded"
          loading="lazy"
        />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
          {product.category}
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {dim && (
          <p className="text-xs text-gray-500">
            {dim.widthCm}×{dim.depthCm}×{dim.heightCm} cm{dim.weightKg ? ` • ${dim.weightKg} kg` : ""}
          </p>
        )}
        <div className="pt-2">
          {product.amazonUrl && (
            <a 
              href={product.amazonUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Buy now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
