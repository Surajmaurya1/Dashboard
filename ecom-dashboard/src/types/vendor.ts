export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  email: string;
  phone: string;
  category: string;
  productsCount: number;
  totalRevenue: number;
  commissionRate: number;
  rating: number;
  fulfillmentRate: number;
  returnRate: number;
  status: "active" | "pending" | "suspended";
  joinedAt: string;
}
