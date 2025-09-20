import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Products() {
  return (
    <div className="container py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
            <p className="text-muted-foreground mt-2">
              Discover our wide range of home and kitchen products designed to make your life easier
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid />
      </div>
    </div>
  );
}
