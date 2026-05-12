export interface AnalyticsOverview {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  activeCustomers: number;
  customersGrowth: number;
  activeVendors: number;
  vendorsGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  avgOrderValue: number;
  aovGrowth: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
  prevRevenue?: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  revenue: number;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
  fill: string;
}

export interface ActivityItem {
  id: string;
  type: "order" | "vendor" | "refund" | "review" | "product" | "customer";
  title: string;
  description: string;
  timestamp: string;
}

export interface TopProduct {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
  growth: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  method: "upi" | "card" | "cod" | "wallet" | "netbanking";
  status: "success" | "pending" | "failed" | "refunded";
  date: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  status: "approved" | "pending" | "flagged";
  date: string;
}
