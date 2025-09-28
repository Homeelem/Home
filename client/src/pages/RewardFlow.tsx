import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Gift, 
  Star, 
  CheckCircle, 
  MessageCircle, 
  ShoppingBag,
  Wand2,
  ExternalLink
} from "lucide-react";
import { products } from "@/data/products";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FlowStep = 'registration' | 'review' | 'confirmation';

interface RegistrationData {
  orderId: string;
  purchaseDate: string;
  email: string;
  phone: string;
  productId: string;
}

interface ReviewData {
  reviewCompleted: boolean;
}

export default function RewardFlow() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FlowStep>('registration');
  
  // Registration form state
  const [productId, setProductId] = useState<string | undefined>(
    params.get("productId") ?? undefined,
  );
  const [orderId, setOrderId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string; phone?: string}>({});
  
  // Review form state
  const [reviewCompleted, setReviewCompleted] = useState(false);
  
  // Stored data
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  useEffect(() => {
    if (!firebaseEnabled) {
      console.warn("Firebase not configured. Set VITE_FIREBASE_* env vars to enable saving registrations.");
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateIndianPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    const indianMobileRegex = /^[6-9]\d{9}$/;
    
    if (phone.startsWith('+91')) {
      const withoutPrefix = phone.substring(3).replace(/\D/g, '');
      return indianMobileRegex.test(withoutPrefix);
    }
    
    return indianMobileRegex.test(cleanPhone);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (value && !value.startsWith('+91') && value.length > 0) {
      const digits = value.replace(/\D/g, '');
      if (digits.length > 0) {
        value = '+91' + digits;
      }
    }
    
    setPhone(value);
    
    if (value && !validateIndianPhone(value)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid Indian mobile number (e.g., +91 9876543210)' }));
    } else {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const fillDummyRegistrationData = () => {
    const dummyData = {
      orderId: `404-${Math.floor(Math.random() * 9000000) + 1000000}-${Math.floor(Math.random() * 9000000) + 1000000}`,
      purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    };
    
    setOrderId(dummyData.orderId);
    setPurchaseDate(dummyData.purchaseDate);
    setEmail(dummyData.email);
    setPhone(dummyData.phone);
    
    setErrors({});
    
    if (!productId) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setProductId(randomProduct.id);
    }
    
    toast.success("Dummy data filled!");
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const registrationData: RegistrationData = {
        orderId,
        purchaseDate,
        email,
        phone,
        productId: productId || '',
      };

      if (firebaseEnabled) {
        await addDoc(collection(db, "registrations"), {
          ...registrationData,
          createdAt: serverTimestamp(),
        });
      }

      setRegistrationData(registrationData);
      setCurrentStep('review');
      toast.success("Registration successful! Now add your review to Get ₹200 instantly!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewNext = async () => {
    if (!registrationData) return;

    try {
      const reviewData: ReviewData = {
        reviewCompleted: true,
      };

      if (firebaseEnabled) {
        await addDoc(collection(db, "review_confirmations"), {
          ...registrationData,
          ...reviewData,
          createdAt: serverTimestamp(),
        });
      }

      setCurrentStep('confirmation');
      toast.success("Thank you! Proceeding to Get ₹200 instantly!");
    } catch (error) {
      console.error("Review confirmation error:", error);
      toast.error("Failed to confirm. Please try again.");
    }
  };


  const openWhatsApp = () => {
    const message = "Hey, I just reviewed your product. This is my PhonePe/Google Pay number to Get ₹200 instantly!";
    const whatsappUrl = `https://wa.me/918978728882?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderRegistrationStep = () => (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="h-4 w-4" />
            Special Offer
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Get <span className="text-green-600">₹200</span> instantly!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Register your Home Elem product and add a review to Get ₹200 instantly! on PhonePe or Google Pay.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Register Product</span>
            </div>
            <div className="w-8 h-px bg-muted-foreground/30"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Add Review</span>
            </div>
            <div className="w-8 h-px bg-muted-foreground/30"></div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-600" />
              <span>Get ₹200 instantly!</span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Step 1: Register Your Product
            </CardTitle>
            <CardDescription>
              Provide your purchase details to Get ₹200 instantly!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="product">Product *</Label>
                  <Select value={productId} onValueChange={setProductId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Home Elem product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID *</Label>
                  <Input
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order ID"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date *</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+91 9876543210"
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              {!firebaseEnabled && (
                <Alert>
                  <AlertDescription>
                    Firebase is not configured. Set VITE_FIREBASE_* env variables to enable saving registrations.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={submitting || !orderId || !purchaseDate || !email || !phone || !productId}
                  className="flex-1"
                >
                  {submitting ? "Registering..." : "Register Product"}
                </Button>
                
                {import.meta.env.DEV && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fillDummyRegistrationData}
                    className="flex items-center gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    Fill Dummy Data
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">Step 2 of 2</Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Almost there! Add your review on Amazon
          </h2>
          <p className="text-muted-foreground">
            Help other customers by sharing your honest review on Amazon
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Amazon Review Instructions
            </CardTitle>
            <CardDescription>
              Follow these simple steps to add your review and Get ₹200 instantly!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">How to add your review:</h3>
              <ol className="space-y-3 text-blue-800">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                  <span>Go to your Amazon account and find your Home Elem product order</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                  <span>Click on "Write a product review"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                  <span>Rate the product with stars and write your honest review</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</span>
                  <span>Submit your review and come back here to Get ₹200 instantly!</span>
                </li>
              </ol>
            </div>

            {product && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Your Product:</h4>
                <p className="text-gray-700">{product.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Order ID: {registrationData?.orderId}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep('registration')}
                className="flex-1"
              >
                Back to Registration
              </Button>
              <Button
                type="button"
                onClick={handleReviewNext}
                className="flex-1"
              >
                I've Added My Review - Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            You've successfully registered your product and confirmed your Amazon review. 
            You're now eligible for <span className="font-bold text-green-600">Get ₹200 instantly!</span> on PhonePe or Google Pay!
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Claim Your Reward
            </CardTitle>
            <CardDescription>
              Send us your PhonePe/Google Pay number via WhatsApp to Get ₹200 instantly!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 mb-2">
                <strong>Next Steps:</strong>
              </p>
              <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                <li>Click the WhatsApp button below</li>
                <li>Send the pre-filled message with your PhonePe/Google Pay number</li>
                <li>Attach a screenshot of your review (mandatory)</li>
                <li>We'll send you ₹200 instantly!</li> 
              </ol>
            </div>

            <Button
              onClick={openWhatsApp}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Send WhatsApp Message
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                  onClick={() => {
                    setCurrentStep('registration');
                    setRegistrationData(null);
                    setReviewCompleted(false);
                  }}
                className="flex-1"
              >
                Register Another Product
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <main>
      {currentStep === 'registration' && renderRegistrationStep()}
      {currentStep === 'review' && renderReviewStep()}
      {currentStep === 'confirmation' && renderConfirmationStep()}
    </main>
  );
}
