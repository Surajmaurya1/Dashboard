export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  segment: "new" | "returning" | "vip" | "at_risk" | "inactive";
  status: "active" | "inactive" | "blocked";
  joinedAt: string;
  lastOrderAt: string;
}
