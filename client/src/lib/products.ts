import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";

export type Dimensions = {
  widthCm: number;
  heightCm: number;
  depthCm: number;
  weightKg?: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  dimensions?: Dimensions;
  images: string[];
  videos?: string[];
  amazonUrl?: string;
  price?: number;
  inStock?: boolean;
  createdAt?: any;
  updatedAt?: any;
};

// Helper function to convert Firebase document to Product format
const convertFirebaseToProduct = (doc: any): Product => ({
  id: doc.id,
  name: doc.name,
  category: doc.category,
  description: doc.description,
  features: doc.features || [],
  dimensions: doc.dimensions,
  images: doc.images || [],
  videos: doc.videos || [],
  amazonUrl: doc.amazonUrl || '',
  price: doc.price || 0,
  inStock: doc.inStock || false,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt
});

export const loadProducts = async (): Promise<Product[]> => {
  console.log("loadProducts called, firebaseEnabled:", firebaseEnabled, "db:", !!db);
  
  if (!firebaseEnabled || !db) {
    console.warn("Firebase not configured, returning empty array");
    return [];
  }

  try {
    console.log("Attempting to load products from B2C/products/allProducts...");
    const productsCollection = collection(db, 'B2C', 'products', 'allProducts');
    const querySnapshot = await getDocs(productsCollection);
    
    const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return convertFirebaseToProduct({ id: doc.id, ...data });
    });
    
    console.log("Successfully loaded", products.length, "products from B2C/products/allProducts");
    return products;
  } catch (error) {
    console.error("Error loading products from B2C/products/allProducts:", error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  if (!firebaseEnabled || !db) {
    console.warn("Firebase not configured, returning null");
    return null;
  }

  try {
    console.log("Attempting to load product from B2C/products/allProducts:", id);
    const productRef = doc(db, 'B2C', 'products', 'allProducts', id);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      const data = productSnap.data();
      console.log("Product found in B2C/products/allProducts:", data.name);
      return convertFirebaseToProduct({ id: productSnap.id, ...data });
    } else {
      console.log("Product not found in B2C/products/allProducts:", id);
      return null;
    }
  } catch (error) {
    console.error("Error loading product from B2C/products/allProducts:", error);
    return null;
  }
};

export const categories = [
  "Home Improvements"
] as const;
