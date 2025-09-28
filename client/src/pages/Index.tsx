import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Award, Headphones, Wrench, Clock, Star, Users } from "lucide-react";

export default function Index() {
  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-primary">Home & Kitchen</p>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">Home Elem — Designed for everyday excellence</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-prose">
              Explore our curated line of home and kitchen products built to last and crafted to delight. Every product undergoes rigorous quality testing and comes with comprehensive post-sale support.
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
                alt="Modern kitchen with Home Elem products"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-xl border bg-background p-4 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">4.9/5 Rating</span>
              </div>
              <p className="text-xs text-muted-foreground">3 Years Amazon Bestseller</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Proven Excellence, Unmatched Quality</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our commitment to quality and customer satisfaction has made us the #1 choice for home and kitchen products in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary">3 Years</h3>
              <p className="text-lg font-semibold">Amazon Bestseller</p>
              <p className="text-muted-foreground text-sm">Consistently ranked #1 in home & kitchen category</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-10 w-10 text-green-600 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-primary">4.9/5</h3>
              <p className="text-lg font-semibold">Customer Rating</p>
              <p className="text-muted-foreground text-sm">Based on 50,000+ verified customer reviews</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary">500K+</h3>
              <p className="text-lg font-semibold">Happy Customers</p>
              <p className="text-muted-foreground text-sm">Families who trust Home Elem for their kitchen needs</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary">99.7%</h3>
              <p className="text-lg font-semibold">Quality Score</p>
              <p className="text-muted-foreground text-sm">Defect-free products delivered to customers</p>
            </div>
          </div>
        </div>
      </section>


      {/* Quality Assurance Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Quality That Never Compromises</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              We believe in delivering products that exceed expectations. Every Home Elem product undergoes <strong>15+ quality checkpoints</strong> and <strong>rigorous testing protocols</strong> before reaching your home. Our commitment to excellence is why we've maintained a <strong>99.7% quality score</strong> and <strong>4.9/5 customer rating</strong> for three consecutive years.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Multi-Stage Testing</h3>
              <p className="text-muted-foreground">Each product undergoes 15+ quality checkpoints from raw materials to final packaging</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Durability Testing</h3>
              <p className="text-muted-foreground">Stress-tested for 10,000+ usage cycles to ensure long-lasting performance</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Certified Materials</h3>
              <p className="text-muted-foreground">Only food-grade, BPA-free materials that meet international safety standards</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Real-World Testing</h3>
              <p className="text-muted-foreground">Products tested in actual Indian kitchen conditions for 6+ months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Process Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Our Rigorous Testing Process</h2>
                <p className="text-lg text-muted-foreground">
                  Before any Home Elem product reaches your kitchen, it must pass our comprehensive testing protocol designed to ensure reliability and safety.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold">Material Analysis</h3>
                    <p className="text-muted-foreground text-sm">Chemical composition testing and food safety certification</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold">Performance Testing</h3>
                    <p className="text-muted-foreground text-sm">Functionality tests under various conditions and loads</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold">Durability Trials</h3>
                    <p className="text-muted-foreground text-sm">Extended usage simulation and wear resistance testing</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">4</div>
                  <div>
                    <h3 className="font-semibold">Final Inspection</h3>
                    <p className="text-muted-foreground text-sm">Comprehensive quality audit before packaging and dispatch</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border shadow-lg">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Quality testing laboratory"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background border rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">99.7% Quality Score</span>
                </div>
                <p className="text-sm text-muted-foreground">Based on customer feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Sale Support Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">We Stand Behind Every Product</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Our commitment doesn't end at purchase. We provide comprehensive post-sale support because we <strong>believe in the quality of our products</strong>. With over <strong>500,000 satisfied customers</strong> and a <strong>4.9/5 rating</strong>, we're confident in every product we deliver. That's why we offer extensive warranties, round-the-clock support, and a 100% satisfaction guarantee.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">6-Month Warranty</h3>
              <p className="text-muted-foreground">Comprehensive warranty coverage for manufacturing defects and performance issues</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Headphones className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock customer support for any questions or concerns</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Expert Guidance</h3>
              <p className="text-muted-foreground">Product usage tips and maintenance advice from our kitchen experts</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-background border rounded-full px-6 py-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">100% Satisfaction Guarantee</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Not satisfied? We'll make it right or provide a full refund</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our 500,000+ satisfied customers have to say about Home Elem products.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "I've been using Home Elem cookware for 2 years now. The quality is outstanding and the customer support is exceptional. Truly worth every penny!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">RK</span>
                </div>
                <div>
                  <p className="font-semibold">Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "The air fryer from Home Elem is a game-changer! Perfect results every time and the build quality is amazing. Highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">PS</span>
                </div>
                <div>
                  <p className="font-semibold">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "Best kitchen appliances I've ever purchased. The blender works like a charm and the warranty service is top-notch. 5 stars!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">AM</span>
                </div>
                <div>
                  <p className="font-semibold">Amit Mehta</p>
                  <p className="text-sm text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
              <Star className="h-5 w-5 text-primary fill-current" />
              <span className="font-semibold">4.9/5 Average Rating</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">50,000+ Reviews</span>
            </div>
          </div>
        </div>
      </section>


      <section className="container pb-20">
        <div className="rounded-2xl border p-8 lg:p-10 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Already purchased a Home Elem product?</h3>
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
