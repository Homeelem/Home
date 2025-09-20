import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-primary">Home & Kitchen</p>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">HomeElem — Designed for everyday excellence</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-prose">
              Explore our curated line of home and kitchen products built to last and crafted to delight. Tap any product to see detailed specs, photos, and videos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg"
                onClick={() => {
                  const catalogElement = document.getElementById('catalog');
                  if (catalogElement) {
                    catalogElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Our Products
              </Button>
            </div>
            
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-lg">
              <img
                src="https://images.pexels.com/photos/7061339/pexels-photo-7061339.jpeg"
                alt="Modern kitchen with HomeElem products"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-xl border bg-background p-4 shadow-md">
              <p className="text-xs text-muted-foreground">Trusted by thousands</p>
              <p className="text-sm font-medium">Engineered for Indian homes</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="container py-16 lg:py-20">
        <div className="mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Our Product Line</h2>
            <p className="text-muted-foreground">Specialized in home & kitchen — cookware, blenders, air fryers, coffee makers.</p>
          </div>
        </div>
        <ProductGrid />
      </section>

      <section className="container pb-20">
        <div className="rounded-2xl border p-8 lg:p-10 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Already purchased a HomeElem product?</h3>
              <p className="text-muted-foreground">Register to activate your warranty and receive product tips.</p>
            </div>
            <div className="flex justify-end">
              <Button asChild size="lg">
                <Link to="/register">Register your product</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
