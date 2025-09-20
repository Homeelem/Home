import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2 } from "lucide-react";
import { products } from "@/data/products";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [productId, setProductId] = useState<string | undefined>(
    params.get("productId") ?? undefined,
  );
  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  const [orderId, setOrderId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string; phone?: string}>({});

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
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid Indian mobile number
    // Indian mobile numbers start with 6, 7, 8, or 9 and are 10 digits long
    const indianMobileRegex = /^[6-9]\d{9}$/;
    
    // Also accept +91 prefix format
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
    
    // Auto-format phone number with +91 prefix
    if (value && !value.startsWith('+91') && value.length > 0) {
      // Remove any non-digit characters
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

  const fillDummyData = () => {
    const dummyData = {
      orderId: `404-${Math.floor(Math.random() * 9000000) + 1000000}-${Math.floor(Math.random() * 9000000) + 1000000}`,
      purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random date within last 30 days
      email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`, // +91 prefix with 10-digit Indian mobile
    };
    
    setOrderId(dummyData.orderId);
    setPurchaseDate(dummyData.purchaseDate);
    setEmail(dummyData.email);
    setPhone(dummyData.phone);
    
    // Clear any existing errors
    setErrors({});
    
    // Select a random product if none is selected
    if (!productId) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setProductId(randomProduct.id);
    }
    
    toast.success("Dummy data filled!");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!productId) {
      toast.error("Please select a product");
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!validateIndianPhone(phone)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid Indian mobile number' }));
      toast.error("Please enter a valid Indian mobile number");
      return;
    }
    
    setSubmitting(true);
    try {
      if (!firebaseEnabled || !db) {
        toast.info("Registration received (local only). Configure Firebase to persist data.");
      } else {
        await addDoc(collection(db, "registrations"), {
          orderId,
          purchaseDate,
          productId,
          email,
          phone,
          createdAt: serverTimestamp(),
        });
        toast.success("Your product is being registered.");
      }
      
      // Redirect to thank you page after successful submission
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Register your HomeElem product</h1>
              <p className="text-muted-foreground mt-2">Provide your purchase details to activate warranty and support.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={fillDummyData}
              className="flex items-center gap-2"
            >
              <Wand2 className="h-4 w-4" />
              Fill Dummy Data
            </Button>
          </div>
        </div>
        {!firebaseEnabled && (
          <div className="mb-6 rounded-lg border bg-yellow-50 text-yellow-900 p-4 text-sm">
            Firebase is not configured. Set VITE_FIREBASE_* env variables to enable saving registrations.
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. 404-1234567-8901234" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input id="purchaseDate" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Select value={productId} onValueChange={setProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={handleEmailChange} 
                placeholder="you@example.com" 
                required 
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 items-start">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={handlePhoneChange} 
                placeholder="+91 9876543210" 
                required 
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            {product && (
              <div className="rounded-lg border p-3 flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
                <div>
                  <p className="text-sm font-medium leading-tight">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
