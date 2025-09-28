import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Clock, MessageCircle, HelpCircle, FileText, Truck, Shield, Wand2, CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { Link } from "react-router-dom";

export default function CustomerService() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sentMessageData, setSentMessageData] = useState<{
    name: string;
    subject: string;
    category: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Save to Firebase
      if (firebaseEnabled && db) {
        await addDoc(collection(db, "customerMessages"), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          category: formData.category,
          message: formData.message,
          status: "new",
          createdAt: serverTimestamp(),
        });
        toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      } else {
        // Fallback: Create mailto link with form data
        const subject = encodeURIComponent(`[${formData.category}] ${formData.subject}`);
        const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Category: ${formData.category}

Message:
${formData.message}
        `);
        
        const mailtoLink = `mailto:homeelembiz@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink);
        toast.info("Firebase not configured. Opening email client...");
      }
      
      // Store sent message data for confirmation screen
      setSentMessageData({
        name: formData.name,
        subject: formData.subject,
        category: formData.category
      });
      
      // Show confirmation screen
      setMessageSent(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fillDummyData = () => {
    const dummyData = {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      subject: "Product Support Inquiry",
      category: "product",
      message: "Hi, I recently purchased the Home Elem Stainless Steel Cookware Set and I'm having trouble with the non-stick coating. The food is sticking to the pan even after following the care instructions. Could you please help me with this issue? I've been using it for about 2 weeks now and it's not performing as expected. Thank you for your assistance."
    };

    setFormData(dummyData);
    toast.success("Dummy data filled!");
  };

  const generateWhatsAppMessage = () => {
    if (!sentMessageData) return "";
    const ticketTitle = `[${sentMessageData.category.toUpperCase()}] ${sentMessageData.subject}`;
    return `Hi, I have an urgent query regarding: ${ticketTitle}. Please help me with this issue.`;
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/918978728882?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendAnotherMessage = () => {
    setMessageSent(false);
    setSentMessageData(null);
  };

  // Show confirmation screen if message was sent
  if (messageSent && sentMessageData) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-green-100">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-green-600">
              Message Sent Successfully!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thank you, <strong>{sentMessageData.name}</strong>! We have received your query and will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Explore Products Card */}
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Explore Our Products</CardTitle>
                <CardDescription>
                  Browse our wide range of home and kitchen products while you wait
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="w-full">
                  <Link to="/#catalog">
                    View Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp Contact Card */}
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle>Need Immediate Help?</CardTitle>
                <CardDescription>
                  For urgent matters, contact us directly on WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={openWhatsApp}
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  +91 89787 28882
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Message Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Message Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject:</span>
                  <span className="font-medium">{sentMessageData.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">{sentMessageData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-green-600">Received</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={sendAnotherMessage} variant="outline" size="lg">
              Send Another Message
            </Button>
            <Button asChild size="lg">
              <Link to="/">
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Customer Service</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're here to help! Get in touch with our customer service team for any questions, support, or sales inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Multiple ways to reach our customer service team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <a 
                      href="mailto:homeelembiz@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      homeelembiz@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <a 
                      href="tel:+918978728882" 
                      className="text-primary hover:underline"
                    >
                      +91 89787 28882
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 4:00 PM<br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="mailto:homeelembiz@gmail.com?subject=Product Registration Help">
                    <FileText className="h-4 w-4 mr-2" />
                    Product Registration
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="mailto:homeelembiz@gmail.com?subject=Warranty Claim">
                    <Shield className="h-4 w-4 mr-2" />
                    Warranty Claim
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="mailto:homeelembiz@gmail.com?subject=Order Status">
                    <Truck className="h-4 w-4 mr-2" />
                    Order Status
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="mailto:homeelembiz@gmail.com?subject=Sales Inquiry">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Sales Inquiry
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours
                    </CardDescription>
                  </div>
                  {import.meta.env.DEV && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={fillDummyData}
                      className="flex items-center gap-2"
                    >
                      <Wand2 className="h-4 w-4" />
                      Fill Dummy Data
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="product">Product Support</SelectItem>
                          <SelectItem value="warranty">Warranty Claim</SelectItem>
                          <SelectItem value="order">Order Status</SelectItem>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I register my product?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can register your product by clicking the "Register Product" button on our website and filling out the registration form with your purchase details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the warranty period?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All Home Elem products come with a 6-month comprehensive warranty covering manufacturing defects and performance issues.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I track my order?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can track your order by contacting us at +91 89787 28882 or emailing homeelembiz@gmail.com with your order number.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer international shipping?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Currently, we ship within India only. For international shipping inquiries, please contact our sales team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
