import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visit our office or get in touch with us for any inquiries
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                  <p className="text-muted-foreground">
                    Sai Sagar Enclave<br />
                    Secunderabad - 500015<br />
                    Telangana, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+918978728882" className="hover:text-primary transition-colors">
                      +91 89787 28882
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:homeelembiz@gmail.com" className="hover:text-primary transition-colors">
                      homeelembiz@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link to="/customer-service">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send us a Message
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://wa.me/918978728882" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Support
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d78.456789!3d17.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDA3JzI0LjQiTiA3OMKwMjcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Home Elem Office Location"
              />
            </div>
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Sai Sagar Enclave</span>
              </div>
              <p className="text-xs text-muted-foreground">Secunderabad - 500015</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl border p-8 lg:p-10 bg-gradient-to-br from-primary/10 to-transparent">
            <h3 className="text-2xl font-semibold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help you with any questions, product support, or general inquiries. We typically respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/customer-service">Contact Support</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/#products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
