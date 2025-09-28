import { useParams, Link } from "react-router-dom";
import { getProduct } from "../lib/products";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "../lib/products";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

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
          {/* Main Image with Carousel */}
          <div className="relative group">
            <div className="overflow-hidden rounded-xl border aspect-[4/3]">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {/* Fullscreen Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
              onClick={openFullscreen}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Thumbnail Navigation */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    i === currentImageIndex 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${i + 1}`} 
                    className="h-20 w-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
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
                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">Buy now</a>
              </Button>
            )}
            <Button asChild variant="secondary">
              <Link to={`/register?productId=${product.id}`}>Register for Warranty</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
              onClick={closeFullscreen}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            {/* Fullscreen Image */}
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Image Counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
