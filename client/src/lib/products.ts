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
  if (!firebaseEnabled || !db) {
    return [];
  }

  try {
    const productsCollection = collection(db, 'B2C', 'products', 'allProducts');
    const querySnapshot = await getDocs(productsCollection);
    
    const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return convertFirebaseToProduct({ id: doc.id, ...data });
    });
    
    return products;
  } catch (error) {
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  if (!firebaseEnabled || !db) {
    return null;
  }

  try {
    const productRef = doc(db, 'B2C', 'products', 'allProducts', id);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      const data = productSnap.data();
      return convertFirebaseToProduct({ id: productSnap.id, ...data });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const categories = [
  "Home Improvements"
] as const;
