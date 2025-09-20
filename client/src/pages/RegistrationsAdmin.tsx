import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, RefreshCw } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { loadProducts } from "@/lib/products";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Registration {
  id: string;
  orderId: string;
  purchaseDate: string;
  productId: string;
  email: string;
  phone: string;
  createdAt: any;
}

interface Product {
  id: string;
  name: string;
  category: string;
}

export default function RegistrationsAdmin() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProduct, setFilterProduct] = useState<string>("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load registrations
      if (firebaseEnabled && db) {
        const registrationsQuery = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
        const registrationsSnapshot = await getDocs(registrationsQuery);
        const registrationsData = registrationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Registration[];
        setRegistrations(registrationsData);
      } else {
        // Fallback for development
        setRegistrations([]);
        toast.info("Firebase not configured. No registrations to display.");
      }

      // Load products for filtering
      const allProducts = await loadProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Unknown Product (${productId})`;
  };

  const getProductCategory = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.category : "Unknown";
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm) ||
      getProductName(reg.productId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProduct = filterProduct === "all" || reg.productId === filterProduct;
    
    return matchesSearch && matchesProduct;
  });

  const exportToCSV = () => {
    const headers = ["Order ID", "Purchase Date", "Product", "Category", "Email", "Phone", "Registration Date"];
    const csvData = filteredRegistrations.map(reg => [
      reg.orderId,
      reg.purchaseDate,
      getProductName(reg.productId),
      getProductCategory(reg.productId),
      reg.email,
      reg.phone,
      reg.createdAt ? new Date(reg.createdAt.seconds * 1000).toLocaleDateString() : "N/A"
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Registrations</h1>
          <p className="text-muted-foreground">View and manage all product registrations</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/admin-secret-2024">← Back to Products Admin</Link>
          </Button>
          <Button onClick={exportToCSV} disabled={filteredRegistrations.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={loadData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredRegistrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(registrations.map(r => r.productId)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations.filter(r => {
                const regDate = r.createdAt ? new Date(r.createdAt.seconds * 1000) : new Date(0);
                const now = new Date();
                return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, email, phone, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Product</label>
              <Select value={filterProduct} onValueChange={setFilterProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="All products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          <CardDescription>
            {searchTerm || filterProduct !== "all" ? "Filtered results" : "All registrations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No registrations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-mono text-sm">{reg.orderId}</TableCell>
                      <TableCell>
                        <div className="font-medium">{getProductName(reg.productId)}</div>
                        <div className="text-sm text-muted-foreground">{reg.productId}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getProductCategory(reg.productId)}</Badge>
                      </TableCell>
                      <TableCell>{reg.purchaseDate}</TableCell>
                      <TableCell className="font-mono text-sm">{reg.email}</TableCell>
                      <TableCell className="font-mono text-sm">{reg.phone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(reg.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
