import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  useEffect(() => {
    if (!firebaseEnabled) {
      console.warn("Firebase not configured. Set VITE_FIREBASE_* env vars to enable saving registrations.");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return toast.error("Please select a product");
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
          <h1 className="text-3xl font-bold tracking-tight">Register your HomeElem product</h1>
          <p className="text-muted-foreground mt-2">Provide your purchase details to activate warranty and support.</p>
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
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 items-start">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" required />
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
