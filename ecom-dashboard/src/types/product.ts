export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subCategory?: string;
  vendorId: string;
  vendorName: string;
  stock: number;
  reorderLevel: number;
  images: string[];
  rating: number;
  reviewCount: number;
  status: "active" | "draft" | "archived";
  createdAt: string;
}
