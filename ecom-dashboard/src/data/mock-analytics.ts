import type { AnalyticsOverview, RevenueData, TrafficSource, ActivityItem, TopProduct, Transaction, Review } from "@/types/analytics";

export const mockOverview: AnalyticsOverview = {
  totalRevenue: 1245890,
  revenueGrowth: 12.5,
  totalOrders: 8432,
  ordersGrowth: 8.2,
  activeCustomers: 24521,
  customersGrowth: 5.1,
  activeVendors: 342,
  vendorsGrowth: 2.3,
  conversionRate: 3.24,
  conversionGrowth: 0.4,
  avgOrderValue: 1478,
  aovGrowth: 6.7,
};

export const mockRevenueData: RevenueData[] = [
  { month: "Jun", revenue: 680000, orders: 5200, prevRevenue: 590000 },
  { month: "Jul", revenue: 720000, orders: 5800, prevRevenue: 650000 },
  { month: "Aug", revenue: 890000, orders: 6100, prevRevenue: 710000 },
  { month: "Sep", revenue: 760000, orders: 5500, prevRevenue: 680000 },
  { month: "Oct", revenue: 1020000, orders: 7200, prevRevenue: 820000 },
  { month: "Nov", revenue: 1350000, orders: 9800, prevRevenue: 1100000 },
  { month: "Dec", revenue: 1560000, orders: 11200, prevRevenue: 1280000 },
  { month: "Jan", revenue: 980000, orders: 6800, prevRevenue: 850000 },
  { month: "Feb", revenue: 890000, orders: 6200, prevRevenue: 780000 },
  { month: "Mar", revenue: 1050000, orders: 7500, prevRevenue: 920000 },
  { month: "Apr", revenue: 1180000, orders: 8100, prevRevenue: 1010000 },
  { month: "May", revenue: 1245890, orders: 8432, prevRevenue: 1108000 },
];

export const mockTrafficSources: TrafficSource[] = [
  { source: "Direct", visits: 45200, percentage: 35, fill: "var(--color-chart-1)" },
  { source: "Organic", visits: 32100, percentage: 25, fill: "var(--color-chart-2)" },
  { source: "Social", visits: 25800, percentage: 20, fill: "var(--color-chart-3)" },
  { source: "Referral", visits: 15400, percentage: 12, fill: "var(--color-chart-4)" },
  { source: "Paid Ads", visits: 10300, percentage: 8, fill: "var(--color-chart-5)" },
];

export const mockActivity: ActivityItem[] = [
  { id: "ACT-001", type: "order", title: "New Order Placed", description: "Rohan Verma placed order #ORD-012 for ₹14,196", timestamp: "2026-05-12T04:00:00Z" },
  { id: "ACT-002", type: "vendor", title: "Vendor Application", description: "GlowUp Beauty submitted vendor application", timestamp: "2026-05-10T10:30:00Z" },
  { id: "ACT-003", type: "refund", title: "Refund Processed", description: "Refund of ₹2,499 issued for order #ORD-005", timestamp: "2026-05-05T10:00:00Z" },
  { id: "ACT-004", type: "review", title: "New 5-Star Review", description: "Yoga Mat Premium received a 5-star review", timestamp: "2026-05-09T14:20:00Z" },
  { id: "ACT-005", type: "product", title: "Low Stock Alert", description: "Running Shoes Ultra — only 3 units remaining", timestamp: "2026-05-11T08:00:00Z" },
  { id: "ACT-006", type: "customer", title: "New VIP Customer", description: "Aarav Sharma reached VIP status with 15 orders", timestamp: "2026-05-11T06:00:00Z" },
  { id: "ACT-007", type: "order", title: "Order Delivered", description: "Order #ORD-001 delivered to Aarav Sharma", timestamp: "2026-05-04T14:00:00Z" },
  { id: "ACT-008", type: "product", title: "Out of Stock", description: "Wireless Mouse Ergonomic is now out of stock", timestamp: "2026-05-10T12:00:00Z" },
];

export const mockTopProducts: TopProduct[] = [
  { id: "PRD-002", name: "Smart Watch Pro X", image: "/images/products/watch.jpg", sales: 567, revenue: 7370433, growth: 15.2 },
  { id: "PRD-005", name: "USB-C Fast Charging Cable", image: "/images/products/cable.jpg", sales: 1023, revenue: 408177, growth: 22.8 },
  { id: "PRD-001", name: "Noise Cancelling Headphones", image: "/images/products/headphones.jpg", sales: 234, revenue: 1169766, growth: 8.5 },
  { id: "PRD-010", name: "Mechanical Keyboard RGB", image: "/images/products/keyboard.jpg", sales: 432, revenue: 3023568, growth: 12.1 },
  { id: "PRD-004", name: "Organic Green Tea Collection", image: "/images/products/tea.jpg", sales: 412, revenue: 246788, growth: 18.9 },
];

export const mockTransactions: Transaction[] = [
  { id: "TXN-001", orderId: "ORD-001", customerName: "Aarav Sharma", amount: 5797, method: "upi", status: "success", date: "2026-05-01T10:30:00Z" },
  { id: "TXN-002", orderId: "ORD-002", customerName: "Priya Patel", amount: 12999, method: "card", status: "success", date: "2026-05-05T08:15:00Z" },
  { id: "TXN-003", orderId: "ORD-003", customerName: "Rohan Verma", amount: 4398, method: "wallet", status: "success", date: "2026-05-08T14:45:00Z" },
  { id: "TXN-004", orderId: "ORD-005", customerName: "Kunal Mehra", amount: 2499, method: "card", status: "refunded", date: "2026-05-05T10:00:00Z" },
  { id: "TXN-005", orderId: "ORD-006", customerName: "Ananya Gupta", amount: 2798, method: "upi", status: "success", date: "2026-04-28T11:00:00Z" },
  { id: "TXN-006", orderId: "ORD-007", customerName: "Vikram Singh", amount: 6999, method: "netbanking", status: "success", date: "2026-05-06T13:00:00Z" },
  { id: "TXN-007", orderId: "ORD-008", customerName: "Neha Reddy", amount: 2598, method: "upi", status: "success", date: "2026-05-09T10:00:00Z" },
  { id: "TXN-008", orderId: "ORD-009", customerName: "Arjun Das", amount: 5998, method: "card", status: "refunded", date: "2026-05-06T09:00:00Z" },
  { id: "TXN-009", orderId: "ORD-010", customerName: "Divya Nair", amount: 1799, method: "wallet", status: "success", date: "2026-05-02T07:30:00Z" },
  { id: "TXN-010", orderId: "ORD-011", customerName: "Aarav Sharma", amount: 2999, method: "upi", status: "success", date: "2026-05-11T06:00:00Z" },
  { id: "TXN-011", orderId: "ORD-004", customerName: "Sneha Iyer", amount: 1797, method: "cod", status: "pending", date: "2026-05-10T09:20:00Z" },
  { id: "TXN-012", orderId: "ORD-012", customerName: "Rohan Verma", amount: 14196, method: "netbanking", status: "pending", date: "2026-05-12T04:00:00Z" },
];

export const mockReviews: Review[] = [
  { id: "REV-001", productId: "PRD-008", productName: "Yoga Mat Premium", customerName: "Ananya Gupta", rating: 5, comment: "Absolutely love this yoga mat! The grip is excellent and it's super comfortable.", status: "approved", date: "2026-05-09T14:20:00Z" },
  { id: "REV-002", productId: "PRD-002", productName: "Smart Watch Pro X", customerName: "Priya Patel", rating: 5, comment: "Best smartwatch I've ever owned. Battery life is amazing!", status: "approved", date: "2026-05-06T09:15:00Z" },
  { id: "REV-003", productId: "PRD-001", productName: "Noise Cancelling Headphones", customerName: "Aarav Sharma", rating: 4, comment: "Great sound quality but slightly heavy for long use.", status: "approved", date: "2026-05-03T16:45:00Z" },
  { id: "REV-004", productId: "PRD-012", productName: "Running Shoes Ultra", customerName: "Arjun Das", rating: 2, comment: "Size runs small. Had to return.", status: "approved", date: "2026-05-01T11:30:00Z" },
  { id: "REV-005", productId: "PRD-010", productName: "Mechanical Keyboard RGB", customerName: "Vikram Singh", rating: 5, comment: "Cherry MX switches are perfection. RGB is gorgeous!", status: "approved", date: "2026-05-08T18:00:00Z" },
  { id: "REV-006", productId: "PRD-004", productName: "Organic Green Tea", customerName: "Sneha Iyer", rating: 4, comment: "Nice variety of flavors. Would love a larger pack option.", status: "pending", date: "2026-05-11T07:00:00Z" },
  { id: "REV-007", productId: "PRD-007", productName: "Bluetooth Speaker Mini", customerName: "Kunal Mehra", rating: 1, comment: "Stopped working after a week. Terrible quality.", status: "flagged", date: "2026-05-04T20:30:00Z" },
  { id: "REV-008", productId: "PRD-015", productName: "LED Desk Lamp Smart", customerName: "Rohan Verma", rating: 5, comment: "Perfect for late night work sessions. Love the touch controls.", status: "approved", date: "2026-05-10T21:00:00Z" },
];
