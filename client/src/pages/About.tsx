import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Users, Target, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small idea in Hyderabad to becoming India's trusted home solutions provider
            </p>
          </div>
        </div>

        {/* Main Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                It all started with a small idea of providing solutions to common household problems in a suburban city of Hyderabad. A 24-year-old who just graduated and wanted to explore the world of e-commerce.
              </p>
              <p>
                What began as a simple vision to make everyday life easier for families has grown into something much bigger. We understood that every home faces unique challenges, and we set out to solve them one product at a time.
              </p>
              <p>
                Today, we're proud to be a trusted name in home and kitchen solutions, serving thousands of customers across India. Our journey from a small startup idea to becoming Amazon's bestseller for 3 consecutive years is a testament to our commitment to quality and customer satisfaction.
              </p>
              <p>
                We believe that great products shouldn't be a luxury – they should be accessible to every home. That's why we've dedicated ourselves to creating affordable, high-quality solutions that make your daily life better.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border shadow-lg">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Our journey from startup to success"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-background border rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">3 Years Amazon Bestseller</span>
              </div>
              <p className="text-sm text-muted-foreground">From startup to success</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-muted/30 rounded-2xl mb-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quality First</h3>
                <p className="text-muted-foreground">We never compromise on quality. Every product undergoes rigorous testing before reaching your home.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Customer-Centric</h3>
                <p className="text-muted-foreground">Your satisfaction is our priority. We listen, learn, and continuously improve based on your feedback.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Accessibility</h3>
                <p className="text-muted-foreground">Great products should be accessible to every home, regardless of budget or location.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">We constantly innovate to bring you better, smarter solutions for everyday challenges.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">500K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">3</div>
            <div className="text-muted-foreground">Years Amazon Bestseller</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="rounded-2xl border p-8 lg:p-10 bg-gradient-to-br from-primary/10 to-transparent">
            <h3 className="text-2xl font-semibold mb-4">Ready to Experience Quality?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Home Elem for their home and kitchen needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/#products">View Our Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/#contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
