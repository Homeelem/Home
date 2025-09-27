import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Link } from "react-router-dom";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { loadProducts as loadFallbackProducts } from "@/lib/products";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
  inStock: boolean;
  amazonUrl?: string;
  createdAt: any;
  updatedAt: any;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: "",
    features: "",
    amazonUrl: "",
    inStock: true
  });

  const categories = [
    "Home Improvements"
  ];

  useEffect(() => {
    if (firebaseEnabled) {
      loadProducts();
    } else {
      // Load fallback products for development
      loadFallbackProducts().then(products => {
        setProducts(products);
        setLoading(false);
      });
    }
  }, []);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firebaseEnabled || !db) {
      // In development mode, simulate adding/updating products locally
      const imageUrls = formData.images
        .split(/[,\n]/)
        .map(url => url.trim())
        .filter(url => url);

      const productData = {
        id: editingProduct ? editingProduct.id : `product-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        images: imageUrls,
        features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature),
        amazonUrl: formData.amazonUrl.trim() || undefined,
        inStock: formData.inStock,
        createdAt: editingProduct ? editingProduct.createdAt : new Date(),
        updatedAt: new Date()
      };

      if (editingProduct) {
        // Update existing product in local state
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
        toast.success("Product updated successfully (local development mode)");
      } else {
        // Add new product to local state
        setProducts(prev => [...prev, productData]);
        toast.success("Product added successfully (local development mode)");
      }

      resetForm();
      return;
    }

    try {
      // Handle image URLs - support both line breaks and commas
      const imageUrls = formData.images
        .split(/[,\n]/)
        .map(url => url.trim())
        .filter(url => url);

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        images: imageUrls,
        features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature),
        amazonUrl: formData.amazonUrl.trim() || undefined,
        inStock: formData.inStock,
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        // Update existing product
        await updateDoc(doc(db, "products", editingProduct.id), productData);
        toast.success("Product updated successfully");
      } else {
        // Add new product
        productData.createdAt = serverTimestamp();
        await addDoc(collection(db, "products"), productData);
        toast.success("Product added successfully");
      }

      // Reset form and reload products
      resetForm();
      loadProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      images: product.images.join(', '),
      features: product.features.join(', '),
      amazonUrl: product.amazonUrl || '',
      inStock: product.inStock
    });
    setIsAdding(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    if (!firebaseEnabled || !db) {
      // In development mode, remove from local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success("Product deleted successfully (local development mode)");
      return;
    }

    try {
      await deleteDoc(doc(db, "products", productId));
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      images: "",
      features: "",
      amazonUrl: "",
      inStock: true
    });
    setEditingProduct(null);
    setIsAdding(false);
  };

  const addDummyProduct = () => {
    const dummyProducts = [
      {
        name: "Smart Home Speaker",
        description: "Voice-controlled smart speaker with built-in AI assistant and premium sound quality.",
        price: "5999",
        category: "Small Appliances",
        images: "https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg,https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg",
        features: "Voice control, AI assistant, Premium sound, Smart home integration",
        amazonUrl: "https://www.amazon.in/s?k=HomeElem+Smart+Speaker",
        inStock: true
      },
      {
        name: "Induction Cooktop",
        description: "Energy-efficient induction cooktop with precise temperature control and safety features.",
        price: "12999",
        category: "Small Appliances",
        images: "https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg",
        features: "Energy efficient, Precise temperature control, Safety auto-shutoff, Easy cleaning",
        amazonUrl: "https://www.amazon.in/s?k=HomeElem+Induction+Cooktop",
        inStock: true
      },
      {
        name: "Vacuum Sealer Machine",
        description: "Food preservation vacuum sealer to keep food fresh longer and reduce waste.",
        price: "4499",
        category: "Small Appliances",
        images: "https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg,https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg",
        features: "Food preservation, Compact design, Easy to use, BPA-free bags",
        amazonUrl: "https://www.amazon.in/s?k=HomeElem+Vacuum+Sealer",
        inStock: false
      }
    ];

    const randomProduct = dummyProducts[Math.floor(Math.random() * dummyProducts.length)];
    setFormData(randomProduct);
    setIsAdding(true);
    toast.success("Dummy product data loaded! You can edit it before saving.");
  };

  if (!firebaseEnabled) {
    return (
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
                <p className="text-muted-foreground mt-2">Manage your product catalog</p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link to="/customer-rewards">Reward Flow</Link>
                </Button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Development Mode:</strong> Firebase is not configured. You're working with dummy data that will reset on page refresh.
                Set VITE_FIREBASE_* environment variables to enable persistent product management.
              </p>
            </div>
          </div>

          {/* Add/Edit Product Form */}
          {isAdding && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="Enter price"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Enter product description"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stock Status</Label>
                      <Select value={formData.inStock.toString()} onValueChange={(value) => setFormData({...formData, inStock: value === 'true'})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">In Stock</SelectItem>
                          <SelectItem value="false">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="images">Image URLs (one per line or comma-separated)</Label>
                    <Textarea
                      id="images"
                      value={formData.images}
                      onChange={(e) => setFormData({...formData, images: e.target.value})}
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter one image URL per line, or separate with commas. Each URL will be added as a separate image.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amazonUrl">Amazon URL (optional)</Label>
                    <Input
                      id="amazonUrl"
                      type="url"
                      value={formData.amazonUrl}
                      onChange={(e) => setFormData({...formData, amazonUrl: e.target.value})}
                      placeholder="https://www.amazon.in/dp/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Features (comma-separated)</Label>
                    <Input
                      id="features"
                      value={formData.features}
                      onChange={(e) => setFormData({...formData, features: e.target.value})}
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Add Product Buttons */}
          {!isAdding && (
            <div className="mb-6 flex gap-4">
              <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
              {import.meta.env.DEV && (
                <Button 
                  variant="outline" 
                  onClick={addDummyProduct}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Quick Add Dummy Product
                </Button>
              )}
            </div>
          )}

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({products.length})</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No products found. Add your first product!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-sm font-medium">₹{product.price}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={product.inStock ? "default" : "secondary"}>
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                            <Badge variant="outline">
                              {product.images ? product.images.length : 0} image{(product.images ? product.images.length : 0) !== 1 ? 's' : ''}
                            </Badge>
                          </div>
                          {product.amazonUrl && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Amazon: <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on Amazon</a>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Manage your product catalog</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/customer-rewards">Reward Flow</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin-registrations-secret-2024">View Registrations</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin-messages-secret-2024">View Messages</Link>
            </Button>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        {isAdding && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingProduct ? "Edit Product" : "Add New Product"}
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter product description"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Status</Label>
                    <Select value={formData.inStock.toString()} onValueChange={(value) => setFormData({...formData, inStock: value === 'true'})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">In Stock</SelectItem>
                        <SelectItem value="false">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Image URLs (one per line or comma-separated)</Label>
                  <Textarea
                    id="images"
                    value={formData.images}
                    onChange={(e) => setFormData({...formData, images: e.target.value})}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter one image URL per line, or separate with commas. Each URL will be added as a separate image.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amazonUrl">Amazon URL (optional)</Label>
                  <Input
                    id="amazonUrl"
                    type="url"
                    value={formData.amazonUrl}
                    onChange={(e) => setFormData({...formData, amazonUrl: e.target.value})}
                    placeholder="https://www.amazon.in/dp/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add Product Buttons */}
        {!isAdding && (
          <div className="mb-6 flex gap-4">
            <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Product
            </Button>
            {import.meta.env.DEV && (
              <Button 
                variant="outline" 
                onClick={addDummyProduct}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Quick Add Dummy Product
              </Button>
            )}
          </div>
        )}

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({products.length})</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No products found. Add your first product!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm font-medium">₹{product.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={product.inStock ? "default" : "secondary"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                            <Badge variant="outline">
                              {product.images ? product.images.length : 0} image{(product.images ? product.images.length : 0) !== 1 ? 's' : ''}
                            </Badge>
                        </div>
                        {product.amazonUrl && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Amazon: <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on Amazon</a>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
