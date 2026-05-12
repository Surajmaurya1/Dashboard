import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Store,
  BarChart3,
  Warehouse,
  Star,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const navItems: NavItem[] = [
  { title: "Overview", href: "/", icon: LayoutDashboard },
  { title: "Orders", href: "/orders", icon: ShoppingCart, badge: "12" },
  { title: "Products", href: "/products", icon: Package },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Vendors", href: "/vendors", icon: Store },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Inventory", href: "/inventory", icon: Warehouse },
  { title: "Reviews", href: "/reviews", icon: Star },
  { title: "Transactions", href: "/transactions", icon: CreditCard },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const orderStatusColors: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  confirmed: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  processing: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  shipped: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
  delivered: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  cancelled: "bg-red-500/15 text-red-700 dark:text-red-400",
  returned: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
};

export const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  failed: "bg-red-500/15 text-red-700 dark:text-red-400",
  refunded: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
};

export const vendorStatusColors: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  suspended: "bg-red-500/15 text-red-700 dark:text-red-400",
};

export const customerSegmentColors: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  returning: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  vip: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  at_risk: "bg-red-500/15 text-red-700 dark:text-red-400",
  inactive: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-400",
};
